/* Šachový rozbor – lokálna databáza pre natívnu aplikáciu (Android/iOS).
 * Napodobňuje časť API, ktoré aplikácia používa z claude.ai (window.claude.use("db")):
 *   db.collection(c).doc().id, .where(f,"==",v), .onSnapshot(cb, err), .get()
 *   db.doc("c/id").set(body) / .update(patch) / .delete() / .get()
 * Dáta sú v IndexedDB vo WebView (ostávajú pri aktualizácii aplikácie).
 * index.html sa nemení – tento súbor sa len vloží pred ostatné skripty.
 */
(function () {
  "use strict";
  if (window.claude && window.claude.use) return; // beží v claude.ai – nič nerobiť

  const DB_NAME = "sachovy-rozbor", STORE = "docs";
  const mem = new Map();          // "col/id" -> data
  const listeners = new Set();    // {col, field, value, cb}
  let idb = null;

  function openIdb() {
    return new Promise((res, rej) => {
      const r = indexedDB.open(DB_NAME, 1);
      r.onupgradeneeded = () => r.result.createObjectStore(STORE);
      r.onsuccess = () => res(r.result);
      r.onerror = () => rej(r.error);
    });
  }
  function idbAll(db) {
    return new Promise((res, rej) => {
      const out = [], tx = db.transaction(STORE, "readonly"), st = tx.objectStore(STORE);
      const cur = st.openCursor();
      cur.onsuccess = () => { const c = cur.result; if (c) { out.push([c.key, c.value]); c.continue(); } else res(out); };
      cur.onerror = () => rej(cur.error);
    });
  }
  function idbPut(key, val) {
    return new Promise((res, rej) => {
      const tx = idb.transaction(STORE, "readwrite");
      if (val === undefined) tx.objectStore(STORE).delete(key); else tx.objectStore(STORE).put(val, key);
      tx.oncomplete = () => res(); tx.onerror = () => rej(tx.error);
    });
  }
  const clone = v => JSON.parse(JSON.stringify(v));
  const split = path => { const i = path.lastIndexOf("/"); return [path.slice(0, i), path.slice(i + 1)]; };
  const newId = () => { const a = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"; let s = ""; const r = crypto.getRandomValues(new Uint8Array(20)); for (const b of r) s += a[b % 62]; return s; };

  function snapshotFor(col, field, value) {
    const docs = [];
    for (const [k, v] of mem) {
      const [c, id] = split(k);
      if (c !== col) continue;
      if (field && v[field] !== value) continue;
      const data = clone(v);
      docs.push({ id, exists: true, data: () => clone(data) });
    }
    return { docs, size: docs.length, empty: !docs.length, metadata: { fromCache: false, hasPendingWrites: false }, forEach: f => docs.forEach(f) };
  }
  let pending = new Set(), scheduled = false;
  function notify(col) {
    pending.add(col);
    if (scheduled) return; scheduled = true;
    queueMicrotask(() => {
      scheduled = false; const cols = pending; pending = new Set();
      for (const l of listeners) if (cols.has(l.col)) { try { l.cb(snapshotFor(l.col, l.field, l.value)); } catch (e) { console.error(e); } }
      window.dispatchEvent(new CustomEvent("native-db-change"));
    });
  }
  function setPath(obj, dotted, val) {
    const parts = dotted.split("."); let o = obj;
    for (let i = 0; i < parts.length - 1; i++) { if (typeof o[parts[i]] !== "object" || o[parts[i]] === null) o[parts[i]] = {}; o = o[parts[i]]; }
    o[parts[parts.length - 1]] = val;
  }
  async function write(path, data) {
    const [col] = split(path);
    if (data === undefined) mem.delete(path); else mem.set(path, data);
    notify(col);
    await idbPut(path, data === undefined ? undefined : data);
  }

  function query(col, field, value) {
    return {
      where(f, op, v) { if (op !== "==") throw new Error("Lokálna DB podporuje len =="); return query(col, f, v); },
      orderBy() { return this; }, limit() { return this; },
      async get() { return snapshotFor(col, field, value); },
      onSnapshot(cb, err) {
        const l = { col, field, value, cb }; listeners.add(l);
        queueMicrotask(() => { try { cb(snapshotFor(col, field, value)); } catch (e) { err && err(e); } });
        return () => listeners.delete(l);
      },
      doc(id) { return docRef(col + "/" + (id || newId())); }
    };
  }
  function docRef(path) {
    const [col, id] = split(path);
    return {
      id, path,
      async get() { const v = mem.get(path); return { id, exists: v !== undefined, data: () => v === undefined ? undefined : clone(v) }; },
      async set(body) { await write(path, clone(body)); },
      async update(patch) {
        const cur = clone(mem.get(path) || {});
        for (const [k, v] of Object.entries(clone(patch))) { if (k.includes(".")) setPath(cur, k, v); else cur[k] = v; }
        await write(path, cur);
      },
      async delete() { await write(path, undefined); },
      onSnapshot(cb) { const l = { col, field: null, value: null, cb: () => cb({ id, exists: mem.has(path), data: () => clone(mem.get(path)) }) }; listeners.add(l); queueMicrotask(l.cb); return () => listeners.delete(l); }
    };
  }

  const api = Object.freeze({
    collection: col => query(col, null, null),
    doc: path => docRef(path),
    /* pomocné funkcie pre zálohu */
    _dump() { const out = {}; for (const [k, v] of mem) { const [c, id] = split(k); (out[c] = out[c] || []).push({ id, data: clone(v) }); } return out; },
    async _restore(cols, replace) {
      if (replace) { for (const k of [...mem.keys()]) { mem.delete(k); await idbPut(k, undefined); } }
      for (const [c, docs] of Object.entries(cols)) for (const d of docs) { mem.set(c + "/" + d.id, d.data); await idbPut(c + "/" + d.id, d.data); }
      for (const c of Object.keys(cols)) notify(c);
      for (const l of listeners) notify(l.col);
    }
  });

  const ready = (async () => {
    try { if (navigator.storage && navigator.storage.persist) await navigator.storage.persist(); } catch (e) {}
    idb = await openIdb();
    for (const [k, v] of await idbAll(idb)) mem.set(k, v);
    return api;
  })();

  window.claude = Object.freeze({ use: name => name === "db" ? ready : Promise.resolve(null) });
  window.NATIVE_APP = true;
})();
