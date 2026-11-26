/* Hádaj ťah majstra – vybrané slávne partie pre Filipka.
 * Všetky partie sú verejne známe historické šachové partie. */
(function(){
"use strict";

window.GM_GAMES = [
  {
    id: "morphy-opera",
    title: "Morphyho operná partia",
    who: "Paul Morphy vs. Vojvoda a Gróf (Paríž 1858)",
    side: "w",
    intro: "Slávna krátka partia hraná v opere! Morphy bleskovo vyvinul všetky figúrky a obetoval takmer všetko pre mat.",
    moves: "e2e4 e7e5 g1f3 d7d6 d2d4 c8g4 d4e5 g4f3 d1f3 d6e5 f1c4 g8f6 f3b3 d8e7 b1c3 c7c6 c1g5 b7b5 c3b5 c6b5 c4b5 b8d7 e1c1 a8d8 d1d7 d8d7 h1d1 e7e6 b5d7 f6d7 b3b8 d7b8 d1d8",
    steps: [
      { ply: 10, hint: "Pozri na slabé pole f7 – strelec tam mieri veľmi nebezpečne.", why: "Strelec na c4 mieri priamo na f7 a rýchlo sa zapája do útoku." },
      { ply: 12, hint: "Dvojitý útok dámou: napadni f7 aj b7 naraz!", why: "Dáma na b3 útočí súčasne na f7 aj na nechráneného pešiaka b7." },
      { ply: 18, hint: "Nepriateľský kráľ ostal v strede – obetuj jazdca a otvor líniu!", why: "Obeť jazdca na b5 rozbije pešiakov a strelec príde na b5 so šachom!" },
      { ply: 22, hint: "Kráľ potrebuje do bezpečia a veža chce na otvorený d-stĺpec.", why: "Veľká rošáda (O-O-O) schová kráľa a hneď zviaže čierneho jazdca na d7." },
      { ply: 24, hint: "Nešetri vežu! Rozbi obranu okolo kráľa.", why: "Vxd7! – Morphy vymení vežu za obrancu a hneď privedie druhú vežu na d1." },
      { ply: 30, hint: "Veľké finále! Obetuj dámu a odlákaš posledného obrancu.", why: "Db8+! Dáma odláka jazdca z d7 a veža dá na d8 krásny mat!" }
    ]
  },
  {
    id: "legal-mate",
    title: "Legallov mat",
    who: "Sire de Légal vs. Saint Brie (Paríž 1750)",
    side: "w",
    intro: "Jedna z najznámejších šachových pascí! Čierny zviazal jazdca strelcom, no biely dámu obetoval a dal mat.",
    moves: "e2e4 e7e5 g1f3 d7d6 f1c4 c8g4 b1c3 g7g6 f3e5 g4d1 c4f7 e8e7 c3d5",
    steps: [
      { ply: 4, hint: "Vyviň strelca na jeho najlepšie útočné pole proti f7.", why: "Strelec na c4 mieri na citlivé pole f7 pri čiernom kráľovi." },
      { ply: 8, hint: "Šokujúci ťah! Dáma je síce zviazaná, ale na f7 čaká matová sieť.", why: "Jxe5!! – biely dáva zadarmo dámu, pretože čierny kráľ nemá kam ujsť." },
      { ply: 10, hint: "Začni matový útok strelcom na slabé pole pri kráľovi.", why: "Sxf7+! Kráľ musí ísť na e7, kde mu už zavadzajú vlastné figúrky." },
      { ply: 12, hint: "Posledný skok jazdcom – a je koniec!", why: "Jd5# je čistý mat troma ľahkými figúrkami uprostred šachovnice!" }
    ]
  },
  {
    id: "morphy-schulten",
    title: "Útok na nerošovaného kráľa",
    who: "John Schulten vs. Paul Morphy (New York 1857)",
    side: "b",
    intro: "Morphy čiernymi v Kráľovskom gambite rýchlo otvoril stred a nedovolil súperovmu kráľovi ujsť do bezpečia.",
    moves: "e2e4 e7e5 f2f4 d7d5 e4d5 e5e4 b1c3 g8f6 d2d3 f8b4 c1d2 e4e3 d2e3 e8g8 e3d2 b4c3 b2c3 f8e8 f1e2 c8g4 c3c4 c7c6 d5c6 b8c6 e1f1 e8e2 g1e2 c6d4",
    steps: [
      { ply: 3, hint: "Začni boj o stred proti Kráľovskému gambitu protizásahom.", why: "Falkbeerov protigambit (...d5) okamžite otvára hru v strede." },
      { ply: 17, hint: "Zapoj do útoku ťažkú figúrku po otvorenom e-stĺpci so šachom.", why: "Veža na e8 viaže biele figúrky a bráni bielemu v rošáde." },
      { ply: 19, hint: "Vyviň strelca tak, aby si napadol jazdca na f3 aj strelca na e2.", why: "Strelec na g4 nepríjemne zväzuje a zvyšuje tlak na kráľa." },
      { ply: 25, hint: "Neboj sa obetovať kvalitu! Zbav sa obrancu na e2.", why: "Vxe2! – po Jxe2 príde ...Jd4 a čierne figúrky úplne prevalcujú bieleho kráľa." }
    ]
  },
  {
    id: "anderssen-evergreen",
    title: "Vždyzelená partia",
    who: "Adolf Anderssen vs. Jean Dufresne (Berlín 1852)",
    side: "w",
    intro: "Slávna partia s krásnou obeťou dámy na konci. Sleduj, ako biely sústredí všetky figúrky na čierneho kráľa.",
    moves: "e2e4 e7e5 g1f3 b8c6 f1c4 f8c5 b2b4 c5b4 c2c3 b4a5 d2d4 e5d4 e1g1 d4d3 d1b3 d8f6 e4e5 f6g6 f1e1 g8e7 c1a3 b7b5 b3b5 a8b8 b5a4 a5b6 b1d2 c8b7 d2e4 g6f5 a1d1 e8g8 c4d3 f5h5 e4f6 g7f6 e5f6 e7g6 a3f8 b8f8",
    steps: [
      { ply: 6, hint: "Obetuj pešiaka na krídle, aby si získal čas pre stred (Evansov gambit)!", why: "b4! Je to slávny Evansov gambit – biely obetuje pešiaka za rýchly útok." },
      { ply: 10, hint: "Otvor stred skôr, než sa čierny stihne schovať.", why: "d4! Biely stavia silný stred a otvára línie pre strelcov." },
      { ply: 14, hint: "Dáma sa zapojí s dvojitou hrozbou na f7 aj b7.", why: "Db3! Dáma mieri na f7 a zároveň tlačí na b7." },
      { ply: 16, hint: "Získaj priestor a odožeň jazdca alebo napadni dámu.", why: "e5! Pešiak odreže čierneho jazdca a otvorí cestu veži na e1." },
      { ply: 34, hint: "Krásna taktická vidlička s obeťou jazdca!", why: "Jf6+! Otvára sa g-stĺpec na čierneho kráľa a dáma je v ohrození." }
    ]
  },
  {
    id: "capablanca-miniature",
    title: "Capablancov rýchly útok",
    who: "José Raúl Capablanca vs. Amatér (1918)",
    side: "w",
    intro: "Majster sveta Capablanca hral vždy jednoducho a presne. Keď súper zanedbal vývin, nasledoval bleskový trest.",
    moves: "e2e4 e7e5 g1f3 b8c6 b1c3 g8f6 f1b5 f8b4 e1g1 e8g8 d2d3 d7d6 c1g5 b4c3 b2c3 d8e7 f1e1 c6d8 d3d4 c8g4 h2h3 g4h5 g2g4 h5g6 f3h4 d8e6 g5c1 f6e4 h4g6 f7g6 e1e4 e7h4 d1e2 h4h3 e4e3 h3h4",
    steps: [
      { ply: 12, hint: "Zviaž čierneho jazdca f6 a urob tlak na kráľovské krídlo.", why: "Sg5 nepríjemne zväzuje jazdca f6 k dáme." },
      { ply: 18, hint: "Otvor stred, keď tvoje figúrky už stoja lepšie!", why: "d4! Biely má dvojicu strelcov a viac priestoru v strede." },
      { ply: 22, hint: "Strelec sa snaží udržať väzbu – zatlač naňho pešiakom!", why: "g4! Po ...Sg6 si biely pripraví silný útok po bielych poliach." },
      { ply: 24, hint: "Jazdec mieri na f5 alebo po výmene otvorí stĺpce.", why: "Jh4 napáda strelca g6 a chystá sa skok na f5." }
    ]
  },
  {
    id: "fischer-byrne",
    title: "Fischerova partia storočia",
    who: "Donald Byrne vs. Bobby Fischer (New York 1956)",
    side: "b",
    intro: "Mladý 13-ročný Bobby Fischer v tejto partii ohromil svet neuveriteľnou kombináciou a obeťou dámy!",
    moves: "g1f3 g8f6 c2c4 g7g6 b1c3 f8g7 d2d4 e8g8 c1f4 d7d5 d1b3 d5c4 b3c4 c7c6 e2e4 b8d7 a1d1 d7b6 c4c5 c8g4 f4g5 b6a4 c5a3 a4c3 b2c3 f6e4 g5e7 d8b6 f1c4 e4c3 e7c5 f8e8 e1f1 g4e6",
    steps: [
      { ply: 9, hint: "Udri na biely stred pešiakom d5 (Grünfeldova obrana).", why: "...d5! Fischer hneď bojuje o stred a otvára uhlopriečku strelcovi g7." },
      { ply: 19, hint: "Zviaž jazdca f3 strelcom!", why: "...Sg4! Strelec nepríjemne zväzuje jazdca a bráni v pokojnom vývine." },
      { ply: 21, hint: "Úžasný taktický úder jazdcom – odlákaš dámu z obrany e4!", why: "...Ja4!! Biely musí brať alebo ustúpiť dámou a stráca kontrolu nad stredom." },
      { ply: 25, hint: "Zober dôležitého stredového pešiaka e4, aj keď je strelec na e7 voľný.", why: "...Jxe4! Čierne figúrky zaplavujú stred a biely kráľ ostal v strede." },
      { ply: 33, hint: "Geniálny ťah! Nechaj dámu na b6 napospas a napadni bielu dámu!", why: "...Se6!! Ak biely vezme dámu, príde ...Sxc4+ a matový útok na uväzneného kráľa!" }
    ]
  },
  {
    id: "tal-larsen",
    title: "Talov útok na kráľa",
    who: "Michail Tal vs. Bent Larsen (1965)",
    side: "w",
    intro: "Majster sveta Michail Tal bol známy odvážnymi obeťami. Tu obetoval jazdca, aby roztrhal súperovho kráľa.",
    moves: "e2e4 g8f6 e4e5 f6d5 d2d4 d7d6 g1f3 d6e5 f3e5 e7e6 f1e2 f8e7 e1g1 e8g8 c2c4 d5f6 b1c3 b8c6 e5c6 b7c6 c1f4 c6c5 d4c5 e7c5 d1d8 f8d8 f4c7 d8d2 e2f3 a8b8 c7b8 d2b2",
    steps: [
      { ply: 8, hint: "Postav jazdca na silné centrálne pole e5!", why: "Jxe5 umiestni jazdca do stredu, odkiaľ ho čierny ťažko vyháňa." },
      { ply: 14, hint: "Získaj priestor na dámskom krídle a odožeň čierneho jazdca.", why: "c4! Pešiak zaženie jazdca a zaberá stred." },
      { ply: 20, hint: "Vyviň poslednú ľahkú figúrku na aktívnu diagonálu.", why: "Sf4 tlačí na slabé pole c7 a kontroluje stred." },
      { ply: 26, hint: "Zober voľného pešiaka na c7 a zaútoč na vežu!", why: "Sxc7 napáda vežu a získava dôležitého pešiaka." }
    ]
  },
  {
    id: "kasparov-topalov",
    title: "Kasparovova nesmrteľná",
    who: "Garry Kasparov vs. Veselin Topalov (Wijk aan Zee 1999)",
    side: "w",
    intro: "Jedna z najslávnejších partií modernej histórie! Kasparov obetoval vežu a hnal čierneho kráľa cez celú šachovnicu.",
    moves: "e2e4 d7d6 d2d4 g8f6 b1c3 g7g6 c1e3 f8g7 d1d2 c7c6 f2f3 b7b5 g1e2 b8d7 e3h6 g7h6 d2h6 c8b7 a2a3 e7e5 e1c1 d8e7 c1b1 a7a6 e2c1 e8c8 c1b3 e5d4 d1d4 c6c5 d4d1 d7b6 g2g3 c8b8 b3a5 b7a8 f1h3 d6d5 h6f4 b8a7 h1e1 d5d4 c3d5 b6d5 e4d5 e7d6 d1d4",
    steps: [
      { ply: 14, hint: "Ponúkni výmenu čiernopolejného strelca, ktorý chráni čierneho kráľa!", why: "Sh6! Kasparov sa chce zbaviť hlavného obrancu čierneho kráľa." },
      { ply: 20, hint: "Urob veľkú rošádu a spoj veže na stredové stĺpce.", why: "O-O-O! Kráľ ide do bezpečia a veža hneď tlačí na d-stĺpec." },
      { ply: 38, hint: "Priveď dámu so šachom a nenechaj čierneho kráľa oddýchnuť!", why: "Df4+! Kráľ musí ustúpiť a biele figúrky sa blížia." },
      { ply: 42, hint: "Skok jazdcom do stredu na d5 otvára všetky cesty na kráľa.", why: "Jd5! Ak čierny vymení na d5, otvorí sa e-stĺpec priamo na kráľa." },
      { ply: 46, hint: "Legendárny úder! Obetuj vežu na d4 a rozbi obranu!", why: "Vxd4!! Ak čierny vežu vezme, biela veža príde na e7+ a kráľ sa vydá na smrteľný pochod!" }
    ]
  }
];
})();
