/* Šachový rozbor – záloha a obnova všetkých dát (web aj mobil).
 * Pridá do nastavení (⚙ zvuky) tlačidlá „Zálohovať dáta“ a „Obnoviť zo zálohy“.
 * Formát: {app:"sachovy-rozbor", v:1, at:<ISO>, collections:{<kolekcia>:[{id,data}]}}
 */
(function () {
  "use strict";
  const COLS = ["profiles", "games", "days", "rush", "journey", "datel", "studyprog", "plays", "puzzles"];
  const native = !!window.NATIVE_APP;

  async function getDb() { try { return window.claude && window.claude.use ? await window.claude.use("db") : null; } catch (e) { return null; } }

  async function dump() {
    const db = await getDb(); if (!db) throw new Error("Databáza nie je dostupná.");
    if (db._dump) return db._dump();
    const out = {};
    for (const c of COLS) {
      const snap = await db.collection(c).get();
      out[c] = snap.docs.map(d => ({ id: d.id, data: d.data() }));
    }
    return out;
  }
  async function restore(cols) {
    const db = await getDb(); if (!db) throw new Error("Databáza nie je dostupná.");
    if (db._restore) return db._restore(cols, false);
    for (const [c, docs] of Object.entries(cols)) for (const d of docs) await db.doc(c + "/" + d.id).set(d.data);
  }

  function modal(html) {
    const m = document.createElement("div");
    m.style.cssText = "position:fixed;inset:0;z-index:99999;background:rgba(0,0,0,.45);display:flex;align-items:center;justify-content:center;padding:16px";
    m.innerHTML = '<div style="background:#fffdf7;color:#222;border-radius:14px;max-width:560px;width:100%;padding:18px;box-shadow:0 10px 40px rgba(0,0,0,.3);font:15px/1.4 system-ui,sans-serif">' + html + '</div>';
    document.body.appendChild(m);
    m.addEventListener("click", e => { if (e.target === m || e.target.dataset.close != null) m.remove(); });
    return m;
  }
  const btn = "padding:8px 14px;border-radius:9px;border:1px solid #bbb;background:#fff;font:inherit;cursor:pointer;margin:6px 6px 0 0";
  const pbtn = btn + ";background:#2f6b3a;color:#fff;border-color:#2f6b3a";
  const today = () => new Date().toISOString().slice(0, 10);

  async function doExport() {
    let cols;
    try { cols = await dump(); } catch (e) { modal('<b>Záloha zlyhala</b><p>' + e.message + '</p><button data-close style="' + btn + '">Zavrieť</button>'); return; }
    const n = Object.values(cols).reduce((a, d) => a + d.length, 0);
    const json = JSON.stringify({ app: "sachovy-rozbor", v: 1, at: new Date().toISOString(), collections: cols });
    const name = "sachovy-rozbor-zaloha-" + today() + ".json";
    const P = window.Capacitor && window.Capacitor.Plugins;
    if (native && P && P.Filesystem && P.Share) {
      try {
        const r = await P.Filesystem.writeFile({ path: name, data: json, directory: "CACHE", encoding: "utf8" });
        await P.Share.share({ title: "Záloha – Šachový rozbor", text: "Záloha dát (" + n + " záznamov)", files: [r.uri], dialogTitle: "Ulož zálohu (napr. na Disk Google)" });
        return;
      } catch (e) { if (String(e && e.message).match(/cancel/i)) return; console.warn(e); }
    }
    try { const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([json], { type: "application/json" })); a.download = name; document.body.appendChild(a); a.click(); a.remove(); } catch (e) {}
    const m = modal('<b>Záloha dát</b> – ' + n + ' záznamov<p style="margin:6px 0">Ak sa súbor nestiahol sám, skopíruj text nižšie a ulož ho ako <code>' + name + '</code> (napr. na Disk Google).</p>' +
      '<textarea readonly style="width:100%;height:140px;font:12px monospace">' + json.replace(/</g, "&lt;") + '</textarea>' +
      '<div><button id="zl-copy" style="' + pbtn + '">Kopírovať</button><button data-close style="' + btn + '">Zavrieť</button></div>');
    m.querySelector("#zl-copy").onclick = async () => {
      const ta = m.querySelector("textarea"); ta.select();
      try { await navigator.clipboard.writeText(json); } catch (e) { try { document.execCommand("copy"); } catch (e2) {} }
      m.querySelector("#zl-copy").textContent = "Skopírované ✓";
    };
  }

  function doImport() {
    const m = modal('<b>Obnoviť zo zálohy</b><p style="margin:6px 0">Vyber súbor zálohy (.json) alebo vlož jej text. Záznamy so zhodným ID sa prepíšu, ostatné ostanú.</p>' +
      '<input type="file" accept="application/json,.json,text/plain" style="margin:6px 0"><textarea placeholder="…alebo sem vlož text zálohy" style="width:100%;height:110px;font:12px monospace"></textarea>' +
      '<div id="zl-msg" style="margin-top:6px;color:#a33"></div><div><button id="zl-go" style="' + pbtn + '">Obnoviť</button><button data-close style="' + btn + '">Zrušiť</button></div>');
    const ta = m.querySelector("textarea"), msg = m.querySelector("#zl-msg");
    m.querySelector("input[type=file]").onchange = async e => { const f = e.target.files[0]; if (f) ta.value = await f.text(); };
    m.querySelector("#zl-go").onclick = async () => {
      let o; try { o = JSON.parse(ta.value); } catch (e) { msg.textContent = "Text nie je platná záloha (JSON)."; return; }
      if (!o || o.app !== "sachovy-rozbor" || !o.collections) { msg.textContent = "Toto nie je záloha Šachového rozboru."; return; }
      const n = Object.values(o.collections).reduce((a, d) => a + d.length, 0);
      msg.style.color = "#333"; msg.textContent = "Obnovujem " + n + " záznamov…";
      try { await restore(o.collections); msg.textContent = "Hotovo – " + n + " záznamov. Aplikácia sa znova načíta."; setTimeout(() => location.reload(), 1200); }
      catch (e) { msg.style.color = "#a33"; msg.textContent = "Obnova zlyhala: " + e.message; }
    };
  }

  function inject() {
    const anchor = document.getElementById("sfx-test");
    if (!anchor || document.getElementById("zl-box")) return;
    const box = document.createElement("div");
    box.id = "zl-box"; box.style.cssText = "margin-top:6px;padding-top:8px;border-top:1px solid var(--line,rgba(0,0,0,.15));display:flex;flex-wrap:wrap;gap:6px";
    box.innerHTML = '<div class="label" style="width:100%">Záloha dát</div><button id="zl-exp">💾 Zálohovať dáta</button> <button id="zl-imp">📂 Obnoviť zo zálohy</button>';
    anchor.insertAdjacentElement("afterend", box);
    box.querySelector("#zl-exp").onclick = doExport;
    box.querySelector("#zl-imp").onclick = doImport;
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", inject); else inject();
  window.ZALOHA = { export: doExport, import: doImport, dump, restore };
})();
