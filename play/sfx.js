/* ================= zvuky (Web Audio, syntéza – bez súborov) =================
   SFX.play(meno), SFX.move(ťah z chess.js), SFX.stars(n).
   Hudba: SFX.music(meno | null) – slučky z assets/hudba-<meno>.mp3 s prelínaním, SFX.duck(0..1) stíšenie.
   Nastavenie v localStorage "sfx": {on, vol, mus, mvol}. */
const SFX = (() => {
  let ctx = null, master = null, noiseBuf = null;
  const KEY = "sfx";
  const cfg = (() => { try { return Object.assign({on:true, vol:0.6, mus:true, mvol:0.5}, JSON.parse(localStorage.getItem(KEY) || "{}")); } catch(e){ return {on:true, vol:0.6, mus:true, mvol:0.5}; } })();
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(cfg)); } catch(e){} };

  function ac(){
    if (!ctx){
      const C = window.AudioContext || window.webkitAudioContext; if (!C) return null;
      try { ctx = new C(); } catch(e){ return null; }
      master = ctx.createGain(); master.gain.value = cfg.vol;
      const comp = ctx.createDynamicsCompressor(); comp.threshold.value = -14; comp.ratio.value = 4;
      master.connect(comp); comp.connect(ctx.destination);
      noiseBuf = ctx.createBuffer(1, ctx.sampleRate * 0.5, ctx.sampleRate);
      const d = noiseBuf.getChannelData(0); for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    }
    if (ctx.state === "suspended") ctx.resume().catch(() => {});
    return ctx;
  }
  // prehliadače pustia zvuk až po dotyku – kontext odomkneme pri prvom kliknutí
  const unlock = () => {
    if (!cfg.on && !cfg.mus) return;
    const c = ac(); if (!c) return;
    const go = () => { if (cfg.mus && M.want && !M.cur) musicSet(M.want); };
    if (c.state === "running") go(); else c.resume().then(go).catch(() => {});
  };
  ["pointerdown", "keydown", "touchstart"].forEach(e => window.addEventListener(e, unlock, {capture:true, passive:true}));

  /* --- stavebné kamene --- */
  function tone(t, f, dur, o = {}){
    const osc = ctx.createOscillator(), g = ctx.createGain();
    osc.type = o.type || "sine"; osc.frequency.setValueAtTime(f, t);
    if (o.to) osc.frequency.exponentialRampToValueAtTime(o.to, t + (o.glide || dur));
    const v = o.vol == null ? 0.3 : o.vol, a = o.att || 0.005;
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(v, t + a);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    osc.connect(g); g.connect(o.dest || master); osc.start(t); osc.stop(t + dur + 0.05);
  }
  function noise(t, dur, o = {}){
    const s = ctx.createBufferSource(), f = ctx.createBiquadFilter(), g = ctx.createGain();
    s.buffer = noiseBuf; f.type = o.ftype || "bandpass"; f.frequency.setValueAtTime(o.f || 1000, t); f.Q.value = o.q || 1;
    if (o.fto) f.frequency.exponentialRampToValueAtTime(o.fto, t + dur);
    const v = o.vol == null ? 0.3 : o.vol;
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(v, t + (o.att || 0.002));
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    s.connect(f); f.connect(g); g.connect(master); s.start(t); s.stop(t + dur + 0.02);
  }
  // zvonček: základ + jemné vyššie alikvoty
  function bell(t, f, dur = 0.9, vol = 0.22){
    tone(t, f, dur, {vol}); tone(t, f * 2.01, dur * 0.6, {vol:vol * 0.35}); tone(t, f * 3.02, dur * 0.35, {vol:vol * 0.15});
  }
  // drevená figúrka položená na dosku
  function tock(t, vol = 1, pitch = 1){
    noise(t, 0.05, {f:1900 * pitch, q:2.5, vol:0.5 * vol});
    tone(t, 190 * pitch, 0.09, {vol:0.45 * vol, to:120 * pitch, glide:0.08, type:"triangle"});
  }
  const N = {C4:261.63, D4:293.66, E4:329.63, F4:349.23, G4:392, A4:440, B4:493.88, C5:523.25, D5:587.33, E5:659.25, F5:698.46, G5:783.99, A5:880, B5:987.77, C6:1046.5, E6:1318.5, G6:1568};

  const S = {
    move(t){ tock(t); },
    capture(t){ tock(t, 1.1, 0.85); noise(t + 0.045, 0.07, {f:1300, q:1.5, vol:0.35}); tone(t + 0.04, 140, 0.12, {vol:0.3, type:"triangle", to:90}); },
    castle(t){ tock(t, 0.9); tock(t + 0.11, 0.9, 1.08); },
    check(t){ tock(t); tone(t + 0.06, N.A5, 0.25, {vol:0.12, type:"triangle"}); tone(t + 0.06, N.A5 * 1.5, 0.18, {vol:0.05}); },
    promote(t){ tock(t); [N.C5, N.E5, N.G5, N.C6].forEach((f, i) => bell(t + 0.08 + i * 0.07, f, 0.5, 0.12)); },
    ok(t){ bell(t, N.E5, 0.6, 0.2); bell(t + 0.11, N.A5, 0.9, 0.2); },
    bad(t){ tone(t, N.E4, 0.18, {vol:0.18, type:"triangle"}); tone(t + 0.15, N.C4, 0.3, {vol:0.18, type:"triangle", to:240, glide:0.3}); },
    star(t){ bell(t, N.C6, 0.7, 0.16); tone(t, N.G6, 0.25, {vol:0.04}); },
    tada(t){ [N.C5, N.E5, N.G5].forEach((f, i) => bell(t + i * 0.09, f, 0.5, 0.15)); bell(t + 0.3, N.C6, 1.2, 0.2); S.sparkle(t + 0.3, 6); },
    win(t){ [N.G4, N.C5, N.E5, N.G5].forEach((f, i) => { tone(t + i * 0.13, f, 0.22, {vol:0.12, type:"square", att:0.01}); bell(t + i * 0.13, f, 0.3, 0.08); });
      [N.C5, N.E5, N.G5, N.C6].forEach(f => tone(t + 0.58, f, 1.1, {vol:0.07, type:"triangle", att:0.02})); bell(t + 0.58, N.C6, 1.4, 0.2); S.sparkle(t + 0.6, 8); },
    lose(t){ [N.G4, N.F4, N.E4].forEach((f, i) => tone(t + i * 0.28, f, 0.3, {vol:0.12, type:"triangle"})); tone(t + 0.84, N.D4, 0.8, {vol:0.12, type:"triangle", to:N.C4 * 0.95, glide:0.7}); },
    sparkle(t, n = 7){ for (let i = 0; i < n; i++) tone(t + i * 0.045 + Math.random() * 0.02, 1800 + Math.random() * 2600, 0.18, {vol:0.045}); },
    page(t){ noise(t, 0.22, {ftype:"bandpass", f:900, fto:3500, q:0.7, vol:0.12, att:0.05}); },
    pop(t){ tone(t, 420, 0.12, {vol:0.18, to:900, glide:0.06}); },
    whoosh(t){ noise(t, 0.4, {ftype:"bandpass", f:400, fto:2200, q:1.2, vol:0.15, att:0.12}); },
    tick(t){ tone(t, 1700, 0.04, {vol:0.08, type:"square"}); },
    click(t){ tone(t, 900, 0.03, {vol:0.06}); },
  };


  /* --- hudba --- */
  const M = {want:null, cur:null, bufs:{}, bad:{}, gain:null, duckG:null, duck:1, src:null, timer:null, tok:0};
  const XF = 3;   // prelínanie konca a začiatku slučky (s)
  const MUS_VOL = {trening:0.45};
  const MUS_ONCE = {finale:true};   // zahrá sa raz, potom výber pokračuje ďalšou skladbou v zozname
  M.done = {};   // relatívna hlasitosť skladieb (súbory sú vyrovnané na -20 LUFS)
  function mgain(){
    if (!M.gain){ M.gain = ctx.createGain(); M.duckG = ctx.createGain(); M.gain.gain.value = cfg.mvol; M.duckG.gain.value = M.duck; M.duckG.connect(M.gain); M.gain.connect(ctx.destination); }
    return M.duckG;
  }
  function load(name){
    if (M.bufs[name]) return Promise.resolve(M.bufs[name]);
    if (M.bad[name]) return Promise.reject(new Error("missing"));
    return fetch("assets/hudba-" + name + ".mp3").then(r => { if (!r.ok) throw new Error(r.status); return r.arrayBuffer(); })
      .then(b => new Promise((res, rej) => ctx.decodeAudioData(b, res, rej)))
      .then(buf => (M.bufs[name] = buf))
      .catch(e => { M.bad[name] = true; throw e; });
  }
  function voice(buf, t, vol, fadeIn){
    const s = ctx.createBufferSource(), g = ctx.createGain(); s.buffer = buf;
    g.gain.setValueAtTime(fadeIn ? 0.0001 : vol, t); if (fadeIn) g.gain.exponentialRampToValueAtTime(vol, t + fadeIn);
    s.connect(g); g.connect(mgain()); s.start(t); return {s, g};
  }
  function fadeOut(v, t, d){ if (!v) return; try { v.g.gain.cancelScheduledValues(t); v.g.gain.setValueAtTime(Math.max(v.g.gain.value, 0.0001), t); v.g.gain.exponentialRampToValueAtTime(0.0001, t + d); v.s.stop(t + d + 0.05); } catch(e){} }
  function musicSet(name){
    M.want = name;
    if (!cfg.mus || !name){ stopMusic(1.5); return; }
    if (M.cur === name || M.loading === name) return;
    const c = ac(); if (!c || c.state !== "running") return;   // spustí sa po prvom dotyku (unlock)
    const tok = ++M.tok; M.loading = name;
    load(name).then(buf => {
      if (M.loading === name) M.loading = null;
      if (tok !== M.tok || M.want !== name || !cfg.mus) return;
      const t = ctx.currentTime + 0.05, vol = MUS_VOL[name] || 1;
      fadeOut(M.src, t, 1.5); clearTimeout(M.timer);
      M.cur = name;
      if (MUS_ONCE[name]){
        const v = voice(buf, t, vol, 1.5); M.src = v;
        M.timer = setTimeout(() => { if (tok !== M.tok) return; M.done[name] = true; fadeOut(v, ctx.currentTime, 2); M.src = null; M.cur = null; }, Math.max(0, (buf.duration - 2.5) * 1000));
        return;
      }
      const loop = (start, fadeIn) => {
        if (tok !== M.tok) return;
        const v = voice(buf, start, vol, fadeIn); M.src = v;
        const next = start + buf.duration - XF;
        // ďalšie kolo naplánujeme kúsok pred prelínaním
        M.timer = setTimeout(() => { if (tok !== M.tok) return; fadeOut(v, next, XF); loop(next, XF); }, Math.max(0, (next - ctx.currentTime - 1) * 1000));
      };
      loop(t, 1.5);
    }).catch(() => { if (M.loading === name) M.loading = null; if (tok === M.tok){ M.cur = null; stopMusic(1.5); } });
  }
  function stopMusic(d){ M.tok++; M.loading = null; clearTimeout(M.timer); if (M.src && ctx) fadeOut(M.src, ctx.currentTime, d || 1); M.src = null; M.cur = null; }
  /* krátka znelka (víťazstvo/prehra): slučka sa na chvíľu stíši; bez hudby alebo bez súboru zahrá zvuk z kódu */
  function stinger(name, fallback){
    const c = cfg.mus ? ac() : null;
    if (!c || c.state !== "running"){ if (fallback) play(fallback); return; }
    load(name).then(buf => {
      const t = ctx.currentTime + 0.02, dg = mgain().gain;
      dg.cancelScheduledValues(t); dg.setTargetAtTime(0.12, t, 0.15);
      const s = ctx.createBufferSource(), g = ctx.createGain(); s.buffer = buf; g.gain.value = 1;
      s.connect(g); g.connect(M.gain); s.start(t + 0.15);
      dg.setTargetAtTime(M.duck, t + 0.15 + buf.duration, 0.8);
    }).catch(() => { if (fallback) play(fallback); });
  }
  function duck(k){ M.duck = k; if (M.duckG && ctx) M.duckG.gain.setTargetAtTime(k, ctx.currentTime, 0.4); }
  document.addEventListener("visibilitychange", () => { if (!ctx) return; if (document.hidden) ctx.suspend().catch(() => {}); else ctx.resume().catch(() => {}); });

  let last = {};
  function play(name, ...a){
    if (!cfg.on || !S[name]) return;
    const c = ac(); if (!c || c.state !== "running" && c.state !== "suspended") return;
    const now = c.currentTime;
    if (last[name] && now - last[name] < 0.05) return;   // dvojité volanie v tom istom okamihu
    last[name] = now;
    try { S[name](now + 0.01, ...a); } catch(e){}
  }
  function move(m){
    if (!m) return;
    const f = m.flags || "";
    play(m.promotion ? "promote" : (m.san || "").includes("+") || (m.san || "").includes("#") ? (f.includes("c") || f.includes("e") ? "capture" : "check") : f.includes("k") || f.includes("q") ? "castle" : f.includes("c") || f.includes("e") ? "capture" : "move");
    if ((m.san || "").includes("+") && (f.includes("c") || f.includes("e"))) setTimeout(() => play("check"), 90);
  }
  /* zvuky príbehu zo súborov assets/zvuk-<meno>.mp3 (ElevenLabs, vyrovnané na -18 LUFS); hrajú cez hlasitosť zvukov.
     Bez súboru alebo pred odomknutím zvuku zahrá náhradný zvuk z kódu (ak je zadaný). */
  const ST = {bufs:{}, bad:{}, last:{}};
  const STORY = ["brana","priepast-skok","premena","hmla","datel","sova","drak","medved","list","srdiecko"];
  function stLoad(name){
    if (ST.bufs[name]) return Promise.resolve(ST.bufs[name]);
    if (ST.bad[name] || !ctx) return Promise.reject(new Error("missing"));
    return fetch("assets/zvuk-" + name + ".mp3").then(r => { if (!r.ok) throw new Error(r.status); return r.arrayBuffer(); })
      .then(b => new Promise((res, rej) => ctx.decodeAudioData(b, res, rej)))
      .then(buf => (ST.bufs[name] = buf))
      .catch(e => { ST.bad[name] = true; throw e; });
  }
  function story(name, fallback, vol = 0.8){
    if (!cfg.on) return;
    const c = ac(); if (!c){ return; }
    const now = c.currentTime; if (ST.last[name] && now - ST.last[name] < 0.3) return; ST.last[name] = now;
    stLoad(name).then(buf => {
      const s = ctx.createBufferSource(), g = ctx.createGain(); s.buffer = buf; g.gain.value = vol;
      s.connect(g); g.connect(master); s.start(ctx.currentTime + 0.01);
    }).catch(() => { if (fallback) play(fallback); });
  }
  let stPre = false;
  const preload = () => { if (stPre || !cfg.on || !ctx) return; stPre = true; STORY.forEach((n, k) => setTimeout(() => stLoad(n).catch(() => {}), 300 + k * 150)); };
  ["pointerdown", "keydown", "touchstart"].forEach(e => window.addEventListener(e, () => setTimeout(preload, 50), {capture:true, passive:true}));

  function stars(n){ for (let i = 0; i < n; i++) setTimeout(() => { if (cfg.on && ctx) S.star(ctx.currentTime + 0.01); }, 250 + i * 330); }
  function set(o){ Object.assign(cfg, o); if (master) master.gain.value = cfg.vol; if (M.gain) M.gain.gain.value = cfg.mvol; save(); if (cfg.on || cfg.mus) ac(); if ('mus' in o) musicSet(M.want); }
  return {play, move, stars, set, cfg, story, music: musicSet, duck, has: n => !M.done[n] && (!!M.bufs[n] || !M.bad[n]), stinger, musicReset: () => { M.done = {}; }, playing: () => M.cur};
})();
