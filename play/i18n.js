/* Chess Journeys / Šachový rozbor – lokalizácia (EN / SK).
 * V slovenčine nerobí žiadne úpravy DOM (nulová réžia pre pôvodnú slovenskú verziu).
 * V angličtine prekladá statický aj dynamický DOM, atribúty, šachovú notáciu (cez sk()),
 * Lichess sady a po načítaní aj príbeh Putovania (window.I18N_STORY). */
(function () {
  "use strict";

  function detectLang() {
    let saved = null;
    try { saved = localStorage.getItem("sach.lang"); } catch (e) {}
    if (saved === "en" || saved === "sk") return saved;
    if (window.PUBLIC_EDITION) {
      const nav = (navigator.language || "en").toLowerCase();
      return nav.startsWith("sk") || nav.startsWith("cs") ? "sk" : "en";
    }
    return "sk";
  }

  const lang = detectLang();
  const isEn = () => lang === "en";

  function setLang(l) {
    if (l !== "en" && l !== "sk") return;
    try { localStorage.setItem("sach.lang", l); } catch (e) {}
    location.reload();
  }

  const EXACT = new Map([
    /* Hlavička, profil, nastavenia */
    ["Šachový rozbor", "Pawn's Quest"],
    ["Chess Journeys", "Pawn's Quest"],
    ["Partie, chyby a puzzle pre každého hráča na jednom mieste. Stockfish rozoberie partiu a v Pokroku vidno, ako sa hráč zlepšuje.", "Games, mistakes, and puzzles for every player in one place. Stockfish analyzes your games and Progress tracks how you improve."],
    ["Hráč", "Player"],
    ["+ Nový hráč", "+ New player"],
    ["⚙️ Nastavenia", "⚙️ Settings"],
    ["Nastavenia", "Settings"],
    ["Téma aplikácie", "App theme"],
    ["Podľa príbehu", "Story theme"],
    ["Pôvodná", "Classic"],
    ["Jazyk / Language", "Language"],
    ["Zvuky a hudba", "Sound & music"],
    ["Zvuky", "Sound effects"],
    ["Hlasitosť", "Volume"],
    ["Hudba", "Music"],
    ["▶ Vyskúšať zvuky", "▶ Test sounds"],
    ["ℹ️ O aplikácii a licencie", "ℹ️ About & Licences"],
    ["💾 Zálohovať dáta", "💾 Backup data"],
    ["📂 Obnoviť zo zálohy", "📂 Restore backup"],
    ["Nový profil hráča", "New player profile"],
    ["Začni vytvorením profilu hráča", "Start by creating a player profile"],
    ["Meno, napr. Tomáš Novák", "Name, e.g. Alex"],
    ["Úroveň hráča", "Player level"],
    ["Podľa úrovne nastavíme náročnosť puzzle", "Sets starting puzzle difficulty"],
    ["Začiatočník – učím sa pravidlá a mat 1 ťahom", "Beginner – learning rules & mate in 1"],
    ["Mierne pokročilý – poznám vidličku a väzbu", "Improver – knows forks & pins"],
    ["Klubový hráč – hrám turnaje a kombinácie", "Club player – plays games & tactics"],
    ["Pokročilý – ťažšie taktiky a koncovky", "Advanced – harder tactics & endgames"],
    ["Vytvoriť", "Create"],
    ["Zrušiť", "Cancel"],
    ["Pripájam databázu…", "Connecting database…"],
    ["Offline šachový tréning bez reklám, bez účtov a bez sledovania. Všetky profily a partie sa ukladajú výlučne v tvojom zariadení.", "Offline chess trainer with no ads, no accounts, and no tracking. All profiles and games stay strictly on your device."],
    ["Otvorené dáta a licencie:", "Open data & licences:"],
    ["Zavrieť", "Close"],

    /* Hlavné taby */
    ["Dnes", "Today"],
    ["Tréning", "Training"],
    ["Putovanie", "Journey"],
    ["Rozbor partie", "Game review"],
    ["Puzzle", "Puzzles"],
    ["Partie", "Games"],
    ["Pokrok", "Progress"],
    ["Hrať", "Play"],
    ["Štúdie", "Studies"],
    ["Analýza", "Analysis"],

    /* Vstup partie & Rozbor */
    ["Nová partia", "New game"],
    ["uložená partia", "saved game"],
    ["Turnaj / podujatie", "Tournament / event"],
    ["napr. Rapid GPX Bratislava", "e.g. Weekend Rapid"],
    ["Dátum", "Date"],
    ["Kolo", "Round"],
    ["napr. 3", "e.g. 3"],
    ["Biely", "White"],
    ["Čierny", "Black"],
    ["Hráč hral", "Player played"],
    ["bielymi", "White"],
    ["čiernymi", "Black"],
    ["Tempo", "Time control"],
    ["Rapid", "Rapid"],
    ["Klasika", "Classical"],
    ["Blesk", "Blitz"],
    ["Future Champions 30+30", "Classical 30+30"],
    ["Turnaj pre najmenších (7 min)", "Kids rapid (7 min)"],
    ["Tréningová", "Practice"],
    ["Výsledok", "Result"],
    ["neukončená", "unfinished"],
    ["Ako skončila", "How it ended"],
    ["mat", "checkmate"],
    ["vzdanie", "resignation"],
    ["prekročenie času", "time forfeit"],
    ["remíza", "draw"],
    ["rozhodol rozhodca (po čase)", "arbiter decision"],
    ["iné", "other"],
    ["Puzzle robiť z chýb", "Create puzzles from mistakes of"],
    ["iba tohto hráča", "this player only"],
    ["oboch strán", "both sides"],
    ["Ťahy (PGN, aj slovenská notácia D V S J)", "Moves (PGN)"],
    ["Analyzovať a uložiť", "Analyze & save"],
    ["Uložiť zmeny údajov", "Save details"],
    ["Hĺbka", "Depth"],
    ["(max 2,5 s/ťah)", "(max 2.5 s/move)"],
    ["Súbor .pgn", ".pgn file"],
    ["Hodnotenie pozície", "Position evaluation"],
    ["Začiatok", "Start"],
    ["Späť", "Back"],
    ["Ďalej", "Next"],
    ["Koniec", "End"],
    ["Otočiť", "Flip"],
    ["Analyzovať pozíciu", "Analyze position"],
    ["🔍 Analyzovať pozíciu", "🔍 Analyze position"],
    ["Graf hodnotenia", "Evaluation graph"],
    ["Kľúčové momenty", "Key moments"],
    ["Ťahy", "Moves"],

    /* Štúdie & Analýza */
    ["← Všetky štúdie", "← All studies"],
    ["Precvičiť", "Practice"],
    ["Prezrieť s vysvetlením", "Browse with notes"],
    ["Nápoveda", "Hint"],
    ["Ukáž ťah", "Show move"],
    ["Začať znova", "Restart"],
    ["Ďalšia kapitola", "Next chapter"],
    ["Zahrať si to proti Stockfishu", "Play it vs Stockfish"],
    ["Kapitoly", "Chapters"],
    ["← Späť do štúdie", "← Back to study"],
    ["Línie", "Lines"],
    ["Ťahy a varianty", "Moves & variations"],
    ["Povýšiť variant", "Promote line"],
    ["Zmazať od tohto ťahu", "Delete from here"],
    ["Nová pozícia (FEN alebo PGN)", "New position (FEN or PGN)"],
    ["Základné postavenie", "Starting position"],
    ["FEN pozície", "Position FEN"],
    ["Načítať FEN", "Load FEN"],
    ["PGN alebo ťahy (aj D V S J)", "PGN or moves"],
    ["Načítať PGN", "Load PGN"],
    ["Export", "Export"],
    ["FEN aktuálnej pozície", "Current position FEN"],
    ["PGN s variantmi", "PGN with variations"],
    ["Kopírovať PGN", "Copy PGN"],
    ["Základné koncovky", "Essential Endgames"],
    ["Evansov gambit", "Evans Gambit"],
    ["Fried Liver útok", "Fried Liver Attack"],
    ["Škandinávska obrana", "Scandinavian Defense"],
    ["Talianska hra – základy", "Italian Game – Basics"],
    ["Taktika – základy", "Tactics – Basics"],

    /* Hrať proti Stockfishu */
    ["Rebríček súperov", "Opponent Ladder"],
    ["Voľná hra a otvorenia", "Free play & openings"],
    ["Porazíš súpera a odomkne sa ďalší, silnejší. Výhra sa počíta bez vracania ťahov a bez nápovedy najlepších ťahov.", "Beat an opponent to unlock the next stronger one. Wins count without takebacks or best-move hints."],
    ["Hráš za", "Play as"],
    ["náhodne", "random"],
    ["biele", "White"],
    ["čierne", "Black"],
    ["Sila Stockfishu", "Stockfish strength"],
    ["1 – úplný začiatočník", "1 – complete beginner"],
    ["2 – začiatočník", "2 – beginner"],
    ["3 – mierne pokročilý", "3 – improver"],
    ["4 – klubový hráč", "4 – club player"],
    ["5 – silný klubový hráč", "5 – strong club player"],
    ["6 – veľmi silný", "6 – very strong"],
    ["7 – majster", "7 – master"],
    ["8 – plná sila", "8 – full strength"],
    ["Pestrosť súpera v otvorení", "Opening variety"],
    ["Iba hlavná teória", "Main theory only"],
    ["Pestré – aj bežné ťahy amatérov", "Varied – common amateur lines too"],
    ["Veľmi pestré – aj prekvapenia mimo teórie", "Very varied – offbeat surprises too"],
    ["Tréning otvorenia", "Opening training"],
    ["Voľná hra (bez otvorenia)", "Free game (any opening)"],
    ["Nová hra", "New game"],
    ["Ukazovať najlepšie ťahy", "Show best moves"],
    ["Najlepšie ťahy teraz", "Best moves now"],
    ["Vrátiť ťah", "Take back"],
    ["Vzdať", "Resign"],
    ["Rozobrať partiu", "Review game"],
    ["Pokračovať", "Continue"],
    ["Znova", "Play again"],

    /* Tréning & Detektív */
    ["← Späť do Tréningu", "← Back to Training"],
    ["Späť do Tréningu", "Back to Training"],
    ["Detektív: moment z tvojej partie", "Detective: moment from your game"],
    ["Hotovo – späť do Tréningu", "Done – back to Training"],
    ["Späť na misiu", "Back to mission"],

    /* Puzzle režimy */
    ["Puzzle z mojich chýb", "Puzzles from my mistakes"],
    ["Podľa mojej sily", "Adaptive puzzles"],
    ["Jednoťahové rýchlovky", "1-Move Rush"],
    ["Hrozby", "Threats"],
    ["Ďateľ", "Pattern Drill"],
    ["Hádaj ťah majstra", "Guess the Master Move"],
    ["Vyber si iný druh puzzle", "Choose another puzzle mode"],
    ["Zostať tu", "Stay here"],
    ["Iné puzzle", "Other puzzles"],
    ["Ďateľ – opakuj a zrýchľuj", "Pattern Drill – repeat & speed up"],
    ["Vyber si sadu úloh a vyrieš ju celú. Potom ju rieš znova od začiatku, zakaždým rýchlejšie a presnejšie. Úlohy sa nemenia, aby si si vzory zapamätal a nakoniec ich videl na prvý pohľad. Časomiera nič nezastaví, len meria tvoj čas.", "Pick a puzzle set and solve it all. Then repeat it from the start, faster and more accurately each cycle. The puzzles stay the same so patterns stick at a glance."],
    ["Vyber si sadu úloh.", "Choose a puzzle set."],
    ["Ďalšia úloha", "Next puzzle"],
    ["Ďalšia úloha ›", "Next puzzle ›"],
    ["Späť na sady", "Back to sets"],
    ["Cyklus dokončený!", "Cycle complete!"],
    ["Ďalší cyklus", "Next cycle"],
    ["Začať", "Start"],
    ["Ešte nezačatá", "Not started yet"],
    ["★ Pre tvoju silu", "★ For your level"],
    ["pre pokročilých", "advanced"],

    /* Hrozby */
    ["Hrozby – čo chce súper?", "Threats – what does your opponent want?"],
    ["Dva druhy krátkych úloh.", "Two kinds of short exercises."],
    ["Čo hrozí?", "What is the threat?"],
    ["Najprv zahraj súperov ťah, ktorým ti hrozí (alebo klikni „Nič nehrozí“), potom sa bráň.", "First play your opponent's threat (or click \"No threat\"), then defend."],
    ["Je ťah bezpečný?", "Is the move safe?"],
    ["Šípka ukáže ťah, ty povieš áno alebo nie. Ak nie je bezpečný, ukáž, ako ho súper potrestá. Kolo má 4 úlohy, každá správna je za 10 bodov.", "An arrow shows a move; decide if it's safe. If not, show how the opponent punishes it. 4 puzzles per round, 10 pts each."],
    ["Štart", "Start"],
    ["Stlač Štart.", "Press Start."],
    ["Nič nehrozí", "No threat"],
    ["Áno, je bezpečný", "Yes, it's safe"],
    ["Nie, nie je", "No, unsafe"],
    ["Ukončiť kolo", "End round"],
    ["Kolo hrozieb skončilo", "Threats round finished"],
    ["Ďalšie kolo", "Next round"],
    ["Správne spolu", "Total correct"],
    ["Úloh spolu", "Total puzzles"],

    /* Rýchlovky */
    ["Jednoduché úlohy na jeden ťah: mat jedným ťahom alebo získanie figúrky. Na každú máš", "Fast 1-move puzzles: mate in 1 or win a free piece. You have"],
    ["10 sekúnd", "10 seconds"],
    [". Správne riešenie", " per puzzle. Correct move"],
    ["+3 body", "+3 pts"],
    [", zlý ťah alebo koniec času", ", mistake or timeout"],
    ["−1 bod", "−1 pt"],
    [". Kolo má 20 úloh.", ". 20 puzzles per round."],
    ["Kolo skončilo", "Round finished"],
    ["Úlohy, ktoré nevyšli", "Missed puzzles"],
    ["Klikni na úlohu, pozri sa na šachovnicu a skús nájsť ťah bez časomiery.", "Click a puzzle to look at the board and find the move without a timer."],
    ["Ukáž správny ťah", "Show correct move"],
    ["Body spolu", "Total points"],
    ["Rekord kola", "Best round"],
    ["Kolá", "Rounds"],
    ["Posledné kolá", "Recent rounds"],

    /* Adaptívne puzzle & Majstri */
    ["Tvoj puzzle rating", "Your puzzle rating"],
    ["Táto úloha", "This puzzle"],
    ["Téma", "Theme"],
    ["Všetky témy", "All themes"],
    ["Vidličky", "Forks"],
    ["Nechránené figúry", "Hanging pieces"],
    ["Odťah", "Discovered attacks"],
    ["Väzba", "Pins"],
    ["Maty", "Checkmates"],
    ["Koncovky", "Endgames"],
    ["Stratégia", "Strategy"],
    ["Voľný pešiak", "Passed pawn"],
    ["Röntgen a útek", "Skewers & escape"],
    ["Kráľ v koncovke", "King in endgame"],
    ["Pat", "Stalemate"],
    ["Mat vežou", "Rook checkmate"],
    ["Ukáž riešenie", "Show solution"],
    ["Zahraj najlepší ťah na šachovnici.", "Play the best move on the board."],
    ["Prehraj si slávne partie veľmajstrov a v kľúčových momentoch skús uhádnuť, aký ťah majster zahral. Za každý uhádnutý ťah na prvý pokus získaš 3 body!", "Play through famous grandmaster games and guess the master's move at key moments. 3 points for every move guessed on the first try!"],
    ["Ďalší moment ›", "Next moment ›"],
    ["Späť na partie", "Back to games"],
    ["Partia dohratá!", "Game finished!"],
    ["Hrať znova", "Play again"],
    ["Rozobrať celú partiu", "Review full game"],
    ["Ďalší puzzle", "Next puzzle"],
    ["Otvoriť partiu", "Open game"],
    ["Zmazať", "Delete"],
    ["Typ úlohy", "Puzzle type"],
    ["Preniesť k tomuto hráčovi", "Move to this player"],
    ["Pridať puzzle z pozície (FEN)", "Add puzzle from FEN"],
    ["Vytvoriť puzzle", "Create puzzle"],
    ["Export puzzle (PGN pre Lichess štúdiu)", "Export puzzles (PGN for Lichess study)"],
    ["Kopírovať", "Copy"],

    /* Partie, Pokrok, Dnes, Úrovne, Odznaky */
    ["Druh partií", "Game type"],
    ["Turnajové a ostatné", "Tournament & other"],
    ["Proti Stockfishu", "Vs Stockfish"],
    ["Všetky", "All"],
    ["všetky", "all"],
    ["Hľadať", "Search"],
    ["turnaj alebo súper", "tournament or opponent"],
    ["Úroveň", "Level"],
    ["Pešiak", "Pawn"],
    ["Jazdec", "Knight"],
    ["Strelec", "Bishop"],
    ["Veža", "Rook"],
    ["Dáma", "Queen"],
    ["Kráľ", "King"],
    ["Ako získať body", "How to earn points"],
    ["vyriešený puzzle aj úloha Hrozby: 10 bodov", "solved puzzle or Threat exercise: 10 pts"],
    ["splnená denná misia: 50", "daily mission completed: 50 pts"],
    ["partia v otvorení: 20, voľná partia so Stockfishom: 15, výhra navyše 10 × sila", "opening game: 20, free game vs Stockfish: 15, win bonus 10 × level"],
    ["uložená turnajová partia: 30, výhra +20, remíza +10", "saved tournament game: 30, win +20, draw +10"],
    ["každý odznak: 50", "each badge: 50 pts"],
    ["kapitola štúdie: 10 za každú hviezdičku", "study chapter: 10 per star"],
    ["Ďateľ: 20 za každých 12 vyriešených úloh, +10 za cyklus rýchlejší alebo presnejší ako minule", "Pattern Drill: 20 per 12 solved puzzles, +10 for a faster or more accurate cycle"],
    ["Putovanie: krok cesty 20, odbočka 10, porazený boss 30", "Journey: path step 20, side quest 10, boss defeated 30"],
    ["Séria", "Streak"],
    ["dní v rade", "days in a row"],
    ["Dnešná misia", "Today's mission"],
    ["Album odznakov", "Badge album"],
    ["Ďalej ›", "Next ›"],
    ["Preskočiť", "Skip"],
    ["Súperi", "Opponents"],
    ["Turnaje", "Tournaments"],
    ["Otvorenia a Stockfish", "Openings & Stockfish"],
    ["Prvý krok", "First step"],
    ["Splň prvú dennú misiu.", "Complete your first daily mission."],
    ["Týždeň v rade", "One week streak"],
    ["Séria 7 dní.", "7-day streak."],
    ["Dva týždne", "Two weeks"],
    ["Séria 14 dní.", "14-day streak."],
    ["Neúnavný", "Unstoppable"],
    ["Séria 30 dní.", "30-day streak."],
    ["Verný tréner", "Dedicated trainee"],
    ["Splň 25 denných misií.", "Complete 25 daily missions."],
    ["Riešiteľ", "Solver"],
    ["Vyrieš 25 puzzle.", "Solve 25 puzzles."],
    ["Majster puzzle", "Puzzle master"],
    ["Vyrieš 100 puzzle.", "Solve 100 puzzles."],
    ["Ostrostrelec", "Sharpshooter"],
    ["10 puzzle na prvý pokus v dennej misii.", "10 first-try puzzles in daily missions."],
    ["Strážca figúrok", "Piece guardian"],
    ["Vyrieš 20 puzzle typu Nekrytá figúrka.", "Solve 20 hanging-piece puzzles."],
    ["Strážca kráľa", "King's guardian"],
    ["Vyrieš 15 puzzle s hrozbou alebo matom od súpera.", "Solve 15 opponent-threat or mate puzzles."],
    ["Taktik", "Tactician"],
    ["Vyrieš 20 puzzle typu Nevyužitá taktika.", "Solve 20 missed-tactic puzzles."],
    ["Lovec matov", "Mate hunter"],
    ["Vyrieš 10 puzzle na mat.", "Solve 10 checkmate puzzles."],
    ["Turnajový hráč", "Tournament player"],
    ["Ulož 10 turnajových partií.", "Save 10 tournament games."],
    ["Ostrieľaný bojovník", "Seasoned fighter"],
    ["Ulož 25 turnajových partií.", "Save 25 tournament games."],
    ["Prvá výhra", "First win"],
    ["Vyhraj turnajovú partiu.", "Win a tournament game."],
    ["Víťaz", "Winner"],
    ["Vyhraj 10 turnajových partií.", "Win 10 tournament games."],
    ["Pán času", "Time master"],
    ["5 turnajových partií za sebou bez prehry na čas.", "5 tournament games in a row without losing on time."],
    ["Bez hrubej chyby", "Blunder-free"],
    ["Turnajová partia bez jedinej hrubej chyby.", "Tournament game without a single blunder."],
    ["Presná ruka", "Steady hand"],
    ["Turnajová partia s presnosťou aspoň 80 %.", "Tournament game with at least 80% accuracy."],
    ["Teoretik", "Theoretician"],
    ["Odohraj 10 partií v tréningu otvorení.", "Play 10 opening training games."],
    ["Taliansky majster", "Italian master"],
    ["10 partií v Talianskej hre (aj Evans a Fried Liver).", "10 games in the Italian Game (incl. Evans & Fried Liver)."],
    ["Prvá výhra nad počítačom", "First win vs engine"],
    ["Poraz Stockfish bez vracania ťahov.", "Beat Stockfish without takebacks."],
    ["Znalec Evansovho gambitu", "Evans Gambit scholar"],
    ["Prejdi všetky kapitoly štúdie Evansov gambit.", "Complete all chapters of the Evans Gambit study."],
    ["Premožiteľ strojov", "Machine slayer"],
    ["Poraz Stockfish na sile 4 alebo vyššej bez vracania ťahov.", "Beat Stockfish at level 4 or higher without takebacks."],

    /* Putovanie – spoločné UI */
    ["← Šachovnica", "← Chessboard"],
    ["← Mapa", "← Map"],
    ["📖 Kniha príbehov", "📖 Story Book"],
    ["↺ Začať odznova", "↺ Start over"],
    ["❄️ Sezóna 2", "❄️ Season 2"],
    ["🌳 Sezóna 1", "🌳 Season 1"],
    ["▶ Začať putovanie", "▶ Start Journey"],
    ["▶ Začať sezónu 2", "▶ Start Season 2"],
    ["💬 Stretnutie so sprievodcom", "💬 Meet the guide"],
    ["🗺️ Na mapu", "🗺️ Back to map"],
    ["Hotovo na dnes ✔", "Done for today ✔"],
    ["Hrať ďalej", "Keep playing"],
    ["Zajtra pokračuješ ✓", "Continue tomorrow ✓"],
    ["Ďakujem! ✔", "Thank you! ✔"],
    ["Skúsiť znova", "Try again"],
    ["Prejdené ✔", "Completed ✔"],
    ["Toto miesto je už prejdené 🏆 Odbočky si tu môžeš kedykoľvek zopakovať.", "This land is already cleared 🏆 You can replay side quests anytime."],
    ["Toto miesto ešte nie je na rade.", "This land is not unlocked yet."],
    ["Najprv vytvor profil hráča.", "Create a player profile first."],
    ["Načítavam putovanie…", "Loading journey…"],
    ["Príbeh", "Story"],
    ["Prológ", "Prologue"],
    ["Ako to celé začalo", "How it all began"],
    ["Epilóg", "Epilogue"],
    ["Slnko nad lesom", "Sun over the forest"],
    ["Súboj", "Battle"],
    ["⚡ Pretek rýchloviek", "⚡ Speed Race"],
    ["Ty", "You"],
    ["Nie", "No"],
    ["Odomknúť", "Unlock"],
    ["❄️ Odomknúť sezónu 2?", "❄️ Unlock Season 2?"],
    ["Rodičovský prehľad", "Parent overview"],

    /* Dni v týždni */
    ["Po", "Mo"], ["Ut", "Tu"], ["St", "We"], ["Št", "Th"], ["Pi", "Fr"], ["So", "Sa"], ["Ne", "Su"],

    /* Dnes – séria, misie, odznaky */
    ["Novú sériu začneš jednou z týchto vecí:", "Start a new streak with any of these:"],
    ["Dnešná séria je zachránená!", "Today's streak is safe!"],
    ["splnená denná misia", "completed daily mission"],
    ["krok cesty alebo súboj v Putovaní", "a path step or boss battle in Journey"],
    ["dohraná celá partia so Stockfishom", "a finished game vs Stockfish"],
    ["dokončená kapitola v Štúdiách", "a completed chapter in Studies"],
    ["Zahraj partiu v otvorení", "Play an opening game"],
    ["Najprv si v Tréningu (blok B) pozri štúdiu otvorenia a potom ho vyskúšaj tu. Odohraj aspoň 8 ťahov.", "First review the opening study in Training (block B), then try it here. Play at least 8 moves."],
    ["Vyrieš 3 puzzle", "Solve 3 puzzles"],
    ["Vyrieš 5 puzzle", "Solve 5 puzzles"],
    ["Rýchlovky", "1-Move Rush"],
    ["Bystré oko", "Sharp Eye"],
    ["Rýchle oko", "Quick Eye"],
    ["Rýchlik", "Speedster"],
    ["Bez zaváhania", "Flawless"],
    ["Kolo, v ktorom vyriešiš všetkých 20 úloh.", "A round where you solve all 20 puzzles."],

    /* Tréning – témy týždňa a bloky */
    ["Téma (pre rodiča)", "Theme (for parent)"],
    ["Nekryté figúrky a hrozby", "Hanging pieces & threats"],
    ["Dvojitý útok (vidlička)", "Double attack (fork)"],
    ["Väzba a röntgen", "Pins & skewers"],
    ["Mat 2 ťahmi a obrana proti matu", "Mate in 2 & mate defense"],
    ["Odkrytý útok", "Discovered attack"],
    ["Koncovky: kráľ a pešiak", "Endgames: king & pawn"],
    ["Spolupráca figúr a zlaté pravidlá otvorenia", "Piece coordination & opening principles"],
    ["Opakovanie a meranie času", "Repetition & timing"],
    ["1. Nekryté figúrky a hrozby", "1. Hanging pieces & threats"],
    ["2. Dvojitý útok (vidlička)", "2. Double attack (fork)"],
    ["3. Väzba a röntgen", "3. Pins & skewers"],
    ["4. Mat 2 ťahmi a obrana proti matu", "4. Mate in 2 & mate defense"],
    ["5. Odkrytý útok", "5. Discovered attack"],
    ["6. Koncovky: kráľ a pešiak", "6. Endgames: king & pawn"],
    ["7. Spolupráca figúr a zlaté pravidlá otvorenia", "7. Piece coordination & opening principles"],
    ["8. Opakovanie a meranie času", "8. Repetition & timing"],
    ["Po každom súperovom ťahu sa spýtaj: Čo mi hrozí? Ktorá figúrka je nekrytá?", "After every opponent move, ask: What is the threat? Which piece is undefended?"],
    ["Jedna figúrka napadne dve naraz. Súper zachráni len jednu.", "One piece attacks two targets at once. Your opponent can only save one."],
    ["Zviazaná figúrka sa nesmie alebo nechce pohnúť. Zaútoč na ňu ešte raz.", "A pinned piece cannot or should not move. Attack it again!"],
    ["Najprv pozri všetky šachy, potom brania, potom hrozby.", "Always check checks first, then captures, then threats."],
    ["Figúrka odíde z cesty a odkryje útok figúrky, ktorá stojí za ňou.", "One piece moves out of the way to unleash an attack from the piece behind it."],
    ["V koncovke je kráľ silná figúrka. Pošli ho dopredu.", "In the endgame, the king is a strong piece. Bring it forward!"],
    ["Vyviň figúrky, urob rošádu, ovládni stred. Figúrky si majú pomáhať.", "Develop your pieces, castle, control the center. Pieces work best together."],
    ["Tú istú sadu skús rýchlejšie a presnejšie ako minule.", "Try the same set faster and more accurately than last time."],
    ["Rozcvička", "Warm-up"],
    ["Kolo jednoťahových rýchloviek (asi 3 minúty), puzzle z tvojich chýb a kolo Hrozieb: čo chce súper?", "A round of 1-Move Rush (~3 min), puzzles from your mistakes, and a Threats round."],
    ["rýchlovky", "rush"],
    ["Štúdia otvorenia", "Opening study"],
    ["Téma týždňa: Ďateľ", "Theme of the week: Pattern Drill"],

    /* Prázdne stavy & stavové hlášky (Rozbor, Partie, Pokrok, Hrať, Analýza, Puzzle) */
    ["Vyplň údaje a vlož ťahy partie.", "Fill in the details and paste the game moves."],
    ["Vlož ťahy partie hore. Pre vyskúšanie môžeš", "Paste game moves above. To try it out, you can"],
    ["načítať ukážkovú partiu", "load a sample game"],
    ["Zatiaľ žiadne ťahy.", "No moves yet."],
    ["Zatiaľ žiadne uložené partie. V záložke Rozbor partie vyplň údaje, vlož ťahy a stlač Analyzovať a uložiť.", "No saved games yet. In Game review, fill in the details, paste the moves, and click Analyze & save."],
    ["Detailné grafy z partií sa zobrazia po prvej analyzovanej partii.", "Detailed game charts will appear after your first analyzed game."],
    ["pridať obrázok", "add photo"],
    ["zmeniť obrázok", "change photo"],
    ["odstrániť", "remove"],
    ["✓ porazený", "✓ defeated"],
    ["Béčko", "Benny"],
    ["Cilka", "Cece"],
    ["Ela", "Ella"],
    ["Viktor", "Victor"],
    ["Albín", "Albin"],
    ["Kráľ Hugo", "King Hugo"],
    ["Temný kráľ", "Dark King"],
    ["Si na ťahu.", "Your move."],
    ["Stockfish premýšľa…", "Stockfish is thinking…"],
    ["Východisková pozícia · na ťahu biely", "Starting position · White to move"],
    ["Východisková pozícia · na ťahu čierny", "Starting position · Black to move"],
    ["Stockfish počíta…", "Stockfish is calculating…"],
    ["Ťahaj figúrkami za oboch hráčov. Nový ťah z inej pozície vytvorí variant.", "Move pieces for both sides. Playing a different move from an earlier position creates a variation."],
    ["Zatiaľ žiadne puzzle", "No puzzles yet"],
    ["Analyzuj partiu a chyby sa sem pridajú automaticky. Alebo pridaj pozíciu z FEN nižšie.", "Analyze a game and mistakes will be added automatically. Or add a position from FEN below."],
    ["Pripravený? Stlač Štart.", "Ready? Press Start."],
    ["Vyber si majstrovskú partiu.", "Choose a master game."],

    /* Štúdie – intro a názvy kapitol */
    ["Vyber si kapitolu. Odporúčame ísť po poradí.", "Choose a chapter. We recommend going in order."],
    ["Taktika – sovietsky šlabikár", "Tactics – Basics"],
    ["Evansov gambit je odvážne otvorenie v Talianskej hre. Biely daruje pešiaka a za to rýchlo vyvinie figúrky a postaví silný stred. V každej kapitole hráš za bieleho a hľadáš správne ťahy.", "The Evans Gambit is a bold opening in the Italian Game. White sacrifices a pawn for rapid development and a strong center. In each chapter you play White and find the right moves."],
    ["Prečo 4.b4?", "Why 4.b4?"],
    ["Hlavný variant", "Main line"],
    ["Pasca na f7", "Trap on f7"],
    ["Chamtivý čierny", "Greedy Black"],
    ["Laskerova obrana", "Lasker Defense"],
    ["Pasca: 7…Jf6?", "Trap: 7…Nf6?"],
    ["Ústup 5…Sc5 a vidlička", "5…Bc5 retreat & fork"],
    ["Ústup 5…Se7", "5…Be7 retreat"],
    ["Odmietnutý gambit 4…Sb6", "Declined Gambit 4…Bb6"],
    ["Útok na f7: 4.Jg5", "Attack on f7: 4.Ng5"],
    ["Kráľ sa schová zle: mat!", "King hides poorly: mate!"],
    ["Najčastejšia obrana 8…Je7: otvor stred", "Main defense 8…Ne7: open the center"],
    ["Kráľ zje pešiaka: mat!", "King takes the pawn: mate!"],
    ["Hladný jazdec: 8…Jb4", "Hungry knight: 8…Nb4"],
    ["Správna obrana 5…Ja5", "Best defense 5…Na5"],
    ["Strelec ide domov: 5…Jd4", "Bishop goes home: 5…Nd4"],
    ["Chyba 4…h6?", "Mistake 4…h6?"],
    ["Chyba 4…Jxe4?", "Mistake 4…Nxe4?"],
    ["Traxlerov protiútok 4…Sc5", "Traxler Counterattack 4…Bc5"],
    ["Tri pravidlá a tichý Talian", "Three rules & Giuoco Piano"],

    /* Putovanie – riešenie úloh a vysvetlenia */
    ["Prečo to funguje:", "Why it works:"],
    ["Mat! Výborne!", "Checkmate! Great job!"],
    ["Správne! Výborne!", "Correct! Great job!"],
    ["Správne – na druhý pokus!", "Correct – on the second try!"],
    ["Áno, takto. Ide sa ďalej.", "Yes, like that. Let's keep going."],
    ["Pozrieť výsledok ›", "See results ›"],
    ["Ukáž mi riešenie", "Show solution"],
    ["🔍 Lupa", "🔍 Magnifier"],
    ["🧭 Kompas", "🧭 Compass"],
    ["💡 Nápoveda", "💡 Hint"],
    ["Skús ešte raz.", "Try again."],
    ["Koncovka tentoraz ušla – skús ju nabudúce znova.", "The endgame slipped away this time – try it again next time."],

    /* Putovanie – rozdelené textové uzly a rodičovský prehľad */
    ["Béčko je na", "Benny is on"],
    ["Cilka je na", "Cece is on"],
    [", Kráľ Hugo na", ", King Hugo on"],
    ["– miesto", "–"],
    ["Ťah", "Move"],
    ["Pre rodiča", "For parents"],
    ["Rating úloh:", "Puzzle rating:"],
    ["Povoliť ďalšiu krajinu ešte dnes", "Allow another land today"],
    ["Odomknúť sezónu 2 už teraz", "Unlock Season 2 now"],
    ["Sezóna 2 – Ľadová ríša sa normálne odomkne po epilógu sezóny 1. Ak chceš, môžeš ju odomknúť už teraz. Rozohraná sezóna 1 ostane tak, ako je.", "Season 2 – Ice Realm normally unlocks after the Season 1 epilogue. You can unlock it right now if you want. Your Season 1 progress stays safe."],
    ["Sezóna 2 je odomknutá ❄️", "Season 2 unlocked ❄️"],

    /* Lichess sady Ďatľa a skupiny */
    ["Mat 2 ťahmi", "Mate in 2"],
    ["Mat 3 ťahmi", "Mate in 3"],
    ["Vidličky a dvojitý útok", "Forks & double attacks"],
    ["Odkrytý útok a dvojitý šach", "Discovered attack & double check"],
    ["Röntgen a špíz", "Skewers & X-ray"],
    ["Obrana a nechránené figúry", "Defense & hanging pieces"],
    ["Taktika a kombinácie", "Tactics & combinations"],
    ["Mat 2 ťahmi – ľahké", "Mate in 2 – Easy"],
    ["Mat 2 ťahmi – stredné", "Mate in 2 – Medium"],
    ["Mat 2 ťahmi – ťažšie", "Mate in 2 – Hard"],
    ["Mat 2 ťahmi – majstrovské", "Mate in 2 – Master"],
    ["Mat 3 ťahmi – sada 1", "Mate in 3 – Set 1"],
    ["Mat 3 ťahmi – sada 2", "Mate in 3 – Set 2"],
    ["Vidličky – ľahké", "Forks – Easy"],
    ["Vidličky – stredné", "Forks – Medium"],
    ["Vidličky – ťažšie", "Forks – Hard"],
    ["Väzba – ľahké", "Pins – Easy"],
    ["Väzba – stredné", "Pins – Medium"],
    ["Väzba – ťažšie", "Pins – Hard"],
    ["Odkrytý útok – ľahké", "Discovered attack – Easy"],
    ["Odkrytý útok – ťažšie", "Discovered attack – Hard"],
    ["Röntgen a špíz – ľahké", "Skewers – Easy"],
    ["Röntgen a špíz – ťažšie", "Skewers – Hard"],
    ["Obrana a záchrana", "Defense & rescue"],
    ["Chytená figúra a odlákanie", "Trapped piece & deflection"],
    ["Voľný pešiak a premena", "Passed pawn & promotion"],
    ["Pešiakové koncovky", "Pawn endgames"],
    ["Vežové koncovky", "Rook endgames"],
    ["Pat, podpremena a zugzwang", "Stalemate, underpromotion & zugzwang"],
    ["Mat na poslednom rade", "Back-rank mate"],
    ["Obeta a útok na kráľa", "Sacrifice & kingside attack"]
  ]);

  const LEVEL_PIECE = { Pešiak: "Pawn", Jazdec: "Knight", Strelec: "Bishop", Veža: "Rook", Dáma: "Queen", Kráľ: "King" };

  /* Parametrické vzory pre dynamicky generované hlášky */
  const PATTERNS = [
    [/^(\d+)\/(\d+) dnes$/, (_, a, b) => `${a}/${b} today`],
    [/^(Pešiak|Jazdec|Strelec|Veža|Dáma|Kráľ) (I{1,3})$/, (_, p, r) => `${LEVEL_PIECE[p]} ${r}`],
    [/^(\d+) bodov · ešte (\d+) do úrovne (Pešiak|Jazdec|Strelec|Veža|Dáma|Kráľ) (I{1,3})$/, (_, a, b, p, r) => `${a} pts · ${b} more to ${LEVEL_PIECE[p]} ${r}`],
    [/^(\d+) bodov · najvyššia úroveň$/, (_, a) => `${a} pts · max level`],
    [/^blok C Tréningu: (.+)$/, (_, a) => `Training block C: ${translateString(a)}`],
    [/^10 vyriešených úloh v hocijakom režime \((\d+)\/(\d+)\)$/, (_, a, b) => `10 puzzles solved in any mode (${a}/${b})`],
    [/^Najdlhšia séria: (\d+)\. Jeden vynechaný deň za týždeň sériu nezruší\.$/, (_, n) => `Longest streak: ${n}. Missing one day a week won't break your streak.`],
    [/^Partia proti postavičke: (.+)$/, (_, n) => `Game vs character: ${translateString(n)}`],
    [/^(.+) \(≈ (\d+) Elo\)\. Ráta sa dohraná partia, aj keď prehráš\. Výhra bez nápovedy a bez vracania ťahov odomkne ďalšieho súpera\.$/, (_, n, e) => `${translateString(n)} (≈ ${e} Elo). Any finished game counts, even a loss. Winning without hints or takebacks unlocks the next opponent.`],
    [/^(\d+)\. (Béčko|Cilka|Gusto|Ela|Viktor|Albín|Kráľ Hugo|Temný kráľ)$/, (_, i, n) => `${i}. ${translateString(n)}`],
    [/^(\d+)\/(\d+) · na nástenke vyfarbi (\d+) z (\d+)$/, (_, a, b) => `${a}/${b}`],
    [/^Znalec: (.+)$/, (_, n) => `Scholar: ${translateString(n)}`],
    [/^Prejdi všetky kapitoly štúdie (.+)\.$/, (_, n) => `Complete all chapters of ${translateString(n)}.`],
    [/^Získaj spolu (\d+) bodov v rýchlovkách\.$/, (_, n) => `Earn ${n} total points in 1-Move Rush.`],
    [/^Získaj aspoň (\d+) bodov v jednom kole\.$/, (_, n) => `Score at least ${n} points in a single round.`],
    [/^Téma týždňa · (\d+)\. z (\d+)$/, (_, a, b) => `Theme of the week · ${a} of ${b}`],
    [/^(.+): kapitola „(.+)“\. Hraj ťahy a zisti, prečo sú dobré\. Potom to vyskúšaj v dennej misii v partii proti Stockfishu\.$/, (_, st, ch) => `${translateString(st)}: chapter "${translateString(ch)}". Play the moves to see why they work, then try it in your daily mission vs Stockfish.`],
    [/^Sada „(.+)“\. Vyrieš (\d+) úloh alebo dokonči cyklus\. Za blok je (\d+) bodov\.$/, (_, s, n, p) => `Set "${translateString(s)}". Solve ${n} puzzles or finish a cycle. Worth ${p} pts.`],
    [/^úlohy (\d+)\/(\d+)$/, (_, a, b) => `puzzles ${a}/${b}`],
    [/^Každý blok trvá asi 10 minút\..*Denná misia: (\d+)\/(\d+)\.$/, (_, a, b) => `Each block takes ~10 minutes. Training is for learning: mistakes, openings, puzzles, and rush. Then apply it in daily mission games. Short day: A + B, full day: A + B + C. Daily mission: ${a}/${b}.`],
    [/^Voľná hra · hráš za (biele|čierne) · sila (\d+)$/, (_, c, lvl) => `Free game · playing ${c === "biele" ? "White" : "Black"} · level ${lvl}`],
    [/^Všetky puzzle \((\d+)\)$/, (_, n) => `All puzzles (${n})`],
    [/^Adaptívna úloha \(≈ (\d+) Elo\)$/, (_, e) => `Adaptive puzzle (≈ ${e} Elo)`],
    [/^(.+) · Mat (\d+) ťah(om|mi)$/, (_, a, n) => `${translateString(a)} · Mate in ${n}`],
    [/^(\d+) kľúčových momentov · hráš za (bieleho|čierneho)$/, (_, n, c) => `${n} key moments · playing ${c === "bieleho" ? "White" : "Black"}`],
    [/^· kroky (\d+)\/(\d+)$/, (_, a, b) => `· steps ${a}/${b}`],
    [/^· téma: (.+)$/, (_, t) => `· theme: ${translateString(t)}`],
    [/^Za deň najviac 1 krajina \(5 krokov aj súboj s bossom\).*Súboj = (\d+) nových pozícií.*$/, (_, n) => `At most 1 land per day (5 steps + boss battle); if you lose a boss battle, you can retry the same day. Boss = ${n} new puzzles from the theme, win with at most 1 mistake (2 with ❤️ from the Secret Cave).`],
    [/^zatiaľ bez hodnotených úloh\. Počíta sa prvý pokus o novú úlohu v krokoch, odbočkách a súbojoch \(štart (\d+)\)\.$/, (_, s) => `no rated puzzles yet. Counts your first attempt on new puzzles in steps, side quests, and battles (start ${s}).`],
    [/^Úloha (\d+) z (\d+)(.*)$/, (_, a, b, rest) => `Puzzle ${a} of ${b}${rest}`],
    [/^Krok (\d+) z (\d+) hotový!$/, (_, a, b) => `Step ${a} of ${b} complete!`],
    [/^▶ Krok (\d+) z (\d+)$/, (_, a, b) => `▶ Step ${a} of ${b}`],
    [/^Krok (\d+) z (\d+)$/, (_, a, b) => `Step ${a} of ${b}`],
    [/^Kroky (\d+)\/(\d+)$/, (_, a, b) => `Steps ${a}/${b}`],
    [/^Pohľadnica (\d+)\/(\d+) · krok (\d+)$/, (_, a, b, c) => `Postcard ${a}/${b} · step ${c}`],
    [/^Pohľadnica · krok (\d+)$/, (_, c) => `Postcard · step ${c}`],
    [/^📮 Pohľadnica od: (.+)$/, (_, n) => `📮 Postcard from: ${n}`],
    [/^Pohľadnice \((\d+) z (\d+)\)$/, (_, a, b) => `Postcards (${a} of ${b})`],
    [/^🗺️ Vstúpiť: (.+)$/, (_, n) => `🗺️ Enter: ${n}`],
    [/^⚔️ Súboj: (.+)$/, (_, n) => `⚔️ Battle: ${n}`],
    [/^Správne (\d+) · zle (\d+)$/, (_, a, b) => `Correct ${a} · wrong ${b}`],
    [/^(\d+)\/(\d+) správne$/, (_, a, b) => `${a}/${b} correct`],
    [/^Začať (\d+)\. cyklus$/, (_, n) => `Start cycle ${n}`],
    [/^(\d+)\. cyklus: (\d+)\/(\d+)(.*)$/, (_, c, a, b, rest) => `Cycle ${c}: ${a}/${b}${rest.replace(/posledný cyklus/, "last cycle").replace(/správne za/, "correct in").replace(/najrýchlejší/, "fastest")}`],
    [/^(\d+) sád · (\d+) úloh(.*)$/, (_, a, b, rest) => `${a} sets · ${b} puzzles${rest.replace(/rozrobené/, "in progress")}`],
    [/^(.+) · (\d+) úloh(.*)$/, (_, d, n, rest) => `${d} · ${n} puzzles${rest}`],
    [/^Biely na ťahu: daj mat (\d+) ťahmi\.?$/, (_, k) => `White to move: mate in ${k}.`],
    [/^Čierny na ťahu: daj mat (\d+) ťahmi\.?$/, (_, k) => `Black to move: mate in ${k}.`],
    [/^Biely na ťahu: daj mat jedným ťahom\.?$/, () => "White to move: mate in 1."],
    [/^Čierny na ťahu: daj mat jedným ťahom\.?$/, () => "Black to move: mate in 1."],
    [/^Biely na ťahu: daj mat\.?$/, () => "White to move: checkmate."],
    [/^Čierny na ťahu: daj mat\.?$/, () => "Black to move: checkmate."],
    [/^Biely na ťahu: získaj figúrku\.?$/, () => "White to move: win a piece."],
    [/^Čierny na ťahu: získaj figúrku\.?$/, () => "Black to move: win a piece."],
    [/^Biely na ťahu: nájdi najlepší ťah(.*)$/, (_, r) => `White to move: find the best move${r.replace(/\(viac ťahov\)/, "(multi-move)").replace(/\(a pokračuj, kým nevyhráš\)/, "(keep going until you win)")}`],
    [/^Čierny na ťahu: nájdi najlepší ťah(.*)$/, (_, r) => `Black to move: find the best move${r.replace(/\(viac ťahov\)/, "(multi-move)").replace(/\(a pokračuj, kým nevyhráš\)/, "(keep going until you win)")}`],
    [/^Biely na ťahu: nájdi víťazný ťah\.?$/, () => "White to move: find the winning move."],
    [/^Čierny na ťahu: nájdi víťazný ťah\.?$/, () => "Black to move: find the winning move."],
    [/^Porazil: (.+)$/, (_, n) => `Defeated: ${translateString(n)}`],
    [/^Poraz: (.+)$/, (_, n) => `Beat: ${translateString(n)}`],
    [/^Poraz súpera (.+) \(≈ (\d+) Elo\) bez vracania ťahov a bez nápovedy\.$/, (_, n, e) => `Beat ${translateString(n)} (≈ ${e} Elo) without takebacks or hints.`],
    [/^(.+) hral$/, (_, n) => `${n} played`],
    [/^Putovanie · sezóna (\d+)$/, (_, n) => `Journey · Season ${n}`],
    [/^Cesta pešiaka – (.+)$/, (_, n) => `The Pawn's Journey – ${n}`],
    [/^Béčko je na ([a-h][1-8]) – miesto (.+) · kroky (\d+)\/(\d+)$/, (_, sq, land, a, b) => `Benny is on ${sq} – ${land} · steps ${a}/${b}`],
    [/^Cilka je na ([a-h][1-8]), Kráľ Hugo na ([a-h][1-8]) – miesto (.+) · kroky (\d+)\/(\d+)$/, (_, sq1, sq2, land, a, b) => `Cece is on ${sq1}, King Hugo on ${sq2} – ${land} · steps ${a}/${b}`],
    [/^Pešiak stojí na b2\. Pred ním je zahalená cesta…$/, () => "Benny stands on b2. A misty road lies ahead…"],
    [/^Každé políčko cesty pešiaka je jedno miesto.*$/, () => "Each golden square is a land in Fork Forest. Clear 5 steps and beat the boss to advance the story."],
    [/^Odbočky okolo cesty sú dobrovoľné.*$/, () => "Side quests along the path are optional and repeatable. Each clears some fog, adds to your Story Book, and grants battle perks."],
    [/^Stretnutie: (.+)$/, (_, n) => `Meeting: ${n}`],
    [/^Sprievodca: (.+)$/, (_, n) => `Guide: ${n}`],
    [/^(.+) nie je správne\.(.*)$/, (_, mv, rest) => `${mv} is not right.${rest.replace(/Stratil si srdiečko\./, "You lost a heart.")}`],
    [/^Medzihra (\d+)$/, (_, n) => `Interlude ${n}`],
    [/^(.+) porazený$/, (_, n) => `${n} defeated`],
    [/^Albínove príbehy \((\d+) z (\d+)\)$/, (_, a, b) => `Albin's tales (${a} of ${b})`],
    [/^Listy z lesa: (\d+) z (\d+)$/, (_, a, b) => `Forest letters: ${a} of ${b}`],
    [/^Listy z Ľadovej ríše: (\d+) z (\d+)$/, (_, a, b) => `Ice Realm letters: ${a} of ${b}`],
    [/^Dnes si už prešiel celú krajinu 🏆/, () => "You already cleared a land today 🏆 Come back tomorrow with a fresh mind, or try side quests today!"],
    [/^Do súboja máš: (.+)$/, (_, r) => "Battle perks: " + r.replace(/srdiečko navyše/g, "extra heart").replace(/nápoveda/g, "hint").replace(/lupa/g, "magnifier").replace(/Gustov kompas/g, "Gusto's compass").replace(/Albínova rada/g, "Albin's advice")]
  ];

  function translateString(str) {
    if (!str || !isEn()) return str;
    const trimmed = str.trim();
    if (!trimmed || trimmed.length < 2) return str;
    const hit = EXACT.get(trimmed);
    if (hit !== undefined) return str.replace(trimmed, hit);
    for (const [re, fn] of PATTERNS) {
      if (re.test(trimmed)) return str.replace(trimmed, trimmed.replace(re, fn));
    }
    return str;
  }

  let busy = false;
  function translateNode(root) {
    if (!isEn() || !root) return;
    if (root.nodeType === 3) {
      const p = root.parentElement;
      if (p && (p.tagName === "SCRIPT" || p.tagName === "STYLE")) return;
      const nv = translateString(root.nodeValue);
      if (nv !== root.nodeValue) root.nodeValue = nv;
      return;
    }
    if (root.nodeType !== 1) return;
    if (root.tagName === "SCRIPT" || root.tagName === "STYLE") return;
    for (const attr of ["placeholder", "title", "aria-label"]) {
      const v = root.getAttribute(attr);
      if (v) {
        const nv = translateString(v);
        if (nv !== v) root.setAttribute(attr, nv);
      }
    }
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT);
    let n;
    while ((n = walker.nextNode())) {
      if (n.nodeType === 3) {
        const p = n.parentElement;
        if (p && (p.tagName === "SCRIPT" || p.tagName === "STYLE")) continue;
        const nv = translateString(n.nodeValue);
        if (nv !== n.nodeValue) n.nodeValue = nv;
      } else if (n.nodeType === 1) {
        if (n.tagName === "SCRIPT" || n.tagName === "STYLE") continue;
        for (const attr of ["placeholder", "title", "aria-label"]) {
          const v = n.getAttribute(attr);
          if (v) {
            const nv = translateString(v);
            if (nv !== v) n.setAttribute(attr, nv);
          }
        }
      }
    }
  }

  const GM_EN = {
    "morphy-opera": {
      title: "Morphy's Opera Game",
      who: "Paul Morphy vs. Duke of Brunswick & Count Isouard (Paris 1858)",
      intro: "A famous short game played at the Paris Opera! Morphy developed all his pieces in a flash and sacrificed nearly everything for checkmate.",
      steps: [
        { hint: "Look at the weak f7 square – your bishop aims right at it.", why: "The bishop on c4 targets f7 and joins the attack rapidly." },
        { hint: "Double attack with the queen: threaten f7 and b7 at the same time!", why: "The queen on b3 attacks both f7 and the undefended b7 pawn." },
        { hint: "The enemy king is stuck in the center – sacrifice the knight to open lines!", why: "Sacrificing the knight on b5 shatters the pawns and brings the bishop in with check!" },
        { hint: "Your king needs safety and the rook wants the open d-file.", why: "Queenside castling (O-O-O) tucks the king away and immediately pins the knight on d7." },
        { hint: "Don't spare the rook! Smash the defense around the king.", why: "Rxd7! Morphy trades the rook for a defender and swings the other rook to d1." },
        { hint: "Grand finale! Sacrifice the queen to deflect the last defender.", why: "Qb8+! The queen deflects the knight from d7 and the rook delivers a beautiful mate on d8!" }
      ]
    },
    "legal-mate": {
      title: "Légal's Mate",
      who: "Sire de Légal vs. Saint Brie (Paris 1750)",
      intro: "One of the most famous chess traps ever! Black pinned the knight with a bishop, but White sacrificed the queen for checkmate.",
      steps: [
        { hint: "Develop the bishop to its best attacking square against f7.", why: "The bishop on c4 targets the vulnerable f7 square next to Black's king." },
        { hint: "Shocking move! The queen is pinned, yet a mating net awaits on f7.", why: "Nxe5!! White gives up the queen because Black's king has nowhere to hide." },
        { hint: "Launch the mating attack with the bishop on the weak square by the king.", why: "Bxf7+! The king must step to e7, where its own pieces block its escape." },
        { hint: "One final knight jump – and it's over!", why: "Nd5# is a pure checkmate with three minor pieces right in the middle of the board!" }
      ]
    },
    "morphy-schulten": {
      title: "Attack on an Uncastled King",
      who: "John Schulten vs. Paul Morphy (New York 1857)",
      intro: "Playing Black against the King's Gambit, Morphy ripped open the center and never let the enemy king escape to safety.",
      steps: [
        { hint: "Fight for the center right away with a counter-strike against the King's Gambit.", why: "The Falkbeer Countergambit (...d5) immediately opens the center." },
        { hint: "Bring a heavy piece into the attack down the open e-file with check.", why: "The rook on e8 pins White's pieces and stops White from castling." },
        { hint: "Develop the bishop to pressure both the knight and the e2 bishop.", why: "The bishop on g4 creates an annoying pin and cranks up the pressure on the king." },
        { hint: "Don't be afraid to sacrifice the exchange! Remove the defender on e2.", why: "Rxe2! After Nxe2 comes ...Nd4 and Black's pieces completely overwhelm White's king." }
      ]
    },
    "anderssen-evergreen": {
      title: "The Evergreen Game",
      who: "Adolf Anderssen vs. Jean Dufresne (Berlin 1852)",
      intro: "A classic masterpiece ending with a dazzling queen sacrifice. Watch how White aims every piece at Black's king.",
      steps: [
        { hint: "Sacrifice a wing pawn to gain time for the center (the Evans Gambit)!", why: "b4! The famous Evans Gambit – White gives a pawn for a rapid attack." },
        { hint: "Open the center before Black can get the king to safety.", why: "d4! White builds a powerful center and opens diagonals for the bishops." },
        { hint: "Bring the queen in with a double threat on f7 and b7.", why: "Qb3! The queen targets f7 while also pressuring b7." },
        { hint: "Grab space and drive the knight away or attack the queen.", why: "e5! The pawn cuts off Black's knight and clears the e-file for the rook." },
        { hint: "A brilliant tactical fork with a knight sacrifice!", why: "Nf6+! Opens the g-file against Black's king while threatening the queen." }
      ]
    },
    "capablanca-miniature": {
      title: "Capablanca's Swift Attack",
      who: "José Raúl Capablanca vs. Amateur (1918)",
      intro: "World Champion Capablanca always played simply and accurately. When his opponent neglected development, punishment was swift.",
      steps: [
        { hint: "Pin the f6 knight and put pressure on the kingside.", why: "Bg5 pins the f6 knight awkwardly to the queen." },
        { hint: "Open the center now that your pieces stand better!", why: "d4! White has the bishop pair and more space in the center." },
        { hint: "The bishop tries to keep the pin – push it back with a pawn!", why: "g4! After ...Bg6 White prepares a strong attack on the light squares." },
        { hint: "The knight heads for f5 or opens files after a trade.", why: "Nh4 attacks the g6 bishop and prepares a jump to f5." }
      ]
    },
    "fischer-byrne": {
      title: "Fischer's Game of the Century",
      who: "Donald Byrne vs. Bobby Fischer (New York 1956)",
      intro: "At just 13 years old, Bobby Fischer stunned the chess world with an unforgettable combination and queen sacrifice!",
      steps: [
        { hint: "Strike at White's center with the d-pawn (Grünfeld Defense).", why: "...d5! Fischer challenges the center immediately and opens the diagonal for the g7 bishop." },
        { hint: "Pin the f3 knight with your bishop!", why: "...Bg4! The bishop pins the knight and disrupts White's smooth development." },
        { hint: "A stunning tactical knight strike – deflect the queen from defending e4!", why: "...Na4!! White must take or retreat the queen, losing control of the center." },
        { hint: "Capture the key central pawn on e4, even though the e7 bishop is loose.", why: "...Nxe4! Black's pieces flood the center while White's king is stranded." },
        { hint: "A stroke of genius! Leave your queen on b6 en prise and attack White's queen!", why: "...Be6!! If White takes the queen, ...Bxc4+ unleashes a mating attack on the trapped king!" }
      ]
    },
    "tal-larsen": {
      title: "Tal's Kingside Attack",
      who: "Mikhail Tal vs. Bent Larsen (1965)",
      intro: "World Champion Mikhail Tal was famous for daring sacrifices. Here he dominates the center and tears open the enemy position.",
      steps: [
        { hint: "Plant your knight on the strong central e5 square!", why: "Nxe5 puts the knight right in the center where Black can hardly kick it out." },
        { hint: "Grab queenside space and drive Black's knight away.", why: "c4! The pawn kicks the knight and claims the center." },
        { hint: "Develop your last minor piece to an active diagonal.", why: "Bf4 pressures the weak c7 square and controls the center." },
        { hint: "Capture the loose c7 pawn and attack the rook!", why: "Bxc7 attacks the rook and wins an important pawn." }
      ]
    },
    "kasparov-topalov": {
      title: "Kasparov's Immortal",
      who: "Garry Kasparov vs. Veselin Topalov (Wijk aan Zee 1999)",
      intro: "One of the greatest games of modern chess! Kasparov sacrificed a rook and hunted Black's king all the way across the board.",
      steps: [
        { hint: "Offer a trade of the dark-squared bishop that guards Black's king!", why: "Bh6! Kasparov wants to eliminate the key defender of Black's king." },
        { hint: "Castle queenside and connect your rooks on the central files.", why: "O-O-O! The king goes to safety and the rook immediately pressures the d-file." },
        { hint: "Bring the queen in with check and give Black's king no rest!", why: "Qf4+! The king must retreat as White's pieces close in." },
        { hint: "Leap into the center on d5 to open every avenue toward the king.", why: "Nd5! If Black trades on d5, the e-file opens straight at the king." },
        { hint: "The legendary blow! Sacrifice the rook on d4 to shatter the defense!", why: "Rxd4!! If Black accepts the rook, Re7+ sends the king on a fatal march!" }
      ]
    }
  };

  function applyDataTranslations() {
    if (!isEn()) return;
    if (window.LICHESS_GRP) {
      for (const k of Object.keys(window.LICHESS_GRP)) {
        window.LICHESS_GRP[k] = translateString(window.LICHESS_GRP[k]);
      }
    }
    if (Array.isArray(window.LICHESS_DATEL)) {
      for (const s of window.LICHESS_DATEL) {
        s.t = translateString(s.t);
      }
    }
    if (Array.isArray(window.GM_GAMES)) {
      for (const g of window.GM_GAMES) {
        const tr = GM_EN[g.id];
        if (!tr) continue;
        g.title = tr.title;
        g.who = tr.who;
        g.intro = tr.intro;
        if (Array.isArray(g.steps) && Array.isArray(tr.steps)) {
          for (let i = 0; i < g.steps.length && i < tr.steps.length; i++) {
            g.steps[i].hint = tr.steps[i].hint;
            g.steps[i].why = tr.steps[i].why;
          }
        }
      }
    }
    if (typeof window.I18N_APPLY_STORY === "function") {
      try { window.I18N_APPLY_STORY(); } catch (e) {}
    }
    if (typeof window.I18N_APPLY_CONTENT === "function") {
      try { window.I18N_APPLY_CONTENT(); } catch (e) {}
    }
  }

  function mountLangSwitcher() {
    const pop = document.getElementById("sfx-pop");
    if (!pop || document.getElementById("lang-en")) return;
    const head = document.createElement("div");
    head.className = "label sfxhead sfxsep";
    head.textContent = isEn() ? "Language" : "Jazyk / Language";
    const rEn = document.createElement("label");
    rEn.className = "sfxrow";
    rEn.innerHTML = `<input type="radio" name="app-lang" value="en" id="lang-en"${isEn() ? " checked" : ""}> English`;
    const rSk = document.createElement("label");
    rSk.className = "sfxrow";
    rSk.innerHTML = `<input type="radio" name="app-lang" value="sk" id="lang-sk"${!isEn() ? " checked" : ""}> Slovenčina`;
    const aboutBtn = document.getElementById("about-btn");
    const target = aboutBtn || null;
    pop.insertBefore(head, target);
    pop.insertBefore(rEn, target);
    pop.insertBefore(rSk, target);
    rEn.querySelector("input").onchange = () => { if (!isEn()) setLang("en"); };
    rSk.querySelector("input").onchange = () => { if (isEn()) setLang("sk"); };
  }

  function start() {
    document.documentElement.lang = lang;
    mountLangSwitcher();
    if (!isEn()) {
      if (window.PUBLIC_EDITION) {
        document.title = "Šachové dobrodružstvo";
        const h1 = document.querySelector("header h1");
        if (h1) h1.textContent = "Šachové dobrodružstvo";
      }
      return;
    }
    applyDataTranslations();
    busy = true;
    try { translateNode(document.body); } finally { busy = false; }
    const obs = new MutationObserver(muts => {
      if (busy) return;
      busy = true;
      try {
        for (const m of muts) {
          if (m.type === "characterData") translateNode(m.target);
          else for (const n of m.addedNodes) translateNode(n);
        }
      } finally { busy = false; }
    });
    obs.observe(document.body, { childList: true, subtree: true, characterData: true });
  }

  window.I18N = { lang, isEn, setLang, t: translateString, applyDataTranslations, start };

  if (isEn()) applyDataTranslations();
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    setTimeout(start, 0);
  }
})();
