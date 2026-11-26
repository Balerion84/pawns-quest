/* Rozpoznávanie otvorení a jednoduché plány pre Filipka.
 * Názvy a ECO kódy podľa lichess-org/chess-openings (CC0 1.0).
 * Popisy a plány inšpirované Wikibooks: Chess Opening Theory (CC BY-SA 4.0),
 * prispôsobené do jednoduchej slovenčiny. */
(function(){
"use strict";

const OPENING_PLANS = {
  e4e5: {
    n: "Otvorená hra",
    idea: "Obaja hráči obsadili stred pešiakmi e4 a e5. Čaká vás rýchly boj o stred a rýchly vývin figúrok.",
    w: ["Rýchlo vyviň jazdca na f3 a strelca (napr. na c4 alebo b5).", "Urob malú rošádu a spoj veže."],
    b: ["Bráň pešiaka e5 (zvyčajne jazdcom na c6).", "Vyvíjaj ľahké figúrky a priprav si rošádu."]
  },
  italian: {
    n: "Talianska hra",
    idea: "Biely mieri strelcom na c4 priamo na slabé políčko f7 pri čiernom kráľovi.",
    w: ["Priprav ťah d4 pomocou c3 (alebo hraj pokojne d3) a zaútoč v strede.", "Dávaj pozor na pole f7 – po rošáde môžeš útočiť aj jazdcom alebo vežou cez e1."],
    b: ["Vyviň strelca na c5 alebo jazdca na f6 a rýchlo rošuj.", "Stráž si políčko f7 a stredové pole d5."]
  },
  evans: {
    n: "Evansov gambit",
    idea: "Biely obetuje pešiaka na b4, aby získal čas na c3 a d4 a rýchly útok na kráľa.",
    w: ["Rýchlo zahraj c3 a d4, otvor stred a útoč na ešte nerošovaného kráľa.", "Nedovoľ čiernemu v pokoji dokončiť vývin."],
    b: ["Ak pešiaka vezmeš, rýchlo sa vyviň a vráť ho v pravej chvíli za bezpečie kráľa.", "Hraj ...Sb6 alebo ...Sa5 a priprav rošádu."]
  },
  twoknights: {
    n: "Hra dvoch jazdcov",
    idea: "Čierny namiesto ...Sc5 hneď napadne pešiaka e4 jazdcom na f6. Hra býva veľmi ostrá.",
    w: ["Môžeš hrať pokojne d3 a rošovať, alebo ostro Jg5 s útokom na f7.", "Pri Jg5 rátaj s obranou ...d5 a ...Ja5."],
    b: ["Po Jg5 odpovedz ...d5 (nie ...Jxe4? ani zbrklé ťahy bez obrany f7).", "Ak biely hrá d3, pokojne vyviň strelca a rošuj."]
  },
  spanish: {
    n: "Španielska hra",
    idea: "Biely strelec z b5 tlačí na jazdca c6, ktorý bráni pešiaka e5. Dlhodobý tlak v strede.",
    w: ["Urob rošádu, zahraj Ve1, c3 a d4 a ovládni stred.", "Strelca po ...a6 stiahni na a4 a potom na b3 alebo c2."],
    b: ["Odžeň strelca ťahom ...a6, vyviň jazdca na f6 a strelca na e7.", "Priprav rošádu a bráň pevne pešiaka e5."]
  },
  scotch: {
    n: "Škótska hra",
    idea: "Biely hneď v 3. ťahu otvorí stred ťahom d4. Rýchla a otvorená hra bez zbytočného čakania.",
    w: ["Otvor stred, vyvíjaj figúrky do centra a útoč na kráľa.", "Po ...Sc5 alebo ...Jf6 aktívne umiestni strelcov a jazdcov."],
    b: ["Vezmi na d4 a aktívne vyvíjaj figúrky (...Sc5, ...Jf6).", "Nenechaj bieleho získať zadarmo veľa priestoru."]
  },
  fourknights: {
    n: "Hra štyroch jazdcov",
    idea: "Obaja hráči najprv vyvinuli oboch jazdcov. Pevné, pokojné a bezpečné otvorenie.",
    w: ["Dokonči vývin strelcami (Sb5 alebo Sc4), urob rošádu a otvor stred ťahom d4.", "Hľadaj drobné výhody v postavení figúrok."],
    b: ["Vyviň strelcov (...Sb4 alebo ...Sc5) a urob rošádu.", "Stráž si rovnováhu v strede šachovnice."]
  },
  petrov: {
    n: "Ruská hra (Petrovova obrana)",
    idea: "Čierny namiesto obrany pešiaka e5 hneď napadne bieleho pešiaka e4.",
    w: ["Vezmi na e5, po ...d6 ustúp Jf3 a zahraj d4 s pekným stredom.", "Pozor na pascu: po Jxe5 Jxe4?? De2! získaš figúrku."],
    b: ["Po Jxe5 najprv odožeň jazdca ťahom ...d6 a až potom ber na e4.", "Rýchlo vyviň figúrky a rošuj."]
  },
  philidor: {
    n: "Filidorova obrana",
    idea: "Čierny bráni pešiaka e5 pešiakom d6. Je to pevné, ale čierny strelec z f8 má menej miesta.",
    w: ["Zahraj d4 a Sc4, získaj priestor v strede a rýchly vývin.", "Tlač na stred a využi, že máš voľnejšie figúrky."],
    b: ["Drž pevný stred na e5, vyviň jazdcov na f6 a d7 a priprav rošádu.", "Neotváraj pozíciu skôr, než bude kráľ v bezpečí."]
  },
  vienna: {
    n: "Viedenská hra",
    idea: "Biely kryje e4 jazdcom na c3, aby si nechal voľnú ruku pre útok s f4 alebo Sc4.",
    w: ["Vyviň strelca na c4 a podľa situácie priprav f4 na kráľovskom krídle.", "Hraj aktívne proti bodu f7."],
    b: ["Najlepší protizásah je ...Jf6 a v pravej chvíli prielom ...d5 v strede.", "Nedovoľ bielemu pohodlný útok na kráľa."]
  },
  kingsgambit: {
    n: "Kráľovský gambit",
    idea: "Biely obetuje pešiaka f4, aby otvoril líniu f pre vežu a ovládol stred ťahom d4.",
    w: ["Hraj Jf3, Sc4 a d4 a rýchlo útoč po otvorenej f-línii.", "Nedovoľ čiernemu dať nepríjemný šach dámou na h4."],
    b: ["Pozor na šachy a útok na f7 – buď pešiaka vezmi a rýchlo sa vyvíjaj, alebo zahraj ...d5.", "Udrž kráľa v bezpečí a nezabúdaj na vývin."]
  },
  center: {
    n: "Stredná hra",
    idea: "Biely hneď v 2. ťahu otvára stred pešiakom d4. Po ...exd4 často obetuje pešiaka alebo berie dámou.",
    w: ["Rýchlo vyvíjaj figúrky (Sc4, Jf3) a ak je dáma na d4, pozor na stratu tempa po ...Jc6.", "Pri Severskom gambite útoč oboma strelcami na kráľovské krídlo."],
    b: ["Vezmi na d4 a získaj čas napádaním bielej dámy (...Jc6) a rýchlym vývinom.", "Vráť pešiaka, ak tým získaš bezpečie a náskok vo vývine."]
  },
  bishop: {
    n: "Hra strelca",
    idea: "Biely hneď mieri strelcom na c4 – na citlivé pole f7. Často prechádza do Talianskej alebo Viedenskej hry.",
    w: ["Mier na f7, vyviň jazdca a priprav si útok v strede alebo f4.", "Drž figúrky aktívne."],
    b: ["Zahraj ...Jf6 alebo ...Sc5 a v pravej chvíli urob protizásah v strede (...d5).", "Nedaj sa zaskočiť skorými útokmi na f7."]
  },
  sicilian: {
    n: "Sicílska obrana",
    idea: "Najbojovnejšia odpoveď na 1. e4! Čierny bojuje o pole d4 z boku a hra býva nerovnovážna a ostrá.",
    w: ["V otvorenej sicílskej (Jf3 a d4) získaj priestor, rýchlo sa vyviň a útoč na kráľa.", "Pri veľkej rošáde (O-O-O) útoč pešiakmi na kráľovskom krídle."],
    b: ["Využi polootvorený c-stĺpec pre vežu a útoč na dámskom krídle.", "Hraj v pravej chvíli ...d5, aby si vyrovnal stred."]
  },
  french: {
    n: "Francúzska obrana",
    idea: "Čierny najprv pripraví ...d5 ťahom ...e6. Pevná hradba, ale čierny bielopoľný strelec na c8 býva spočiatku zavretý.",
    w: ["Obsaď stred (d4) a útoč na kráľovskom krídle alebo využívaj viac priestoru.", "Stráž si pešiaka d4 pred tlakom čierneho."],
    b: ["Napádaj biely stred ťahmi ...c5 a ...Jc6 (prípadne ...f6).", "Hľadaj spôsob, ako zapojiť strelca z c8 do hry."]
  },
  carokann: {
    n: "Obrana Caro-Kann",
    idea: "Čierny pripraví ...d5 ťahom ...c6. Veľmi pevná obrana, kde si čierny nezavrie strelca na c8.",
    w: ["Získaj priestor v strede (d4, e5 alebo Jc3) a útoč na kráľa.", "Nedovoľ čiernemu ľahko vymeniť všetky slabé figúrky."],
    b: ["Vyviň bielopoľného strelca na f5 alebo g4 skôr, než zahráš ...e6.", "Potom pevne podopri stred ťahmi ...e6 a ...c5."]
  },
  scandinavian: {
    n: "Škandinávska obrana",
    idea: "Čierny hneď v 1. ťahu napadne bieleho pešiaka e4 ťahom ...d5.",
    w: ["Po exd5 Dxd5 vyviň jazdca na c3 s útokom na dámu a získaj čas na rýchly vývin.", "Obsaď stred a útoč na ešte nerozohraného súpera."],
    b: ["Ak vezmeš dámou, po Jc3 ju schovaj na bezpečné miesto (a5, d6 alebo d8).", "Dokonči vývin (...c6, ...Jf6, ...Sf5/Sg4) a rošuj."]
  },
  pirc: {
    n: "Pircova / Moderná obrana",
    idea: "Čierny najprv nechá bieleho obsadiť stred a pripraví si strelca na g7 (fianchetto), odkiaľ bude na stred strieľať z diaľky.",
    w: ["Postav pevný stred (e4, d4), vyviň figúrky a priprav útok na kráľa.", "Pozor na protiúdery ...c5 alebo ...e5."],
    b: ["Postav strelca na g7, rošuj a potom zaútoč na biely stred ťahmi ...c5 alebo ...e5.", "Nechaj bieleho ísť dopredu a potom jeho stred rozbi."]
  },
  alekhine: {
    n: "Aljechinova obrana",
    idea: "Čierny láka biele pešiaky dopredu tým, že hneď v 1. ťahu napadne e4 jazdcom na f6.",
    w: ["Požeň pešiakov rozumne dopredu (e5, d4), ale pozor, aby sa ti stred nerozpadol.", "Rýchlo za pešiakmi vyviň aj figúrky."],
    b: ["Keď bieli pešiaci príliš postúpia, napádaj ich ťahmi ...d6 a ...c5.", "Rozbi biely stred skôr, ako ťa stlačí."]
  },
  d4d5: {
    n: "Zatvorená hra",
    idea: "Obaja hráči obsadili stred pešiakmi d4 a d5. Hra je pokojnejšia a pozičná – dôležité je správne postavenie figúrok.",
    w: ["Pridaj tlak na d5 ťahom c4 (Dámsky gambit) alebo sa pevne rozostav (Sf4/e3).", "Bojuj o ovládnutie polí e4 a c5."],
    b: ["Drž pevne stred na d5 (ťahmi ...e6 alebo ...c6).", "Vyviň figúrky a nezabudni na c8 strelca."]
  },
  qg: {
    n: "Dámsky gambit",
    idea: "Biely ťahom c4 napáda čierneho pešiaka d5, aby získal prevahu v strede. (Pešiaka v skutočnosti nestráca, vie ho získať späť.)",
    w: ["Tlač na d5, vyviň jazdcov na c3 a f3 a priprav útok v strede ťahom e4.", "Využi polo-otvorený c-stĺpec pre vežu."],
    b: ["Bráň d5 ťahom ...e6 alebo ...c6, prípadne pešiaka vezmi (...dxc4) a rýchlo sa vyvíjaj.", "V pravej chvíli urob protiúder ...c5 alebo ...e5."]
  },
  qgd: {
    n: "Dámsky gambit odmietnutý",
    idea: "Čierny pevne drží stred na d5 ťahom ...e6. Pevná stavba, len strelec c8 potrebuje čas na uvoľnenie.",
    w: ["Vyviň strelca na g5 alebo f4, rošuj a priprav útok na dámskom krídle alebo v strede.", "Využi viac priestoru."],
    b: ["Urob rošádu a uvoľni pozíciu ťahom ...c5 alebo ...b6 so strelcom na b7.", "Trpezlivo bráň stred a čakaj na svoju šancu."]
  },
  qga: {
    n: "Dámsky gambit prijatý",
    idea: "Čierny vezme pešiaka na c4, aby uvoľnil napätie v strede, ale nepokúša sa ho udržať za každú cenu.",
    w: ["Zahraj e3 alebo e4 a vezmi si pešiaka späť strelcom (Sxc4) so silným stredom.", "Rýchlo vyviň figúrky a rošuj."],
    b: ["Nesnaž sa pešiaka c4 zúfalo brániť ťahom ...b5? (príde a4!).", "Radšej sa rýchlo vyviň (...Jf6, ...e6, ...c5) a udri na biely stred."]
  },
  slav: {
    n: "Slovanská obrana",
    idea: "Čierny bráni d5 pešiakom c6, takže si nezavrie bielopoľného strelca na c8. Pevná a pružná obrana.",
    w: ["Vyviň jazdcov na f3 a c3, hraj e3 alebo Sf4 a bojuj o stred.", "Kontroluj pole e5."],
    b: ["Vyviň strelca na f5 alebo g4 skôr, než zahráš ...e6.", "Potom zahraj ...e6 a v pravej chvíli ...c5 alebo ...dxc4 s ...b5."]
  },
  london: {
    n: "Londýnsky systém",
    idea: "Biely stavia pevnú pyramídu z pešiakov (d4, e3, c3) a vyvíja strelca na f4 mimo reťaz. Jednoduchý a spoľahlivý plán.",
    w: ["Postav Sf4, e3, c3, Jf3, Sd3 a Jbd2, potom rošuj a útoč na pole e5 alebo kráľovské krídlo.", "Dávaj pozor na skoré ...c5 a ...Db6 od čierneho."],
    b: ["Napadni biely stred a dámske krídlo ťahmi ...c5 a ...Jc6 (často aj ...Db6).", "Nenechaj bieleho v pokoji postaviť útok na kráľa."]
  },
  colle: {
    n: "Colleho systém",
    idea: "Biely stavia pevnú zostavu d4, e3, Sd3, Jf3 a c3, a neskôr chce otvoriť hru prielomom e4.",
    w: ["Priprav ťah e4 (cez Sd3, Jbd2, Ve1) a po otvorení stredu zaútoč na kráľovskom krídle.", "Hraj trpezlivo a bezpečne."],
    b: ["Bráň prielomu e4 a aktívne vyvíjaj figúrky (...c5, ...Jc6).", "Ak biely zavrel svojho strelca c1, využi to na dámskom krídle."]
  },
  trompowsky: {
    n: "Trompowského útok",
    idea: "Biely hneď v 2. ťahu napáda jazdca f6 strelcom na g5 – chce vymeniť a zdvojiť čiernemu pešiakov alebo ho vyviesť z knihy.",
    w: ["Rozhodni sa, či jazdca vymeníš na f6 (zdvojenie pešiakov), alebo ustúpiš na h4/f4.", "Rýchlo sa vyviň a bojuj o stred."],
    b: ["Odpovedz aktívne (...Je4, ...c5 alebo ...d5) a nenechaj si ľahko pokaziť pešiakov.", "Využi dvojicu strelcov, ak biely vezme na f6."]
  },
  kid: {
    n: "Kráľovská indická obrana",
    idea: "Veľmi bojovná obrana proti 1. d4! Čierny nechá bieleho obsadiť stred, postaví strelca na g7, rošuje a potom udrie na stred.",
    w: ["Získaj priestor na dámskom krídle (c4, Jc3, b4-b5) a brzdi čierny útok na kráľa.", "Pozor na prielom ...e5 alebo ...f5 na kráľovskom krídle."],
    b: ["Po rošáde priprav úder ...e5 alebo ...c5.", "Ak sa stred zavrie, zaútoč na kráľa ťahmi ...f5, ...f4 a pešiakmi na kráľovskom krídle!"]
  },
  grunfeld: {
    n: "Grünfeldova obrana",
    idea: "Čierny obetuje stred pešiakmi pre rýchly tlak strelca z g7 a figúrok na biely pešiakový stred.",
    w: ["Postav silný stred (c4, d4, e4) a chráň ho pred tlakom čiernych figúrok.", "Nedovoľ čiernemu zničiť tvojich stredových pešiakov."],
    b: ["Strieľaj na biely stred strelcom z g7 a napádaj ho ťahmi ...c5 a ...Jc6.", "Hraj aktívne a figúrkovo."]
  },
  nimzo: {
    n: "Nimzovičova indická obrana",
    idea: "Čierny zviaže bieleho jazdca c3 strelcom na b4 a bojuje o ovládnutie poľa e4.",
    w: ["Hraj na dvojicu strelcov (Dc2 alebo e3), posilni stred a chystaj e4.", "Nedovoľ čiernemu zablokovať ti pešiakov na c4."],
    b: ["Kontroluj pole e4, v pravej chvíli vymeň strelca na c3 a napádaj zdvojeného pešiaka c4.", "Hraj pružne v strede (...d5 alebo ...c5)."]
  },
  qid: {
    n: "Dámska indická obrana",
    idea: "Čierny stavia strelca na b7 (fianchetto), aby z diaľky kontroloval kľúčové pole e4.",
    w: ["Získaj priestor v strede ťahmi g3, Sg2, d5 alebo e4 a obmedz strelca b7.", "Rošuj a rozvíjaj tlak na c-stĺpci."],
    b: ["Kontroluj pole e4 strelcom z b7 a jazdcom z f6.", "Priprav ...c5 alebo ...d5, aby mal strelec b7 voľný výhľad."]
  },
  benoni: {
    n: "Obrana Benoni",
    idea: "Čierny hneď napáda d4 ťahom ...c5. Vzniká nerovnovážna hra: biely útočí v strede, čierny na dámskom krídle.",
    w: ["Postúp na d5, získaj priestor a priprav prielom e4-e5 v strede.", "Stráž postup čiernych pešiakov na dámskom krídle (...b5)."],
    b: ["Využi pešiakovú prevahu na dámskom krídle (...a6, ...b5) a strelca na g7.", "Napádaj bieleho pešiaka e4."]
  },
  dutch: {
    n: "Holandská obrana",
    idea: "Čierny bojuje o pole e4 ťahom ...f5. Ostré otvorenie, ktoré však trochu oslabuje okolie čierneho kráľa.",
    w: ["Hraj g3, Sg2, c4 a Jc3 a využi slabšie biele políčka u čierneho.", "Pozor na útok čierneho na kráľovskom krídle."],
    b: ["Vyviň figúrky na e4 (Sg7 alebo Se7, Jf6), rošuj a útoč na kráľovskom krídle.", "Vezmi si späť kontrolu nad poľom e4."]
  },
  english: {
    n: "Anglická hra",
    idea: "Biely začína krídlovým ťahom 1. c4, kontroluje pole d5 a necháva si rôzne možnosti pre stred.",
    w: ["Často vyviň strelca na g2 (fianchetto), jazdca na c3 a tlač na dámskom krídle.", "Kontroluj dôležité pole d5."],
    b: ["Odpovedz ...e5 (obrátená Sicílska) alebo ...c5 (symetrická) alebo ...e6 s ...d5.", "Bojuj o stredové polia d4 a e4."]
  },
  reti: {
    n: "Rétiho hra",
    idea: "Biely začne jazdcom na f3, aby nezradil svoj plán priskoro. Stred napáda z diaľky strelcami (g3, Sg2).",
    w: ["Postav strelca na g2, zaútoč na súperov stred ťahom c4 a drž pozíciu pružnú.", "Rošuj a hraj podľa toho, čo postaví súper."],
    b: ["Obsaď stred pešiakmi (...d5, prípadne ...c5 alebo ...e5) a pokojne vyviň figúrky.", "Nedaj bielemu ľahko rozbiť tvoj stred."]
  },
  catalan: {
    n: "Katalánska hra",
    idea: "Spojenie Dámskeho gambitu (d4, c4) a silného strelca na g2, ktorý strieľa cez celú uhlopriečku.",
    w: ["Tlač strelcom z g2 na čierne dámske krídlo a na pole d5.", "Hraj trpezlivo – aj keď obetuješ pešiaka c4, získaš obrovský tlak."],
    b: ["Pevne chráň dámske krídlo, rýchlo sa vyviň a rošuj.", "Snaž sa uvoľniť hru ťahmi ...c5 alebo ...dxc4."]
  },
  bird: {
    n: "Birdova hra",
    idea: "Biely začína 1. f4 a bojuje o pole e5. Dáva však pozor, aby si príliš neoslabil svojho kráľa.",
    w: ["Kontroluj pole e5 (Jf3, e3/g3, b3, Sb2) a priprav útok na kráľovskom krídle.", "Nezabudni na bezpečie vlastného kráľa."],
    b: ["Hraj ...d5, ...g6 alebo ostrý Fromov gambit (1...e5!).", "Využi oslabenú uhlopriečku e1–h4."]
  },
  polish: {
    n: "Sokolského (Poľská) hra",
    idea: "Zriedkavé a hravé otvorenie 1. b4! Biely chce rýchlo postaviť strelca na b2 a prekvapiť súpera.",
    w: ["Postav strelca na b2 a útoč na stredové pole e5 a kráľovské krídlo.", "Dávaj pozor na pešiaka b4, aby ti ho súper nezobral zadarmo."],
    b: ["Obsaď stred (...e5, ...d5) a napadni pešiaka b4.", "Pokojným vývinom získaš dobrú hru."]
  }
};

/* [uciString, eco, nazovVariantu, planKey] */
const OPENING_BOOK = [
  /* 1. e4 */
  ["e2e4 e7e5", "C20", "Otvorená hra", "e4e5"],
  ["e2e4 e7e5 g1f3 b8c6", "C44", "Otvorená hra (2. Jf3 Jc6)", "e4e5"],
  ["e2e4 e7e5 g1f3 b8c6 f1c4", "C50", "Talianska hra", "italian"],
  ["e2e4 e7e5 g1f3 b8c6 f1c4 f8c5", "C50", "Talianska hra: Giuoco Piano", "italian"],
  ["e2e4 e7e5 g1f3 b8c6 f1c4 f8c5 c2c3", "C53", "Talianska hra: Klasický variant (c3)", "italian"],
  ["e2e4 e7e5 g1f3 b8c6 f1c4 f8c5 d2d3", "C50", "Talianska hra: Giuoco Pianissimo", "italian"],
  ["e2e4 e7e5 g1f3 b8c6 f1c4 f8c5 b2b4", "C51", "Talianska hra: Evansov gambit", "evans"],
  ["e2e4 e7e5 g1f3 b8c6 f1c4 f8c5 b2b4 c5b4", "C51", "Evansov gambit prijatý", "evans"],
  ["e2e4 e7e5 g1f3 b8c6 f1c4 g8f6", "C55", "Hra dvoch jazdcov", "twoknights"],
  ["e2e4 e7e5 g1f3 b8c6 f1c4 g8f6 f3g5", "C57", "Hra dvoch jazdcov: Útok Jg5 na f7", "twoknights"],
  ["e2e4 e7e5 g1f3 b8c6 f1c4 g8f6 d2d3", "C55", "Hra dvoch jazdcov: Moderný variant (d3)", "twoknights"],
  ["e2e4 e7e5 g1f3 b8c6 f1c4 f8e7", "C50", "Talianska hra: Maďarská obrana", "italian"],

  ["e2e4 e7e5 g1f3 b8c6 f1b5", "C60", "Španielska hra", "spanish"],
  ["e2e4 e7e5 g1f3 b8c6 f1b5 a7a6", "C70", "Španielska hra: Morphyho obrana", "spanish"],
  ["e2e4 e7e5 g1f3 b8c6 f1b5 a7a6 b5a4 g8f6", "C78", "Španielska hra: Morphyho obrana (3...a6 4. Sa4 Jf6)", "spanish"],
  ["e2e4 e7e5 g1f3 b8c6 f1b5 a7a6 b5a4 g8f6 e1g1 f8e7", "C84", "Španielska hra: Zatvorený variant", "spanish"],
  ["e2e4 e7e5 g1f3 b8c6 f1b5 a7a6 b5c6", "C68", "Španielska hra: Výmenný variant", "spanish"],
  ["e2e4 e7e5 g1f3 b8c6 f1b5 g8f6", "C65", "Španielska hra: Berlínska obrana", "spanish"],

  ["e2e4 e7e5 g1f3 b8c6 d2d4", "C44", "Škótska hra", "scotch"],
  ["e2e4 e7e5 g1f3 b8c6 d2d4 e5d4 f3d4", "C45", "Škótska hra: Hlavný variant", "scotch"],
  ["e2e4 e7e5 g1f3 b8c6 d2d4 e5d4 f1c4", "C44", "Škótsky gambit", "scotch"],
  ["e2e4 e7e5 g1f3 b8c6 b1c3 g8f6", "C47", "Hra štyroch jazdcov", "fourknights"],
  ["e2e4 e7e5 g1f3 b8c6 b1c3 g8f6 f1b5", "C48", "Hra štyroch jazdcov: Španielsky variant", "fourknights"],
  ["e2e4 e7e5 g1f3 b8c6 b1c3 g8f6 f1c4", "C47", "Hra štyroch jazdcov: Taliansky variant", "fourknights"],

  ["e2e4 e7e5 g1f3 g8f6", "C42", "Ruská hra (Petrovova obrana)", "petrov"],
  ["e2e4 e7e5 g1f3 g8f6 f3e5 d7d6", "C42", "Ruská hra: Klasický variant", "petrov"],
  ["e2e4 e7e5 g1f3 d7d6", "C41", "Filidorova obrana", "philidor"],
  ["e2e4 e7e5 g1f3 d7d6 d2d4", "C41", "Filidorova obrana: Hlavný variant", "philidor"],
  ["e2e4 e7e5 b1c3", "C25", "Viedenská hra", "vienna"],
  ["e2e4 e7e5 b1c3 g8f6", "C26", "Viedenská hra: Falkbeerova obrana", "vienna"],
  ["e2e4 e7e5 b1c3 b8c6 f1c4", "C25", "Viedenská hra: so strelcom na c4", "vienna"],
  ["e2e4 e7e5 f2f4", "C30", "Kráľovský gambit", "kingsgambit"],
  ["e2e4 e7e5 f2f4 e5f4", "C33", "Kráľovský gambit prijatý", "kingsgambit"],
  ["e2e4 e7e5 f2f4 f8c5", "C30", "Kráľovský gambit odmietnutý (Klasický)", "kingsgambit"],
  ["e2e4 e7e5 f2f4 d7d5", "C31", "Kráľovský gambit: Falkbeerov protigambit", "kingsgambit"],
  ["e2e4 e7e5 d2d4", "C21", "Stredná hra", "center"],
  ["e2e4 e7e5 d2d4 e5d4 d1d4", "C22", "Stredná hra: s dámou na d4", "center"],
  ["e2e4 e7e5 d2d4 e5d4 c2c3", "C21", "Severský gambit", "center"],
  ["e2e4 e7e5 f1c4", "C23", "Hra strelca", "bishop"],

  /* Sicílska obrana */
  ["e2e4 c7c5", "B20", "Sicílska obrana", "sicilian"],
  ["e2e4 c7c5 g1f3", "B27", "Otvorená Sicílska obrana", "sicilian"],
  ["e2e4 c7c5 g1f3 d7d6 d2d4 c5d4 f3d4 g8f6 b1c3 a7a6", "B90", "Sicílska obrana: Najdorfov variant", "sicilian"],
  ["e2e4 c7c5 g1f3 d7d6 d2d4 c5d4 f3d4 g8f6 b1c3 g7g6", "B70", "Sicílska obrana: Dračí variant", "sicilian"],
  ["e2e4 c7c5 g1f3 d7d6 d2d4 c5d4 f3d4 g8f6 b1c3 e7e6", "B80", "Sicílska obrana: Scheveningenský variant", "sicilian"],
  ["e2e4 c7c5 g1f3 b8c6 d2d4 c5d4 f3d4", "B32", "Sicílska obrana: Otvorená s 2...Jc6", "sicilian"],
  ["e2e4 c7c5 g1f3 e7e6 d2d4 c5d4 f3d4", "B40", "Sicílska obrana: s 2...e6", "sicilian"],
  ["e2e4 c7c5 c2c3", "B22", "Sicílska obrana: Alapinov variant (c3)", "sicilian"],
  ["e2e4 c7c5 b1c3", "B23", "Zatvorená Sicílska obrana", "sicilian"],
  ["e2e4 c7c5 f1c4", "B20", "Sicílska obrana: Bowdlerov útok (Sc4)", "sicilian"],

  /* Francúzska obrana */
  ["e2e4 e7e6", "C00", "Francúzska obrana", "french"],
  ["e2e4 e7e6 d2d4 d7d5", "C00", "Francúzska obrana: Hlavná pozícia", "french"],
  ["e2e4 e7e6 d2d4 d7d5 e4d5 e6d5", "C01", "Francúzska obrana: Výmenný variant", "french"],
  ["e2e4 e7e6 d2d4 d7d5 e4e5", "C02", "Francúzska obrana: Postupový variant", "french"],
  ["e2e4 e7e6 d2d4 d7d5 b1d2", "C03", "Francúzska obrana: Tarraschov variant", "french"],
  ["e2e4 e7e6 d2d4 d7d5 b1c3 f8b4", "C15", "Francúzska obrana: Winawerov variant", "french"],
  ["e2e4 e7e6 d2d4 d7d5 b1c3 g8f6", "C11", "Francúzska obrana: Klasický variant", "french"],

  /* Caro-Kann */
  ["e2e4 c7c6", "B10", "Obrana Caro-Kann", "carokann"],
  ["e2e4 c7c6 d2d4 d7d5", "B12", "Obrana Caro-Kann: Hlavná pozícia", "carokann"],
  ["e2e4 c7c6 d2d4 d7d5 e4d5 c6d5", "B13", "Caro-Kann: Výmenný variant", "carokann"],
  ["e2e4 c7c6 d2d4 d7d5 e4e5", "B12", "Caro-Kann: Postupový variant", "carokann"],
  ["e2e4 c7c6 d2d4 d7d5 b1c3 d5e4 c3e4 c8f5", "B18", "Caro-Kann: Klasický variant", "carokann"],

  /* Škandinávska, Pirc, Aljechin */
  ["e2e4 d7d5", "B01", "Škandinávska obrana", "scandinavian"],
  ["e2e4 d7d5 e4d5 d8d5", "B01", "Škandinávska obrana: s dámou (2...Dxd5)", "scandinavian"],
  ["e2e4 d7d5 e4d5 g8f6", "B01", "Škandinávska obrana: Moderný variant (2...Jf6)", "scandinavian"],
  ["e2e4 d7d6", "B07", "Pircova obrana", "pirc"],
  ["e2e4 d7d6 d2d4 g8f6 b1c3 g7g6", "B07", "Pircova obrana: Klasická", "pirc"],
  ["e2e4 g7g6", "B06", "Moderná obrana", "pirc"],
  ["e2e4 g8f6", "B02", "Aljechinova obrana", "alekhine"],
  ["e2e4 g8f6 e4e5 f6d5", "B02", "Aljechinova obrana: Hlavný variant", "alekhine"],

  /* 1. d4 */
  ["d2d4 d7d5", "D00", "Zatvorená hra (1. d4 d5)", "d4d5"],
  ["d2d4 d7d5 c2c4", "D06", "Dámsky gambit", "qg"],
  ["d2d4 d7d5 c2c4 e7e6", "D30", "Dámsky gambit odmietnutý", "qgd"],
  ["d2d4 d7d5 c2c4 e7e6 b1c3 g8f6 c1g5", "D50", "Dámsky gambit odmietnutý: s Sg5", "qgd"],
  ["d2d4 d7d5 c2c4 d5c4", "D20", "Dámsky gambit prijatý", "qga"],
  ["d2d4 d7d5 c2c4 c7c6", "D10", "Slovanská obrana", "slav"],
  ["d2d4 d7d5 c2c4 c7c6 g1f3 g8f6 b1c3 d5c4", "D15", "Slovanská obrana: Hlavný variant", "slav"],
  ["d2d4 d7d5 c2c4 c7c6 g1f3 g8f6 b1c3 e7e6", "D43", "Poloslovanská obrana", "slav"],

  /* Londýnsky systém, Colle, Trompowsky */
  ["d2d4 d7d5 c1f4", "D00", "Londýnsky systém", "london"],
  ["d2d4 d7d5 g1f3 g8f6 c1f4", "D02", "Londýnsky systém (s Jf3)", "london"],
  ["d2d4 g8f6 g1f3 d7d5 c1f4", "D02", "Londýnsky systém", "london"],
  ["d2d4 g8f6 c1f4", "A45", "Londýnsky systém (proti ...Jf6)", "london"],
  ["d2d4 d7d5 g1f3 g8f6 e2e3", "D05", "Colleho systém", "colle"],
  ["d2d4 g8f6 c1g5", "A45", "Trompowského útok", "trompowsky"],

  /* Indické obrany, Holandská, Benoni, Katalánska */
  ["d2d4 g8f6", "A45", "Indická hra (1. d4 Jf6)", "kid"],
  ["d2d4 g8f6 c2c4 g7g6 b1c3 f8g7", "E60", "Kráľovská indická obrana", "kid"],
  ["d2d4 g8f6 c2c4 g7g6 b1c3 f8g7 e2e4 d7d6", "E70", "Kráľovská indická obrana: Klasická", "kid"],
  ["d2d4 g8f6 c2c4 g7g6 b1c3 d7d5", "D80", "Grünfeldova obrana", "grunfeld"],
  ["d2d4 g8f6 c2c4 e7e6 b1c3 f8b4", "E20", "Nimzovičova indická obrana", "nimzo"],
  ["d2d4 g8f6 c2c4 e7e6 g1f3 b7b6", "E12", "Dámska indická obrana", "qid"],
  ["d2d4 g8f6 c2c4 e7e6 g2g3", "E00", "Katalánska hra", "catalan"],
  ["d2d4 g8f6 c2c4 c7c5", "A56", "Obrana Benoni", "benoni"],
  ["d2d4 g8f6 c2c4 c7c5 d4d5", "A60", "Moderný Benoni", "benoni"],
  ["d2d4 f7f5", "A80", "Holandská obrana", "dutch"],
  ["d2d4 f7f5 g2g3 g8f6 f1g2 e7e6", "A84", "Holandská obrana: Klasická / Leningradská", "dutch"],

  /* Krídlové otvorenia */
  ["c2c4", "A10", "Anglická hra", "english"],
  ["c2c4 e7e5", "A20", "Anglická hra: Obrátená Sicílska", "english"],
  ["c2c4 c7c5", "A30", "Anglická hra: Symetrický variant", "english"],
  ["g1f3", "A04", "Rétiho hra", "reti"],
  ["g1f3 d7d5 c2c4", "A09", "Rétiho hra: Hlavný variant", "reti"],
  ["f2f4", "A02", "Birdova hra", "bird"],
  ["b2b4", "A00", "Sokolského (Poľská) hra", "polish"]
];

let MAP = null;
const epd = fen => fen.split(" ").slice(0, 4).join(" ");

function ensureMap(){
  if (MAP) return MAP;
  MAP = new Map();
  if (typeof Chess !== "function") return MAP;
  const c = new Chess();
  for (const [line, eco, name, plan] of OPENING_BOOK){
    c.reset();
    let ok = true;
    for (const u of line.split(" ")){
      if (!c.move({from:u.slice(0,2), to:u.slice(2,4), promotion:u[4] || undefined})){ ok = false; break; }
    }
    if (ok) MAP.set(epd(c.fen()), {eco, name, plan});
  }
  return MAP;
}

window.OPENING_BOOK = OPENING_BOOK;
window.OPENING_PLANS = OPENING_PLANS;
window.detectOpening = function(fens){
  if (!fens || !fens.length) return null;
  const m = ensureMap();
  if (!m.size) return null;
  let best = null;
  for (let i = 0; i < fens.length; i++){
    const hit = m.get(epd(fens[i]));
    if (hit) best = {eco:hit.eco, name:hit.name, ply:i, plan:OPENING_PLANS[hit.plan] || null};
  }
  return best;
};
})();
