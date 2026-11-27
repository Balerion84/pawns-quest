/* Verejné štúdie populárnych otvorení pre Pawn's Quest / Šachové dobrodružstvo.
 * Načíta sa výlučne vo verejnom builde (--public); Filipkovu súkromnú verziu nemení.
 * Všetky línie sú klasická verejná šachová teória overená v chess.js. */
(function(){
"use strict";

function buildPack(def){
  const sk = {}, en = {}, fullEn = {}, meta = {};
  for (const [id, o] of Object.entries(def)){
    sk[id] = {
      name: o.nameSk,
      side: o.side,
      open: id,
      noBadge: !o.keepBadge,
      intro: o.introSk,
      chapters: o.chapters.map(ch => ({
        id: ch.id,
        title: ch.titleSk,
        pre: ch.pre || "",
        intro: ch.introSk,
        moves: ch.moves.map(mv => {
          const r = { m: mv.m };
          if (mv.qSk) r.q = mv.qSk;
          if (mv.cSk) r.c = mv.cSk;
          if (mv.a) r.a = mv.a;
          return r;
        }),
        end: ch.endSk
      }))
    };
    fullEn[id] = {
      name: o.nameEn,
      side: o.side,
      open: id,
      noBadge: !o.keepBadge,
      intro: o.introEn,
      chapters: o.chapters.map(ch => ({
        id: ch.id,
        title: ch.titleEn,
        pre: ch.pre || "",
        intro: ch.introEn,
        moves: ch.moves.map(mv => {
          const r = { m: mv.m };
          if (mv.qEn) r.q = mv.qEn;
          if (mv.cEn) r.c = mv.cEn;
          if (mv.a) r.a = mv.a;
          return r;
        }),
        end: ch.endEn
      }))
    };
    en[id] = {
      name: o.nameEn,
      intro: o.introEn,
      chapters: Object.fromEntries(o.chapters.map(ch => [ch.id, {
        title: ch.titleEn,
        intro: ch.introEn,
        end: ch.endEn,
        moves: ch.moves.map(mv => {
          const r = {};
          if (mv.qEn) r.q = mv.qEn;
          if (mv.cEn) r.c = mv.cEn;
          return r;
        })
      }]))
    };
    meta[id] = { name: o.nameSk, nameEn: o.nameEn, side: o.side, lines: o.lines };
  }
  return { sk, en, fullEn, meta };
}

const RAW = {
  italian: {
    nameSk: "Talianska hra",
    nameEn: "Italian Game",
    side: "w",
    keepBadge: true,
    introSk: "Jedno z najobľúbenejších otvorení za bieleho po 1.e4 e5. Rýchlo vyvinieš jazdca na f3, strelca na c4 (mieri na slabé pole f7), bezpečne urobíš rošádu a bojuješ o stred.",
    introEn: "One of the most popular openings for White after 1.e4 e5. Develop quickly with Nf3 and Bc4 targeting the weak f7 square, castle safely, and fight for the center.",
    lines: [
      [5, "e4 e5 Nf3 Nc6 Bc4 Bc5 c3 Nf6 d3 d6 O-O a6 a4 Ba7 Re1 O-O h3"],
      [4, "e4 e5 Nf3 Nc6 Bc4 Bc5 c3 Nf6 d4 exd4 cxd4 Bb4+ Bd2 Bxd2+ Nbxd2"],
      [4, "e4 e5 Nf3 Nc6 Bc4 Nf6 d3 Bc5 c3 d6 O-O a6 Bb3"],
      [3, "e4 e5 Nf3 Nc6 Bc4 Bc5 O-O Nf6 d3 d6 c3 O-O"]
    ],
    chapters: [
      {
        id: "rules",
        titleSk: "Tichý Talian (Giuoco Pianissimo)",
        titleEn: "Quiet Italian (Giuoco Pianissimo)",
        introSk: "Najhranejšia talianska zostava: ovládni stred, vyviň jazdca a strelca na c4, postav pevnú pešiakovú reťaz c3–d3–e4 a schovaj kráľa rošádou.",
        introEn: "The most popular Italian setup: claim the center, bring out Nf3 and Bc4, build a sturdy c3–d3–e4 pawn chain, and castle to safety.",
        moves: [
          { m: "e4", qSk: "Obsaď stred kráľovským pešiakom.", qEn: "Claim the center with your e-pawn.", cSk: "1.e4! Otvára cestu strelcovi f1 aj dáme.", cEn: "1.e4! Opens diagonals for both the f1 bishop and the queen." },
          { m: "e5", cSk: "1…e5. Čierny odpovedá rovnako.", cEn: "1…e5. Black answers in the center too." },
          { m: "Nf3", qSk: "Vyviň jazdca s útokom na pešiaka e5.", qEn: "Develop your knight while attacking the e5 pawn.", cSk: "2.Jf3! Vývin s hrozbou – najlepší spôsob, ako zapojiť figúrku.", cEn: "2.Nf3! Developing with an attack is the best way to bring out pieces.", a: [["f3","e5","chart"]] },
          { m: "Nc6", cSk: "2…Jc6. Čierny bráni pešiaka e5.", cEn: "2…Nc6. Black defends the e5 pawn." },
          { m: "Bc4", qSk: "Postav strelca na pole, odkiaľ mieri na najslabšie pole čierneho f7.", qEn: "Place your bishop where it aims straight at Black's weakest square, f7.", cSk: "3.Sc4! Talianska hra. Pole f7 bráni iba čierny kráľ.", cEn: "3.Bc4! The Italian Game. Only Black's king guards f7.", a: [["c4","f7","chart"]] },
          { m: "Bc5", cSk: "3…Sc5. Čierny vyvíja svojho strelca oproti.", cEn: "3…Bc5. Black develops the bishop symmetrically." },
          { m: "c3", qSk: "Podopri stred a priprav si pole pre budúci postup d4!", qEn: "Support the center and prepare a future d4 push!", cSk: "4.c3! Stráži polia b4 a d4 a zároveň dáva strelcovi c4 únikové pole c2.", cEn: "4.c3! Guards b4 and d4 while giving your c4 bishop an escape square on c2." },
          { m: "Nf6", cSk: "4…Jf6. Čierny vyvíja jazdca a útočí na e4.", cEn: "4…Nf6. Black develops a knight and attacks e4." },
          { m: "d3", qSk: "Bráň pešiaka e4 pokojne pešiakom d3.", qEn: "Defend the e4 pawn calmly with d3.", cSk: "5.d3! Pevná reťaz c3–d3–e4. Nič ti nehrozí a čoskoro urobíš rošádu.", cEn: "5.d3! A rock-solid c3–d3–e4 chain. Everything is protected." },
          { m: "d6", cSk: "5…d6. Čierny spevňuje svoj stred.", cEn: "5…d6. Black reinforces the center too." },
          { m: "O-O", qSk: "Schovaj kráľa do bezpečia!", qEn: "Tuck your king away safely!", cSk: "6.O-O! Stred, vývin aj rošáda sú splnené – ideálny štart partie.", cEn: "6.O-O! Center, development, and castling are all done – a textbook start." }
        ],
        endSk: "V Tichom Talianovi máš pevný stred, bezpečného kráľa a skvelého strelca na c4 pripraveného na ďalší plán.",
        endEn: "In the Quiet Italian you have a sturdy center, a safe king, and an active c4 bishop ready for the middlegame."
      },
      {
        id: "home",
        titleSk: "Úkryt pre strelca a cesta jazdca",
        titleEn: "A Safe Home for the Bishop",
        pre: "e4 e5 Nf3 Nc6 Bc4 Bc5 c3 Nf6 d3 d6 O-O",
        introSk: "Strelec c4 je tvoj klenot. Čierny ho často skúša odohnať ťahom …a6 a …b5 alebo vymeniť cez …Ja5. Pozri, ako si ho uchrániš a zapojíš posledné figúrky.",
        introEn: "Your c4 bishop is a star piece. Black often tries to chase it with …a6 and …b5 or trade it with …Na5. See how to keep it safe and finish development.",
        moves: [
          { m: "a6", cSk: "6…a6. Čierny chystá úkryt pre svojho strelca na a7 a možno aj …b5.", cEn: "6…a6. Black makes room on a7 and hints at …b5." },
          { m: "a4", qSk: "Zastav …b5 a zároveň uvoľni pre svojho strelca úkryt na a2!", qEn: "Stop …b5 and create a cozy retreat square on a2 for your bishop!", cSk: "7.a4! Teraz už čierny nemôže hrať …b5 a tvoj strelec má pripravené pole a2.", cEn: "7.a4! Stops …b5 and clears a2 so your bishop can never be trapped.", a: [["c4","a2","chart"]] },
          { m: "Ba7", cSk: "7…Sa7. Čierny schováva svojho strelca vopred.", cEn: "7…Ba7. Black tucks the bishop away too." },
          { m: "Re1", qSk: "Postav vežu na e-stĺpec za pešiaka e4 a uvoľni pole f1.", qEn: "Put your rook on the e-file behind e4 and free up the f1 square.", cSk: "8.Ve1! Veža kryje e4 a uvoľňuje pole f1 pre presun jazdca b1–d2–f1–g3.", cEn: "8.Re1! Defends e4 and clears f1 for the classic Nb1–d2–f1–g3 maneuver." },
          { m: "O-O", cSk: "8…O-O. Čierny urobil rošádu.", cEn: "8…O-O. Black castles." },
          { m: "h3", qSk: "Zober čiernemu strelcovi pole g4 a urob kráľovi okienko.", qEn: "Take away the g4 square from Black's bishop and give your king air.", cSk: "9.h3! Zabraňuje nepríjemnej väzbe …Sg4 na tvojho jazdca f3.", cEn: "9.h3! Prevents the annoying …Bg4 pin on your f3 knight." },
          { m: "h6", cSk: "9…h6. Čierny robí to isté proti tvojmu strelcovi.", cEn: "9…h6. Black stops Bg5 in return." },
          { m: "Nbd2", qSk: "Vyviň posledného jazdca – odtiaľ môže putovať cez f1 na g3!", qEn: "Develop your last knight – from here it can route via f1 to g3!", cSk: "10.Jbd2! Všetky figúrky sú pripravené a biely má harmonickú pozíciu.", cEn: "10.Nbd2! Every piece is coordinated and White has a super harmonious setup." }
        ],
        endSk: "Ťahy a4, Ve1, h3 a Jbd2 sú stavebnými kameňmi moderného Talianskeho otvorenia.",
        endEn: "a4, Re1, h3, and Nbd2 are the classic building blocks of the modern Italian Game."
      },
      {
        id: "center",
        titleSk: "Ostrý stred: Giuoco Piano s 5.d4!",
        titleEn: "Strikes in the Center: 5.d4!",
        pre: "e4 e5 Nf3 Nc6 Bc4 Bc5",
        introSk: "Nechceš hrať pomaly? Po 4.c3 Jf6 môžeš hneď udrieť v strede ťahom 5.d4! Otvoríš línie pre strelcov a získaš silný stred.",
        introEn: "Want a sharper fight? After 4.c3 Nf6, strike in the center immediately with 5.d4! You open lines for your pieces and build a big center.",
        moves: [
          { m: "c3", qSk: "Priprav úder v strede pešiakom c3.", qEn: "Prepare your central strike with c3.", cSk: "4.c3! Podopiera chystaný postup d4.", cEn: "4.c3! Supports the upcoming d4 push." },
          { m: "Nf6", cSk: "4…Jf6. Čierny útočí na e4.", cEn: "4…Nf6. Black attacks e4." },
          { m: "d4", qSk: "Udri rovno do stredu a napadní čierneho strelca!", qEn: "Strike right in the center and attack Black's bishop!", cSk: "5.d4! Najostrejšia klasická línia – útočí na e5 aj c5 naraz.", cEn: "5.d4! The classic sharp line – attacking both e5 and c5 at once.", a: [["d4","c5","chart"]] },
          { m: "exd4", cSk: "5…exd4. Čierny berie v strede.", cEn: "5…exd4. Black captures in the center." },
          { m: "cxd4", qSk: "Vezmi späť pešiakom a vybuduj silnú dvojicu pešiakov e4 + d4!", qEn: "Recapture with the pawn to build a powerful e4 + d4 center!", cSk: "6.cxd4! Krásny stred a opäť útočíš na strelca c5.", cEn: "6.cxd4! A gorgeous pawn center, attacking the c5 bishop again." },
          { m: "Bb4+", cSk: "6…Sb4+. Čierny dáva šach, aby získal čas.", cEn: "6…Bb4+. Black throws in a check to gain time." },
          { m: "Bd2", qSk: "Zakry šach strelcom a ponúkni výmenu!", qEn: "Block the check with your bishop and offer a trade!", cSk: "7.Sd2! Jednoduchá a spoľahlivá odpoveď, ktorá drží pešiaka e4 v bezpečí.", cEn: "7.Bd2! Clean and solid, keeping the e4 pawn well protected." },
          { m: "Bxd2+", cSk: "7…Sxd2+. Čierny mení strelcov.", cEn: "7…Bxd2+. Black trades bishops." },
          { m: "Nbxd2", qSk: "Vezmi strelca jazdcom, aby si ho zároveň vyvinul!", qEn: "Recapture with the knight to develop it at the same time!", cSk: "8.Jbxd2! Biely má silný stred, rýchly vývin a hrozí postúpiť d5 alebo e5.", cEn: "8.Nbxd2! White has a big center, fast development, and is ready to castle." }
        ],
        endSk: "Po 4.c3 a 5.d4 získaš veľký stred a živú, otvorenú partiu plnú taktiky!",
        endEn: "With 4.c3 and 5.d4 you grab a big center and a lively, open game full of tactics!"
      },
      {
        id: "twoknights",
        titleSk: "Proti 3…Jf6 (Obrana dvoch jazdcov)",
        titleEn: "Meeting 3…Nf6 (Two Knights)",
        pre: "e4 e5 Nf3 Nc6 Bc4 Nf6",
        introSk: "Čierny nezahral 3…Sc5, ale hneď napadol tvojho pešiaka e4 jazdcom 3…Jf6! Nemusíš sa vrhať do divokých pascí – pokojné 4.d3 ti dá istú a silnú pozíciu.",
        introEn: "Instead of 3…Bc5, Black immediately attacks your e4 pawn with 3…Nf6! No need for risky gambits – a calm 4.d3 gives you a rock-solid game.",
        moves: [
          { m: "d3", qSk: "Bráň pešiaka e4 pokojne pešiakom a otvor cestu strelcovi c1.", qEn: "Defend e4 calmly and open the diagonal for your c1 bishop.", cSk: "4.d3! Pevná a spoľahlivá voľba – pešiak e4 je bezpečne krytý.", cEn: "4.d3! Solid and reliable – the e4 pawn is completely safe." },
          { m: "Bc5", cSk: "4…Sc5. Čierny teraz vyvíja strelca na c5.", cEn: "4…Bc5. Black now brings the bishop out to c5." },
          { m: "c3", qSk: "Postav známe c3, ktoré stráži d4 a b4.", qEn: "Play the familiar c3 to control d4 and b4.", cSk: "5.c3! Prešli sme priamo do našej obľúbenej talianskej štruktúry.", cEn: "5.c3! We've transposed right into our favorite Italian setup." },
          { m: "d6", cSk: "5…d6. Čierny otvára cestu strelcovi c8.", cEn: "5…d6. Black opens the diagonal for the c8 bishop." },
          { m: "O-O", qSk: "Urob rošádu!", qEn: "Castle kingside!", cSk: "6.O-O! Kráľ v bezpečí, veža pripravená na e1.", cEn: "6.O-O! King is safe and the rook is ready for e1." },
          { m: "a6", cSk: "6…a6. Čierny pripravuje úkryt pre strelca.", cEn: "6…a6. Black prepares a retreat on a7." },
          { m: "Bb3", qSk: "Ustúp strelcom vopred na b3, nech naň pešiak b5 nikdy nedosiahne!", qEn: "Tuck your bishop back to b3 early so …b5 can never bother it!", cSk: "7.Sb3! Strelec stále mieri na f7 a biely má výbornú, bezstarostnú hru.", cEn: "7.Bb3! Still aiming at f7, with an easy and comfortable game for White." }
        ],
        endSk: "Proti 3…Jf6 stačí pokojné 4.d3 a prejdeš presne do talianskych pozícií, ktoré už poznáš!",
        endEn: "Against 3…Nf6, a calm 4.d3 steers the game straight into the Italian positions you already know!"
      }
    ]
  },
  scandinavian: {
    nameSk: "Škandinávska obrana",
    nameEn: "Scandinavian Defense",
    side: "b",
    keepBadge: true,
    introSk: "Priamočiara obrana za čierneho proti 1.e4: hneď v prvom ťahu napadneš stred ťahom 1…d5! Naučíš sa klasickú líniu s 3…Da5, modernú 3…Dd6 aj 2…Jf6.",
    introEn: "A direct, fighting defense for Black against 1.e4: challenge the center on move 1 with 1…d5! Learn the classic 3…Qa5, the modern 3…Qd6, and 2…Nf6.",
    lines: [
      [5, "e4 d5 exd5 Qxd5 Nc3 Qa5 d4 Nf6 Nf3 c6 Bc4 Bf5 O-O e6"],
      [4, "e4 d5 exd5 Qxd5 Nc3 Qd6 d4 Nf6 Nf3 a6 Be2 Nc6 O-O Bf5"],
      [4, "e4 d5 exd5 Nf6 d4 Nxd5 Nf3 Bg4 Be2 e6 O-O Be7"],
      [3, "e4 d5 e5 c5 Nf3 Nc6 c3 Bg4 Be2 e6"]
    ],
    chapters: [
      {
        id: "qa5",
        titleSk: "Klasická línia s 3…Da5",
        titleEn: "The Classic 3…Qa5 Setup",
        introSk: "Najhranejšia línia Škandinávskej obrany: dáma síce vyjde skoro, ale na a5 má bezpečné pole a po …c6 a …Sf5 postavíš pevnú pevnosť.",
        introEn: "The most played Scandinavian line: your queen comes out early, finds a safe perch on a5, and …c6 + …Bf5 build a rock-solid fortress.",
        moves: [
          { m: "e4", cSk: "1.e4. Biely obsadzuje stred.", cEn: "1.e4. White claims the center." },
          { m: "d5", qSk: "Udri hneď na pešiaka e4!", qEn: "Challenge the e4 pawn right on move 1!", cSk: "1…d5! Škandinávska obrana – okamžite kladieš bielemu otázku v strede.", cEn: "1…d5! The Scandinavian Defense – challenging White's center immediately.", a: [["d5","e4","chart"]] },
          { m: "exd5", cSk: "2.exd5. Biely berie.", cEn: "2.exd5. White captures." },
          { m: "Qxd5", qSk: "Zober pešiaka späť dámou.", qEn: "Recapture the pawn with your queen.", cSk: "2…Dxd5! Dáma je v strede a tvoj svetlopoľný strelec má voľnú cestu von.", cEn: "2…Qxd5! Your light-squared bishop now has an open diagonal." },
          { m: "Nc3", cSk: "3.Jc3. Biely napáda tvoju dámu s vývinom.", cEn: "3.Nc3. White develops and attacks your queen." },
          { m: "Qa5", qSk: "Ustúp dámou na bezpečné pole na dámskom krídle, odkiaľ viaže jazdca c3!", qEn: "Retreat your queen to a safe square on the queenside eyeing c3!", cSk: "3…Da5! Klasické pole – dáma má pokoj a pozerá na bieleho jazdca.", cEn: "3…Qa5! The classic square – safe and keeping an eye on c3." },
          { m: "d4", cSk: "4.d4. Biely obsadzuje stred.", cEn: "4.d4. White takes central space." },
          { m: "Nf6", qSk: "Vyviň kráľovského jazdca na f6.", qEn: "Develop your kingside knight to f6.", cSk: "4…Jf6! Kontroluje stredové polia d5 a e4.", cEn: "4…Nf6! Controls the key central d5 and e4 squares." },
          { m: "Nf3", cSk: "5.Jf3. Biely vyvíja jazdca.", cEn: "5.Nf3. White develops a knight." },
          { m: "c6", qSk: "Otvor dáme únikovú chodbičku na c7/d8 a stráž pole b5!", qEn: "Give your queen a retreat path to c7/d8 and guard the b5 square!", cSk: "5…c6! Kľúčový ťah – stráži b5 aj d5 a dáma sa kedykoľvek vráti domov.", cEn: "5…c6! Essential move – guards b5 and d5 and keeps a safe path home for the queen." },
          { m: "Bc4", cSk: "6.Sc4. Biely vyvíja strelca.", cEn: "6.Bc4. White develops the bishop." },
          { m: "Bf5", qSk: "Vyveď strelca c8 von EŠTE PRED ťahom …e6!", qEn: "Bring your c8 bishop outside the pawn chain BEFORE playing …e6!", cSk: "6…Sf5! Aktívny strelec mimo pešiakovej reťaze – teraz už môžeš hrať …e6.", cEn: "6…Bf5! Active outside the pawn chain – now …e6 won't trap it.", a: [["f5","c2","chart"]] },
          { m: "O-O", cSk: "7.O-O. Biely urobil rošádu.", cEn: "7.O-O. White castles." },
          { m: "e6", qSk: "Spevni stred a otvor cestu druhému strelcovi!", qEn: "Solidify the center and open the diagonal for your f8 bishop!", cSk: "7…e6! Pevná štruktúra c6–e6, aktívny strelec f5 a čoskoro rošáda.", cEn: "7…e6! A rock-solid c6–e6 structure, active f5 bishop, and castling next." }
        ],
        endSk: "Zostava Da5 + c6 + Sf5 + e6 + Jf6 je spoľahlivá a ľahko zapamätateľná obrana proti 1.e4.",
        endEn: "Qa5 + c6 + Bf5 + e6 + Nf6 is a super reliable, easy-to-remember defense against 1.e4."
      },
      {
        id: "qd6",
        titleSk: "Moderný ústup 3…Dd6",
        titleEn: "The Modern 3…Qd6 Retreat",
        pre: "e4 d5 exd5 Qxd5 Nc3",
        introSk: "Dnes je veľmi obľúbený aj ústup 3…Dd6! Dáma ostáva blízko stredu, pripravíš …a6, rýchlo vyvinieš oba jazdce aj strelca a často urobíš veľkú rošádu.",
        introEn: "Another super popular modern choice is 3…Qd6! Your queen stays near the center, …a6 stops Nb5, and you develop super fast toward castling.",
        moves: [
          { m: "Qd6", qSk: "Ustúp dámou na d6, blízko stredu aj kráľovského krídla.", qEn: "Retreat your queen to d6, staying close to the center.", cSk: "3…Dd6! Moderná Škandinávska – dáma pomáha kontrolovať e5 a nezavadzia pešiakovi c7.", cEn: "3…Qd6! The modern Scandinavian – supports …e5 ideas and stays flexible." },
          { m: "d4", cSk: "4.d4. Biely stavia stred.", cEn: "4.d4. White takes the center." },
          { m: "Nf6", qSk: "Vyviň kráľovského jazdca na f6.", qEn: "Develop your kingside knight to f6.", cSk: "4…Jf6! Rýchly vývin.", cEn: "4…Nf6! Fast development." },
          { m: "Nf3", cSk: "5.Jf3. Biely vyvíja jazdca.", cEn: "5.Nf3. White develops." },
          { m: "a6", qSk: "Zober bielemu jazdcovi pole b5, aby nemohol naháňať tvoju dámu!", qEn: "Take away the b5 square so White's knight can't harass your queen!", cSk: "5…a6! Dôležitá prevencia proti Jb5 a zároveň pripravuje miesto na dámskom krídle.", cEn: "5…a6! Prevents Nb5 attacking your queen and keeps your setup tidy." },
          { m: "Be2", cSk: "6.Se2. Biely pripravuje rošádu.", cEn: "6.Be2. White prepares to castle." },
          { m: "Nc6", qSk: "Vyviň druhého jazdca na c6 – tlačí na d4!", qEn: "Develop your other knight to c6 – pressuring d4!", cSk: "6…Jc6! Keďže si nehral …c6, jazdec má svoje najlepšie pole c6 voľné.", cEn: "6…Nc6! Because you didn't play …c6, your knight gets its best square!" },
          { m: "O-O", cSk: "7.O-O. Biely urobil rošádu.", cEn: "7.O-O. White castles." },
          { m: "Bf5", qSk: "Vyviň svetlopoľného strelca von na f5 a priprav veľkú rošádu!", qEn: "Develop your light-squared bishop to f5 and prepare …O-O-O!", cSk: "7…Sf5! Aktívna hra – čierny je pripravený na …O-O-O a rýchlu protihru.", cEn: "7…Bf5! Active pieces – Black is ready for …O-O-O and lively counterplay." }
        ],
        endSk: "S 3…Dd6 máš rýchly vývin, voľné pole c6 pre jazdca a aktívnu hru po oboch krídlach!",
        endEn: "With 3…Qd6 you get rapid development, c6 free for your knight, and lively play!"
      },
      {
        id: "nf6",
        titleSk: "Moderná Škandinávska (2…Jf6)",
        titleEn: "Modern Scandinavian (2…Nf6)",
        pre: "e4 d5 exd5",
        introSk: "Nechceš vyťahovať dámu v druhom ťahu? Zahraj 2…Jf6! Pešiaka d5 si zoberieš späť jazdcom, vyvinieš strelca na g4 a bezpečne urobíš rošádu.",
        introEn: "Don't want to bring your queen out on move 2? Play 2…Nf6! Recapture on d5 with the knight, bring out your bishop to g4, and castle cleanly.",
        moves: [
          { m: "Nf6", qSk: "Namiesto dámy vyviň jazdca a priprav si spätné branie na d5!", qEn: "Develop your knight instead of the queen to recapture on d5!", cSk: "2…Jf6! Biely teraz nemôže získať tempo útokom na tvoju dámu.", cEn: "2…Nf6! White doesn't get a free tempo attacking your queen." },
          { m: "d4", cSk: "3.d4. Biely obsadzuje stred a vracia pešiaka za rýchly vývin.", cEn: "3.d4. White claims the center instead of clinging to the pawn." },
          { m: "Nxd5", qSk: "Zober pešiaka na d5 späť jazdcom!", qEn: "Recapture the d5 pawn with your knight!", cSk: "3…Jxd5! Jazdec stojí krásne v strede.", cEn: "3…Nxd5! Your knight sits proudly in the center." },
          { m: "Nf3", cSk: "4.Jf3. Biely vyvíja jazdca.", cEn: "4.Nf3. White develops a knight." },
          { m: "Bg4", qSk: "Vyviň strelca c8 von s väzbou na bieleho jazdca!", qEn: "Develop your c8 bishop outside the chain and pin White's knight!", cSk: "4…Sg4! Skvelý aktívny ťah – strelec je vonku ešte pred …e6.", cEn: "4…Bg4! Great active move – the bishop is outside before …e6.", a: [["g4","d1","chart"]] },
          { m: "Be2", cSk: "5.Se2. Biely ruší väzbu.", cEn: "5.Be2. White breaks the pin." },
          { m: "e6", qSk: "Otvor cestu strelcovi f8 a spevni pozíciu.", qEn: "Open the diagonal for your f8 bishop and fortify the center.", cSk: "5…e6! Všetko je pevné a harmonické.", cEn: "5…e6! Solid and harmonious." },
          { m: "O-O", cSk: "6.O-O. Biely urobil rošádu.", cEn: "6.O-O. White castles." },
          { m: "Be7", qSk: "Vyviň druhého strelca a priprav rošádu!", qEn: "Develop your other bishop and get ready to castle!", cSk: "6…Se7! Čierny má pokojnú, zdravú hru bez jediného zbytočného ťahu dámou.", cEn: "6…Be7! A clean, healthy position without moving your queen early." }
        ],
        endSk: "2…Jf6 je skvelá voľba, ak máš rád rýchly vývin ľahkých figúr bez skorého výletu dámou.",
        endEn: "2…Nf6 is a great choice if you love smooth piece development without moving the queen early."
      },
      {
        id: "push",
        titleSk: "Keď biely neberie (2.e5)",
        titleEn: "When White Pushes 2.e5",
        pre: "e4 d5",
        introSk: "Niekedy biely nevezme na d5, ale postúpi 2.e5. To je pre teba super správa – okamžite udri …c5 a vyveď strelca von na f5 alebo g4!",
        introEn: "Sometimes White avoids capturing and pushes 2.e5. Great news for you – immediately strike with …c5 and bring your c8 bishop outside the pawn chain!",
        moves: [
          { m: "e5", cSk: "2.e5. Biely sa vyhol výmene a získal priestor.", cEn: "2.e5. White avoids the trade and pushes forward." },
          { m: "c5", qSk: "Hneď zaútoč na biely stred pešiakom c5!", qEn: "Immediately fight for the center with …c5!", cSk: "2…c5! Zaberáš dôležité pole d4 a pripravuješ …Jc6.", cEn: "2…c5! Claims central space and prepares …Nc6." },
          { m: "Nf3", cSk: "3.Jf3. Biely vyvíja jazdca.", cEn: "3.Nf3. White develops." },
          { m: "Nc6", qSk: "Vyviň jazdca na c6 s tlakom na e5 a d4!", qEn: "Develop your knight to c6, pressuring e5 and d4!", cSk: "3…Jc6! Aktívny vývin.", cEn: "3…Nc6! Active development." },
          { m: "c3", cSk: "4.c3. Biely pripravuje d4.", cEn: "4.c3. White prepares d4." },
          { m: "Bg4", qSk: "Vyveď svetlopoľného strelca von s väzbou na jazdca f3 EŠTE PRED …e6!", qEn: "Bring your c8 bishop out to pin the f3 knight BEFORE …e6!", cSk: "4…Sg4! Máš vylepšenú Francúzsku obranu, pretože tvoj strelec c8 ostal aktívne vonku!", cEn: "4…Bg4! You got a dream French Defense with your c8 bishop active outside the pawn chain!", a: [["g4","d1","chart"]] },
          { m: "Be2", cSk: "5.Se2. Biely ruší väzbu.", cEn: "5.Be2. White unpins." },
          { m: "e6", qSk: "Teraz zavri reťaz pešiakom e6 a uvoľni druhého strelca!", qEn: "Now play …e6 to solidify your center and free your f8 bishop!", cSk: "5…e6! Čierny stojí výborne a čoskoro dokončí vývin.", cEn: "5…e6! Black has a fantastic, rock-solid position." }
        ],
        endSk: "Proti 2.e5 hraj rýchle …c5, …Jc6 a …Sg4 (alebo …Sf5) ešte pred …e6 – dostaneš výbornú hru!",
        endEn: "Against 2.e5, play …c5, …Nc6, and …Bg4 (or …Bf5) before …e6 for a super comfortable game!"
      }
    ]
  },
  london: {
    nameSk: "Londýnsky systém",
    nameEn: "London System",
    side: "w",
    introSk: "Pevné a veľmi obľúbené otvorenie za bieleho. Postavíš pevnú pešiakovú pyramídu (d4, e3, c3), vyvinieš strelca na f4 a bezpečne urobíš rošádu.",
    introEn: "A rock-solid, super popular opening for White. Build a sturdy pawn pyramid (d4, e3, c3), put your dark-squared bishop on f4, and castle safely.",
    lines: [
      [5, "d4 d5 Bf4 Nf6 e3 e6 Nf3 c5 c3 Nc6 Nbd2 Bd6 Bg3 O-O Bd3"],
      [4, "d4 Nf6 Bf4 d5 e3 e6 Nf3 c5 c3 Nc6 Nbd2 Bd6 Bg3 O-O Bd3"],
      [3, "d4 d5 Bf4 Bf5 e3 e6 Nf3 Nf6 c4 c6 Nc3 Bd6 Bg3"],
      [3, "d4 d5 Bf4 c5 e3 Nc6 c3 Nf6 Nd2 Bf5 Ngf3 e6"],
      [2, "d4 Nf6 Bf4 g6 e3 Bg7 Nf3 O-O h3 d6 Be2 c5 c3"]
    ],
    chapters: [
      {
        id: "pyramid",
        titleSk: "Pyramída a strelec na f4",
        titleEn: "The Pyramid & Bishop on f4",
        introSk: "Základná myšlienka Londýnskeho systému: skôr než zavrieš strelca c1 pešiakom e3, vyveď ho von na f4!",
        introEn: "The golden rule of the London System: bring your c1 bishop out to f4 BEFORE playing e3 so it doesn't get trapped behind your pawns!",
        moves: [
          { m: "d4", qSk: "Obsaď stred dámskym pešiakom.", qEn: "Claim the center with your d-pawn.", cSk: "1.d4! Otvára cestu strelcovi c1 a dáme.", cEn: "1.d4! Opens the diagonal for the c1 bishop and queen." },
          { m: "d5", cSk: "1…d5. Čierny obsadzuje stred rovnako.", cEn: "1…d5. Black stakes a claim in the center too." },
          { m: "Bf4", qSk: "Vyviň čiernopoľného strelca von zo reťaze ešte pred ťahom e3.", qEn: "Develop your dark-squared bishop outside the pawn chain before playing e3.", cSk: "2.Sf4! Toto je podpis Londýnskeho systému – strelec je aktívny a mieri na c7.", cEn: "2.Bf4! The signature move of the London System – active and eyeing c7.", a: [["f4","c7","chart"]] },
          { m: "Nf6", cSk: "2…Jf6. Čierny vyvíja jazdca.", cEn: "2…Nf6. Black develops a knight." },
          { m: "e3", qSk: "Podopri pešiaka d4 a otvor cestu druhému strelcovi.", qEn: "Support the d4 pawn and open the diagonal for your light-squared bishop.", cSk: "3.e3. Teraz je strelec f4 pekne vonku a pešiak d4 pevne krytý.", cEn: "3.e3. Now the f4 bishop is safely outside and d4 is rock-solid." },
          { m: "e6", cSk: "3…e6. Čierny si pripravuje vývin strelca f8.", cEn: "3…e6. Black prepares to develop the f8 bishop." },
          { m: "Nf3", qSk: "Vyviň kráľovského jazdca na jeho najlepšie pole.", qEn: "Develop your kingside knight to its best square.", cSk: "4.Jf3. Jazdec kontroluje stredové polia e5 a d4.", cEn: "4.Nf3. The knight controls the central e5 and d4 squares." },
          { m: "c5", cSk: "4…c5. Čierny útočí na tvoj stred.", cEn: "4…c5. Black challenges your center." },
          { m: "c3", qSk: "Dokonči pevnú pyramídu pešiakom na c3!", qEn: "Complete the sturdy pawn pyramid with c3!", cSk: "5.c3! Keby čierny zobral na d4, vezmeš späť pešiakom e3 a stred ostane pevný ako skala.", cEn: "5.c3! If Black takes on d4, you recapture exd4 and keep a rock-solid center." }
        ],
        endSk: "Pyramída d4–e3–c3 + strelec na f4 je základ, ktorý funguje takmer proti všetkému.",
        endEn: "The d4–e3–c3 pyramid + bishop on f4 is a reliable home base that works against almost anything."
      },
      {
        id: "bd6",
        titleSk: "Keď súper ponúkne výmenu na d6",
        titleEn: "When Black Offers a Trade on d6",
        pre: "d4 d5 Bf4 Nf6 e3 e6 Nf3 c5 c3 Nc6 Nbd2 Bd6",
        introSk: "Čierny strelec na d6 chce vymeniť tvojho obľúbeného strelca na f4. Neutekaj na e5 ani neber na d6 – poznáš tajný ústup?",
        introEn: "Black's bishop on d6 wants to trade off your prized f4 bishop. Don't take on d6 – do you know the sneaky retreat?",
        moves: [
          { m: "Bg3", qSk: "Ustúp strelcom na pole, odkiaľ po výmene otvoríš h-stĺpec pre vežu!", qEn: "Retreat your bishop so that if Black trades, your h-file opens for the rook!", cSk: "7.Sg3! Ak čierny vezme Sxg3, ty vezmeš hxg3 a tvoja veža na h1 zrazu mieri priamo na h7!", cEn: "7.Bg3! If Black takes Bxg3, you recapture hxg3 and your h1 rook suddenly aims straight down the h-file!", a: [["h1","h7","chart"]] },
          { m: "O-O", cSk: "7…O-O. Čierny urobil rošádu.", cEn: "7…O-O. Black castles kingside." },
          { m: "Bd3", qSk: "Postav svetlopoľného strelca na útočnú diagonálu proti h7.", qEn: "Place your light-squared bishop on the attacking diagonal aimed at h7.", cSk: "8.Sd3! Strelec mieri na h7 a biely je pripravený na rošádu aj útok.", cEn: "8.Bd3! Aims at h7 and prepares castling or a kingside attack." },
          { m: "b6", cSk: "8…b6. Čierny chce vyvinúť strelca na b7.", cEn: "8…b6. Black plans to develop the bishop to b7." },
          { m: "O-O", qSk: "Schovaj kráľa do bezpečia.", qEn: "Tuck your king away safely.", cSk: "9.O-O. Kráľ je v bezpečí a všetky biele figúrky perfektne spolupracujú.", cEn: "9.O-O. Your king is safe and every White piece works in harmony." }
        ],
        endSk: "Ústup Sg3 je kľúčový trik Londýnskeho systému: buď si strelca udržíš, alebo získaš otvorený h-stĺpec.",
        endEn: "The Bg3 retreat is a signature London trick: either you keep your bishop, or you get an open h-file for free."
      },
      {
        id: "qb6",
        titleSk: "Pozor na skoré …Db6!",
        titleEn: "Meeting an Early …Qb6!",
        pre: "d4 d5 Bf4 Nf6 e3 c5 c3 Nc6 Nd2 Qb6",
        introSk: "Keď strelec c1 odišiel na f4, pešiak b2 ostal bez ochrany. Súper naň hneď zaútočil dámou! Ako ho elegantne ubrániš?",
        introEn: "Since your c1 bishop left for f4, the b2 pawn is undefended and Black's queen attacks it right away! How do you defend cleanly?",
        moves: [
          { m: "Qb3", qSk: "Bráň pešiaka b2 tak, aby si súperovi ponúkol výmenu dám!", qEn: "Defend b2 while offering a queen trade!", cSk: "6.Db3! Najistejšia obrana. Ak čierny vezme Dxb3, po axb3 sa ti navyše otvorí a-stĺpec pre vežu!", cEn: "6.Qb3! The cleanest defense. If Black trades Qxb3, axb3 opens the a-file for your rook!" },
          { m: "c4", cSk: "6…c4. Čierny nechce meniť a útočí na tvoju dámu.", cEn: "6…c4. Black avoids the trade and pushes past." },
          { m: "Qc2", qSk: "Ustúp dámou na bezpečné pole, odkiaľ pomáha tlačiť na e4.", qEn: "Retreat your queen to a safe square where it supports the e4 break.", cSk: "7.Dc2! Dáma je v bezpečí a kontroluje dôležité pole e4.", cEn: "7.Qc2! Safe and controlling the key e4 square." },
          { m: "g6", cSk: "7…g6. Čierny chce vyvinúť strelca na f5.", cEn: "7…g6. Black prepares …Bf5." },
          { m: "Ngf3", qSk: "Vyviň kráľovského jazdca a priprav rošádu.", qEn: "Develop your kingside knight and prepare to castle.", cSk: "8.Jgf3. Biely stojí pevne a čoskoro zahrá e4.", cEn: "8.Ngf3. White stands solidly and will soon strike with e4." }
        ],
        endSk: "Na skoré …Db6 takmer vždy stačí pokojné Db3 – pešiak b2 je krytý a výmena dám ti len pomôže.",
        endEn: "Against an early …Qb6, a calm Qb3 almost always solves everything cleanly."
      },
      {
        id: "ne5",
        titleSk: "Útok skokom Je5!",
        titleEn: "Launching the Ne5 Outpost!",
        pre: "d4 d5 Bf4 Nf6 e3 e6 Nf3 Bd6 Bg3 O-O Bd3 c5 c3 Nc6 Nbd2 b6",
        introSk: "Keď máš postavenú pyramídu, tvoj jazdec f3 má vysnívané oporné pole uprostred šachovnice. Ktoré to je?",
        introEn: "Once your pyramid is built, your f3 knight has a dream outpost right in the heart of the board. Spot it!",
        moves: [
          { m: "Ne5", qSk: "Skoč jazdcom na silné pole v strede, ktoré kryjú pešiak d4 aj strelec f4/g3.", qEn: "Plant your knight on the powerful central outpost supported by d4.", cSk: "9.Je5! Jazdec na e5 útočí na c6 a otvára cestu pešiakovi f4 aj dáme na f3/h5.", cEn: "9.Ne5! Attacks c6 and clears the path for f4 and Qf3/Qh5.", a: [["e5","c6","chart"]] },
          { m: "Bb7", cSk: "9…Sb7. Čierny bráni jazdca strelcom.", cEn: "9…Bb7. Black defends the knight." },
          { m: "f4", qSk: "Zabetónuj jazdca na e5 druhým pešiakom!", qEn: "Cement your knight on e5 with a second pawn!", cSk: "10.f4! Teraz je jazdec na e5 takmer nevyhnateľný a biely má silný útok na kráľa.", cEn: "10.f4! Now the e5 knight is an unstoppable monster and White has a strong kingside attack." }
        ],
        endSk: "Jazdec na e5 podopretý pešiakmi d4 a f4 je hlavná zbraň Londýnskeho systému.",
        endEn: "A knight on e5 backed by d4 and f4 is the classic London attacking engine."
      }
    ]
  },

  qg: {
    nameSk: "Dámsky gambit",
    nameEn: "Queen's Gambit",
    side: "w",
    introSk: "Jedno z najstarších a najslávnejších otvorení na svete! Ťahom 2.c4 ponúkneš krídelného pešiaka, aby si ovládol celý stred šachovnice.",
    introEn: "One of the oldest and greatest openings in chess! With 2.c4 you offer a wing pawn to seize full control of the center.",
    lines: [
      [5, "d4 d5 c4 e6 Nc3 Nf6 Bg5 Be7 e3 O-O Nf3 Nbd7"],
      [4, "d4 d5 c4 dxc4 Nf3 Nf6 e3 e6 Bxc4 c5 O-O"],
      [4, "d4 d5 c4 c6 Nf3 Nf6 Nc3 dxc4 a4 Bf5 e3"],
      [3, "d4 d5 c4 e6 Nc3 Nf6 cxd5 exd5 Bg5 Be7 e3"]
    ],
    chapters: [
      {
        id: "offer",
        titleSk: "Prečo ponúkame 2.c4?",
        titleEn: "Why Offer 2.c4?",
        introSk: "Dámsky gambit v skutočnosti nie je skutočná obeť – ak čierny pešiaka vezme, ľahko ho získaš späť a pritom ovládneš stred.",
        introEn: "The Queen's Gambit isn't even a true sacrifice – if Black takes the pawn, you win it back easily while taking over the center.",
        moves: [
          { m: "d4", qSk: "Začni pešiakom v strede.", qEn: "Start with your central d-pawn.", cSk: "1.d4.", cEn: "1.d4." },
          { m: "d5", cSk: "1…d5.", cEn: "1…d5." },
          { m: "c4", qSk: "Zaútoč na čierneho stredového pešiaka d5 krídelným pešiakom!", qEn: "Attack Black's central d5 pawn with your c-pawn!", cSk: "2.c4! Toto je Dámsky gambit. Chceš vymeniť bočného c-pešiaka za čierneho stredového d-pešiaka.", cEn: "2.c4! The Queen's Gambit. You want to trade a flank pawn for Black's center pawn.", a: [["c4","d5","chart"]] },
          { m: "dxc4", cSk: "2…dxc4. Čierny gambit prijal.", cEn: "2…dxc4. Black accepts the gambit." },
          { m: "e3", qSk: "Otvor cestu strelcovi f1, aby si pešiaka c4 hneď zobral späť.", qEn: "Open the diagonal for your f1 bishop to win back the c4 pawn.", cSk: "3.e3! (Hráva sa aj 3.Jf3 alebo 3.e4.) Strelec už mieri na c4.", cEn: "3.e3! (3.Nf3 and 3.e4 are also great.) Your bishop immediately eyes c4." },
          { m: "Nf6", cSk: "3…Jf6. Čierny sa rozumne vyvíja a nesnaží sa pešiaka držať nasilu.", cEn: "3…Nf6. Black wisely develops instead of clinging to the pawn." },
          { m: "Bxc4", qSk: "Zober pešiaka späť a zároveň vyviň strelca!", qEn: "Win the pawn back while developing your bishop!", cSk: "4.Sxc4! Pešiak je späť, máš silný stred a rýchly vývin.", cEn: "4.Bxc4! Pawn recovered, strong center, and fast development." }
        ],
        endSk: "Dámsky gambit ti dáva silný stred a voľnú hru pre všetky figúrky.",
        endEn: "The Queen's Gambit gives you a powerful center and free, active pieces."
      },
      {
        id: "trap_b5",
        titleSk: "Pasca na chamtivého čierneho (3…b5?)",
        titleEn: "Punishing Greedy Black (3…b5?)",
        pre: "d4 d5 c4 dxc4 e3 b5",
        introSk: "Mnohí začiatočníci sa snažia získaného pešiaka c4 udržať za každú cenu ťahom 3…b5?. Ukáž im, prečo prídu o vežu!",
        introEn: "Many beginners try to cling to the c4 pawn with 3…b5?. Show them why that loses a rook!",
        moves: [
          { m: "a4", qSk: "Rozbi čiernych pešiakov na dámskom krídle!", qEn: "Undermine Black's queenside pawns immediately!", cSk: "4.a4! Ak čierny vezme bxa4, stratí oboch pešiakov; ak zahrá c6, otvorí sa mu nebezpečná diagonála.", cEn: "4.a4! If Black plays bxa4, both pawns collapse; if …c6, a deadly diagonal opens." },
          { m: "c6", cSk: "4…c6. Čierny chce podoprieť b5.", cEn: "4…c6. Black tries to prop up b5." },
          { m: "axb5", qSk: "Vezmi pešiaka b5!", qEn: "Capture the b5 pawn!", cSk: "5.axb5.", cEn: "5.axb5." },
          { m: "cxb5", cSk: "5…cxb5. Teraz sa pozri na dlhú bielu diagonálu až po vežu a8!", cEn: "5…cxb5. Now look down the long light-squared diagonal to the a8 rook!" },
          { m: "Qf3", qSk: "Zaútoč dámou na nechránenú vežu a8!", qEn: "Attack the undefended a8 rook with your queen!", cSk: "6.Df3! Čierna veža na a8 je v pasci – čierny musí odovzdať jazdca alebo strelca!", cEn: "6.Qf3! Black's a8 rook is trapped – Black must lose a knight or bishop!", a: [["f3","a8","chart"]] }
        ],
        endSk: "Klasická pasca Dámskeho gambitu: po …b5? príde a4!, axb5 a Df3 s útokom na vežu a8.",
        endEn: "The classic Queen's Gambit trap: …b5? meets a4!, axb5, and Qf3 winning material on the long diagonal."
      },
      {
        id: "qgd",
        titleSk: "Odmietnutý dámsky gambit (2…e6)",
        titleEn: "Queen's Gambit Declined (2…e6)",
        pre: "d4 d5 c4 e6",
        introSk: "Najpevnejšia odpoveď čierneho: pešiaka c4 neberie a bráni d5 pešiakom e6. Ty ďalej tlačíš na d5 a vyvíjaš figúrky.",
        introEn: "Black's most solid reply: declining the pawn and reinforcing d5 with e6. Keep pressuring d5 and develop smoothly.",
        moves: [
          { m: "Nc3", qSk: "Vyviň jazdca tak, aby tlačil na pole d5.", qEn: "Develop your knight to add pressure on d5.", cSk: "3.Jc3! Na rozdiel od Londýna tu jazdec patrí na c3, lebo c-pešiak už išiel na c4.", cEn: "3.Nc3! Unlike the London, here the knight belongs on c3 since the c-pawn already moved." },
          { m: "Nf6", cSk: "3…Jf6. Čierny posilňuje obranu d5.", cEn: "3…Nf6. Black reinforces d5." },
          { m: "Bg5", qSk: "Zviaž čierneho jazdca f6, ktorý bráni d5!", qEn: "Pin the f6 knight that defends d5!", cSk: "4.Sg5! Zviazaný jazdec sa nemôže pohnúť bez straty dámy.", cEn: "4.Bg5! A classic pin on the defender of d5.", a: [["g5","d8","chart"]] },
          { m: "Be7", cSk: "4…Se7. Čierny ruší väzbu.", cEn: "4…Be7. Black breaks the pin." },
          { m: "e3", qSk: "Otvor cestu druhému strelcovi a priprav rošádu.", qEn: "Open the diagonal for your f1 bishop and prepare to castle.", cSk: "5.e3. Biely má harmonický vývin a priestor v strede.", cEn: "5.e3. Harmonious development and central space." }
        ],
        endSk: "Proti 2…e6 je plán jasný: Jc3, Sg5, e3, Jf3, Sd3 a O-O.",
        endEn: "Against 2…e6 the plan is crystal clear: Nc3, Bg5, e3, Nf3, Bd3, and O-O."
      },
      {
        id: "slav",
        titleSk: "Slovanská obrana (2…c6)",
        titleEn: "Slav Defense (2…c6)",
        pre: "d4 d5 c4 c6",
        introSk: "Čierny bráni d5 pešiakom c6, aby nezavrel svojho strelca na c8. Vyvíjaj jazdcov a bojuj o stred!",
        introEn: "Black defends d5 with c6 so the c8 bishop stays free. Develop your knights and fight for the center!",
        moves: [
          { m: "Nf3", qSk: "Vyviň kráľovského jazdca.", qEn: "Develop your kingside knight.", cSk: "3.Jf3.", cEn: "3.Nf3." },
          { m: "Nf6", cSk: "3…Jf6.", cEn: "3…Nf6." },
          { m: "Nc3", qSk: "Zapoj aj druhého jazdca proti d5.", qEn: "Bring out your second knight against d5.", cSk: "4.Jc3. Teraz hrozí cxd5.", cEn: "4.Nc3. Increasing central control." },
          { m: "dxc4", cSk: "4…dxc4. Čierny berie pešiaka a chystá …b5.", cEn: "4…dxc4. Black grabs the pawn and eyes …b5." },
          { m: "a4", qSk: "Zastav čierny ťah …b5 hneď v zárodku!", qEn: "Stop Black's …b5 pawn push right away!", cSk: "5.a4! Teraz čierny nemôže udržať pešiaka c4 a ty ho pohodlne získaš späť po e3 a Sxc4.", cEn: "5.a4! Prevents …b5 so you will comfortably win back c4 with e3 and Bxc4." }
        ],
        endSk: "V Slovanskej obrane si zapamätaj ťah a4 – nedovolí čiernemu udržať si pešiaka c4.",
        endEn: "In the Slav Defense, remember a4 – it stops Black from clinging to the c4 pawn."
      }
    ]
  },

  spanish: {
    nameSk: "Španielska hra",
    nameEn: "Ruy Lopez (Spanish Game)",
    side: "w",
    introSk: "Kráľovské otvorenie majstrov sveta už vyše 400 rokov! Strelcom na b5 tlačíš na jazdca c6, ktorý chráni čierneho pešiaka e5.",
    introEn: "The favorite opening of World Champions for over 400 years! With Bb5 you pressure the c6 knight defending Black's e5 pawn.",
    lines: [
      [5, "e4 e5 Nf3 Nc6 Bb5 a6 Ba4 Nf6 O-O Be7 Re1 b5 Bb3 d6 c3 O-O h3"],
      [4, "e4 e5 Nf3 Nc6 Bb5 Nf6 O-O Nxe4 d4 Be7 Qe2 Nd6 Bxc6 bxc6 dxe5"],
      [3, "e4 e5 Nf3 Nc6 Bb5 a6 Bxc6 dxc6 O-O f6 d4"],
      [3, "e4 e5 Nf3 Nc6 Bb5 Bc5 c3 Nf6 O-O O-O d4"]
    ],
    chapters: [
      {
        id: "bb5",
        titleSk: "Tlak na jazdca c6 (3.Sb5)",
        titleEn: "Pressuring the c6 Knight (3.Bb5)",
        introSk: "Prečo ide strelec na b5 namiesto c4? Útočí na jediného obrancu čierneho pešiaka e5!",
        introEn: "Why put the bishop on b5 instead of c4? Because it attacks the knight defending Black's e5 pawn!",
        moves: [
          { m: "e4", qSk: "Otvor stred kráľovským pešiakom.", qEn: "Open the center with your e-pawn.", cSk: "1.e4.", cEn: "1.e4." },
          { m: "e5", cSk: "1…e5.", cEn: "1…e5." },
          { m: "Nf3", qSk: "Napadni pešiaka e5 jazdcom.", qEn: "Attack the e5 pawn with your knight.", cSk: "2.Jf3.", cEn: "2.Nf3." },
          { m: "Nc6", cSk: "2…Jc6. Jazdec bráni e5.", cEn: "2…Nc6. The knight defends e5." },
          { m: "Bb5", qSk: "Napadni obrancu pešiaka e5 svojím strelcom!", qEn: "Attack the defender of e5 with your bishop!", cSk: "3.Sb5! Toto je Španielska hra (Ruy Lopez). Biely sa hneď pripravuje aj na rýchlu rošádu.", cEn: "3.Bb5! The Ruy Lopez. White pressures c6 and clears the path for quick castling.", a: [["b5","c6","chart"]] }
        ],
        endSk: "3.Sb5 spája tlak v strede s bleskovou rošádou.",
        endEn: "3.Bb5 combines central pressure with rapid castling."
      },
      {
        id: "morphy",
        titleSk: "Morphyho obrana (3…a6)",
        titleEn: "Morphy Defense (3…a6)",
        pre: "e4 e5 Nf3 Nc6 Bb5 a6",
        introSk: "Čierny sa pýta tvojho strelca: vymeníš ma alebo ustúpiš? Zvyčajne si silného „španielskeho strelca“ necháme!",
        introEn: "Black asks your bishop a question: trade or retreat? Usually we keep our prized Spanish bishop!",
        moves: [
          { m: "Ba4", qSk: "Ustúp strelcom tak, aby stále mieril smerom na c6 a kráľa.", qEn: "Retreat the bishop while keeping pressure along the a4–e8 diagonal.", cSk: "4.Sa4! Strelec ostáva aktívny a po …b5 sa schová na b3.", cEn: "4.Ba4! Keeps the pressure and prepares to tuck back to b3 after …b5." },
          { m: "Nf6", cSk: "4…Jf6. Čierny napáda tvojho pešiaka e4.", cEn: "4…Nf6. Black attacks your e4 pawn." },
          { m: "O-O", qSk: "Neboj sa o e4 – najprv urob rošádu! (Ak čierny vezme Jxe4, Ve1 ho potrestá.)", qEn: "Don't worry about e4 – castle first! (If …Nxe4, Re1 wins it back with attack.)", cSk: "5.O-O! Kráľ je v bezpečí a veža je pripravená prísť na e1.", cEn: "5.O-O! King to safety and the rook is ready for e1." },
          { m: "Be7", cSk: "5…Se7. Čierny sa chystá na rošádu.", cEn: "5…Be7. Black prepares to castle." },
          { m: "Re1", qSk: "Teraz už čierny naozaj hrozí zobrať e4 – ubráň ho vežou!", qEn: "Now Black really threatens …Nxe4 – defend e4 with your rook!", cSk: "6.Ve1! Veža kryje e4 a pozerá sa priamo na e-stĺpec.", cEn: "6.Re1! Defends e4 and lines up down the e-file." }
        ],
        endSk: "Sa4, O-O a Ve1 je zlatý trojlístok Španielskej hry.",
        endEn: "Ba4, O-O, and Re1 is the golden trio of the Ruy Lopez."
      },
      {
        id: "center",
        titleSk: "Stredový plán c3 a d4",
        titleEn: "The c3 & d4 Center Plan",
        pre: "e4 e5 Nf3 Nc6 Bb5 a6 Ba4 Nf6 O-O Be7 Re1 b5",
        introSk: "Čierny zahnal tvojho strelca ťahom …b5. Schovaj ho na b3 a priprav silný stred pešiakmi c3 a d4!",
        introEn: "Black chased your bishop with …b5. Tuck it safely on b3 and build a big center with c3 and d4!",
        moves: [
          { m: "Bb3", qSk: "Schovaj strelca na bezpečnú útočnú diagonálu.", qEn: "Tuck your bishop onto the active a2–g8 diagonal.", cSk: "7.Sb3! Odtiaľ strelec mieri rovno na slabé pole f7.", cEn: "7.Bb3! Aims straight toward the sensitive f7 square.", a: [["b3","f7","chart"]] },
          { m: "d6", cSk: "7…d6. Čierny pevne kryje e5.", cEn: "7…d6. Black reinforces e5." },
          { m: "c3", qSk: "Priprav útok v strede ťahom d4 (a zároveň urob strelcovi únikovú cestu na c2).", qEn: "Prepare the d4 central push (and give your bishop an escape square on c2).", cSk: "8.c3! Dve muchy jednou ranou: chystáš d4 aj úkryt Sc2.", cEn: "8.c3! Prepares d4 and creates a cozy home on c2 for the bishop." },
          { m: "O-O", cSk: "8…O-O.", cEn: "8…O-O." },
          { m: "d4", qSk: "Ovládni stred druhým pešiakom!", qEn: "Strike in the center with d4!", cSk: "9.d4! Biely má ukážkový stred a voľnú hru.", cEn: "9.d4! A textbook center and great piece activity." }
        ],
        endSk: "V Španielskej hre sa neponáhľaj – pekne schovaj strelca na b3, zahraj c3 a ovládni stred s d4.",
        endEn: "Be patient in the Ruy Lopez: tuck the bishop on b3, play c3, and take over the center with d4."
      },
      {
        id: "exchange",
        titleSk: "Výmenný variant (4.Sxc6)",
        titleEn: "Exchange Variation (4.Bxc6)",
        pre: "e4 e5 Nf3 Nc6 Bb5 a6",
        introSk: "Chceš jednoduchšiu a priamočiarejšiu hru? Môžeš hneď pokaziť čiernemu pešiakov výmenou 4.Sxc6!",
        introEn: "Want a simpler, direct game? You can double Black's pawns right away with 4.Bxc6!",
        moves: [
          { m: "Bxc6", qSk: "Vymeň strelca za jazdca a zdvoj čiernemu pešiakov!", qEn: "Trade bishop for knight to double Black's pawns!", cSk: "4.Sxc6! Čierny má teraz zdvojených c-pešiakov, čo je veľká výhoda pre bieleho v koncovke.", cEn: "4.Bxc6! Black gets doubled c-pawns, giving White a great endgame structure." },
          { m: "dxc6", cSk: "4…dxc6. (POZOR: 5.Jxe5? by ešte nefungovalo kvôli 5…Dd4! s vidličkou!)", cEn: "4…dxc6. (Careful: 5.Nxe5? runs into 5…Qd4! forking knight and pawn!)" },
          { m: "O-O", qSk: "Nenechaj sa nachytať na 5.Jxe5? Dd4! – najprv urob rošádu!", qEn: "Avoid the 5.Nxe5? Qd4! trap – castle first!", cSk: "5.O-O! Teraz už naozaj hrozíš vziať pešiaka e5.", cEn: "5.O-O! Now you genuinely threaten Nxe5." },
          { m: "f6", cSk: "5…f6. Čierny bráni e5 pešiakom.", cEn: "5…f6. Black defends e5." },
          { m: "d4", qSk: "Otvor stred!", qEn: "Open up the center!", cSk: "6.d4! Po výmene na d4 ostane bielemu zdravá väčšina pešiakov na kráľovskom krídle.", cEn: "6.d4! White gets a clean kingside pawn majority." }
        ],
        endSk: "Vo Výmennom variante si zapamätaj pascu: neber hneď e5 pred rošádou kvôli …Dd4!",
        endEn: "Remember the Exchange trap: never grab e5 before castling because of …Qd4!"
      }
    ]
  },

  kingsgambit: {
    nameSk: "Kráľovský gambit",
    nameEn: "King's Gambit",
    side: "w",
    introSk: "Najodvážnejšie útočné otvorenie šachovej histórie! Ťahom 2.f4 obetuješ pešiaka za bleskový útok po otvorenom f-stĺpci.",
    introEn: "The boldest attacking opening in chess history! With 2.f4 you sacrifice a pawn to blast open the f-file and launch a thrilling attack.",
    lines: [
      [5, "e4 e5 f4 exf4 Nf3 d6 Bc4 h6 d4 g5 O-O"],
      [4, "e4 e5 f4 exf4 Nf3 g5 Bc4 Bg7 O-O d6 d4"],
      [3, "e4 e5 f4 Bc5 Nf3 d6 c3 Nf6 d4 exd4 cxd4 Bb6"],
      [3, "e4 e5 f4 d5 exd5 exf4 Nf3 Nf6 Bc4 Nxd5 O-O"]
    ],
    chapters: [
      {
        id: "f4",
        titleSk: "Odvážny ťah 2.f4!",
        titleEn: "The Bold 2.f4!",
        introSk: "Prečo obetovať pešiaka f4? Keď ho čierny vezme, otvorí sa ti f-stĺpec pre vežu a ľahko postavíš silný stred d4!",
        introEn: "Why sacrifice the f4 pawn? When Black takes it, your f-file opens for the rook and you can storm the center with d4!",
        moves: [
          { m: "e4", qSk: "Začni pešiakom e4.", qEn: "Start with e4.", cSk: "1.e4.", cEn: "1.e4." },
          { m: "e5", cSk: "1…e5.", cEn: "1…e5." },
          { m: "f4", qSk: "Ponúkni f-pešiaka a zaútoč na e5!", qEn: "Offer your f-pawn to attack e5!", cSk: "2.f4! Toto je Kráľovský gambit – obľúbená zbraň Paula Morphyho aj Borisa Spasského.", cEn: "2.f4! The King's Gambit – a favorite weapon of attacking legends like Paul Morphy.", a: [["f4","e5","chart"]] },
          { m: "exf4", cSk: "2…exf4. Čierny pešiaka prijal.", cEn: "2…exf4. Black accepts the gambit." },
          { m: "Nf3", qSk: "Najdôležitejší ťah! Vyviň jazdca tak, aby si ZASTAVIL nepríjemný šach dámou …Dh4+.", qEn: "Crucial move! Develop your knight to STOP the nasty …Qh4+ check.", cSk: "3.Jf3! Jazdec stráži pole h4 a chystá rýchlu rošádu.", cEn: "3.Nf3! Guards h4 and prepares rapid castling.", a: [["f3","h4","chart"]] }
        ],
        endSk: "V Kráľovskom gambite hneď po 2…exf4 hraj 3.Jf3, aby čierna dáma nemohla dať šach na h4!",
        endEn: "Right after 2…exf4, always remember 3.Nf3 to block the dangerous …Qh4+ check!"
      },
      {
        id: "center_attack",
        titleSk: "Stred d4 a útok na f7",
        titleEn: "Center d4 & Attack on f7",
        pre: "e4 e5 f4 exf4 Nf3 d6",
        introSk: "Čierny hrá pokojne 3…d6. Ty rýchlo vyviň strelca na c4, ovládni stred ťahom d4 a urob rošádu, nech veža páli po f-stĺpci!",
        introEn: "Black plays calmly with 3…d6. Develop your bishop to c4, seize the center with d4, and castle so your rook blasts down the f-file!",
        moves: [
          { m: "Bc4", qSk: "Namier strelca priamo na najslabšie pole čierneho – f7!", qEn: "Aim your bishop straight at Black's weakest square – f7!", cSk: "4.Sc4! Strelec mieri na f7 a kráľ môže urobiť rošádu.", cEn: "4.Bc4! Targets f7 and clears the way for castling." },
          { m: "h6", cSk: "4…h6. Čierny chce udržať pešiaka f4 ťahom …g5.", cEn: "4…h6. Black prepares …g5 to hold f4." },
          { m: "d4", qSk: "Obsaď stred druhým pešiakom a otvor cestu druhému strelcovi!", qEn: "Claim the center with d4 and free your dark-squared bishop!", cSk: "5.d4! Tvoj stred je silný a strelec c1 sa už pozerá na f4.", cEn: "5.d4! Strong center and your c1 bishop now eyes f4." },
          { m: "g5", cSk: "5…g5. Čierny drží pešiaka f4, ale oslabil si kráľovské krídlo.", cEn: "5…g5. Black clings to f4 but weakens the kingside." },
          { m: "O-O", qSk: "Urob rošádu, aby tvoja veža mierila po otvorenom f-stĺpci!", qEn: "Castle so your rook aims straight down the f-file!", cSk: "6.O-O! Veža na f1 + strelec na c4 vytvárajú obrovský tlak na f7.", cEn: "6.O-O! Your f1 rook and c4 bishop team up for huge pressure on f7." }
        ],
        endSk: "V Kráľovskom gambite platí: Jf3, Sc4, d4, O-O – a všetky tvoje figúrky útočia!",
        endEn: "The King's Gambit recipe: Nf3, Bc4, d4, O-O – every piece joins the attack!"
      },
      {
        id: "declined",
        titleSk: "Odmietnutý gambit (2…Sc5)",
        titleEn: "King's Gambit Declined (2…Bc5)",
        pre: "e4 e5 f4 Bc5",
        introSk: "Čierny pešiaka neberie a postaví strelca na c5, aby ti zabránil v rošáde. Ako získaš čas a ovládneš stred?",
        introEn: "Black declines the pawn and puts the bishop on c5 to stop you from castling. How do you take over the center?",
        moves: [
          { m: "Nf3", qSk: "Vyviň jazdca a napadni e5 (tiež stráž h4!).", qEn: "Develop your knight, attacking e5 (and guarding h4!).", cSk: "3.Jf3.", cEn: "3.Nf3." },
          { m: "d6", cSk: "3…d6. Čierny kryje e5.", cEn: "3…d6. Black defends e5." },
          { m: "c3", qSk: "Priprav úder v strede ťahom d4, ktorý zároveň zaženie strelca c5!", qEn: "Prepare the d4 central strike that also chases the c5 bishop!", cSk: "4.c3! Chystáš d4 s útokom na stred aj strelca.", cEn: "4.c3! Prepares d4 to hit both the center and the c5 bishop." },
          { m: "Nf6", cSk: "4…Jf6. Čierny napáda e4.", cEn: "4…Nf6. Black attacks e4." },
          { m: "d4", qSk: "Udri v strede pešiakom d4!", qEn: "Strike in the center with d4!", cSk: "5.d4! Čierny strelec musí ustúpiť a biely má krásny stred.", cEn: "5.d4! Forces the bishop back and gives White a great center." }
        ],
        endSk: "Proti 2…Sc5 je plán jednoduchý: Jf3, c3 a d4!",
        endEn: "Against 2…Bc5 the plan is simple: Nf3, c3, and d4!"
      },
      {
        id: "falkbeer",
        titleSk: "Falkbeerov protigambit (2…d5)",
        titleEn: "Falkbeer Countergambit (2…d5)",
        pre: "e4 e5 f4 d5",
        introSk: "Súper ti vráti úder v strede ťahom 2…d5! Neber na e5 (lebo príde …Dh4+!), vezmi správneho pešiaka!",
        introEn: "Black counterstrikes in the center with 2…d5! Do NOT take on e5 (because of …Qh4+!) – capture the right pawn!",
        moves: [
          { m: "exd5", qSk: "Vezmi pešiaka d5 (nikdy nie fxe5? kvôli …Dh4+!).", qEn: "Capture on d5 (never fxe5? because of …Qh4+!).", cSk: "3.exd5! Tvoj kráľ ostáva chránený a získavaš pešiaka.", cEn: "3.exd5! Keeps your king safe and wins a pawn." },
          { m: "exf4", cSk: "3…exf4.", cEn: "3…exf4." },
          { m: "Nf3", qSk: "Vyviň jazdca a stráž pole h4!", qEn: "Develop your knight and guard h4!", cSk: "4.Jf3! Biely stojí bezpečne a má výbornú hru.", cEn: "4.Nf3! White is safe and well-developed." }
        ],
        endSk: "Na 2…d5 vždy odpovedaj 3.exd5! (nikdy nie 3.fxe5? Dh4+!).",
        endEn: "Against 2…d5 always play 3.exd5! (never 3.fxe5? Qh4+!)."
      }
    ]
  },

  sicilian: {
    nameSk: "Sicílska obrana",
    nameEn: "Sicilian Defense",
    side: "b",
    introSk: "Najbojovnejšia odpoveď čierneho na 1.e4! Namiesto zrkadlového 1…e5 zaútočíš na pole d4 z krídla ťahom 1…c5 a bojuješ o výhru.",
    introEn: "Black's fiercest fighting reply to 1.e4! Instead of mirroring with 1…e5, you fight for d4 from the flank with 1…c5 and play to win.",
    lines: [
      [5, "e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 g6 Be3 Bg7 f3 O-O Qd2 Nc6"],
      [4, "e4 c5 Nf3 Nc6 d4 cxd4 Nxd4 Nf6 Nc3 d6 Be2 e5"],
      [3, "e4 c5 Bc4 e6 Nc3 Nc6 Nf3 Nf6 O-O d5"],
      [3, "e4 c5 c3 Nf6 e5 Nd5 d4 cxd4"]
    ],
    chapters: [
      {
        id: "idea",
        titleSk: "Prečo 1…c5?",
        titleEn: "Why Play 1…c5?",
        introSk: "Keď biely zahrá 1.e4, chce postaviť druhého pešiaka na d4. Ty mu to hneď sťažíš krídelným pešiakom c5!",
        introEn: "When White plays 1.e4, they want to put a second pawn on d4. Challenge it from the side with 1…c5!",
        moves: [
          { m: "e4", cSk: "1.e4.", cEn: "1.e4." },
          { m: "c5", qSk: "Zaútoč na pole d4 z krídla!", qEn: "Fight for the d4 square from the flank!", cSk: "1…c5! Ak biely zahrá d4, vymeníš bočného c-pešiaka za jeho stredového d-pešiaka!", cEn: "1…c5! If White plays d4, you trade a flank pawn for White's central d-pawn!", a: [["c5","d4","chart"]] },
          { m: "Nf3", cSk: "2.Jf3.", cEn: "2.Nf3." },
          { m: "d6", qSk: "Podopri pole e5 a otvor cestu strelcovi c8.", qEn: "Control e5 and open the diagonal for your c8 bishop.", cSk: "2…d6. Zabraňuje bielemu postúpiť e5 a pripravuje …Jf6.", cEn: "2…d6. Stops e5 and prepares …Nf6." },
          { m: "d4", cSk: "3.d4. Biely otvára stred – Otvorená Sicílska.", cEn: "3.d4. The Open Sicilian." },
          { m: "cxd4", qSk: "Vezmi bieleho stredového pešiaka!", qEn: "Capture White's central d-pawn!", cSk: "3…cxd4! Teraz máš dvoch stredových pešiakov (d a e) proti jednému bielemu (e), a k tomu polootvorený c-stĺpec pre tvoju vežu!", cEn: "3…cxd4! Now you have two center pawns against one, plus a half-open c-file for your rook!" },
          { m: "Nxd4", cSk: "4.Jxd4.", cEn: "4.Nxd4." },
          { m: "Nf6", qSk: "Vyviň jazdca s útokom na pešiaka e4!", qEn: "Develop your knight and attack e4 at the same time!", cSk: "4…Jf6! Nútiš bieleho brániť e4 (zvyčajne 5.Jc3).", cEn: "4…Nf6! Forces White to defend e4 (usually with 5.Nc3)." }
        ],
        endSk: "V Sicílskej získaš prevahu v strede a otvorený c-stĺpec pre protiútok na dámskom krídle.",
        endEn: "In the Sicilian you gain central pawn majority and the open c-file for queenside counterplay."
      },
      {
        id: "dragon",
        titleSk: "Dračí variant (…g6 a …Sg7)",
        titleEn: "The Dragon Setup (…g6 & …Bg7)",
        pre: "e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3",
        introSk: "Najobľúbenejší plán Sicílskej pre útočníkov: postav strelca na g7, odkiaľ chrlí oheň cez celú dlhú diagonálu!",
        introEn: "A favorite Sicilian weapon for attackers: put your bishop on g7 where it breathes fire down the entire long diagonal!",
        moves: [
          { m: "g6", qSk: "Priprav pre svojho čiernopoľného strelca domček na g7!", qEn: "Prepare a home on g7 for your dark-squared bishop!", cSk: "5…g6! Toto je slávny Dračí variant (tvar pešiakov pripomína chvost draka).", cEn: "5…g6! The famous Dragon Variation." },
          { m: "Be3", cSk: "6.Se3.", cEn: "6.Be3." },
          { m: "Bg7", qSk: "Postav „dračieho strelca“ na dlhú diagonálu!", qEn: "Put the Dragon bishop on the long diagonal!", cSk: "6…Sg7! Strelec mieri cez celú šachovnicu až na b2 a a1.", cEn: "6…Bg7! Fires all the way across the board toward b2 and a1.", a: [["g7","b2","chart"]] },
          { m: "f3", cSk: "7.f3. Biely chystá veľkú rošádu.", cEn: "7.f3. White prepares queenside castling." },
          { m: "O-O", qSk: "Schovaj kráľa do pevnosti za dračieho strelca.", qEn: "Castle safely behind your Dragon bishop.", cSk: "7…O-O! Teraz môžeš vyvinúť …Jc6 a tlačiť po c-stĺpci.", cEn: "7…O-O! Next you bring out …Nc6 and attack down the c-file." }
        ],
        endSk: "Dračí strelec na g7 + veža na c8 tvoria v Sicílskej smrtiacu dvojicu.",
        endEn: "The g7 Dragon bishop + rook on c8 form a fearsome attacking duo."
      },
      {
        id: "bowdler",
        titleSk: "Proti amatérskemu 2.Sc4",
        titleEn: "Punishing the Amateur 2.Bc4",
        pre: "e4 c5 Bc4",
        introSk: "Veľa hráčov proti Sicílskej automaticky zahrá 2.Sc4 ako v Talianskej. Ako strelca zablokuješ a neskôr vyženieš s úderom …d5?",
        introEn: "Many players automatically play 2.Bc4 against the Sicilian just like the Italian. How do you blunt the bishop and strike with …d5?",
        moves: [
          { m: "e6", qSk: "Zatvor strelcovi cestu na f7 a priprav …d5!", qEn: "Shut the bishop out from f7 and prepare …d5!", cSk: "2…e6! Biely strelec teraz naráža na pevnú stenu a ty už chystáš …d5.", cEn: "2…e6! The c4 bishop hits a brick wall and you prepare …d5." },
          { m: "Nc3", cSk: "3.Jc3.", cEn: "3.Nc3." },
          { m: "Nc6", qSk: "Vyviň jazdca a kontroluj d4.", qEn: "Develop your knight and control d4.", cSk: "3…Jc6.", cEn: "3…Nc6." },
          { m: "Nf3", cSk: "4.Jf3.", cEn: "4.Nf3." },
          { m: "Nf6", qSk: "Vyviň druhého jazdca.", qEn: "Develop your second knight.", cSk: "4…Jf6.", cEn: "4…Nf6." },
          { m: "O-O", cSk: "5.O-O.", cEn: "5.O-O." },
          { m: "d5", qSk: "Udri v strede a zároveň napadni bieleho strelca!", qEn: "Strike in the center and attack the c4 bishop!", cSk: "5…d5! Získavaš stred aj čas – presne preto majstri proti 1…c5 nehrajú 2.Sc4.", cEn: "5…d5! Claims the center with tempo – that's why masters don't play 2.Bc4 vs the Sicilian." }
        ],
        endSk: "Proti 2.Sc4 si zapamätaj …e6 a …d5! Strelec na c4 je zrazu v ceste.",
        endEn: "Against 2.Bc4, remember …e6 followed by …d5! The c4 bishop becomes a target."
      },
      {
        id: "alapin",
        titleSk: "Proti Alapinovmu 2.c3",
        titleEn: "Meeting the Alapin (2.c3)",
        pre: "e4 c5 c3",
        introSk: "Biely chce zahrať 3.d4 a vziať späť pešiakom c3, aby mal veľký stred. Udri hneď na jeho e4!",
        introEn: "White wants to play 3.d4 and recapture with cxd4 for a huge center. Counterattack e4 right away!",
        moves: [
          { m: "Nf6", qSk: "Zaútoč hneď na nechráneného pešiaka e4!", qEn: "Immediately attack the undefended e4 pawn!", cSk: "2…Jf6! (Hráva sa aj 2…d5.) Nútiš bieleho riešiť e4.", cEn: "2…Nf6! (2…d5 is also strong.) Forces White to deal with e4." },
          { m: "e5", cSk: "3.e5. Biely tlačí na tvojho jazdca.", cEn: "3.e5. White pushes the knight." },
          { m: "Nd5", qSk: "Skoč jazdcom rovno do stredu šachovnice!", qEn: "Hop your knight right into the center!", cSk: "3…Jd5! Jazdec stojí skvelo v strede a biely už nemá ľahký stred.", cEn: "3…Nd5! A great central square for the knight." },
          { m: "d4", cSk: "4.d4.", cEn: "4.d4." },
          { m: "cxd4", qSk: "Otvor stred výmenou pešiaka.", qEn: "Capture on d4 to keep the center open.", cSk: "4…cxd4! Čierny ľahko vyrovná hru a pokračuje …d6 a …Jc6.", cEn: "4…cxd4! Black easily equalizes with …d6 and …Nc6 next." }
        ],
        endSk: "Proti 2.c3 sa nezľakni: 2…Jf6! a po 3.e5 skok do stredu 3…Jd5.",
        endEn: "Against 2.c3 stay active: 2…Nf6! and after 3.e5 leap into the center with 3…Nd5."
      }
    ]
  },

  carokann: {
    nameSk: "Caro-Kannova obrana",
    nameEn: "Caro-Kann Defense",
    side: "b",
    introSk: "Pevná, spoľahlivá a pritom aktívna obrana za čierneho proti 1.e4! Najprv pripravíš 2…d5 ťahom 1…c6 a tvoj strelec c8 ostane úplne voľný.",
    introEn: "A super solid yet active defense for Black against 1.e4! Prepare 2…d5 with 1…c6 so your light-squared c8 bishop stays completely free.",
    lines: [
      [5, "e4 c6 d4 d5 Nc3 dxe4 Nxe4 Bf5 Ng3 Bg6 Nf3 Nd7"],
      [4, "e4 c6 d4 d5 e5 Bf5 Nf3 e6 Be2 c5 O-O Nc6"],
      [3, "e4 c6 d4 d5 exd5 cxd5 Bd3 Nc6 c3 Nf6 Bf4"],
      [3, "e4 c6 Nf3 d5 Nc3 Bg4 h3 Bxf3 Qxf3 e6"]
    ],
    chapters: [
      {
        id: "main",
        titleSk: "Základ 1…c6, 2…d5 a strelec na f5!",
        titleEn: "1…c6, 2…d5 & Bishop to f5!",
        introSk: "Hlavná výhoda Caro-Kannu: na rozdiel od Francúzskej obrany tvoj svetlopoľný strelec c8 vybehne von na f5 skôr, než zahráš …e6!",
        introEn: "The big perk of the Caro-Kann: unlike the French Defense, your c8 bishop escapes to f5 BEFORE you play …e6!",
        moves: [
          { m: "e4", cSk: "1.e4.", cEn: "1.e4." },
          { m: "c6", qSk: "Priprav úder …d5 pešiakom c6.", qEn: "Prepare …d5 with the c6 pawn.", cSk: "1…c6! Toto je Caro-Kannova obrana.", cEn: "1…c6! The Caro-Kann Defense." },
          { m: "d4", cSk: "2.d4.", cEn: "2.d4." },
          { m: "d5", qSk: "Udri na biely stred pešiakom d5!", qEn: "Challenge White's center with …d5!", cSk: "2…d5! Napádaš e4 a máš ho pevne podopreného z c6.", cEn: "2…d5! Attacks e4 with solid backup from c6." },
          { m: "Nc3", cSk: "3.Jc3. Biely bráni e4.", cEn: "3.Nc3. White defends e4." },
          { m: "dxe4", qSk: "Vezmi pešiaka e4.", qEn: "Capture the e4 pawn.", cSk: "3…dxe4.", cEn: "3…dxe4." },
          { m: "Nxe4", cSk: "4.Jxe4.", cEn: "4.Nxe4." },
          { m: "Bf5", qSk: "Vyviň strelca c8 von s útokom na bieleho jazdca!", qEn: "Bring your c8 bishop out, attacking White's knight!", cSk: "4…Sf5! Presne toto je sen Caro-Kannu – strelec je aktívny a získava čas útokom na jazdca.", cEn: "4…Bf5! The dream Caro-Kann move – active bishop attacking the knight with tempo.", a: [["f5","e4","chart"]] }
        ],
        endSk: "V Caro-Kanne nezabudni na zlaté pravidlo: najprv strelec na f5 (alebo g4), až potom …e6!",
        endEn: "Remember the golden Caro-Kann rule: bring your bishop out to f5 (or g4) BEFORE playing …e6!"
      },
      {
        id: "advance",
        titleSk: "Postupný variant (3.e5)",
        titleEn: "Advance Variation (3.e5)",
        pre: "e4 c6 d4 d5 e5",
        introSk: "Biely nechce meniť a postúpi 3.e5, aby získal priestor. Opäť najprv vyveď strelca von, a potom rozbi jeho reťaz ťahom …c5!",
        introEn: "White avoids trading and pushes 3.e5 for space. Again, get your bishop outside first, then strike White's chain with …c5!",
        moves: [
          { m: "Bf5", qSk: "Najprv vyveď strelca c8 von z reťaze!", qEn: "First bring your c8 bishop outside the pawn chain!", cSk: "3…Sf5! Strelec je vonku a aktívny.", cEn: "3…Bf5! Your bishop is free and active." },
          { m: "Nf3", cSk: "4.Jf3.", cEn: "4.Nf3." },
          { m: "e6", qSk: "Teraz už môžeš bezpečne zahrať …e6 a otvoriť cestu druhému strelcovi.", qEn: "Now you can safely play …e6 to free your other bishop.", cSk: "4…e6. Pevná pešiaková štruktúra a obaja strelci budú voľní.", cEn: "4…e6. Rock-solid pawns and both bishops have room." },
          { m: "Be2", cSk: "5.Se2.", cEn: "5.Be2." },
          { m: "c5", qSk: "Zaútoč na biely stred pešiakom c5!", qEn: "Strike at White's d4 pawn with …c5!", cSk: "5…c5! Útočíš na základňu bielej pešiakovej reťaze d4.", cEn: "5…c5! Attacks the base of White's pawn chain on d4.", a: [["c5","d4","chart"]] }
        ],
        endSk: "Proti 3.e5 si zapamätaj poradie: 3…Sf5!, 4…e6 a 5…c5!.",
        endEn: "Against 3.e5 remember the order: 3…Bf5!, 4…e6, and 5…c5!."
      },
      {
        id: "exchange",
        titleSk: "Výmenný variant (3.exd5)",
        titleEn: "Exchange Variation (3.exd5)",
        pre: "e4 c6 d4 d5 exd5",
        introSk: "Biely hneď vymenil v strede. Zober späť pešiakom c6 a pohodlne vyviň všetky svoje figúrky!",
        introEn: "White trades in the center right away. Recapture with the c-pawn and develop all your pieces smoothly!",
        moves: [
          { m: "cxd5", qSk: "Zober späť smerom do stredu!", qEn: "Recapture toward the center!", cSk: "3…cxd5! Otvoril si c-stĺpec pre vežu a políčko c6 pre jazdca.", cEn: "3…cxd5! Opens the c-file for your rook and c6 for your knight." },
          { m: "Bd3", cSk: "4.Sd3.", cEn: "4.Bd3." },
          { m: "Nc6", qSk: "Vyviň jazdca s tlakom na d4!", qEn: "Develop your knight pressuring d4!", cSk: "4…Jc6! Hneď napádaš bieleho pešiaka d4.", cEn: "4…Nc6! Immediately pressures White's d4 pawn." },
          { m: "c3", cSk: "5.c3.", cEn: "5.c3." },
          { m: "Nf6", qSk: "Vyviň druhého jazdca.", qEn: "Develop your kingside knight.", cSk: "5…Jf6. Ďalej vyvinieš strelca na g4 alebo f5 a urobíš rošádu.", cEn: "5…Nf6. Next bring the bishop to g4 or f5 and castle." }
        ],
        endSk: "Výmenný Caro-Kann je pre čierneho veľmi príjemný: Jc6, Jf6, Sg4/Sf5, e6 a O-O.",
        endEn: "The Exchange Caro-Kann is smooth sailing for Black: …Nc6, …Nf6, …Bg4/Bf5, …e6, and …O-O."
      },
      {
        id: "nd7",
        titleSk: "Pozor na dusený mat (4…Jd7?)",
        titleEn: "Watch Out for the Smothered Mate!",
        pre: "e4 c6 d4 d5 Nc3 dxe4 Nxe4 Bf5 Ng3 Bg6",
        introSk: "Po 4…Sf5 5.Jg3 Sg6 sa tvoj strelec pekne schoval na g6. Teraz dokonči vývin bezpečne a bez pascí!",
        introEn: "After 4…Bf5 5.Ng3 Bg6 your bishop tucked away safely. Now finish developing cleanly!",
        moves: [
          { m: "Nf3", cSk: "6.Jf3.", cEn: "6.Nf3." },
          { m: "Nd7", qSk: "Vyviň jazdca na d7 (stráži pole f6, keby si tam dal druhého jazdca).", qEn: "Develop your knight to d7 so it supports …Ngf6.", cSk: "6…Jd7! Keď neskôr príde …Jgf6 a biely ho vymení, zoberieš späť jazdcom bez poškodenia pešiakov.", cEn: "6…Nd7! Later if White trades on f6, you recapture with the knight and keep clean pawns." },
          { m: "h4", cSk: "7.h4! Biely chce chytiť tvojho strelca ťahom h5!", cEn: "7.h4! White threatens h5 to trap your g6 bishop!" },
          { m: "h6", qSk: "Urob strelcovi únikový domček na h7 skôr, než príde h5!", qEn: "Make an escape square on h7 for your bishop before h5 arrives!", cSk: "7…h6! Teraz po h5 strelec pokojne ustúpi na h7 a ostane v bezpečí.", cEn: "7…h6! Now after h5 your bishop slides peacefully to h7.", a: [["g6","h7","chart"]] }
        ],
        endSk: "Dôležitý reflex v Caro-Kanne: keď biely zahrá h4 proti tvojmu strelcovi g6, vždy odpovedaj …h6!",
        endEn: "Key Caro-Kann reflex: whenever White pushes h4 against your g6 bishop, answer …h6!"
      }
    ]
  },

  french: {
    nameSk: "Francúzska obrana",
    nameEn: "French Defense",
    side: "b",
    introSk: "Pevná a bojovná obrana proti 1.e4! Najprv postavíš štít 1…e6 a 2…d5, a potom protiúderom …c5 rozbiješ biely stred.",
    introEn: "A sturdy, fighting defense against 1.e4! Build your shield with 1…e6 and 2…d5, then counterattack White's center with …c5.",
    lines: [
      [5, "e4 e6 d4 d5 e5 c5 c3 Nc6 Nf3 Qb6"],
      [4, "e4 e6 d4 d5 Nc3 Nf6 e5 Nfd7 f4 c5"],
      [3, "e4 e6 d4 d5 exd5 exd5 Nf3 Nf6 Bd3 Bd6 O-O O-O"],
      [3, "e4 e6 d4 d5 Nd2 Nf6 e5 Nfd7 Bd3 c5"]
    ],
    chapters: [
      {
        id: "base",
        titleSk: "Pevnosť 1…e6 a protiúder …c5!",
        titleEn: "The 1…e6 Shield & …c5 Strike!",
        introSk: "V Postupnom variante (3.e5) má biely pešiakovú reťaz d4–e5. Ktorý pešiak je jej základňou a ako na ňu zaútočíš?",
        introEn: "In the Advance Variation (3.e5), White has a pawn chain on d4–e5. Attack the base of the chain immediately!",
        moves: [
          { m: "e4", cSk: "1.e4.", cEn: "1.e4." },
          { m: "e6", qSk: "Priprav …d5 ťahom 1…e6.", qEn: "Prepare …d5 with 1…e6.", cSk: "1…e6! Francúzska obrana.", cEn: "1…e6! The French Defense." },
          { m: "d4", cSk: "2.d4.", cEn: "2.d4." },
          { m: "d5", qSk: "Napadni bieleho pešiaka e4!", qEn: "Attack White's e4 pawn!", cSk: "2…d5!", cEn: "2…d5!" },
          { m: "e5", cSk: "3.e5. Biely zatvoril stred.", cEn: "3.e5. White closes the center." },
          { m: "c5", qSk: "Zaútoč na základňu bielej reťaze – pešiaka d4!", qEn: "Strike at the base of White's pawn chain – d4!", cSk: "3…c5! Toto je najdôležitejší ťah celej Francúzskej obrany.", cEn: "3…c5! The single most important move in the French Defense.", a: [["c5","d4","chart"]] }
        ],
        endSk: "Zapamätaj si: keď vo Francúzskej biely zahrá e5, tvoj prvý cieľ je vždy …c5 proti d4!",
        endEn: "Always remember: when White plays e5 in the French, your #1 move is …c5 against d4!"
      },
      {
        id: "pressure_d4",
        titleSk: "Tlak na d4: …Jc6 a …Db6!",
        titleEn: "Piling Up on d4: …Nc6 & …Qb6!",
        pre: "e4 e6 d4 d5 e5 c5 c3",
        introSk: "Biely bráni pešiaka d4 ťahom c3. Pridaj na d4 ďalších dvoch útočníkov!",
        introEn: "White defends d4 with c3. Pile two more attackers onto d4!",
        moves: [
          { m: "Nc6", qSk: "Pridaj na pešiaka d4 jazdca!", qEn: "Add your knight to the attack on d4!", cSk: "4…Jc6! Už útočia dvaja (pešiak c5 a jazdec c6).", cEn: "4…Nc6! Two attackers on d4 now." },
          { m: "Nf3", cSk: "5.Jf3. Biely bráni d4 aj jazdcom.", cEn: "5.Nf3. White defends d4 with the knight too." },
          { m: "Qb6", qSk: "Pridaj na d4 aj dámu (a popritom pozeraj na b2)!", qEn: "Bring your queen in to attack both d4 and b2!", cSk: "5…Db6! Klasická francúzska zostava: c5 + Jc6 + Db6 drtia pole d4!", cEn: "5…Qb6! The classic French trio (c5 + Nc6 + Qb6) puts huge pressure on d4!", a: [["b6","d4","chart"],["b6","b2","chart"]] }
        ],
        endSk: "Trojica …c5, …Jc6 a …Db6 robí bielemu vo Francúzskej obrovské starosti.",
        endEn: "The trio …c5, …Nc6, and …Qb6 gives White a real headache in the French."
      },
      {
        id: "classical",
        titleSk: "Klasický variant (3.Jc3)",
        titleEn: "Classical Variation (3.Nc3)",
        pre: "e4 e6 d4 d5 Nc3",
        introSk: "Biely bráni e4 jazdcom. Napadni e4 ešte raz svojím kráľovským jazdcom!",
        introEn: "White defends e4 with the knight. Attack e4 again with your kingside knight!",
        moves: [
          { m: "Nf6", qSk: "Vyviň jazdca s útokom na e4!", qEn: "Develop your knight and attack e4!", cSk: "3…Jf6!", cEn: "3…Nf6!" },
          { m: "e5", cSk: "4.e5. Biely napáda tvojho jazdca.", cEn: "4.e5. White chases your knight." },
          { m: "Nfd7", qSk: "Ustúp jazdcom tak, aby neprekážal pešiakovi c5 ani strelcovi.", qEn: "Retreat your knight where it stays ready to support …c5.", cSk: "4…Jfd7! Odtiaľ jazdec podporuje …c5 aj …f6.", cEn: "4…Nfd7! Ready to back up …c5 and …f6." },
          { m: "f4", cSk: "5.f4.", cEn: "5.f4." },
          { m: "c5", qSk: "A teraz ten najdôležitejší úder proti d4!", qEn: "Now unleash the key strike against d4!", cSk: "5…c5! Čierny má okamžitú protihru v strede.", cEn: "5…c5! Immediate counterplay in the center." }
        ],
        endSk: "Aj v Klasickom variante po e5 a …Jfd7 vždy príde náš obľúbený úder …c5!",
        endEn: "Even in the Classical French, …Nfd7 followed by …c5 gives you great counterplay!"
      },
      {
        id: "exchange_fr",
        titleSk: "Výmenný variant (3.exd5)",
        titleEn: "Exchange French (3.exd5)",
        pre: "e4 e6 d4 d5 exd5",
        introSk: "Biely vymenil na d5. Skvelá správa: zrazu sa otvorila cesta aj pre tvojho strelca c8!",
        introEn: "White traded on d5. Great news: your c8 bishop is suddenly completely free!",
        moves: [
          { m: "exd5", qSk: "Zober späť pešiakom e6.", qEn: "Recapture with the e-pawn.", cSk: "3…exd5! Pozícia je symetrická a obaja tvoji strelci sú voľní.", cEn: "3…exd5! Symmetrical and both your bishops are wide open." },
          { m: "Nf3", cSk: "4.Jf3.", cEn: "4.Nf3." },
          { m: "Nf6", qSk: "Vyviň kráľovského jazdca.", qEn: "Develop your kingside knight.", cSk: "4…Jf6.", cEn: "4…Nf6." },
          { m: "Bd3", cSk: "5.Sd3.", cEn: "5.Bd3." },
          { m: "Bd6", qSk: "Vyviň strelca na aktívne pole a priprav rošádu.", qEn: "Develop your bishop actively and prepare to castle.", cSk: "5…Sd6! Po …O-O a …Sg4 má čierny ľahkú, aktívnu hru.", cEn: "5…Bd6! Followed by …O-O and …Bg4 for an easy, active game." }
        ],
        endSk: "Vo Výmennej Francúzskej len rýchlo vyviň figúrky (…Jf6, …Sd6, …O-O, …Sg4) a máš vyrovnanú hru.",
        endEn: "In the Exchange French, just develop smoothly (…Nf6, …Bd6, …O-O, …Bg4) and enjoy equal play."
      }
    ]
  },

  kid: {
    nameSk: "Kráľovská indická obrana",
    nameEn: "King's Indian Defense",
    side: "b",
    introSk: "Dynamická a útočná obrana proti 1.d4! Necháš bieleho zabrať stred, postavíš silného strelca na g7, urobíš rošádu a potom udrieš ťahom …e5!",
    introEn: "A dynamic, attacking defense against 1.d4! Let White build a center, put your powerhouse bishop on g7, castle fast, and strike back with …e5!",
    lines: [
      [5, "d4 Nf6 c4 g6 Nc3 Bg7 e4 d6 Nf3 O-O Be2 e5 O-O Nc6"],
      [4, "d4 Nf6 c4 g6 Nc3 Bg7 e4 d6 Be2 O-O Nf3 e5 d5 Nbd7"],
      [3, "d4 Nf6 c4 g6 Nc3 Bg7 e4 d6 f4 O-O Nf3 c5"],
      [3, "d4 Nf6 Nf3 g6 Bf4 Bg7 e3 O-O Be2 d6 O-O Nbd7"]
    ],
    chapters: [
      {
        id: "setup",
        titleSk: "Strelec na g7 a rýchla rošáda",
        titleEn: "The g7 Bishop & Fast Castling",
        introSk: "Základná zostava Kráľovskej indickej: …Jf6, …g6, …Sg7, …d6 a …O-O. Funguje proti 1.d4 aj 1.c4!",
        introEn: "The core King's Indian setup: …Nf6, …g6, …Bg7, …d6, and …O-O. It works against both 1.d4 and 1.c4!",
        moves: [
          { m: "d4", cSk: "1.d4.", cEn: "1.d4." },
          { m: "Nf6", qSk: "Vyviň jazdca a zabráň okamžitému e4.", qEn: "Develop your knight and stop an instant e4.", cSk: "1…Jf6.", cEn: "1…Nf6." },
          { m: "c4", cSk: "2.c4.", cEn: "2.c4." },
          { m: "g6", qSk: "Priprav fianchetto pre svojho čiernopoľného strelca!", qEn: "Prepare to fianchetto your dark-squared bishop!", cSk: "2…g6! Kráľovská indická obrana.", cEn: "2…g6! The King's Indian Defense." },
          { m: "Nc3", cSk: "3.Jc3.", cEn: "3.Nc3." },
          { m: "Bg7", qSk: "Postav svojho najlepšieho strelca na g7!", qEn: "Put your powerhouse bishop on g7!", cSk: "3…Sg7! Strelec mieri priamo na biely stred d4.", cEn: "3…Bg7! Aims straight at White's d4 center.", a: [["g7","d4","chart"]] },
          { m: "e4", cSk: "4.e4. Biely stavia veľký stred.", cEn: "4.e4. White builds a big center." },
          { m: "d6", qSk: "Zastav bieleho pešiaka e5 a priprav …e5!", qEn: "Stop e5 and prepare your own …e5 break!", cSk: "4…d6! Pevný ťah, bez neho by biely zahnal tvojho jazdca ťahom e5.", cEn: "4…d6! Essential so White can't chase your knight with e5." },
          { m: "Nf3", cSk: "5.Jf3.", cEn: "5.Nf3." },
          { m: "O-O", qSk: "Rýchlo schovaj kráľa do bezpečia!", qEn: "Castle to safety right away!", cSk: "5…O-O! Za 5 ťahov máš bezpečného kráľa a si pripravený zaútočiť na biely stred.", cEn: "5…O-O! In just 5 moves your king is safe and you're ready to strike back." }
        ],
        endSk: "Zostava …Jf6, …g6, …Sg7, …d6, …O-O je super rýchla a univerzálna.",
        endEn: "The …Nf6, …g6, …Bg7, …d6, …O-O setup is fast, safe, and versatile."
      },
      {
        id: "e5_break",
        titleSk: "Úder v strede …e5!",
        titleEn: "The …e5 Central Break!",
        pre: "d4 Nf6 c4 g6 Nc3 Bg7 e4 d6 Nf3 O-O Be2",
        introSk: "Kráľ je v bezpečí – teraz nenechaj bieleho v pokoji ovládnuť šachovnicu! Udri na stred!",
        introEn: "Your king is safe – now don't let White sit comfortably! Strike at the center!",
        moves: [
          { m: "e5", qSk: "Zaútoč na biely stred ťahom …e5!", qEn: "Strike at White's center with …e5!", cSk: "6…e5! Hlavný protiúder Kráľovskej indickej obrany.", cEn: "6…e5! The signature counterstrike of the King's Indian.", a: [["e5","d4","chart"]] },
          { m: "O-O", cSk: "7.O-O.", cEn: "7.O-O." },
          { m: "Nc6", qSk: "Pridaj na d4 tlak jazdcom!", qEn: "Add pressure on d4 with your knight!", cSk: "7…Jc6! Nútiš bieleho rozhodnúť sa: buď zavrie stred d5, alebo vymení.", cEn: "7…Nc6! Forces White to decide whether to push d5 or trade." },
          { m: "d5", cSk: "8.d5. Biely zavrel stred a napáda tvojho jazdca.", cEn: "8.d5. White closes the center and attacks your knight." },
          { m: "Ne7", qSk: "Ustúp jazdcom na e7 (odkiaľ sa presunie do útoku na kráľovskom krídle!).", qEn: "Retreat your knight to e7 (heading for a kingside attack!).", cSk: "8…Je7! Skvelé pole – čoskoro zahráš …Jd7 a …f5 s útokom na bieleho kráľa!", cEn: "8…Ne7! Great square – soon you'll play …Nd7 and …f5 to storm White's king!" }
        ],
        endSk: "Keď biely zavrie stred ťahom d5, tvoj plán je jasný: …Je7, uvoľniť f-pešiaka a zaútočiť …f5!",
        endEn: "When White locks the center with d5, your plan is clear: …Ne7, move the f6 knight, and storm with …f5!"
      },
      {
        id: "f5_storm",
        titleSk: "Útok na kráľa (…f5!)",
        titleEn: "Storming the King (…f5!)",
        pre: "d4 Nf6 c4 g6 Nc3 Bg7 e4 d6 Nf3 O-O Be2 e5 O-O Nc6 d5 Ne7 Ne1",
        introSk: "Stred je zavretý. Biely chystá útok na dámskom krídle, ale ty zaútočíš priamo na jeho kráľa!",
        introEn: "The center is locked. White wants to attack on the queenside, so you launch a fierce attack straight at White's king!",
        moves: [
          { m: "Nd7", qSk: "Uvoľni cestu svojmu f-pešiakovi!", qEn: "Clear the path for your f-pawn!", cSk: "9…Jd7! (Hráva sa aj 9…Je8.) Teraz môže f-pešiak vyraziť dopredu.", cEn: "9…Nd7! (9…Ne8 is also popular.) Now your f-pawn is ready to march." },
          { m: "Nd3", cSk: "10.Jd3.", cEn: "10.Nd3." },
          { m: "f5", qSk: "Začni pešiakovú búrku na kráľovskom krídle!", qEn: "Launch your kingside pawn storm!", cSk: "10…f5! Otváraš cestu veži f8 a chystáš …f4, …g5 a útok na bieleho kráľa!", cEn: "10…f5! Activates the f8 rook and prepares …f4, …g5, and a fierce kingside attack!", a: [["f5","e4","chart"]] }
        ],
        endSk: "V zavretom strede Kráľovskej indickej je …f5 začiatok slávneho útoku na kráľa (obľúbeného u Kasparova a Fischera).",
        endEn: "In the closed King's Indian, …f5 kicks off the famous kingside attack loved by Fischer and Kasparov."
      },
      {
        id: "four_pawns",
        titleSk: "Proti štyrom pešiakom (…c5!)",
        titleEn: "Countering the Four Pawns (…c5!)",
        pre: "d4 Nf6 c4 g6 Nc3 Bg7 e4 d6 f4 O-O Nf3",
        introSk: "Biely postavil až štyroch pešiakov dopredu (c4, d4, e4, f4)! Taký veľký stred sa dá rozbiť rýchlym úderom …c5!",
        introEn: "White pushed four pawns forward (c4, d4, e4, f4)! Tear down that overextended center with a quick …c5!",
        moves: [
          { m: "c5", qSk: "Udri hneď na biely stred pešiakom c5!", qEn: "Strike White's overextended center right away with …c5!", cSk: "6…c5! Chceš otvoriť pozíciu, kým biely kráľ ešte stojí v strede.", cEn: "6…c5! Opens lines while White's king is still stuck in the center.", a: [["c5","d4","chart"]] },
          { m: "d5", cSk: "7.d5.", cEn: "7.d5." },
          { m: "e6", qSk: "Podkop aj pešiaka d5, aby sa otvoril e-stĺpec proti bielemu kráľovi!", qEn: "Undermine d5 too so the e-file opens against White's uncastled king!", cSk: "7…e6! Po …exd5 sa otvorí e-stĺpec pre tvoju vežu a strelec g7 ožije.", cEn: "7…e6! Opens the e-file for your rook and unleashes your g7 bishop." }
        ],
        endSk: "Keď súper príliš vybehne pešiakmi bez rošády, vždy otváraj stred ťahmi …c5 a …e6!",
        endEn: "When an opponent overextends pawns before castling, break open the center with …c5 and …e6!"
      }
    ]
  }
};

const built = buildPack(RAW);
window.PUBLIC_OPENING_STUDIES = built.sk;
window.PUBLIC_OPENING_STUDIES_EN = built.en;
window.PUBLIC_OPENING_STUDIES_FULL_EN = built.fullEn;
window.PUBLIC_OPENINGS_META = built.meta;
})();
