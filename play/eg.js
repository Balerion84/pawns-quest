/* ================= Tabuľky koncoviek pre „Dohraj to“ (sezóna 2, 20. 11. 2026) =================
   Retrográdna analýza priamo v prehliadači: K+V proti K, K+D proti K (cieľ mat) a K+P proti K (cieľ bezpečná premena).
   Biely je vždy silnejšia strana. Index pozície = (bk*64 + wk)*64 + x (x = veža / dáma / pešiak).
   W[idx] = biely na ťahu, B[idx] = čierny na ťahu; hodnota ≥ 0 = biely vyhrá o toľko polťahov, -1 = nie je výhra, -2 = nelegálna pozícia.
   Pri pešiakovi sa cieľ „výhra“ = premena, po ktorej je vzniknutá K+D (alebo K+V) proti K stále vyhratá. */
(function(){
  const SQI = n => (n.charCodeAt(0) - 97) + 8 * (+n[1] - 1), SQN = i => "abcdefgh"[i & 7] + ((i >> 3) + 1);
  const KN = [], KADJ = new Uint8Array(64 * 64);
  for (let s = 0; s < 64; s++){ KN[s] = [];
    for (let dx = -1; dx <= 1; dx++) for (let dy = -1; dy <= 1; dy++){ if (!dx && !dy) continue; const x = (s & 7) + dx, y = (s >> 3) + dy; if (x >= 0 && x < 8 && y >= 0 && y < 8){ KN[s].push(y * 8 + x); KADJ[s * 64 + y * 8 + x] = 1; } } }
  const DIRS = {R:[[1,0],[-1,0],[0,1],[0,-1]], Q:[[1,0],[-1,0],[0,1],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]]};
  const IDX = (wk, bk, x) => (bk * 64 + wk) * 64 + x;
  // útok jazdiacej figúry z x na cieľ t, keď prekáža len `blk` (biely kráľ)
  function slideHits(type, x, t, blk){
    for (const [dx, dy] of DIRS[type]){ let cx = (x & 7) + dx, cy = (x >> 3) + dy;
      while (cx >= 0 && cx < 8 && cy >= 0 && cy < 8){ const s = cy * 8 + cx; if (s === blk) break; if (s === t) return true; cx += dx; cy += dy; } }
    return false;
  }
  const pawnHits = (x, t) => { const y = (x >> 3) + 1, fx = x & 7; return y < 8 && (t === y * 8 + fx - 1 && fx > 0 || t === y * 8 + fx + 1 && fx < 7); };
  const hits = (type, x, t, blk) => type === "P" ? pawnHits(x, t) : slideHits(type, x, t, blk);
  function xMoves(type, wk, bk, x){
    const out = [];
    if (type === "P"){ const y = x >> 3, f = x + 8; if (f !== wk && f !== bk){ out.push(f); if (y === 1 && f + 8 !== wk && f + 8 !== bk) out.push(f + 8); } return out; }
    for (const [dx, dy] of DIRS[type]){ let cx = (x & 7) + dx, cy = (x >> 3) + dy;
      while (cx >= 0 && cx < 8 && cy >= 0 && cy < 8){ const s = cy * 8 + cx; if (s === wk || s === bk) break; out.push(s); cx += dx; cy += dy; } }
    return out;
  }
  const T = {};
  function legalBase(type, wk, bk, x){ return wk !== bk && wk !== x && bk !== x && !KADJ[wk * 64 + bk] && !(type === "P" && (x < 8 || x >= 56)); }
  // ťahy čierneho: [{to, cap}] (cap = zobral bielu figúru → remíza)
  function blackMoves(type, wk, bk, x){
    const out = [];
    for (const s of KN[bk]){ if (s === wk || KADJ[wk * 64 + s]) continue;
      if (s === x){ out.push({to:s, cap:true}); continue; }
      if (hits(type, x, s, wk)) continue; out.push({to:s, cap:false}); }
    return out;
  }
  // po premene (čierny na ťahu): K+D / K+V proti K je vyhratá vždy, keď čierny figúru nezoberie a nemá pat
  function promoWin(t, wk, bk, x){ const mv = blackMoves(t, wk, bk, x); if (mv.some(m => m.cap)) return false; return mv.length > 0 || hits(t, x, bk, wk); }
  function build(type){
    if (T[type]) return T[type];
    const N = 64 * 64 * 64, W = new Int16Array(N).fill(-2), B = new Int16Array(N).fill(-2);
    const wl = [], bl = [];
    for (let bk = 0; bk < 64; bk++) for (let wk = 0; wk < 64; wk++) for (let x = 0; x < 64; x++){
      if (!legalBase(type, wk, bk, x)) continue; const i = IDX(wk, bk, x);
      B[i] = -1; bl.push(i);
      if (!hits(type, x, bk, wk)){ W[i] = -1; wl.push(i); }
    }
    // čierny bez ťahu: mat (cieľ pri V/D) alebo pat (remíza = ostáva -1, ale už sa nemení)
    const fixed = new Uint8Array(N);
    for (const i of bl){ const x = i & 63, wk = (i >> 6) & 63, bk = i >> 12;
      const mv = blackMoves(type, wk, bk, x);
      if (!mv.length){ fixed[i] = 1; if (type !== "P" && hits(type, x, bk, wk)) B[i] = 0; }
      else if (mv.some(m => m.cap)) fixed[i] = 1;   // môže zobrať figúru → remíza
    }
    // pri pešiakovi: premena hneď víťazí (polťah 1)
    let wOpen = wl, bOpen = bl.filter(i => !fixed[i]), empty = false;
    for (let d = 1; d < 200; d++){
      let ch = 0;
      if (d & 1){ const rest = [];
        for (const i of wOpen){ const x = i & 63, wk = (i >> 6) & 63, bk = i >> 12; let ok = false;
          if (type === "P" && x >= 48 && d === 1){ const t = x + 8;
            if (t !== wk && t !== bk && (promoWin("Q", wk, bk, t) || promoWin("R", wk, bk, t))) ok = true; }
          if (!ok) for (const s of KN[wk]){ if (s === x || s === bk || KADJ[s * 64 + bk]) continue; if (B[IDX(s, bk, x)] === d - 1){ ok = true; break; } }
          if (!ok) for (const t of xMoves(type, wk, bk, x)){ if (type === "P" && t >= 56) continue; if (B[IDX(wk, bk, t)] === d - 1){ ok = true; break; } }
          if (ok){ W[i] = d; ch++; } else rest.push(i); }
        wOpen = rest;
      } else { const rest = [];
        for (const i of bOpen){ const x = i & 63, wk = (i >> 6) & 63, bk = i >> 12; let all = true, hit = false;
          for (const m of blackMoves(type, wk, bk, x)){ const v = W[IDX(wk, m.to, x)]; if (v < 0){ all = false; break; } if (v === d - 1) hit = true; }
          if (all && hit){ B[i] = d; ch++; } else rest.push(i); }
        bOpen = rest;
      }
      if (!ch && d > 2){ if (empty) break; empty = true; } else empty = false;
    }
    return T[type] = {type, W, B, idx:IDX,
      safePromo:(wk, bk, x) => { const t = x + 8; return promoWin("Q", wk, bk, t) ? "q" : promoWin("R", wk, bk, t) ? "r" : null; }};
  }
  // pozícia z FEN (len K+X proti K); vráti {type, wk, bk, x, turn} alebo null
  function fromFen(fen){
    const [rows, turn] = fen.split(" "); let wk = -1, bk = -1, x = -1, type = null, n = 0, y = 7, f = 0;
    for (const ch of rows){ if (ch === "/"){ y--; f = 0; continue; } if (/\d/.test(ch)){ f += +ch; continue; }
      const s = y * 8 + f; f++; n++;
      if (ch === "K") wk = s; else if (ch === "k") bk = s; else if ("RQP".includes(ch)){ x = s; type = ch; } else return null; }
    if (n !== 3 || wk < 0 || bk < 0 || x < 0) return null;
    return {type, wk, bk, x, turn};
  }
  // hodnota pozície pre bieleho (polťahy k cieľu, -1 = nie je výhra)
  function value(fen){ const P = fromFen(fen); if (!P) return -1; const t = build(P.type), i = IDX(P.wk, P.bk, P.x); return (P.turn === "w" ? t.W : t.B)[i]; }
  // najlepší ťah bieleho (uci)
  function whiteBest(fen){
    const P = fromFen(fen); if (!P || P.turn !== "w") return null; const t = build(P.type); let best = null, bv = 1e9;
    if (P.type === "P" && P.x >= 48){ const pr = t.safePromo(P.wk, P.bk, P.x); if (pr && P.x + 8 !== P.wk && P.x + 8 !== P.bk) return SQN(P.x) + SQN(P.x + 8) + pr; }
    for (const s of KN[P.wk]){ if (s === P.x || s === P.bk || KADJ[s * 64 + P.bk]) continue; const v = t.B[IDX(s, P.bk, P.x)]; if (v >= 0 && v < bv){ bv = v; best = SQN(P.wk) + SQN(s); } }
    for (const s of xMoves(P.type, P.wk, P.bk, P.x)){ if (P.type === "P" && s >= 56) continue; const v = t.B[IDX(P.wk, P.bk, s)]; if (v >= 0 && v < bv){ bv = v; best = SQN(P.x) + SQN(s); } }
    return best;
  }
  // odpoveď čierneho: zober figúru, ak sa dá; inak remízový ťah; inak najdlhší odpor (pri rovnosti náhodne)
  function blackReply(fen){
    const P = fromFen(fen); if (!P || P.turn !== "b") return null; const t = build(P.type);
    const mv = blackMoves(P.type, P.wk, P.bk, P.x); if (!mv.length) return null;
    const cap = mv.find(m => m.cap); if (cap) return SQN(P.bk) + SQN(cap.to);
    let best = [], bv = -2;
    for (const m of mv){ let v = t.W[IDX(P.wk, m.to, P.x)]; if (v < 0) v = 999; if (v > bv){ bv = v; best = [m]; } else if (v === bv) best.push(m); }
    const m = best[Math.floor(Math.random() * best.length)]; return SQN(P.bk) + SQN(m.to);
  }
  window.EG = {build, value, whiteBest, blackReply, fromFen, SQI, SQN};
})();
