/* ================= Putovanie: sezóna 1 Excelsior (mapa, kroky, odbočky, boss) =================
   Načítava sa pred hlavným skriptom; používa jeho globálne funkcie (S, Data, drawBoard, …) až pri volaní.
   Stav hráča: kolekcia "journey", dokument `${profileId}_s1`. */

const JY_IMG = n => `assets/${n}.webp`;
const JY_STEPS = 5, JY_CORE_N = 4, JY_BOSS_N = 6, JY_RACE_N = 8, JY_RACE_PEN = 5000;
const JY_XP = {step:20, side:10, boss:30};

/* ---------- sezóna ---------- */
const JY_S1 = {
  id:"s1", name:"Excelsior", land:"Les vidličiek",
  fen:"n1rb4/1p3p1p/1p6/1R5K/8/p3p1PN/1PP1R3/N6k w - - 0 1",
  path:["b2","b4","c5","c6","b7","a8"],
  wmoves:["1.b4","2.bxc5","3.c6","4.cxb7","5.bxa8D#"],
  replies:[["c8","c5","1…Vc5+"],["a3","a2","2…a2"],["d8","c7","3…Sc7"],["h7","h6","4…h6 (čokoľvek)"],null],
  /* 6 krajín (19. 11.): krajina j leží na path[j]; lmove[j] = ktorý ťah bieleho nasleduje po bossovi krajiny j, lreply[j] = odpoveď čierneho;
     fno[j] = označenie krajiny v názvoch súborov (pohladnica-N-k, odbocka-x-N-pred) */
  lmove:[0,null,1,2,3,4], lreply:[null,0,1,2,3,null], fno:[1,"R",2,3,4,5],
  intro:"Pred vyše 160 rokmi vymyslel Sam Loyd úlohu <b>Excelsior</b>: biely dá mat piatym ťahom. Stavil sa s kamarátom, nech ukáže figúru, ktorá mat <b>určite nedá</b>. Kamarát ukázal na malého pešiaka na b2… Uvidíme, či mal pravdu.",
  places:[
    {name:"Les vidličiek", short:"Les", theme:"Vidličky – dvojitý útok", img:"land-1-les",
     guide:{name:"Vidličkový drak", img:"boss-1-drak", teach:"Drak ťa naučí, ako jedna figúrka zaútočí na dve veci naraz.",
       steps:["Jazdec je najlepšia vidlička – skáče tam, kam nikto nečaká.","Hľadaj figúrku, ktorá napadne dve veci naraz.","Šach a útok na figúru zároveň – to je kráľovská vidlička!","Aj pešiak vie vidličku – šikmo doľava aj doprava.","Najsilnejšia hrozba je tá, ktorú súper nestihne zastaviť dvakrát."],
       preBoss:"Chodník končí priepasťou. Pamätaj: jeden ťah môže urobiť dve veci naraz.",
       lures:{datel:"Ďateľ klope na stromy dvakrát – ťuk-ťuk, ako vidlička! V Ďateľovom lese sú vidličky na viac ťahov. Kto ich vyrieši, dostane lupu do súboja.", race:"Gusto sa chvasce, že vidličku nájde rýchlejšie ako ty. Ukážeš mu v Preteku rýchloviek, ako rýchlo vidíš dva ciele naraz?", castle:"Na Hrade otvorení ťa Albín naučí, ako na začiatku vyviesť jazdcov. A jazdec – to je môj najlepší vidličkár!", cave:"V Tajnej jaskyni som schoval dve ťažšie vidličky. Kto ich nájde, dostane srdiečko navyše do súboja.", well:"V Studnici opakovania sa odrážajú úlohy, ktoré už poznáš. Zopakuj si ich – a dostaneš nápovedu do súboja."},
       meet:[{who:"Drak", t:"Stoj! Kto sa odváži do Lesa vidličiek?"},{who:"Béčko", t:"J-ja som Béčko… idem dať mat Temnému kráľovi."},
             {who:"Drak", t:"Ha! Konečne niekto odvážny. Pozri: jedna vidlička, dva hroty, dva ciele. Naučím ťa to."},{narr:1, t:"Odvtedy drak kráčal s Béčkom každým krokom lesa."}]},
     boss:{name:"Priepasť", type:"obstacle", img:"boss-1-priepast", anim:"jump", how:"Za každú správnu odpoveď nazbiera Béčko odvahu. Keď vydrží do konca, skočí o dve políčka naraz cez priepasť."},
     move:"1.b4!", story:"Les vidličiek sa začína priamo na b2, kde Béčko stojí. Na konci lesa je priepasť – pešiak, ktorý ešte nikdy nevykročil, ju smie preskočiť o dve políčka naraz.",
     route:"M 6 262 C 60 225 120 205 200 200 S 360 205 420 185 S 470 150 458 134 S 462 118 470 114",
     pools:{core:["s2_dq","s2_dn","bain_03","bain_04"], cave:["s4_dbl~!röntgen"], well:["rush:w"]},
     letters:{
       datel:{from:"Ďateľ", t:"Ťuk-ťuk! Klopem na tie isté stromy znova a znova. Drak sa smeje, že som tvrdohlavý. Ale každý strom v lese poznám naspamäť – a ty to raz budeš mať s úlohami rovnako."},
       race:{from:"Gusto", t:"Hej, Béčko! Myslel som, že som najrýchlejší pešiak na šachovnici. Dnes si ma skoro dobehol. Zajtra to skúsime znova – a ja si dám šiltovku dozadu, aby som videl lepšie!", t2:"Hej, Béčko! Myslel som, že som najrýchlejší pešiak na šachovnici. Dnes sme dobehli úplne naraz! Ale nabudúce ťa určite predbehnem – dám si šiltovku dozadu, aby som videl lepšie!", t3:"Hej, Béčko! Myslel som, že som najrýchlejší pešiak na šachovnici – a ty si ma dnes predbehol! Zajtra ti to vrátim. Dám si šiltovku dozadu, aby som videl lepšie!"},
       castle:{from:"Albín", t:"V rohu a1 sedím sto rokov a videl som tisíc začiatkov partie. Tí najlepší na začiatku nerobia nič zložité: vyvedú jazdcov a strelcov a schovajú kráľa. Zapamätaj si to, mladý."},
       cave:{from:"Tajná jaskyňa", t:"V jaskyni si našiel dračie hniezdo a v ňom starú škrupinu s nakreslenou vidličkou. Drak sa začervenal: „To som ja, keď som bol malý. Prvú vidličku som urobil ešte zo škrupiny!“"},
       well:{from:"Studnička", t:"Prečo drak stráži les? Kedysi tu rástol jediný rozdvojený strom. Drak si z jeho konára urobil vidličku a sľúbil, že les ochráni pred tieňom. Odvtedy tu každý strom rastie do tvaru V."}}},
    {name:"Rozcestie dvoch chodníkov", short:"Rozcestie", theme:"Dvojitá hrozba a tichý ťah", img:"land-2-rozcestie", moveLbl:"hrozby Vd5 · Vf5",
     guide:{name:"Viktor", img:"pc-w-viktor", teach:"Viktor učí: tichý ťah nič neberie, ale pripraví dve hrozby naraz. Súper stihne zastaviť len jednu.",
       steps:["Dobrý ťah nemusí nič brať. Stačí, keď niečím hrozí.","Pred ťahom sa spýtaj: čo budem hroziť potom?","Jeden ťah, dve hrozby – súper stihne zastaviť len jednu.","Hrozba matom je najsilnejšia hrozba zo všetkých.","Keď súper zastaví jednu hrozbu, pozri sa, či druhá ešte platí."],
       preBoss:"Tieň Temného kráľa sa valí na oba chodníky. Ukáž mu, že dve hrozby naraz zastaviť nevie!",
       lures:{datel:"Ďateľ má úlohy na viac ťahov: najprv tichý ťah, potom hrozba. Kto ich domyslí, dostane lupu do súboja.", race:"Gusto vraví, že hrozby nájde rýchlejšie ako ty. Ukážeš mu v Preteku rýchloviek, kto vidí dve naraz?", castle:"Albín na Hrade otvorení vie, ako už na začiatku partie hroziť dvoma vecami naraz. Choď sa ho opýtať!", cave:"V Tajnej jaskyni pod rozcestím sú dve ťažké úlohy s dvojitou hrozbou. Lumka ti posvieti – a dostaneš srdiečko navyše.", well:"V Studnici sa odrážajú vidličky z Lesa. Aj vidlička je dvojitá hrozba – zopakuj si ich a dostaneš nápovedu."},
       meet:[{who:"Viktor", t:"Béčko! Ten skok bol úžasný – celý les ťa videl!"},{who:"Béčko", t:"Viktor! Pozri, chodník sa tu delí na dva. Kam vedú?"},
             {who:"Viktor", t:"Jeden k d5, druhý k f5. Z oboch môžem Temnému kráľovi zahroziť matom. Jeden tvoj skok – a mám dve hrozby naraz!"},{narr:1, t:"Vtedy sa z rohu h1 začala plaziť fialová hmla. Tieň Temného kráľa chcel oba chodníky zavaliť."}]},
     boss:{name:"Tieň Temného kráľa", type:"obstacle", img:"boss-2-tien", imgDone:"land-2-rozcestie", anim:"fog", winTxt:"Tieň sa rozplynul a Temný kráľ v zúfalstve zahrá <b>1…Vc5+</b>.", how:"Tieň sa snaží zavaliť oba chodníky. Za každú správnu odpoveď odfúkneš kúsok hmly – keď vydržíš do konca, tieň sa rozplynie."},
     move:"1…Vc5+", story:"Béčko doskočil na b4. Odtiaľ vedú dva chodníky – Viktor môže ísť na d5 aj na f5 a z oboch miest zahroziť matom. Dve hrozby naraz Temný kráľ zastaviť nevie.",
     route:"M 440 276 C 404 256 345 232 299 215 S 210 182 183 171 S 140 150 128 128",
     pools:{core:["bain_09","s2_dq"], cave:["s4_dbl~!röntgen"], well:["s2_dq","s2_dn","bain_03"]},
     letters:{
       datel:{from:"Ďateľ", t:"Na rozcestí klopem raz na ľavý strom a raz na pravý. Viktor sa smeje, že aj ja mám dvojitú hrozbu – nikto nevie, kam ťuknem najprv."},
       race:{from:"Gusto", t:"Na rozcestí som zastal a nevedel, ktorým chodníkom bežať. Viktor povedal: „Keď máš dve dobré cesty, súper nevie, kam sa postaviť.“ Tak som bežal oboma – najprv jedným, potom druhým!"},
       castle:{from:"Albín", t:"Aj v otvorení sa dá hroziť dvoma vecami naraz. Dobre postavený strelec napadne pešiaka a zároveň mieri na kráľa. Súper sa potom nevie rozhodnuť, čo brániť skôr."},
       cave:{from:"Tajná jaskyňa", t:"V jaskyni pod rozcestím si našiel starú mapu. Sú na nej nakreslené dva chodníky a pri nich podpis: Viktor. Túto cestu naplánoval už dávno – čakal len na pešiaka, ktorý sa odváži skočiť cez priepasť."},
       well:{from:"Studnička", t:"Voda zo studničky sa delí na dva potôčiky. Žofka vraví, že s hrozbami je to rovnako: keď jeden potôčik zahradíš, voda potečie druhým."}}},
    {name:"Sovia mýtina", short:"Mýtina", theme:"Nechránené figúry a hrozby súpera", img:"land-2-sovia-mytina",
     guide:{name:"Sova Bdelá", img:"guide-sova", teach:"Sova z konára vidí všetko: pred každým ťahom sa pozri, čo súper hrozí – a ktorú figúru nechal nechránenú.",
       steps:["Po každom súperovom ťahu sa spýtaj: čo mi teraz hrozí?","Spočítaj: kto útočí a kto bráni.","Nechránená figúra je ako myška bez skrýše.","Aj tvoja figúra môže visieť – skontroluj ju skôr ako súper.","Keď ti dajú šach, najprv sa pozri, či útočníka môžeš zobrať."],
       preBoss:"Temná veža sa spolieha na pešiaka na b6. Hú-hú… ale môže ju ten pešiak naozaj pomstiť, keď Viktor mieri na b1?",
       lures:{datel:"Hú-hú… Ďateľ má úlohy na viac ťahov. Po každom ťahu sa pozri, čo súper hrozí. Za odmenu ti dá lupu do súboja.", race:"Gusto beží tak rýchlo, že sa nestihne obzrieť. Zbadáš v Preteku rýchloviek nechránenú figúru skôr ako on?", castle:"Na Hrade otvorení ti Albín ukáže, ako na začiatku partie nenechať žiadnu figúru bez ochrany.", cave:"V Tajnej jaskyni sú nastražené pasce na nechránené figúry. Kto ich prekuká, dostane srdiečko navyše do súboja s Temnou vežou.", well:"Hú-hú… v Studnici sa odrážajú vidličky z Lesa. Zopakuj si ich – nápoveda sa v súboji vždy hodí."},
       meet:[{who:"Sova", t:"Hú-hú! Kam sa ponáhľaš? Kráľ Hugo je v šachu!"},{who:"Béčko", t:"Musím mu pomôcť! Zoberiem Temnú vežu… ale veď ju chráni čierny pešiak na b6!"},
             {who:"Sova", t:"Pozri sa poriadne! Ten pešiak na b6 ťa nemôže zobrať – keby ťa zobral, veža Viktor by zbehol na b1 a dal Temnému kráľovi mat!"},{narr:1, t:"Sova podala Béčkovi ďalekohľad. Ten obranca na b6 bol naozaj iba naoko – Temná veža na c5 bola bez skutočnej ochrany."}]},
     boss:{name:"Temná veža", type:"char", img:"boss-2-temna-veza", how:"Temná veža dala Kráľovi Hugovi šach. Nájdi, čo súper hrozí a čo nechal bez skutočnej ochrany."},
     move:"2.bxc5", story:"Temná veža skočila na c5 so šachom. Čierny pešiak z b6 ju síce naoko chráni, ale nemôže Béčka zobrať – inak by veža Viktor zbehla na b1 a dala Temnému kráľovi mat! Preto Béčko vežu zoberie a Temný kráľ musí súrne poslať pešiaka na a2, aby strážil políčko b1.",
     route:"M 4 262 C 60 228 140 214 240 210 S 380 198 425 172 S 452 132 482 114",
     pools:{core:["rush:w","s1x_def","s3_def"], cave:["s3_trap"], well:["s2_dq","s2_dn","bain_03"]},
     letters:{
       datel:{from:"Ďateľ", t:"Ja a sova sme susedia. Ja klopem, ona počúva. Vraj podľa zvuku vie povedať, ktorý strom je dutý – a ktorá figúra nie je chránená."},
       race:{from:"Gusto", t:"Vieš, prečo sa stále ponáhľam? Lebo keď stojím, bojím sa, že ma niekto zje. Sova mi poradila, že stačí sa obzrieť. Tak sa teraz obzerám… aj pri behu!"},
       castle:{from:"Albín", t:"Sovu poznám dlho. Raz ma varovala, že ma súper napadne strelcom. Odvtedy sa po každom súperovom ťahu pýtam: Čo chce?"},
       cave:{from:"Tajná jaskyňa", t:"Odkiaľ má sova ďalekohľad? V jaskyni stojí prázdna krabička s nápisom „Pre toho, kto sa pozerá“. Sova ho tu našla pred rokmi – a odvtedy neprehliadla jedinú nechránenú figúru."},
       well:{from:"Studnička", t:"Pozri sa do vody. Vidíš? Aj tvoja vlastná figúra môže visieť bez ochrany. Dobre, že si ju zbadal skôr ako súper."}}},
    {name:"Skalná roklina", short:"Roklina", theme:"Odťah a dvojitý šach", img:"land-3-skalna-roklina",
     guide:{name:"Čarodejník odťahu", img:"boss-3-carodejnik", teach:"Čarodejník učí: keď jeden kameň odvalíš, otvorí sa cesta úplne inému. Uhni a otvor cestu kamarátovi.",
       steps:["Pozri, kto stojí za tvojou figúrkou – možno čaká, kým uhneš.","Uhni so šachom a súper sa nestihne brániť.","Dvojitý šach – kráľ musí utekať, nič iné nepomôže.","Aj súper môže mať odťah. Pozri sa za jeho figúrky.","Najlepšie uhýbanie je také, ktoré samo niečo napadne."],
       preBoss:"Brána je zatarasená… a stojíš v nej ty. Ktorým krokom ju otvoríš?",
       lures:{datel:"Ďateľ má úlohy na viac ťahov – najprv uhni, potom zaútoč. Kto ich zvládne, dostane lupu do súboja.", race:"Gusto si myslí, že odťah je pomalé kúzlo. V Preteku rýchloviek mu ukáž, že sa dá kúzliť aj rýchlo!", castle:"Albín na Hrade otvorení vie, ako na začiatku postaviť strelca za jazdca. Keď jazdec uhne – kúzlo! Tak sa začína odťah.", cave:"V Tajnej jaskyni čakajú maty, ktoré otvorí odťah. Odmena? Srdiečko navyše do súboja so Skalnou bránou.", well:"V Studnici sa odráža Sovia mýtina. Zopakuj si nechránené figúry a hrozby – dostaneš nápovedu do súboja."},
       meet:[{who:"Čarodejník", t:"Vitaj v rokline, malý. Vieš, prečo sa tu kamene hýbu?"},{who:"Béčko", t:"Ony sa hýbu?"},
             {who:"Čarodejník", t:"Keď uhne jeden, otvorí sa cesta druhému. Tomu sa hovorí odťah."},{who:"Béčko", t:"Takže niekedy pomôžem tým, že uhnem?"}]},
     boss:{name:"Skalná brána", type:"obstacle", img:"boss-3-brana-zatvorena", imgDone:"boss-3-brana-otvorena", anim:"open", how:"Béčko stojí Viktorovi v bráne. Za každú správnu odpoveď sa brána pootočí – keď vydržíš do konca, odvalí sa."},
     move:"3.c6!", story:"Béčko na c5 zavadzia Viktorovi na 5. rade. Krokom dopredu na c6 otvorí bránu – to je odťah.",
     route:"M 4 270 C 60 245 110 236 170 232 S 260 218 300 214 S 380 205 405 196 S 440 172 478 142",
     pools:{core:["s2_disc","s3_dbl~odkrytý|dvojitý","bain_05","bain_06","bain_07"], cave:["s3_m2~dvojitý šach","s4p_bat"], well:["rush:w","s3_def"]},
     letters:{
       datel:{from:"Ďateľ", t:"V rokline klopem na kamene. Čarodejník sa smeje: „Kameň nemusíš rozbiť. Stačí ho odsunúť a cesta sa otvorí sama.“"},
       race:{from:"Gusto", t:"Keď uhnem, otvorím cestu Viktorovi. Kto by povedal, že aj uhnúť môže byť útok!"},
       castle:{from:"Albín", t:"Aj v otvorení sa figúry skrývajú jedna za druhou. Strelec za jazdcom, dáma za pešiakom. Keď predná uhne, zadná zaútočí. To je to kúzlo."},
       cave:{from:"Tajná jaskyňa", t:"Našiel si Čarodejníkovu knihu kúziel. Na prvej strane je jediné kúzlo: „Uhni a zaútoč dvakrát.“ Ostatné strany sú prázdne – vraj si ich musí každý dopísať sám."},
       well:{from:"Studnička", t:"Kamene v rokline si pamätajú každý krok, čo si urobil. Vráť sa k starým úlohám a uvidíš, o koľko si rýchlejší."}}},
    {name:"Pavučinová húština", short:"Húština", theme:"Väzba", img:"land-4-pavucinova-hustina", sidePos:{datel:[205,340,-1], race:[330,300,-1], castle:[730,330,-1], cave:[575,475,1]},
     guide:{name:"Väzobný pavúk", img:"boss-2-pavuk", teach:"Pavúk vie o pavučinách všetko: kto sa v nich zamotá, nemôže sa pohnúť – inak by za ním ostalo niečo cenné bez ochrany.",
       steps:["Figúra pred kráľom sa nesmie pohnúť – je pripútaná.","Zviazanú figúru napadni ešte raz.","Viazanú figúru netreba hneď brať – neutečie.","Pozor, aby si sa sám nezamotal.","Keď vieš, ako funguje väzba, vieš sa jej aj vyhnúť – prekĺzneš cez každú pavučinu."],
       preBoss:"Temný strelec natiahol pasce. Ty už vieš, ako funguje väzba – prekĺzni cez jeho pavučiny!",
       lures:{datel:"Ďateľ má úlohy na viac ťahov: najprv figúru zviaž, potom ju napadni ešte raz. Odmenou je lupa do súboja.", race:"V Preteku rýchloviek treba väzbu nájsť rýchlo – kto zaváha, zamotá sa. Gusto už čaká na štarte!", castle:"Albín na Hrade otvorení pozná najslávnejšiu väzbu zo začiatku partie: strelec, za ním jazdec a za jazdcom dáma…", cave:"V Tajnej jaskyni sú najhustejšie pavučiny – ťažšie väzby. Kto cez ne prekĺzne, dostane srdiečko navyše do súboja.", well:"V Studnici sa odrážajú odťahy z Rokliny aj vidličky z Lesa. Zopakuj si ich – dostaneš nápovedu do súboja."},
       meet:[{who:"Béčko", t:"Ty pomáhaš Temnému strelcovi?!"},{who:"Pavúk", t:"Ja? Kdeže! Strelec mi ukradol pavučiny na svoje pasce."},
             {who:"Pavúk", t:"Kto sa zamotá, nemôže sa pohnúť – inak by za ním ostalo niečo bez ochrany. To je väzba."},{who:"Pavúk", t:"A vieš čo? Strelcove pasce chytia hlavne jeho vlastných."}]},
     boss:{name:"Temný strelec", type:"char", img:"boss-4-temny-strelec", how:"Temný strelec natiahol pasce. Ukáž, že vieš, kedy je figúra zviazaná – a prekĺzni cez jeho pavučiny."},
     move:"4.cxb7", story:"Strelec nastavil pascu, ale zamotali sa do nej čierni. Béčko prekĺzne medzi vláknami a zoberie na b7.",
     route:"M 20 272 C 80 250 140 228 190 214 S 270 192 288 168 S 268 140 252 126",
     pools:{core:["s2_pin~Väzba","s3_pin","bain_01"], cave:["s4_pin"], well:["s2_disc","bain_05","bain_06","s2_dn"]},
     letters:{
       datel:{from:"Ďateľ", t:"Raz som sa zamotal do pavučiny. Pavúk ma vyslobodil a povedal: „Kto sa zamotá, nemá sa šklbať. Najprv sa pozri, čo je za ním.“"},
       race:{from:"Gusto", t:"Pavučiny sú všade! Bežal som tak rýchlo, že som jednu roztrhol. Pavúk sa vôbec nehneval – vraj mu tým uletela muška."},
       castle:{from:"Albín", t:"Najslávnejšia väzba v otvoreniach? Strelec na g5 viaže jazdca na f6 k dáme. Videl som ju tisíckrát a vždy ma poteší."},
       cave:{from:"Tajná jaskyňa", t:"Ako sa Albín dostal do rohu? Kedysi bol najrýchlejší jazdec. Raz sa zamotal do pavučiny v rohu a1 a zostal tam. Smutný nie je – z rohu vraj vidí celú šachovnicu."},
       well:{from:"Studnička", t:"Pavučina je ako tvoja pamäť – čím viac vlákien, tým lepšie drží. Každá zopakovaná úloha je nové vlákno."}}},
    {name:"Starý dub", short:"Dub", theme:"Mat 1–2 ťahmi", img:"land-5-stary-dub",
     guide:{name:"Medveď Mat", img:"guide-medved", teach:"Medveď vie, ako chytiť kráľa: mat je, keď je kráľ v šachu a nemá kam ujsť.",
       steps:["Najprv spočítaj, kam môže kráľ utiecť.","Kráľ v rohu má najmenej útekov.","Veža a kráľ spolu – kráľ uteká, veža zatvára rad.","Daj šach, ktorý zavrie aj posledné políčko.","Najsilnejšia figúra na konci je dáma – a pešiak sa ňou môže stať."],
       preBoss:"Strážca rohu ťa nepustí. Ale ty už vieš, ako sa končí táto hra.",
       lures:{datel:"Hmm… Ďateľ má maty na viac ťahov. Najprv kráľovi zober políčka, potom mu daj mat. Za odmenu lupa do súboja.", race:"Gusto trénuje na posledné preteky. V Preteku rýchloviek hľadaj mat rýchlo – kto prvý, ten víťaz!", castle:"Albín vraví, že mat sa začína už v otvorení. Na Hrade ti ukáže, ako postaviť figúrky, aby si pomáhali.", cave:"V Tajnej jaskyni pri koreňoch duba sú maty troma ťahmi. Ťažké – ale srdiečko navyše za to stojí.", well:"V Studnici sa odráža celá tvoja cesta – vidličky, hrozby, odťahy aj väzby. Zopakuj si ich a dostaneš nápovedu."},
       meet:[{narr:1, t:"Pri koreňoch Starého duba driemal obrovský medveď. Béčko k nemu išiel po špičkách. Medveď otvoril jedno oko…"},{who:"Medveď", t:"Hmm… pešiak? Tak ďaleko sa ešte žiaden nedostal."},
             {who:"Medveď", t:"Kráľ, ktorý je v šachu a nemá kam ujsť – to je mat."},{who:"Béčko", t:"Nájdem ho. A les bude zase voľný!"}]},
     boss:{name:"Strážca rohu", type:"char", img:"boss-5-strazca-rohu", how:"Strážca rohu nikoho nepustí. Nájdi mat – a staň sa tým, kým si vždy chcel byť."},
     move:"5.bxa8D#", story:"Béčko zoberie Strážcu rohu na a8, premení sa na dámu a dá mat cez celú uhlopriečku až na h1!",
     route:"M 4 238 C 60 228 110 222 160 220 S 260 210 300 202 S 370 182 400 166 S 425 152 440 146",
     pools:{core:["rush:m","s2_m2","pol2a","pol2b","pol2c"], cave:["pm3_01","pm3_02"], well:["s2_pin~Väzba","s3_pin","bain_01","s2_disc","rush:w"]},
     letters:{
       datel:{from:"Ďateľ", t:"Na Starom dube som si urobil domček. Medveď mi to dovolil, ale len ak budem klopať potichu – aby som nezobudil kráľa v rohu."},
       race:{from:"Gusto", t:"Béčko, ty si už skoro na konci šachovnice! Kedysi som sa ti smial. Teraz ti budem fandiť najhlasnejšie zo všetkých."},
       castle:{from:"Albín", t:"Každá partia raz skončí. Ale mat sa začína už v otvorení – keď si tvoje figúrky navzájom pomáhajú."},
       cave:{from:"Tajná jaskyňa", t:"V dutine dubu je korunka z dubových listov. Vraj patrila prvému pešiakovi, ktorý prešiel celú šachovnicu. Bol to Medveď? Ten sa len usmial."},
       well:{from:"Studnička", t:"Celú cestu si nosil so sebou drakov trik, sovie oči, čarodejníkovo kúzlo a pavúkovu trpezlivosť. Teraz ich spoj dohromady."}}}
  ]
};
if (window.LICHESS_S1_POOLS) JY_S1.places.forEach((p, i) => { if (window.LICHESS_S1_POOLS[i]) p.pools = window.LICHESS_S1_POOLS[i]; });
let JY_SEASON = JY_S1, JY_N = JY_S1.places.length, JY_LAST = JY_N - 1;
/* ===== viac sezón (20. 11.): sezóna 2 je v sezona2.js (window.JY_S2). Aktuálnu sezónu nastaví jySetSeason(); odomkne sa po epilógu sezóny 1 alebo rodičom. ===== */
const jyS2 = () => JY_SEASON.id === "s2";
const jyHero = () => JY_SEASON.hero || "Béčko";
function jySeasonUnlocked(){ const d = S.pid ? (S.journey || []).find(x => x.id === S.pid + "_s1") : null; return !!(window.JY_S2 && d && (d.epilog || d.s2open)); }
const jySeasonKey = () => "sach.jy.season." + (S.pid || "");
function jySetSeason(id){
  const T = window.JY_S2;
  if (id === "s2" && !T) id = "s1";
  JY_SEASON = id === "s2" ? T.season : JY_S1; JY_N = JY_SEASON.places.length; JY_LAST = JY_N - 1;
  JY_COMICS = id === "s2" ? T.comics : JY_COMICS_S1; JY_AFTER_BOSS = id === "s2" ? T.afterBoss : JY_AFTER_BOSS_S1; JY_MEET_IMG = id === "s2" ? T.meetImg : JY_MEET_IMG_S1;
  for (const k in JY_SIDES){ if (!JY_SIDES[k]._l) { JY_SIDES[k]._l = JY_SIDES[k].label; JY_SIDES[k]._i = JY_SIDES[k].icon; }
    JY_SIDES[k].label = (JY_SEASON.sideLabels || {})[k] || JY_SIDES[k]._l; JY_SIDES[k].icon = (JY_SEASON.sideIcons || {})[k] || JY_SIDES[k]._i; }
  if (T){ Object.assign(JY_PC_RATIO, T.pcRatio); JY_THEMES.s2 = T.theme; }
  JV.lure = null; JV.after = null; JV.fresh = null; JV.msg = ""; JV.cur = 0;
}
function jySeasonSync(){
  let want = "s1"; try { want = localStorage.getItem(jySeasonKey()) || "s1"; } catch(e){}
  const id = want === "s2" && jySeasonUnlocked() ? "s2" : "s1";
  if (JY_SEASON.id !== id) jySetSeason(id);
}
function jySeasonGo(id){ try { localStorage.setItem(jySeasonKey(), id); } catch(e){} jySetSeason(id); JV.view = "board"; JT = null; jyRender(); window.scrollTo({top:0}); }
/* koľko ťahov bieleho je zahraných po `pos` porazených bossoch */
const jyMovesDone = pos => JY_SEASON.lmove.slice(0, pos).filter(x => x !== null).length;
/* odbočky; k = ku ktorému kroku cesty sa kreslia na mape */
const JY_SIDES = {
  datel:{label:"Ďateľov les", icon:"🌳", k:1, dir:-1, desc:"4 viacťahové úlohy z témy miesta.", perk:"zoom", perkT:"🔍 Lupa do súboja: ukáže rad, kde hľadať."},
  race:{label:"Pretek rýchloviek", icon:"⚡", k:2, dir:1, desc:"Gusto ťa vyzýva! 8 jednoťahových úloh na čas – pretekáš so svojím minulým časom.", perk:"compass", perkT:"🧭 Gustov kompas do súboja: ukáže stĺpec, kde hľadať."},
  castle:{label:"Hrad otvorení", icon:"🏰", k:3, dir:-1, desc:"Albín ťa vyskúša z otvorenia – krátka skúška, pretek alebo celá kapitola štúdie.", perk:"undo", perkT:"🛡️ Albínova rada do súboja: raz ti vráti zlý ťah bez straty srdiečka."},
  cave:{label:"Tajná jaskyňa", icon:"💎", k:4, dir:1, desc:"2 ťažšie úlohy z témy.", perk:"heart", perkT:"❤️ Srdiečko navyše do súboja."},
  well:{label:"Studnica opakovania", icon:"🔁", k:0, dir:1, desc:"3 úlohy z toho, čo už vieš.", perk:"hint", perkT:"💡 Nápoveda do súboja: ukáže figúrku, ktorou treba ťahať."},
  dohraj:{label:"Dohraj to", icon:"🧊", k:2, dir:1, desc:"Vyhratá koncovka proti počítaču – dohraj ju až do konca.", perk:null}
};
const JY_SIDE_ORDER0 = ["datel","race","castle","cave","well"];
const jySideOrder = () => JY_SEASON.sideOrder || JY_SIDE_ORDER0;
const jyLetterWord = () => { const t = JY_SEASON.letterLabel || "List z lesa"; return t[0].toLowerCase() + t.slice(1); };

/* ---------- komiksy (súradnice bublín v % šírky obrázka, chvost v % šírky/výšky) ---------- */
/* príznaky panelov medzihier: bez príznaku = pred ťahom; mid = po ťahu bieleho, pred odpoveďou čierneho (pri 5. ťahu pred premenou);
   after = po odpovedi čierneho (pri 5. ťahu po premene a mate); book = len v Knihe príbehov */
const JY_COMICS_S1 = {
 prolog:[
  {img:"prolog-1",b:[{narr:1,x:2.5,y:3,w:30,t:"Na šachovnici bola dlhá noc. Temný kráľ sa usadil v rohu h1, zvolal svoju armádu a jeho tieň sa plazil k Lesu vidličiek. Chcel ovládnuť celý les."}]},
  {img:"prolog-2",b:[{who:"Kráľ Hugo",x:6,y:4,w:34,t:"Temný kráľ sa krčí v rohu. Kto mu dá mat?",tail:[44,30]}]},
  {img:"prolog-3",b:[{who:"Béčko",x:58,y:5,w:30,t:"Ja! Ja to dokážem!",tail:[61,40]}]},
  {img:"prolog-4",b:[{who:"Gusto",x:3,y:4,w:30,t:"Ty? Veď si len béčko!",tail:[33,34]},{who:"Kráľ Hugo",x:52,y:4,w:34,t:"Pešiaci stoja vpredu. Bojujú veže a jazdci.",tail:[78,24]}]},
  {img:"prolog-5",b:[{narr:1,x:3,y:4,w:30,t:"Večer Béčko sedel sám a pozeral až na koniec šachovnice. Snívalo sa mu, že sa raz stane niečím veľkým."}]},
  {img:"prolog-6",b:[{who:"Viktor",x:4,y:6,w:34,t:"Ja ti verím. Cesta je dlhá a nebezpečná… Pôjdeš?",tail:[43,48]},{who:"Béčko",x:62,y:12,w:24,t:"Pôjdem!",tail:[59,60]}]}
 ],
 m1:[
  {img:"medzihra-1a",b:[{narr:1,x:3,y:4,w:40,t:"Na konci lesa bola priepasť. Béčko urobil niečo, čo dokážu len pešiaci – skočil o dve políčka naraz!"},{who:"Béčko",x:62,y:8,w:22,t:"Hop! Som na b4!",tail:[58,32]}]}
 ],
 mR:[
  {img:"medzihra-Ra",b:[{narr:1,x:3,y:3,w:40,t:"Tieň sa valil na ľavý chodník – a pravý ostal voľný. Valil sa na pravý – a voľný bol zase ľavý."},{who:"Viktor",x:56,y:5,w:38,t:"Vidíš? Obe cesty naraz zavrieť nevie! Jeden tvoj skok, dve moje hrozby.",tail:[44,58]}]},
  {img:"medzihra-Rb",b:[{narr:1,x:3,y:3,w:42,t:"Tieň sa roztrhal na kúsky a zmizol. Temný kráľ v rohu h1 zúril."},{who:"Temný kráľ",x:50,y:6,w:34,t:"Veža, zaútoč na bieleho kráľa!",tail:[83,50]}]},
  {img:"medzihra-1b",after:1,b:[{who:"Temná veža",x:3,y:4,w:26,t:"Šach, Hugo!",tail:[33,22]},{who:"Kráľ Hugo",x:66,y:4,w:28,t:"Pomóc! Veža na c5!",tail:[73,26]}]}
 ],
 m2:[
  {img:"medzihra-2a",mid:1,b:[{narr:1,x:3,y:4,w:38,t:"Čierny pešiak z b6 by Béčka rád zobral – ale nemôže! Viktor by hneď zbehol na b1 a dal mat!"},{who:"Béčko",x:20,y:28,w:20,t:"Šikmo dopredu – a mám ťa!",tail:[36,46]},{who:"Temná veža",x:66,y:5,w:28,t:"Áááu! To nie je fér!",tail:[74,40]}]},
  {img:"medzihra-2b",mid:1,b:[{who:"Kráľ Hugo",x:3,y:4,w:34,t:"Zachránil ma… pešiak? Možno som sa mýlil.",tail:[40,36]},{who:"Béčko",x:60,y:22,w:28,t:"Rád som pomohol, Kráľ Hugo!",tail:[70,50]}]},
  {img:"medzihra-2c",after:1,b:[{narr:1,x:3,y:4,w:44,t:"Temný kráľ sa zľakol matu od Viktora na b1, a tak namiesto brania poslal pešiaka na a2, aby políčko b1 strážil. Ďalej sa však nepohne…"},{who:"Albín",x:56,y:4,w:36,t:"Tadiaľto neprejdeš, mladý. Tento roh je môj.",tail:[66,40]}]}
 ],
 m3:[
  {img:"medzihra-3a",mid:1,b:[{narr:1,x:3,y:4,w:36,t:"Béčko urobil krok dopredu na c6 – a skalná brána sa so zahrmotaním odvalila!"},{who:"Viktor",x:40,y:20,w:26,t:"Cesta je voľná! Obe hrozby matom sú späť!",tail:[36,58]},{who:"Béčko",x:74,y:36,w:22,t:"Stačilo uhnúť!",tail:[74,62]}]},
  {img:"medzihra-3b",after:1,b:[{narr:1,x:3,y:4,w:38,t:"Temný kráľ sa zľakol. Temný strelec vybehol na c7 a v Pavučinovej húštine nastavil pascu…"},{who:"Temný strelec",x:52,y:4,w:34,t:"Hehe… do tejto pavučiny sa Béčko určite zamotá!",tail:[74,56]}]}
 ],
 m4:[
  {img:"medzihra-4a",mid:1,b:[{narr:1,x:3,y:4,w:36,t:"Pavučiny chytili hlavne čiernych! Béčko opatrne prekĺzol medzi vláknami a zobral pešiaka na b7."},{who:"Béčko",x:24,y:24,w:22,t:"Opatrne… a som na b7!",tail:[29,58]},{who:"Temný strelec",x:47,y:4,w:24,t:"Moja vlastná pasca?!",tail:[80,41]}]},
  {img:"medzihra-4b",mid:1,b:[{narr:1,x:3,y:4,w:34,t:"Béčko bol už len krok od cieľa. Pod Starým dubom čakal posledný strážca."},{who:"Strážca rohu",x:40,y:8,w:24,t:"Ď-ďalej nepustím nikoho!",tail:[43,52]},{who:"Temný kráľ",x:68,y:24,w:26,t:"Kam sa len skryjem?!",tail:[77,58]}]},
  {img:"medzihra-4c",after:1,b:[{narr:1,x:3,y:3,w:40,t:"Všetci čierni boli zaseknutí – v rohu aj v pavučinách. Pohnúť sa mohol už len malý pešiak na h7."},{who:"Temný kráľ",x:66,y:4,w:30,t:"Choď a vystraš toho bieleho kráľa!",tail:[73,50]},{who:"Čierny pešiak",x:46,y:25,w:22,t:"Bú! …Prečo sa nebojí?",tail:[58,66]},{who:"Kráľ Hugo",x:5,y:24,w:30,t:"Pešiak berie len šikmo, maličký. Rovno predo mnou mi nič neurobíš.",tail:[39,48]}]}
 ],
 fin:[
  {img:"finale-1",mid:1,b:[{narr:1,x:3,y:4,w:34,t:"Pod Starým dubom stál posledný strážca. Béčko vykročil šikmo na a8…"},{who:"Béčko",x:20,y:30,w:22,t:"Prepáč, ale idem ďalej!",tail:[36,58]},{who:"Strážca rohu",x:58,y:6,w:24,t:"Moja prilbaaa!",tail:[79,46]}]},
  {img:"finale-2",mid:1,b:[{narr:1,x:3,y:4,w:38,t:"Béčko sa dotkol posledného radu. A stalo sa to, o čom sníval celý život…"},{who:"Béčko",x:72,y:22,w:20,t:"Ja… som dáma?!",tail:[69,44]}]},
  {img:"finale-3",after:1,b:[{narr:1,x:3,y:4,w:40,t:"Z rohu a8 až do rohu h1 vedie najdlhšia uhlopriečka na šachovnici. A celá bola voľná!"},{who:"Béčko",x:4,y:30,w:20,t:"Šach… a mat!",tail:[22,60]},{who:"Temný kráľ",x:58,y:8,w:24,t:"Nieee! Nemám kam ujsť!",tail:[85,32]}]},
  {img:"finale-4",after:1,b:[{narr:1,x:3,y:4,w:42,t:"Ela strážila druhý rad, Hrom stál pri kráľovi a Viktor bol pripravený. Vyhrali všetci spolu!"},{who:"Viktor",x:56,y:6,w:26,t:"Ja som to vedel od začiatku!",tail:[60,50]},{who:"Temný kráľ",x:3,y:30,w:20,t:"Hmpf… mat.",tail:[26,60]}]}
 ],
 epilog:[
  {img:"epilog-1",b:[{narr:1,x:3,y:4,w:40,t:"Tieň zmizol a nad lesom aj šachovnicou vyšlo slnko. Všetci oslavovali spolu."},{who:"Hrom",x:44,y:6,w:22,t:"Hurá! Béčko to dokázal!",tail:[36,46]}]},
  {img:"epilog-2",b:[{who:"Kráľ Hugo",x:3,y:4,w:40,t:"Mýlil som sa. Pešiak môže dokázať čokoľvek – keď ide stále dopredu a má dobrých kamarátov.",tail:[41,57]},{who:"Béčko",x:68,y:24,w:24,t:"Ďakujem, Kráľ Hugo!",tail:[72,52]}]},
  {img:"epilog-3",b:[{who:"Cilka",x:3,y:4,w:30,t:"Myslíš, že aj ja by som raz mohla prejsť celú šachovnicu?",tail:[32,70]},{who:"Béčko",x:36,y:4,w:28,t:"Určite. Ale budeš musieť ísť krok za krokom.",tail:[53,45]}]},
  {img:"teaser-s2",b:[{narr:1,x:3,y:4,w:46,t:"Koniec prvej sezóny. V ďalšej čaká Ľadová ríša – a v nej Tieňová dáma, ktorá láka, ale nevyhrá…"}]}
 ]
};
let JY_COMICS = JY_COMICS_S1;
const JY_AFTER_BOSS_S1 = ["m1","mR","m2","m3","m4","fin"]; let JY_AFTER_BOSS = JY_AFTER_BOSS_S1;
/* Obrázky stretnutí so sprievodcami: 2 panely na miesto; pos = [x, y, šírka, chvost] pre 4 bubliny v poradí guide.meet.
   Kým obrázok chýba, panel sa poskladá z obrázka miesta, sprievodcu a Béčka. */
const JY_MEET_IMG_S1 = {
  0:{img:["stretnutie-1a","stretnutie-1b"], pos:[[56,5,36,[59,43]], [4,8,30,[25,42]], [3,4,40,[37,38]], [52,4,42]]},
  1:{img:["stretnutie-Ra","stretnutie-Rb"], pos:[[3,4,34,[24,34]], [56,5,38,[70,38]], [3,4,40,[40,46]], [54,4,42]]},
  2:{img:["stretnutie-2a","stretnutie-2b"], pos:[[6,6,34,[49,31]], [60,28,32,[75,58]], [3,4,40,[21,44]], [54,4,42]]},
  3:{img:["stretnutie-3a","stretnutie-3b"], pos:[[3,4,36,[32,46]], [62,6,32,[77,50]], [3,4,38,[26,49]], [56,8,34,[83,56]]]},
  4:{img:["stretnutie-4a","stretnutie-4b"], pos:[[60,4,34,[72,52]], [3,4,32,[39,51]], [38,4,32,[79,41]], [50,74,40,[81,54]]]},
  5:{img:["stretnutie-5a","stretnutie-5b"], pos:[[3,4,42], [54,6,34,[45,56]], [3,4,38,[42,35]], [58,6,36,[79,52]]]}
};
let JY_MEET_IMG = JY_MEET_IMG_S1;
function jyMeetComic(i){
  const snd = jyS2() ? null : {0:"drak", 2:"sova", 5:"medved"}[i]; if (snd) setTimeout(() => SFX.story(snd), 450);
  const P = JY_SEASON.places[i], g = P.guide, m = g.meet, M = JY_MEET_IMG[i];
  const who = x => (x.who === jyHero() || x.who === "Kráľ Hugo") ? x.who : g.name;
  const mkBub = (x, q) => x.narr ? {narr:1, x:q[0], y:q[1], w:q[2], t:x.t} : {who:who(x), x:q[0], y:q[1], w:q[2], t:x.t, tail:q[3]};
  if (M && !jyS2() && i === 2) return [
    {img:M.img[0], b:[mkBub(m[0], M.pos[0]), mkBub(m[1], M.pos[1])]},
    {img:M.img[1], b:[mkBub(m[2], M.pos[2])]},
    {animBoard:{
      pos:2, pawnSq:"b4",
      title:"Prečo čierny pešiak nemôže brať?",
      intro:"Temná veža stojí na c5. Čierny pešiak na b6 ju naoko chráni…",
      introHl:[{sq:"b4", col:"#f2c14e"}, {sq:"c5", col:"#e4572e"}, {sq:"b6", col:"#a855f7"}],
      steps:[
        {from:"b4", to:"c5", cap:1, san:"2. bxc5", text:"Béčko zoberie Temnú vežu na c5.", wait:1400},
        {from:"b6", to:"c5", cap:1, san:"2…bxc5", text:"Čierny pešiak zoberie Béčka – ale otvorí stĺpec b!", wait:1900},
        {from:"b5", to:"b1", san:"3. Vb1#", text:"Viktor skočí na b1 a dá Temnému kráľovi MAT!", wait:2000, mate:"h1", arrow:["b1","h1"]}
      ]
    }},
    {img:M.img[1], b:[mkBub(m[3], M.pos[3])]}
  ];
  if (M) return [0, 1].map(k => ({img:M.img[k], ...(jyS2() && i === 1 ? {storm:1, ...(k === 0 ? {sfx:"s2-vichrica"} : {})} : {}), b:[m[2*k], m[2*k + 1]].map((x, j) => mkBub(x, M.pos[2*k + j]))}));
  const bub = (x, pos) => x.narr ? {narr:1, x:3, y:4, w:42, t:x.t} : {who:who(x), x:pos[0], y:pos[1], w:pos[2], t:x.t, tail: x.who === "Béčko" ? [22, 52] : [66, 34]};
  const panel = (a, b, k) => {
    let gy = 4;
    const bs = [a, b].map(x => { const pos = x.who === "Béčko" ? [4, 24, 30] : x.narr ? [3, 4, 42] : [48, gy, 34]; if (!x.narr && x.who !== "Béčko") gy += 20; return bub(x, pos); });
    return {bg:P.img, st:[{img:"pc-w-becko", x:k ? 26 : 14, y:k ? 48 : 52, w:k ? 13 : 11}, {img:g.img, x:k ? 50 : 56, y:k ? 30 : 26, w:k ? 30 : 28, round:1}], b:bs};
  };
  return [panel(m[0], m[1], 0), panel(m[2], m[3], 1)];
}

/* ---------- úlohy ---------- */
const jyRushItems = t => (RUSH_BANK[t] || []).map((p, i) => { const tr = {}; p[1].split(",").forEach(u => tr[u] = null); return {id:"rush:" + t + ":" + i, f:p[0], tr, m:t === "m" ? 1 : 0}; });
const jyDepth = tr => { let n = 0, node = tr; while (node && Object.keys(node).length){ n++; const v = node[Object.keys(node)[0]]; node = v ? v[1] : null; } return n; };
let JY_POOL_CACHE = {};
function jyPool(spec){
  if (JY_POOL_CACHE[spec]) return JY_POOL_CACHE[spec];
  let out = [];
  if (spec.startsWith("rush:")) out = jyRushItems(spec.slice(5));
  else if (spec.startsWith("tag:")) out = (((window.JY_S2 || {}).tags || {})[spec.slice(4)] || []).map(([sid, k]) => { const s = dtSet(sid), it = s && s.items[k]; return it && {id:sid + ":" + k, src:sid, f:it.f, tr:it.tr, m:it.m || 0, k:it.k, w:it.w || "", rt:it.rt}; }).filter(Boolean);
  else {
    const [base, flt] = spec.split("~"), s = dtSet(base);
    if (s){
      const neg = flt && flt[0] === "!", re = flt ? new RegExp(neg ? flt.slice(1) : flt, "i") : null;
      out = s.items.map((it, i) => ({it, i}))
        .filter(({it}) => !re || (neg ? !re.test(it.s || "") : re.test(it.s || "")))
        .map(({it, i}) => ({id:base + ":" + i, f:it.f, tr:it.tr, m:it.m || 0, k:it.k, w:it.w || "", rt:it.rt}));
    }
  }
  out = out.filter(x => { try { return new Chess().validate_fen(x.f).valid; } catch(e){ return false; } });
  out.forEach((x, i) => { x.d = jyDepth(x.tr); x.boss = i % 5 === 4; });   // každá piata pozícia je odložená pre bossa
  rtEstimate(spec, out);
  return (JY_POOL_CACHE[spec] = out);
}

/* ---------- rating úloh a hráča (len pre rodiča; návrh v navrhy/rating-uloh.md) ----------
   Úloha: odhad = základ sady + 120 za vlastný ťah navyše a + 80 za tichý prvý ťah + 8 za figúrku na šachovnici navyše (najviac ±80), všetko oproti priemeru sady.
   Hráč: Elo s premenlivým K, celkový + podľa témy. Hodnotí sa len prvý pokus o nevidenú úlohu bez pomôcok:
   1 = správne na prvý pokus, 0 = chyba alebo šípka. Pretek rýchloviek sa nehodnotí.
   Štart 900 (odhad; s K = 40 sa ustáli za ~20–30 úloh). */
const RT_BASE = [
  [/^rush:m/, 500], [/^rush:w/, 600], [/^s1x_/, 750], [/^fl$/, 850],
  [/^co_(mat|zisk|obr|konc)1$/, 850], [/^s2_(m2|dm)/, 1000], [/^s2_/, 900],
  [/^bain_/, 950], [/^wp1a$/, 950], [/^hz$/, 950], [/^scp$/, 1000],
  [/^co_(mat|zisk|obr|konc)2$/, 1000], [/^cs_/, 1050], [/^(pol2|pm2_)/, 1000],
  [/^s3_/, 1100], [/^kend_/, 1100], [/^wp1b$/, 1150], [/^co_(mat|zisk)3$/, 1150], [/^tag:/, 1150],
  [/^co_(mat|zisk)4$|^co_tah$/, 1300], [/^s4_/, 1300], [/^dv_/, 1300], [/^s4p_/, 1350], [/^ju_/, 1350],
  [/^pm3_/, 1450], [/^iv6_/, 1550], [/^(pmini|psis)/, 1600], [/^iv/, 1700]
];
const RT_THEMES = {fork:"Vidličky", hang:"Nechránené figúry", disc:"Odťah", pin:"Väzba", mate:"Maty", end:"Koncovky", strat:"Stratégia", pawn:"Voľný pešiak", skewer:"Röntgen a útek", kpk:"Kráľ v koncovke", stale:"Pat", rook:"Mat vežou"};
const RT_SET_THEME = [
  [/^(s2_dq|s2_dn|s4_dbl|bain_03|bain_04|bain_09|fl|cs_takt1|cs_takt2|ju_takt1)$/, "fork"],
  [/^(rush:w|s1x_def|s3_def|s3_trap|s4p_trap|co_obr|hz|wp1a|bain_11|s3_elim|s4_elim|s4p_elim)$/, "hang"],
  [/^(s2_disc|s3_dbl|bain_05|bain_06|bain_07|s4p_bat|wp1b)$/, "disc"],
  [/^(s2_pin|s3_pin|s4_pin|bain_01|bain_08|scp)$/, "pin"],
  [/^(s3_pawn|s3_draw|s4_end|s4p_pawn|s4p_draw|s4p_end|bain_10|bain_12|bain_13|co_konc|ju_konc|dv_|kend_)/, "end"],
  [/^(s4_7r|s4p_file|s4p_open|s4p_plan|co_tah|ju_str|cs_takt3)/, "strat"],
  [/^tag:A/, "pawn"], [/^tag:B/, "skewer"], [/^tag:C/, "kpk"], [/^tag:D/, "stale"], [/^tag:E/, "rook"],
  [/m2|mat|^rush:m|^pol2|^pm|s2_dm|s4_king|s4p_coop|bain_02|iv|cs_mat/, "mate"]
];
const RT_START = 900, RT_SHRINK = 15, RT_LOG = 800;
const rtSetBase = spec => { const k = spec.split("~")[0]; if (window.LICHESS_RT_BASE && window.LICHESS_RT_BASE[k] != null) return window.LICHESS_RT_BASE[k]; return (RT_BASE.find(([re]) => re.test(k)) || [0, 1000])[1]; };
const rtSetTheme = spec => { const k = spec.split("~")[0]; if (window.LICHESS_RT_THEME && window.LICHESS_RT_THEME[k]) return window.LICHESS_RT_THEME[k]; return (RT_SET_THEME.find(([re]) => re.test(k)) || [0, "mix"])[1]; };
function rtMoveInfo(x){
  const k = Object.keys(x.tr || {})[0]; if (!k) return {q:0, sac:0};
  try {
    const c = new Chess(x.f), opp = c.turn() === "w" ? "b" : "w";
    const m = c.move({from:k.slice(0, 2), to:k.slice(2, 4), promotion:k[4] || undefined});
    if (!m) return {q:0, sac:0};
    const q = !m.captured && !/[+#]/.test(m.san) ? 1 : 0;
    const capVal = m.captured ? (VAL[m.captured] || 0) : 0;
    const mvVal = VAL[m.piece] || 0;
    let sac = 0;
    if (mvVal >= 3 && mvVal > capVal && !c.in_checkmate()){
      const recaps = c.moves({verbose:true}).some(r => r.to === m.to);
      if (recaps) sac = 1;
    }
    return {q, sac};
  } catch(e){ return {q:0, sac:0}; }
}
function rtEstimate(spec, items){
  if (!items.length) return;
  items.forEach(x => { const mi = rtMoveInfo(x); x.q = mi.q; x.sac = mi.sac; x.pc = x.f.split(" ")[0].replace(/[^a-zA-Z]/g, "").length; });
  const avg = k => items.reduce((n, x) => n + x[k], 0) / items.length, md = avg("d"), mq = avg("q"), ms = avg("sac"), mp = avg("pc"), th = rtSetTheme(spec);
  items.forEach(x => { const base = rtSetBase(x.src || spec); x.set = spec; x.theme = th;
    x.r = x.rt ? Math.round(x.rt) : Math.round(Math.max(300, Math.min(2200, base + 120 * (x.d - md) + 80 * (x.q - mq) + 110 * (x.sac - ms) + Math.max(-80, Math.min(80, 8 * (x.pc - mp)))))); });
}
const rtE = (rp, rh) => 1 / (1 + Math.pow(10, (rp - rh) / 400));
const rtK = n => n < 20 ? 40 : n < 50 ? 32 : n < 150 ? 24 : 16;
const rtId = () => S.pid + "_rating";
const rtStart = () => (typeof profile === "function" && profile() && profile().startElo) || RT_START;
function rtDoc(){
  const d = S.pid ? (S.journey || []).find(x => x.id === rtId()) : null;
  const st = rtStart(), all = {r:st, n:0, ...((d || {}).all || {})}, th = {};
  Object.keys(RT_THEMES).forEach(k => th[k] = {r:st, n:0, ...(((d || {}).th || {})[k] || {})});
  return {all, th, log:(d || {}).log || []};
}
/* rating témy na výber úloh: kým má téma málo pokusov, opiera sa o celkový */
function rtFor(theme){
  const R = RT_PEND || rtDoc(), t = R.th[theme];
  if (!t) return R.all.r;
  return (t.n * t.r + RT_SHRINK * R.all.r) / (t.n + RT_SHRINK);
}
let RT_PEND = null;
function rtRecord(x, ok, mode){
  if (!x || x.r == null || !S.pid) return null;
  const R = RT_PEND || (RT_PEND = rtDoc()), s = ok ? 1 : 0, t = R.th[x.theme];
  const before = Math.round(R.all.r);
  const upd = o => { const d = Math.max(-40, Math.min(40, rtK(o.n) * (s - rtE(x.r, o.r)))); o.r = Math.round((o.r + d) * 10) / 10; o.n++; };
  const b = t ? rtFor(x.theme) : R.all.r;
  upd(R.all); if (t) upd(t);
  const after = Math.round(R.all.r);
  R.log = [...R.log, {d:jyToday(), id:x.id, t:x.theme, r:x.r, s, b:Math.round(b), a:after, k:mode}].slice(-RT_LOG);
  return {before, after, delta: after - before};
}
function rtRecordInstant(x, ok, mode){
  const res = rtRecord(x, ok, mode);
  if (res) rtFlush();
  return res;
}
async function rtFlush(){
  if (!RT_PEND || !S.pid) return;
  const R = RT_PEND, id = rtId(), doc = {profileId:S.pid, kind:"rating", all:R.all, th:R.th, log:R.log, updated:Date.now()};
  RT_PEND = null;
  const i = (S.journey ||= []).findIndex(d => d.id === id);
  if (i >= 0) S.journey[i] = {id, ...doc}; else S.journey.push({id, ...doc});
  try { await Data.set("journey", id, doc); } catch(e){ setDbNote(dbErr(e), true); }
}
/* výber podľa ratingu: pre každý posun (cieľ = rating témy úlohy + posun) najbližšia nevidená úloha,
   náhodne z 3 najbližších; ak nevidené chýbajú, doplnia sa videné */
function jyPickRated(specs, offs, o = {}){
  const seen = new Set((jyDoc() || {}).seen || []);
  let all = specs.flatMap(jyPool).filter(x => o.boss ? x.boss : !x.boss);
  if (o.filter) { const f = all.filter(o.filter); if (f.length >= offs.length) all = f; }
  const used = new Set(), pick = [], srcs = jyShuffle([...new Set(all.map(x => x.set))]);
  // zdroje sa striedajú (pestrosť), v rámci zdroja rozhoduje rating
  offs.forEach((off, j) => {
    const order = [...srcs.slice(j % srcs.length), ...srcs.slice(0, j % srcs.length)];
    for (const fr of [true, false]) for (const src of order){
      const c = all.filter(x => x.set === src && !used.has(x.id) && seen.has(x.id) !== fr).map(x => ({x, dist:Math.abs(x.r - (rtFor(x.theme) + off))})).sort((a, b) => a.dist - b.dist).slice(0, 3);
      if (c.length){ const y = c[Math.floor(Math.random() * c.length)].x; used.add(y.id); pick.push(y); return; }
    }
  });
  return o.asc ? pick.sort((a, b) => a.r - b.r) : pick;
}
/* posuny voči ratingu hráča v téme (sezóna 1: jemné podladenie, sezóna 2: presne ± okolo ratingu hráča) */
const RT_OFF = {step:[-300, -300, -300, -300], datel:[-200, -200, -200, -200], cave:[-50, 0], well:[-300, -300, -300], prep:[-350, -350, -350],
  boss:[-350, -300, -250, -200, -150, -100]};
const RT_OFF_S2 = {step:[-60, -20, 20, 60], datel:[-40, 0, 40, 80], cave:[50, 110], well:[-80, -40, 0], prep:[-100, -60, -20],
  boss:[-80, -50, -20, 0, 30, 60, 90]};
const rtOff = k => (jyS2() ? RT_OFF_S2 : RT_OFF)[k];
function jyShuffle(a){ a = a.slice(); for (let i = a.length - 1; i > 0; i--){ const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
/* vyber n úloh: najprv tie, ktoré ešte nevidel; mix zo všetkých zdrojov */
function jyById(id){
  if (!id || id.startsWith("eg:")) return null;
  let x = null, spec = "";
  if (id.startsWith("rush:")){
    const [, t, idx] = id.split(":");
    const p = (RUSH_BANK[t] || [])[+idx]; if (!p) return null;
    const tr = {}; p[1].split(",").forEach(u => tr[u] = null);
    x = {id, f:p[0], tr, m:t === "m" ? 1 : 0}; spec = "rush:" + t;
  } else {
    const [sid, idx] = id.split(":"), s = dtSet(sid), it = s && s.items[+idx];
    if (!it) return null;
    x = {id, f:it.f, tr:it.tr, m:it.m || 0, k:it.k, w:it.w || ""}; spec = sid;
  }
  try { if (!new Chess().validate_fen(x.f).valid) return null; } catch(e){ return null; }
  x.d = jyDepth(x.tr);
  rtEstimate(spec, [x]);
  return x;
}
/* Studnica opakovania:
   1. úlohy, ktoré hráč predtým riešil a nevyriešil na prvý pokus (fail),
   2. úlohy, ktoré hráč predtým riešil a vyriešil na prvý pokus (seen \ fail),
   3. podľa tém predošlých krajín (L.pools.well),
   4. náhodne s ratingom podobným hráčovmu. */
function jyWellPick(L, n = 3){
  const st = jyState(), offs = rtOff("well").slice(0, n);
  const failIds = st.fail || [], failSet = new Set(failIds);
  const okIds = (st.seen || []).filter(id => !failSet.has(id));
  const pick = [], used = new Set();
  const takeFrom = (ids, maxD) => {
    const cands = jyShuffle([...new Set(ids)]).filter(id => !used.has(id)).map(jyById)
      .filter(x => x && (maxD == null || x.d <= maxD));
    cands.sort((a, b) => Math.abs(a.r - rtFor(a.theme)) - Math.abs(b.r - rtFor(b.theme)));
    for (const x of cands){ if (pick.length >= n) break; used.add(x.id); pick.push(x); }
  };
  takeFrom(failIds);
  if (pick.length < n) takeFrom(okIds, 2);
  if (pick.length < n) takeFrom(okIds);
  if (pick.length < n && L.pools && L.pools.well && L.pools.well.length){
    for (const x of jyPickRated(L.pools.well, offs.slice(pick.length), {filter: x => x.d <= 2})){
      if (pick.length >= n) break;
      if (!used.has(x.id)){ used.add(x.id); pick.push(x); }
    }
  }
  if (pick.length < n){
    const fallback = ["rush:w", "rush:m", "s2_dq", "s2_dn", "s2_pin", "s2_m2", "s3_def", "bain_01", "bain_03"];
    for (const x of jyPickRated(fallback, offs.slice(pick.length), {filter: x => x.d <= 2})){
      if (pick.length >= n) break;
      if (!used.has(x.id)){ used.add(x.id); pick.push(x); }
    }
  }
  return pick;
}
function jyPick(specs, n, o = {}){
  const seen = new Set((jyDoc() || {}).seen || []);
  let all = specs.flatMap(jyPool).filter(x => o.boss ? x.boss : !x.boss);
  if (o.filter) { const f = all.filter(o.filter); if (f.length >= n) all = f; }
  const fresh = jyShuffle(all.filter(x => !seen.has(x.id))), old = jyShuffle(all.filter(x => seen.has(x.id)));
  // rovnomerne zo zdrojov
  const bySrc = {}; fresh.forEach(x => (bySrc[x.id.split(":").slice(0, -1).join(":")] ||= []).push(x));
  const srcs = Object.values(bySrc), pick = [];
  while (pick.length < n && srcs.some(s => s.length)) for (const s of srcs) if (s.length && pick.length < n) pick.push(s.shift());
  for (const x of old) if (pick.length < n) pick.push(x);
  return pick;
}

/* ---------- stav ---------- */
const jyId = () => S.pid + "_" + JY_SEASON.id;
const jyDoc = () => S.pid ? (S.journey || []).find(d => d.id === jyId()) || null : null;
/* prechod zo 5 na 6 krajín (19. 11.): Rozcestie sa vložilo za Les ako krajina 1. Starý stav sa číta posunutý,
   pri prvom uložení sa zapíše s príznakom n6. Kto už mal za sebou Soviu mýtinu, má Rozcestie označené ako prejdené. */
function jyMig(d){
  if (!d || d.n6 || (!d.started && !(d.places || []).length)) return d;
  const sh = k => k != null && k >= 1 ? k + 1 : k, old = d.places || [], pos0 = d.pos || 0;
  const rz = pos0 >= 2 ? {steps:JY_STEPS, met:true, bossWon:jyToday()} : {};
  return {...d, n6:true, places:[old[0] || {}, rz, ...old.slice(1)], pos: pos0 >= 2 ? pos0 + 1 : pos0,
    dayPlace: d.dayPlace ? {...d.dayPlace, p:sh(d.dayPlace.p)} : d.dayPlace, castlePlace: sh(d.castlePlace),
    stats:(d.stats || []).map(r => ({...r, place:sh(r.place)}))};
}
function jyState(){
  const d = jyMig(jyDoc()) || {};
  const places = JY_SEASON.places.map((_, i) => ({steps:0, met:false, lured:[], sides:{}, perks:{}, stars:{}, bossWon:false, bossLost:null, bossTries:0, ...((d.places || [])[i] || {})}));
  places.forEach(p => { if (!Array.isArray(p.lured)) p.lured = []; });
  return {sideMet:d.sideMet || {}, albinEp:d.albinEp || 0, albinRace:d.albinRace || {}, started:!!d.started, pos:d.pos || 0, stepDay:d.stepDay || null, dayPlace:d.dayPlace || null, places, seen:d.seen || [], fail:d.fail || [], race:d.race || [], castleAt:d.castleAt || null, castlePlace:d.castlePlace, castleBank:d.castleBank, castleDay:d.castleDay || null, stats:d.stats || [], xp:d.xp || 0, epilog:!!d.epilog};
}
async function jySave(patch){
  if (!S.pid) return;
  const cur = jyMig(jyDoc()) || {profileId:S.pid, season:JY_SEASON.id, created:Date.now()};
  const next = {...cur, ...patch, n6:true}; delete next.id;
  if (next.seen && next.seen.length > 1500) next.seen = next.seen.slice(-1500);
  if (next.fail && next.fail.length > 500) next.fail = next.fail.slice(-500);
  const id = jyId(), i = (S.journey ||= []).findIndex(d => d.id === id);
  if (i >= 0) S.journey[i] = {id, ...next}; else S.journey.push({id, ...next});
  try { await Data.set("journey", id, next); } catch(e){ setDbNote(dbErr(e), true); }
}
function jySavePlace(i, patch, extra = {}){
  const st = jyState(), places = st.places.map((p, k) => k === i ? {...p, ...patch} : p);
  return jySave({places, ...extra});
}
const jyToday = () => todayStr();
/* denný limit (18. 11.): jedna krajina (políčko šachovnice) za deň – všetkých 5 krokov aj súboj s bossom v jeden deň.
   Ďalšia krajina sa otvorí zajtra; rodič môže povoliť hrať ďalej (dayPlace = null). */
const jyStepUsed = (st, i = st.pos) => !!(st.dayPlace && st.dayPlace.d === jyToday() && st.dayPlace.p !== i);
const jyDayPlace = (st, i) => st.dayPlace && st.dayPlace.d === jyToday() ? st.dayPlace : {d:jyToday(), p:i};
function jyXp(){ return (S.journey || []).reduce((n, d) => n + (d.xp || 0), 0); }
const jySideDone = (p, k) => !!(p.sides && p.sides[k]);

/* ---------- obrázky odbočiek: pred vstupom (podľa miesta) a po skončení (podľa hviezdičiek 1–3) ----------
   Hrad otvorení: podľa štúdie, ktorú Albín práve učí (variant A/B podľa poradia kapitoly), po skončení podľa hviezdičiek kapitoly. */
const JY_SIDE_IMGS = new Set(["odbocka-datel-R-pred","odbocka-pretek-R-pred","odbocka-jaskyna-R-pred","odbocka-studnica-R-pred","odbocka-priprava-R-pred","hrad-evans-po-1","hrad-evans-po-2","hrad-evans-po-3","hrad-evans-pred-a","hrad-evans-pred-b","hrad-friedliver-po-1","hrad-friedliver-po-2","hrad-friedliver-po-3","hrad-friedliver-pred-a","hrad-friedliver-pred-b","hrad-italian-po-1","hrad-italian-po-2","hrad-italian-po-3","hrad-italian-pred-a","hrad-italian-pred-b","hrad-scandinavian-po-1","hrad-scandinavian-po-2","hrad-scandinavian-po-3","hrad-scandinavian-pred-a","hrad-scandinavian-pred-b","odbocka-datel-1-pred","odbocka-datel-2-pred","odbocka-datel-3-pred","odbocka-datel-4-pred","odbocka-datel-5-pred","odbocka-datel-po-1","odbocka-datel-po-2","odbocka-datel-po-3","odbocka-jaskyna-1-pred","odbocka-jaskyna-2-pred","odbocka-jaskyna-3-pred","odbocka-jaskyna-4-pred","odbocka-jaskyna-5-pred","odbocka-jaskyna-po-1","odbocka-jaskyna-po-2","odbocka-jaskyna-po-3","odbocka-pretek-1-pred","odbocka-pretek-2-pred","odbocka-pretek-3-pred","odbocka-pretek-4-pred","odbocka-pretek-5-pred","odbocka-pretek-po-1","odbocka-pretek-po-2","odbocka-pretek-po-3","odbocka-priprava-po-1","odbocka-priprava-po-2","odbocka-priprava-po-3","odbocka-priprava-pred","odbocka-priprava-1-pred","odbocka-priprava-2-pred","odbocka-priprava-3-pred","odbocka-priprava-4-pred","odbocka-priprava-5-pred","odbocka-studnica-1-pred","odbocka-studnica-2-pred","odbocka-studnica-3-pred","odbocka-studnica-4-pred","odbocka-studnica-5-pred","odbocka-studnica-po-1","odbocka-studnica-po-2","odbocka-studnica-po-3"]);
const JY_SIDE_ART = {datel:"datel", race:"pretek", cave:"jaskyna", well:"studnica", prep:"priprava"};
function jySidePre(i, k){
  if (JY_SEASON.sideArt){ const a = JY_SEASON.sideArt[k]; if (!a) return null; return (JY_SEASON.onePred || []).includes(a) ? `${a}-pred` : `${a}-${i + 1}-pred`; }
  if (k === "castle"){ const c = jyCastlePick(); if (!c) return null; const v = c.idx % 2 ? "b" : "a";
    return [`hrad-${c.sid}-pred-${v}`, `hrad-${c.sid}-pred-${v === "a" ? "b" : "a"}`].find(x => JY_SIDE_IMGS.has(x)) || null; }
  const a = JY_SIDE_ART[k]; if (!a) return null;
  const F = JY_SEASON.fno;
  if (JY_SIDE_IMGS.has(`odbocka-${a}-${F[i]}-pred`)) return `odbocka-${a}-${F[i]}-pred`;
  if (JY_SIDE_IMGS.has(`odbocka-${a}-pred`)) return `odbocka-${a}-pred`;
  for (const d of [0, -1, 1, -2, 2, -3, 3, -4, 4, -5, 5]){ const j = i + d; if (j >= 0 && j < JY_N && JY_SIDE_IMGS.has(`odbocka-${a}-${F[j]}-pred`)) return `odbocka-${a}-${F[j]}-pred`; }
  return null;
}
function jySidePost(k, n, sid){
  if (JY_SEASON.sideArt){ const a = JY_SEASON.sideArt[k]; return a ? `${a}-po-${Math.max(1, Math.min(3, n || 1))}` : null; }
  const a = k === "castle" ? `hrad-${sid}` : JY_SIDE_ART[k] && `odbocka-${JY_SIDE_ART[k]}`; if (!a) return null;
  for (const m of [n, n + 1, n - 1, 3, 2, 1]) if (JY_SIDE_IMGS.has(`${a}-po-${m}`)) return `${a}-po-${m}`;
  return null;
}
const jySidePic = n => n ? `<img class="jy-sidepic" src="${JY_IMG(n)}" alt="">` : "";
/* hviezdičky: úlohy – všetky na 1. pokus = 3, aspoň polovica = 2, inak 1 */
const jyStarsOf = (ok, n) => ok >= n ? 3 : ok * 2 >= n ? 2 : 1;
const JY_STARS_T = {
  side:{3:"Výborne! Všetko na prvý pokus.", 2:"Pekne! Väčšina na prvý pokus.", 1:"Zvládol si to – dalo to zabrať, ale si tam!"},
  race:{3:"Predbehol si Gusta a skoro bez chyby!", 2:"Tesne! S Gustom ste dobehli skoro naraz.", 1:"Dobehol si do cieľa – Gusto ti podáva vodu."},
  dohraj:{3:"Dohrané bez jedinej chyby – Viktor hrdo tlieska!", 2:"Dohrané! S jedným vráteným ťahom, ale až do konca.", 1:"Tentoraz koncovka ušla. Nabudúce ju dotiahneš – každá sa dá vyhrať."},
  castle:{3:"Albín tlieska – tri hviezdičky!", 2:"Albín spokojne prikyvuje – pekne!", 1:"Albín ťa povzbudzuje – nabudúce to pôjde ešte lepšie."}};
const jyStarsHtml = n => `<div class="jy-stars">${"⭐".repeat(n)}<span>${"⭐".repeat(3 - n)}</span></div>`;
function jySaveStars(i, k, n){ const p = jyState().places[i], st = {...(p.stars || {})}; if ((st[k] || 0) >= n) return; st[k] = n; jySavePlace(i, {stars:st}); }
/* okno s výsledkom odbočky; then = čo nasleduje po „Ďalej“ */
function jySideResult(i, k, n, extra, then, sid){
  const sd = k === "prep" ? {label:"Príprava na bossa", icon:"🎯"} : JY_SIDES[k], p = jyState().places[i];
  jySaveStars(i, k, n); SFX.stars(n);
  jyModal(`<div class="jy-side-r"><h2>${sd.icon} ${esc(sd.label)} – hotová</h2>${jySidePic(jySidePost(k, n, sid))}${jyStarsHtml(n)}
    <p>${(JY_STARS_T[k] || JY_STARS_T.side)[n]}</p>${extra || ""}${sd.perkT && !p.bossWon ? `<p class="sub">${esc(sd.perkT)}</p>` : ""}</div>`,
    [["Ďalej ✔", "primary", then]]);
}

/* ---------- prepojenie s Tréningom a dennou misiou: čo sa urobí tu, splní sa aj tam ----------
   d.jy = dnes bol krok cesty alebo súboj (drží sériu),
   Pretek rýchloviek = kolo rýchloviek (d.rush: Rozcvička aj bonus misie). */
function jyCreditDay(patch, solved){
  if (!S.pid || typeof updateDay !== "function") return;
  const d = dayDoc() || {}, p = {...patch};
  if (p.rush && d.rush) delete p.rush;
  if (p.jy && d.jy) delete p.jy;
  // úlohy z Putovania sa už nerátajú do Ďatľa v Tréningu (Putovanie je od 2026-11-18 samostatné)
  if (Object.keys(p).length) updateDay(p);
}
/* blok C v Tréningu: krok cesty, kým je putovanie rozbehnuté (null = Putovanie nič neponúka) */
function jyTrInfo(d){
  const st = jyState(); if (!st.started || st.pos >= JY_N) return null;
  const i = st.pos, L = JY_SEASON.places[i], p = st.places[i], boss = p.steps >= JY_STEPS;
  return {place:i, name:L.name, boss, done:!!(d && d.jy),
    title: d && d.jy ? `Dnešný krok cesty: ${L.name}` : boss ? `Súboj: ${L.boss.name}` : `Krok cesty ${Math.min(p.steps + 1, JY_STEPS)} z ${JY_STEPS}: ${L.name}`,
    desc: boss ? `${jyHero()} je na konci cesty. ${L.guide.name}: „${L.guide.preBoss}“` : `Putovanie – ${jyHero()} – 4 úlohy z témy ${L.theme.toLowerCase()}. ${L.guide.name}: „${L.guide.steps[Math.min(p.steps, JY_STEPS - 1)]}“`};
}
/* reštart celého putovania (body ostávajú – xp sa nemaže) */
function jyReset(){
  JV.lure = null; JV.after = null; JV.fresh = null; JV.msg = ""; JT = null;
  jySave({started:false, pos:0, stepDay:null, dayPlace:null, places:[], seen:[], fail:[], race:[], castleAt:null, castlePlace:null, stats:[], epilog:false, n6:true});
  jyToast(jyS2() ? "Sezóna 2 začína odznova. Cilka stojí na c6." : "Putovanie začína odznova. Béčko stojí na b2.");
  jyGo("board");
}
function jyFromTraining(){ const st = jyState(); JV.lure = null; JV.after = null; JT = null; jyEnterLand(Math.min(st.pos, JY_LAST)); }

/* ---------- pohľady ---------- */
const JV = {view:"board", cur:0, busy:false, fresh:null, msg:"", castleSid:null, castleCh:null};
let JT = null;   // bežiace riešenie (krok, odbočka, boss, pretek)
function jyRender(){
  if (S.tab !== "jy") return;
  const box = $("#v-jy");
  if (!profile()){ box.innerHTML = '<div class="panel"><div class="empty">Najprv vytvor profil hráča.</div></div>'; return; }
  if (db && !S.loaded.journey){ box.innerHTML = '<div class="panel"><div class="empty">Načítavam putovanie…</div></div>'; return; }
  jySeasonSync();
  jyCastleCheck();
  if (JT && JV.view === "task") return jyTaskRender();
  if (JV.view === "land") return jyLandRender();
  if (JV.view === "book") return jyBookRender();
  if (JV.view === "after") return jyAfterRender();
  jyBoardRender();
}
function jyShell(inner, cls = ""){ const v = $("#v-jy"); v.dataset.th = JY_SEASON.id; jyThemeApply(); v.innerHTML = `<div class="jy${cls ? " " + cls : ""}">${inner}</div>`; }
const jyBtn = (act, t, cls = "", extra = "") => `<button class="${cls}" data-jy="${act}" ${extra}>${t}</button>`;

/* --- šachovnica sezóny --- */
const JY_PC_RATIO = {"w-becko":0.649,"w-cilka":0.578,"w-gusto":0.605,"w-viktor":0.56,"w-ela":0.651,"w-hrom":0.476,"w-hugo":0.561,"w-albin":0.474,"w-dama":0.431,"b-kral":0.913,"b-veza":0.463,"b-strelec":0.431,"b-strazca":0.4,"b-pesiak":0.633};
const JY_PC_NAME = {a8:"b-strazca",c8:"b-veza",d8:"b-strelec",b5:"w-viktor",h5:"w-hugo",g3:"w-gusto",h3:"w-hrom",b2:"w-becko",c2:"w-cilka",e2:"w-ela",a1:"w-albin",h1:"b-kral"};
const JY_PC_SCALE = {p:0.98,r:1.12,n:1.12,b:1.15,q:1.2,k:1.18};
function jyPieceImg(name, kind){ let h = 100 * JY_PC_SCALE[kind], w = h * JY_PC_RATIO[name]; if (w > 100){ w = 100; h = w / JY_PC_RATIO[name]; }
  return `<image href="${JY_IMG("pc-" + name)}" x="${(50 - w/2).toFixed(1)}" y="${(95 - h).toFixed(1)}" width="${w.toFixed(1)}" height="${h.toFixed(1)}"/>`; }
const JY_PAWN = () => jyPieceImg(jyS2() ? "w-cilka" : "w-becko", "p");
const JY_QUEEN = () => `<circle cx="50" cy="45" r="52" fill="#f2c14e" opacity=".35"/>` + (jyS2() ? jyPieceImg("w-cilka-veza", "r") : jyPieceImg("w-dama", "q"));
const jyXY = s => [(s.charCodeAt(0) - 97) * 100, (8 - (+s[1])) * 100];
const JY_K = 1000 / 512, JY_H = Math.round(286 * JY_K);
const jyScaleD = d => d.replace(/-?\d+(\.\d+)?/g, n => (n * JY_K).toFixed(1));
const jyArt = i => `<image href="${JY_IMG(JY_SEASON.places[i].img)}" x="0" y="0" width="1000" height="${JY_H}" preserveAspectRatio="xMidYMid slice"/>`;
/* pozícia po `pos` vyhratých bossoch */
function jyBoardPieces(pos){
  const c = new Chess(JY_SEASON.fen), P = JY_SEASON.path, map = {};
  JY_SEASON.fen.split(" ")[0].split("/").forEach((row, ri) => { let f = 0; for (const ch of row){ if (/\d/.test(ch)){ f += +ch; continue; } const sq = "abcdefgh"[f] + (8 - ri); f++; if (sq !== "b2") map[sq] = {name:JY_PC_NAME[sq] || "b-pesiak", kind:ch.toLowerCase()}; } });
  for (let k = 0; k < pos; k++){ const m = JY_SEASON.lmove[k], ri = JY_SEASON.lreply[k];
    if (m != null) delete map[P[m + 1]];
    const r = ri != null ? JY_SEASON.replies[ri] : null; if (r && map[r[0]]){ map[r[1]] = map[r[0]]; delete map[r[0]]; } }
  return map;
}
function jyBoardSvg(pos, mated){
  if (jyS2()) return jyS2BoardSvg(pos, mated);
  const P = JY_SEASON.path, places = jyState().places;
  let s = `<defs>${["light","dark"].map(t => [0,1,2,3].map(v => `<pattern id="jtx-${t}${v}" patternUnits="userSpaceOnUse" width="150" height="150" patternTransform="translate(${v*37} ${v*61}) rotate(${v*90} 75 75)"><image href="${JY_IMG("tile-" + t)}" x="0" y="0" width="150" height="150"/></pattern>`).join("")).join("")}</defs>`;
  s += `<rect x="-12" y="-12" width="824" height="824" fill="#6b4a2e"/>`;
  for (let rk = 8; rk >= 1; rk--) for (let c = 0; c < 8; c++){
    const x = c * 100, y = (8 - rk) * 100, name = "abcdefgh"[c] + rk, light = (rk + c) % 2 === 0;
    s += `<rect x="${x}" y="${y}" width="100.5" height="100.5" fill="url(#jtx-${light ? "light" : "dark"}${(c*3 + rk*5) % 4})"/>`;
    if (!P.includes(name)) s += `<rect x="${x}" y="${y}" width="100" height="100" fill="#141926" opacity=".08"/>`;
    if (rk === 1) s += `<text x="${x+92}" y="${y+94}" font-size="13" text-anchor="end" fill="#3a2f22" opacity=".7">${"abcdefgh"[c]}</text>`;
    if (c === 0) s += `<text x="${x+6}" y="${y+16}" font-size="13" fill="#f3efe6" opacity=".8">${rk}</text>`;
  }
  s += `<image href="${JY_IMG("board-frame")}" x="-136" y="-136" width="1069" height="1069" pointer-events="none"/>`;
  if (mated) s += `<rect x="700" y="700" width="100" height="100" fill="#e4572e" opacity=".55"/>`;
  const st = jyState();
  for (let j = 0; j < JY_N; j++){
    const q = P[j], [x, y] = jyXY(q), L = JY_SEASON.places[j];
    const revealed = st.started && j <= pos, current = revealed && j === pos && !mated;
    if (!revealed) continue;
    s += `<g class="jy-sq" data-jy="land" data-i="${j}"><title>${esc(L.name)}${places[j].bossWon ? " ✔" : ""}</title><svg x="${x}" y="${y}" width="100" height="100" viewBox="0 0 1000 ${JY_H}" preserveAspectRatio="xMidYMid slice">${jyArt(j)}</svg>
      <rect class="frame" x="${x+2}" y="${y+2}" width="96" height="96" fill="none" stroke="${current ? "#f2c14e" : "#ffffff66"}" stroke-width="${current ? 6 : 2}"/></g>`;
  }
  s += `<g id="jy-pieces">`;
  const pcs = jyBoardPieces(pos);
  for (const sq in pcs){ const [x, y] = jyXY(sq); s += `<g class="jy-piece" data-sq="${sq}" style="transform:translate(${x}px,${y}px)">${jyPieceImg(pcs[sq].name, pcs[sq].kind)}</g>`; }
  s += `</g><g id="jy-fx"></g>`;
  const [px, py] = jyXY(P[jyMovesDone(pos)]);
  s += `<g id="jy-pawn" style="transform:translate(${px}px,${py}px);pointer-events:none">${mated ? JY_QUEEN() : JY_PAWN()}</g>`;
  return s;
}
function jyBoardRender(){
  if (jyS2()) return jyS2BoardRender();
  const st = jyState(), pos = st.pos, mated = pos >= JY_N, P = JY_SEASON.places;
  let status, story, main;
  if (!st.started){ status = "Pešiak stojí na b2. Pred ním je zahalená cesta…"; story = JY_SEASON.intro; main = jyBtn("start", "▶ Začať putovanie", "primary"); }
  else if (mated){ status = "👑 <b>Mat!</b> Pešiak z b2 – ten, v ktorého nikto neveril – dal mat."; story = "Sezóna 1 je za tebou. Celé riešenie: <b>1.b4 Vc5+ 2.bxc5 a2 3.c6 Sc7 4.cxb7 (čokoľvek) 5.bxa8D#</b>."; main = jyBtn("replay", "🎬 Prehrať celý Excelsior", "primary") + (jySeasonUnlocked() ? jyBtn("season", "❄️ Pokračovať: Sezóna 2 – Ľadová ríša", "primary", 'data-s="s2"') : ""); }
  else { const L = P[pos], p = st.places[pos];
    status = `Béčko je na <b>${JY_SEASON.path[jyMovesDone(pos)]}</b> – miesto <b>${L.name}</b> · kroky ${Math.min(p.steps, JY_STEPS)}/${JY_STEPS}`;
    story = `<b>${L.moveLbl || L.move}</b> – ${L.story}`; main = jyBtn("land", `🗺️ Vstúpiť: ${L.name}`, "primary", `data-i="${pos}"`); }
  jyShell(`<div class="jy-head"><div><span class="label">Putovanie · sezóna 1</span><h2>Cesta pešiaka – ${JY_SEASON.name}</h2></div>
      <div class="row">${jyBtn("book", "📖 Kniha príbehov")}${jySeasonUnlocked() ? jyBtn("season", "❄️ Sezóna 2", "", 'data-s="s2"') : ""}${st.started ? jyBtn("reset", "↺ Začať odznova", "", 'title="Začať celé putovanie odznova"') : ""}</div></div>
    <div class="jy-boardwrap">${st.started ? `<svg class="jy-board" id="jy-svg" viewBox="-136 -136 1069 1069">${jyBoardSvg(pos, mated)}</svg>` : `<img class="jy-titlepic" src="${JY_IMG("titul-putovanie")}" alt="Cesta pešiaka – Excelsior">`}</div>
    <div class="jy-binfo"><div class="jy-status" id="jy-status">${status}</div>
    <div class="jy-story">${story}</div>
    <div class="row jy-ctl">${main}</div>
    <p class="sub jy-note">Každé políčko cesty pešiaka je jedno miesto v Lese vidličiek. Na mieste prejdi 5 krokov a poraz bossa – potom sa príbeh pohne ďalej. Za deň zvládneš jedno miesto.</p></div>`, "jy-v-board");
}
/* animácia ťahu po porazení bossa (stav je už uložený)
   midP = panely medzi ťahom bieleho a odpoveďou čierneho; then(done) = panely po odpovedi (pri 5. ťahu po mate) */
function jyAnimateAdvance(j, then, midP){
  if (jyS2()) return jyS2Advance(j, then);
  JV.view = "board"; JV.busy = true;
  const P = JY_SEASON.path, m = JY_SEASON.lmove[j], ri = JY_SEASON.lreply[j], r = ri != null ? JY_SEASON.replies[ri] : null;
  // vykreslíme stav pred ťahom a zahráme ho (po Rozcestí ťahá len čierny)
  jyBoardRender();
  const svg = $("#jy-svg"); if (!svg) { JV.busy = false; return; }
  svg.innerHTML = jyBoardSvg(j, false);
  const pawn = svg.querySelector("#jy-pawn"), pieceAt = sq => svg.querySelector(`.jy-piece[data-sq="${sq}"]`);
  const mid = next => midP && midP.length ? setTimeout(() => jyComic(midP, next), 900) : next();
  const finish = () => { JV.busy = false; jyBoardRender(); const n = $("#jy-svg"); if (n && j + 1 < JY_N){ const [nx, ny] = jyXY(P[j + 1]); jyBurst(n, nx + 50, ny + 50); } if (then) setTimeout(() => then(null), 900); };
  const reply = () => {
    const s2 = $("#jy-svg"), g = r && s2 && s2.querySelector(`.jy-piece[data-sq="${r[0]}"]`);
    setTimeout(() => {
      if (g){ const [a, b] = jyXY(r[1]); g.style.transform = `translate(${a}px,${b}px)`; setTimeout(() => SFX.play("move"), 450); }
      $("#jy-status").innerHTML = r ? (m != null ? `Biely: <b>${JY_SEASON.wmoves[m]}</b> · Čierny odpovedá: <b>${r[2]}</b>` : `Čierny odpovedá: <b>${r[2]}</b>`)
        : `Biely: <b>${JY_SEASON.wmoves[m]}</b> · Čierny premýšľa…`;
      setTimeout(finish, 1300);
    }, 700);
  };
  if (m == null) return setTimeout(() => mid(reply), 300);
  const to = P[m + 1], cap = pieceAt(to);
  setTimeout(() => {
    if (cap){ cap.style.opacity = 0; }
    const [x, y] = jyXY(to); pawn.style.transform = `translate(${x}px,${y}px)`; setTimeout(() => SFX.play(cap ? "capture" : "move"), 450);
    $("#jy-status").innerHTML = `Biely: <b>${JY_SEASON.wmoves[m]}</b>`;
    setTimeout(() => {
      jyBurst(svg, x + 50, y + 50);
      if (m === 4){
        return mid(() => {
          const s2 = $("#jy-svg"), pw = s2 && s2.querySelector("#jy-pawn");
          SFX.play("promote"); SFX.story("premena"); setTimeout(() => SFX.play("win"), 1400);
          if (pw){ pw.innerHTML = JY_QUEEN(); jyBurst(s2, 750, 750, 20); const mk = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            [["x",700],["y",700],["width",100],["height",100],["fill","#e4572e"],["opacity",".55"]].forEach(([k, v]) => mk.setAttribute(k, v)); s2.querySelector("#jy-fx").before(mk); }
          $("#jy-status").innerHTML = `Biely: <b>${JY_SEASON.wmoves[m]}</b> · 👑 <b>Mat!</b>`;
          setTimeout(() => { JV.busy = false;
            const ep = () => { jyRender(); if (!jyState().epilog) jyComic("epilog", () => { JV.finale = false; jySave({epilog:true}); }); else JV.finale = false; };
            if (then) then(ep); else ep(); }, 2200);
        });
      }
      mid(reply);
    }, 1100);
  }, 500);
}
/* ===== šachovnica sezóny 2 (Saavedra): dve figúry – Cilka (c6) a Kráľ Hugo (b6); ťahy miest v JY_SEASON.moves ===== */
const JY_S2_SAN = s => s.replace(/=?R/g, "V").replace(/=?Q/g, "D").replace(/=?B/g, "S").replace(/=?N/g, "J").replace(/(c8)V/, "$1V");
function jyS2Game(pos, raw){
  const c = new Chess(JY_SEASON.fen), T = window.JY_S2, map = {};
  for (const sq in T.pcName){ const p = c.get(sq); if (p) map[sq] = {name:T.pcName[sq], kind:p.type}; }
  const sans = [];
  for (let j = 0; j < Math.min(pos, JY_N); j++) for (const u of JY_SEASON.moves[j]){
    const mv = c.move({from:u.slice(0, 2), to:u.slice(2, 4), promotion:u[4]}); if (!mv) continue;
    const pc = map[mv.from]; delete map[mv.to]; delete map[mv.from];
    if (pc) map[mv.to] = mv.promotion ? {name:"w-cilka-veza", kind:"r"} : pc;
    sans.push(mv.san);
  }
  if (!raw && !JV.replaying && !JV.advancing){
    const st = jyState();
    if (pos === 0 && st.places[0] && st.places[0].met && map.c6){
      map.c7 = map.c6; delete map.c6;
      c.move({from:"c6", to:"c7"});
    }
    if (pos === 2 && map.b3){
      map.c2 = map.b3; delete map.b3;
    }
    if (pos === 4 && st.places[4] && st.places[4].met && map.c2){
      map.b3 = map.c2; delete map.c2;
      c.move({from:"c2", to:"b3"});
    }
  }
  return {c, map, sans};
}
const jyS2Find = (map, n) => Object.keys(map).find(sq => map[sq].name.startsWith(n));
function jyS2BoardSvg(pos, mated){
  const st = jyState(), places = st.places, TL = JY_SEASON.tiles;
  let s = `<defs>${["light","dark"].map((t, ti) => [0,1,2,3].map(v => `<pattern id="jtx-${t}${v}" patternUnits="userSpaceOnUse" width="150" height="150" patternTransform="translate(${v*37} ${v*61}) rotate(${v*90} 75 75)"><image href="${JY_IMG(TL[ti])}" x="0" y="0" width="150" height="150"/></pattern>`).join("")).join("")}</defs>`;
  s += `<rect x="-12" y="-12" width="824" height="824" fill="#3c5670"/>`;
  for (let rk = 8; rk >= 1; rk--) for (let c = 0; c < 8; c++){
    const x = c * 100, y = (8 - rk) * 100, light = (rk + c) % 2 === 0;
    s += `<rect x="${x}" y="${y}" width="100.5" height="100.5" fill="url(#jtx-${light ? "light" : "dark"}${(c*3 + rk*5) % 4})"/>`;
    if (rk === 1) s += `<text x="${x+92}" y="${y+94}" font-size="13" text-anchor="end" fill="#1d3550" opacity=".7">${"abcdefgh"[c]}</text>`;
    if (c === 0) s += `<text x="${x+6}" y="${y+16}" font-size="13" fill="#1d3550" opacity=".7">${rk}</text>`;
  }
  s += `<rect x="0" y="0" width="800" height="800" fill="none" stroke="#0b1d33" stroke-opacity=".35" stroke-width="10"/>`;
  if (mated) s += `<rect x="0" y="700" width="100" height="100" fill="#e4572e" opacity=".55"/>`;
  for (let j = 0; j < JY_N; j++){
    const q = JY_SEASON.path[j], [x, y] = jyXY(q), L = JY_SEASON.places[j];
    const revealed = st.started && j <= pos, current = revealed && j === pos && !mated;
    if (!revealed) continue;
    s += `<g class="jy-sq" data-jy="land" data-i="${j}"><title>${esc(L.name)}${places[j].bossWon ? " ✔" : ""}</title><svg x="${x}" y="${y}" width="100" height="100" viewBox="0 0 1000 ${JY_H}" preserveAspectRatio="xMidYMid slice" opacity=".9">${jyArt(j)}</svg>
      <rect class="frame" x="${x+2}" y="${y+2}" width="96" height="96" fill="none" stroke="${current ? "#f2c14e" : "#ffffffaa"}" stroke-width="${current ? 6 : 2}"/></g>`;
  }
  s += `<g id="jy-pieces">`;
  const {map} = jyS2Game(pos);
  for (const sq in map){ const [x, y] = jyXY(sq); s += `<g class="jy-piece" data-sq="${sq}" style="transform:translate(${x}px,${y}px);pointer-events:none">${jyPieceImg(map[sq].name, map[sq].kind)}</g>`; }
  s += `</g><g id="jy-fx"></g>`;
  s += `<image href="${JY_IMG(JY_SEASON.frame)}" x="-136" y="-136" width="1069" height="1069" pointer-events="none"/>`;
  return s;
}
function jyS2BoardRender(){
  const st = jyState(), pos = st.pos, mated = pos >= JY_N, P = JY_SEASON.places, X = JY_SEASON.txt;
  let status, story, main;
  if (!st.started){ status = X.start; story = JY_SEASON.intro; main = jyBtn("start", "▶ Začať sezónu 2", "primary"); }
  else if (mated){ status = X.mated; story = X.matedStory; main = jyBtn("replay", X.replay, "primary"); }
  else { const L = P[pos], p = st.places[pos], {map} = jyS2Game(pos);
    status = `Cilka je na <b>${jyS2Find(map, "w-cilka")}</b>, Kráľ Hugo na <b>${jyS2Find(map, "w-hugo")}</b> – miesto <b>${L.name}</b> · kroky ${Math.min(p.steps, JY_STEPS)}/${JY_STEPS}`;
    story = `<b>${L.moveLbl || L.move}</b> – ${L.story}`; main = jyBtn("land", `🗺️ Vstúpiť: ${L.name}`, "primary", `data-i="${pos}"`); }
  jyShell(`<div class="jy-head"><div><span class="label">${X.label}</span><h2>${X.title}</h2></div>
      <div class="row">${jyBtn("book", "📖 Kniha príbehov")}${jyBtn("season", "🌳 Sezóna 1", "", 'data-s="s1"')}${st.started ? jyBtn("reset", "↺ Začať odznova", "", 'title="Začať sezónu 2 odznova"') : ""}</div></div>
    <div class="jy-boardwrap">${st.started ? `<svg class="jy-board" id="jy-svg" viewBox="-136 -136 1069 1069">${jyS2BoardSvg(pos, mated)}</svg>` : `<img class="jy-titlepic" src="${JY_IMG(JY_SEASON.titleImg)}" alt="${esc(X.title)}">`}</div>
    <div class="jy-binfo"><div class="jy-status" id="jy-status">${status}</div>
    <div class="jy-story">${story}</div>
    <div class="row jy-ctl">${main}</div>
    <p class="sub jy-note">${X.note}</p></div>`, "jy-v-board");
}
/* animácia ťahov miesta j po porazení bossa; then(done) = komiksy po ťahoch (pri poslednom mieste po mate) */
function jyS2Animate(svg, moves, startPos, onEnd){
  const {c} = jyS2Game(startPos); let k = 0, sans = [];
  const step = () => {
    if (k >= moves.length) return onEnd(sans);
    const u = moves[k++], mv = c.move({from:u.slice(0, 2), to:u.slice(2, 4), promotion:u[4]}); if (!mv) return step();
    const g = svg.querySelector(`.jy-piece[data-sq="${mv.from}"]`), cap = svg.querySelector(`.jy-piece[data-sq="${mv.to}"]`);
    if (cap) cap.style.opacity = 0;
    if (g){ const [x, y] = jyXY(mv.to); g.style.transform = `translate(${x}px,${y}px)`; g.dataset.sq = mv.to;
      if (mv.promotion) setTimeout(() => { g.innerHTML = jyPieceImg("w-cilka-veza", "r"); jyBurst(svg, x + 50, y + 50, 20); SFX.play("promote"); SFX.story("premena"); }, 600); }
    setTimeout(() => SFX.play(cap ? "capture" : "move"), 450);
    sans.push(JY_S2_SAN(mv.san)); const st = $("#jy-status"); if (st) st.innerHTML = `${mv.color === "w" ? "Biely" : "Čierny"}: <b>${JY_S2_SAN(mv.san)}</b>`;
    setTimeout(step, mv.promotion ? 1900 : 1200);
  };
  setTimeout(step, 500);
}
function jyS2Advance(j, then){
  JV.view = "board"; JV.busy = true;
  jyS2BoardRender();
  const svg = $("#jy-svg"); if (!svg){ JV.busy = false; return; }
  svg.innerHTML = jyS2BoardSvg(j, false);
  jyS2Animate(svg, JY_SEASON.moves[j], j, sans => {
    const st = $("#jy-status"); if (st) st.innerHTML = sans.map(x => `<b>${x}</b>`).join(" ");
    if (j === JY_LAST){
      const mk = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      [["x",0],["y",700],["width",100],["height",100],["fill","#e4572e"],["opacity",".55"]].forEach(([a, v]) => mk.setAttribute(a, v)); svg.querySelector("#jy-fx").before(mk);
      SFX.play("win"); jyBurst(svg, 250, 750, 20); if (st) st.innerHTML += " · 👑 <b>Mat!</b>";
      return setTimeout(() => { JV.busy = false;
        const ep = () => { jyRender(); if (!jyState().epilog) jyComic("epilog", () => { JV.finale = false; jySave({epilog:true}); }); else JV.finale = false; };
        if (then) then(ep); else ep(); }, 2200);
    }
    setTimeout(() => { JV.busy = false; jyS2BoardRender(); const n = $("#jy-svg"); if (n && j + 1 < JY_N){ const [nx, ny] = jyXY(JY_SEASON.path[j + 1]); jyBurst(n, nx + 50, ny + 50); } if (then) setTimeout(() => then(null), 900); }, 1300);
  });
}
function jyS2Replay(){
  if (JV.busy) return; JV.busy = true; JV.replaying = true;
  const svg = $("#jy-svg"); if (!svg){ JV.busy = false; JV.replaying = false; return; }
  svg.innerHTML = jyS2BoardSvg(0, false);
  jyS2Animate(svg, JY_SEASON.moves.flat(), 0, () => { const mk = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    [["x",0],["y",700],["width",100],["height",100],["fill","#e4572e"],["opacity",".55"]].forEach(([a, v]) => mk.setAttribute(a, v)); svg.querySelector("#jy-fx").before(mk);
    SFX.play("win"); $("#jy-status").innerHTML += " · 👑 <b>Mat!</b>"; JV.busy = false; JV.replaying = false; });
}
function jyBurst(svg, cx, cy, n = 14){
  SFX.play("sparkle");
  const fx = svg.querySelector("#jy-fx"); if (!fx || (window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches)) return;
  const colors = ["#f2c14e","#ffffff","#e4572e","#7cc4e6","#93cf7b"];
  for (let k = 0; k < n; k++){
    const c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    c.setAttribute("cx", cx + (Math.random() - .5) * 120); c.setAttribute("cy", cy + (Math.random() - .5) * 120);
    c.setAttribute("r", 4 + Math.random() * 6); c.setAttribute("fill", colors[k % colors.length]); c.setAttribute("class", "jy-spark");
    c.style.animationDelay = (Math.random() * .4) + "s"; fx.appendChild(c); setTimeout(() => c.remove(), 1700);
  }
}
function jyReplay(){
  if (jyS2()) return jyS2Replay();
  if (JV.busy) return; JV.busy = true;
  const svg = $("#jy-svg"); svg.innerHTML = jyBoardSvg(0, false);
  const P = JY_SEASON.path, pawn = svg.querySelector("#jy-pawn"), st = $("#jy-status");
  let k = 0;
  const step = () => {
    if (k === 5){ SFX.play("promote"); SFX.story("premena"); pawn.innerHTML = JY_QUEEN(); jyBurst(svg, 750, 750, 20); JV.busy = false; return; }
    const to = P[k + 1], cap = svg.querySelector(`.jy-piece[data-sq="${to}"]`); if (cap) cap.style.opacity = 0;
    const [x, y] = jyXY(to); pawn.style.transform = `translate(${x}px,${y}px)`; st.innerHTML = `<b>${JY_SEASON.wmoves[k]}</b>`; setTimeout(() => SFX.play(cap ? "capture" : "move"), 450);
    setTimeout(() => { const r = JY_SEASON.replies[k]; if (r){ const g = svg.querySelector(`.jy-piece[data-sq="${r[0]}"]`); if (g){ const [a, b] = jyXY(r[1]); g.style.transform = `translate(${a}px,${b}px)`; g.dataset.sq = r[1]; } st.innerHTML = `<b>${JY_SEASON.wmoves[k]}</b> ${r[2]}`; } k++; setTimeout(step, 1300); }, 1200);
  };
  setTimeout(step, 600);
}

/* --- mapa miesta --- */
function jyLandRender(){
  const i = JV.cur, L = JY_SEASON.places[i], st = jyState(), p = st.places[i], used = jyStepUsed(st);
  const isCur = i === st.pos, steps = Math.min(p.steps, JY_STEPS), bossOpen = isCur && steps >= JY_STEPS && !p.bossWon;
  const stars = jySideOrder().filter(k => jySideDone(p, k)).length;
  let status = JV.msg;
  if (!status){
    if (p.bossWon) status = "Toto miesto je už prejdené 🏆 Odbočky si tu môžeš kedykoľvek zopakovať.";
    else if (!isCur) status = "Toto miesto ešte nie je na rade.";
    else if (used) status = `Dnes si už prešiel celú krajinu 🏆 Sem sa vydáš zajtra s čerstvou hlavou. Odbočky si môžeš skúsiť aj dnes.`;
    else if (bossOpen) status = `<b>${L.guide.name}:</b> „${L.guide.preBoss}“`;
    else status = `<b>${L.guide.name}:</b> „${L.guide.steps[steps]}“`;
  }
  const perks = Object.keys(p.perks || {}).filter(k => p.perks[k] && !p.bossWon).map(k => ({heart:"❤️ srdiečko navyše", hint:"💡 nápoveda", zoom:"🔍 lupa", compass:"🧭 Gustov kompas", undo:"🛡️ Albínova rada"})[k]);
  const mainAct = isCur && !p.bossWon ? (bossOpen ? jyBtn("boss", `⚔️ Súboj: ${esc(L.boss.name)}`, "primary", used ? "disabled" : "") : jyBtn("step", used ? "Zajtra pokračuješ ✓" : `▶ Krok ${steps + 1} z ${JY_STEPS}`, "primary", used ? "disabled" : "")) : "";
  jyShell(`<div class="jy-head">${jyBtn("board", "← Šachovnica")}
      <div class="jy-title"><h2>${esc(L.name)}</h2><span class="sub">${L.moveLbl ? "" : "Ťah "}<b>${L.moveLbl || L.move}</b> · téma: ${esc(L.theme)}</span></div>
      <span class="jy-chip ${p.bossWon ? "freed" : ""}">${p.bossWon ? "Prejdené ✔" : `Kroky <b>${steps}/${JY_STEPS}</b>`} · ⭐ <b>${stars}</b></span></div>
    <div class="jy-mapwrap"><svg class="jy-land" id="jy-land" viewBox="0 0 1000 559">${jyLandSvg(i)}</svg>${jyLureHtml(i)}
      ${jyBtn("board", "← Šachovnica", "jy-land-back")}
      <div class="jy-land-badge"><b>${esc(L.name)}</b> · ${p.bossWon ? "✔" : `${steps}/${JY_STEPS}`} · ⭐ ${stars}</div>
      ${mainAct ? `<div class="jy-land-act">${mainAct}</div>` : ""}</div>
    <div class="jy-status">${status}</div>
    <div class="jy-sidechips">${[...jySideOrder(), ...(p.bossLost && !p.bossWon ? ["prep"] : [])].map(k => { const sd = k === "prep" ? {label:"Príprava na bossa", icon:"🎯"} : JY_SIDES[k], d = jySideDone(p, k);
      return `<button data-jy="side" data-k="${k}" class="${d ? "done" : ""}">${sd.icon} ${sd.label}${d ? " " + "⭐".repeat((p.stars || {})[k] || 1) : ""}</button>`; }).join("")}</div>
    ${perks.length ? `<div class="jy-perks">Do súboja máš: ${perks.join(" · ")}</div>` : ""}
    <div class="row jy-ctl">${mainAct}${isCur && !p.bossWon && used ? jyBtn("more", "Hrať ďalej") : ""}
      ${jyBtn("meet", "💬 Stretnutie so sprievodcom")}</div>
    <p class="sub jy-note">Odbočky okolo cesty sú dobrovoľné a dajú sa robiť kedykoľvek. Každá rozpustí kúsok ${JY_SEASON.fogLabel || "fialovej hmly"}, pridá stranu do Knihy príbehov a niektoré dajú malú výhodu do súboja.</p>
    ${jyParentHtml()}`, "jy-v-land");
  JV.msg = "";
  if (JV.fresh && JV.fresh.place === i){ const fs = JV.fresh.side; setTimeout(() => { const f = document.querySelector(`#jy-land [data-fog="${fs}"]`); if (f) f.classList.add("lift"); JV.fresh = null; }, 60); }
}
function jyLandSvg(i){
  const L = JY_SEASON.places[i], st = jyState(), p = st.places[i], used = jyStepUsed(st), isCur = i === st.pos;
  const RD = jyScaleD(L.route);
  // body cesty – dráhu vyrátame cez dočasný path
  const tmp = document.createElementNS("http://www.w3.org/2000/svg", "svg"); tmp.setAttribute("style", "position:absolute;width:0;height:0;visibility:hidden"); document.body.appendChild(tmp);
  const pe = document.createElementNS("http://www.w3.org/2000/svg", "path"); pe.setAttribute("d", RD); tmp.appendChild(pe);
  const len = pe.getTotalLength(), FR = [0.035, 0.22, 0.41, 0.6, 0.79];
  const pts = FR.map(f => pe.getPointAtLength(f * len)), bossPt = pe.getPointAtLength(len); tmp.remove();
  let s = `<defs><clipPath id="jybossclip"><circle cx="${bossPt.x}" cy="${bossPt.y}" r="42"/></clipPath><clipPath id="jyguideclip"><circle cx="70" cy="74" r="40"/></clipPath>
    <filter id="jygray"><feColorMatrix type="saturate" values="0"/></filter>
    ${(f => `<radialGradient id="jyfog"><stop offset="0" stop-color="${f[0]}" stop-opacity=".88"/><stop offset=".55" stop-color="${f[1]}" stop-opacity=".6"/><stop offset="1" stop-color="${f[2]}" stop-opacity="0"/></radialGradient>`)(JY_SEASON.fog || ["#5b2a86", "#6d3a9c", "#7c4bb0"])}
    <radialGradient id="jyglow"><stop offset="0" stop-color="#fff6c8" stop-opacity=".95"/><stop offset=".5" stop-color="#f2c14e" stop-opacity=".45"/><stop offset="1" stop-color="#f2c14e" stop-opacity="0"/></radialGradient></defs>`;
  s += jyArt(i) + `<rect width="1000" height="${JY_H}" fill="#000" opacity=".08"/>
    <path d="${RD}" fill="none" stroke="#5a4326" stroke-width="30" stroke-linecap="round" opacity=".55"/>
    <path d="${RD}" fill="none" stroke="#f6e7c1" stroke-width="18" stroke-linecap="round" stroke-dasharray="2 26"/>`;
  // odbočky (s hmlou, ktorá po dokončení zmizne)
  const taken = [...pts, bossPt];
  const sides = [...jySideOrder()]; if (p.bossLost && !p.bossWon) sides.push("prep");
  for (const k of sides){
    const sd = k === "prep" ? {label:"Príprava na bossa", icon:"🎯", k:4, dir:1} : JY_SIDES[k];
    const a = k === "prep" ? bossPt : pts[sd.k], done = jySideDone(p, k);
    let x = a.x + 25, y = a.y + sd.dir * 135, dir = sd.dir, best = -1e9;
    for (const [dx, dy] of [[25,135*sd.dir],[25,-135*sd.dir],[90,150*sd.dir],[90,-150*sd.dir],[-60,150*sd.dir],[-60,-150*sd.dir],[-150,40*sd.dir],[-150,-40*sd.dir],[-170,110*sd.dir],[-170,-110*sd.dir],[150,60*sd.dir],[150,-60*sd.dir]]){
      const cx = a.x + dx, cy = a.y + dy; if (cy < 70 || cy > 480 || cx < 60 || cx > 940) continue;
      const m = Math.min(...taken.map(q => Math.hypot(q.x - cx, q.y - cy) - (q === bossPt ? 65 : 0)));
      if (m > best){ best = m; x = cx; y = cy; dir = Math.sign(dy) || 1; } if (m > 85) break;
    }
    if (L.sidePos && L.sidePos[k]) [x, y, dir] = L.sidePos[k];
    y = Math.max(70, Math.min(480, y)); taken.push({x, y});
    const fresh = JV.fresh && JV.fresh.place === i && JV.fresh.side === k;
    const lbl = sd.label + (done ? " ⭐" : ""), lw = 26 + lbl.length * 7.6, lx = Math.max(lw/2 + 6, Math.min(994 - lw/2, x));
    s += `<line x1="${a.x}" y1="${a.y}" x2="${x}" y2="${y}" stroke="#f6e7c1" stroke-width="6" stroke-dasharray="8 10" stroke-linecap="round"/>
      <g data-jy="side" data-k="${k}" class="jy-side">${JV.lure && JV.lure.place === i && JV.lure.k === k ? `<circle cx="${x}" cy="${y}" r="40" fill="none" stroke="#ffd54a" stroke-width="6" class="jy-pulse"/>` : ""}${done ? `<circle cx="${x}" cy="${y}" r="70" fill="url(#jyglow)" class="jy-glow"/>` : ""}
      <circle cx="${x}" cy="${y}" r="30" fill="${done ? "#f2c14e" : k === "prep" ? "#7a2e2e" : "#2a3147"}" stroke="#fff" stroke-width="4" class="${k === "prep" && !done ? "jy-pulse" : ""}"/>
      <text x="${x}" y="${y + 10}" font-size="28" text-anchor="middle">${sd.icon}</text>
      ${!done || fresh ? `<g class="jy-fog" data-fog="${k}" pointer-events="none">
        <circle cx="${x - 22}" cy="${y + 6}" r="50" fill="url(#jyfog)"/><circle cx="${x + 24}" cy="${y - 6}" r="52" fill="url(#jyfog)"/><circle cx="${x}" cy="${y + 18}" r="46" fill="url(#jyfog)"/></g>` : ""}
      <rect x="${lx - lw/2}" y="${y + (dir < 0 ? -62 : 36)}" width="${lw}" height="24" rx="12" fill="#000" opacity=".6"/>
      <text x="${lx}" y="${y + (dir < 0 ? -45 : 53)}" font-size="15" text-anchor="middle" fill="#fff">${lbl}</text></g>`;
  }
  // kroky hlavnej cesty
  const steps = Math.min(p.steps, JY_STEPS);
  pts.forEach((a, k) => {
    const done = k < steps, next = k === steps && isCur && !p.bossWon, fill = done || p.bossWon ? "#f2c14e" : next ? "#ffffff" : "#8a8f9e";
    s += `<g data-jy="stepdot" data-i="${k}"><circle class="${next && !used ? "jy-pulse" : ""}" cx="${a.x}" cy="${a.y}" r="27" fill="${fill}" stroke="#3a2f22" stroke-width="4"/>
      <text x="${a.x}" y="${a.y + 9}" font-size="24" font-weight="600" text-anchor="middle" fill="#3a2f22">${done || p.bossWon ? "✓" : k + 1}</text></g>`;
  });
  // boss
  const bossOpen = isCur && steps >= JY_STEPS && !p.bossWon;
  s += `<g data-jy="bossdot"><circle class="${bossOpen && !used ? "jy-pulse" : ""}" cx="${bossPt.x}" cy="${bossPt.y}" r="50" fill="${p.bossWon ? "#3c9a5f" : bossOpen ? "#e4572e" : "#555b6b"}" stroke="#fff" stroke-width="5"/>
    <circle cx="${bossPt.x}" cy="${bossPt.y}" r="42" fill="#fff"/>
    <image href="${JY_IMG(p.bossWon && L.boss.imgDone ? L.boss.imgDone : L.boss.img)}" x="${bossPt.x - 42}" y="${bossPt.y - 42}" width="84" height="84" preserveAspectRatio="xMidYMid slice" clip-path="url(#jybossclip)" ${bossOpen || p.bossWon ? "" : `filter="url(#jygray)" opacity=".55"`}/>
    ${bossOpen ? "" : `<text x="${bossPt.x + 30}" y="${bossPt.y + 44}" font-size="28" text-anchor="middle">${p.bossWon ? "🏆" : "🔒"}</text>`}
    <rect x="${bossPt.x - 85}" y="${bossPt.y - 88}" width="170" height="26" rx="13" fill="#000" opacity=".6"/>
    <text x="${bossPt.x}" y="${bossPt.y - 69}" font-size="16" text-anchor="middle" fill="#fff">${esc(L.boss.name)}</text></g>`;
  // sprievodca
  const gw = 40 + (11 + L.guide.name.length) * 7.4;
  s += `<g data-jy="guide" class="jy-side"><circle cx="70" cy="74" r="44" fill="#fff" stroke="#f2c14e" stroke-width="5"/>
    <image href="${JY_IMG(L.guide.img)}" x="30" y="34" width="80" height="80" clip-path="url(#jyguideclip)"/>
    <rect x="18" y="122" width="${gw}" height="24" rx="12" fill="#000" opacity=".6"/>
    <text x="${18 + gw/2}" y="139" font-size="14" text-anchor="middle" fill="#fff">Sprievodca: ${esc(L.guide.name)}</text></g>`;
  // pešiak
  const at = p.bossWon ? bossPt : steps === 0 ? {x:pts[0].x - 55, y:pts[0].y + 30} : pts[steps - 1];
  if (isCur || p.bossWon) s += `<svg x="${at.x - 30}" y="${at.y - 78}" width="60" height="60" viewBox="0 0 100 100" style="pointer-events:none">${st.pos >= JY_N && i === JY_LAST ? JY_QUEEN() : (jyS2() && (i === 2 || i === 4) ? jyPieceImg("w-hugo", "k") : JY_PAWN())}</svg>`;
  return s;
}

/* --- po kroku: ponuka odbočiek --- */
function jyAfterRender(){
  const i = JV.cur, L = JY_SEASON.places[i], st = jyState(), p = st.places[i], R = JV.after || {};
  const open = jySideOrder().filter(k => !jySideDone(p, k) && !(k === "race" && jyRacedToday(st)));
  let offer = R.offer || jyShuffle(open).slice(0, 2);
  if (!R.offer){ R.offer = offer; JV.after = R; }
  const lure = R.lure ? `<div class="jy-say"><img src="${JY_IMG(L.guide.img)}" alt=""><p><b>${esc(L.guide.name)}:</b> „${esc(R.lure)}“</p></div>` : "";
  jyShell(`<div class="panel jy-after">
    <h2>${esc(R.title || "Hotovo!")}</h2>
    <p class="jy-big">${R.text || ""}</p>
    ${lure}
    ${offer.length ? `<p class="sub">Máš ešte chuť? Vyber si jedno.</p><div class="jy-offer">${offer.map(k => `<button data-jy="side" data-k="${k}" data-from="after"><span class="jy-oi">${JY_SIDES[k].icon}</span><b>${JY_SIDES[k].label}</b><span>${JY_SIDES[k].desc}</span></button>`).join("")}</div>` : ""}
    <div class="row jy-ctl">${jyBtn("done", "Hotovo na dnes ✔", "primary jy-donebtn")}${jyBtn("land", "🗺️ Na mapu", "", `data-i="${i}"`)}</div>
  </div>`);
}
const jyRacedToday = st => (st.race || []).some(r => r.date === jyToday());

/* --- pohľadnice od sprievodcov (za každý splnený krok; nie sú to odznaky) --- */
const jyCardImg = (i, k) => JY_IMG(`pohladnica-${JY_SEASON.fno[i]}-${k + 1}`);
const jyCardGot = (p, k) => !!p.bossWon || p.steps > k;
function jyPostcard(i, k, fresh, after){
  if (fresh){ SFX.play("star"); setTimeout(() => SFX.story("list"), 350); } else SFX.story("list", "page");
  const g = JY_SEASON.places[i].guide, st = jyState(), owned = [];
  if (!fresh) JY_SEASON.places.forEach((_, pi) => { for (let pk = 0; pk < JY_STEPS; pk++) if (jyCardGot(st.places[pi], pk)) owned.push([pi, pk]); });
  const idx = owned.findIndex(([pi, pk]) => pi === i && pk === k);
  const prev = idx > 0 ? owned[idx - 1] : null, next = idx >= 0 && idx + 1 < owned.length ? owned[idx + 1] : null;
  const nav = owned.length > 1;
  const img = `<img src="${jyCardImg(i, k)}" alt="">`;
  const media = nav
    ? `<div class="jy-card-nav"><button type="button" class="jy-card-arr" data-jy="pc"${prev ? ` data-i="${prev[0]}" data-k="${prev[1]}"` : " disabled"} aria-label="Predošlá pohľadnica">‹</button>${img}<button type="button" class="jy-card-arr" data-jy="pc"${next ? ` data-i="${next[0]}" data-k="${next[1]}"` : " disabled"} aria-label="Nasledujúca pohľadnica">›</button></div>`
    : img;
  const lbl = fresh ? `Krok ${k + 1} z ${JY_STEPS} hotový!` : `Pohľadnica${nav ? ` ${idx + 1}/${owned.length}` : ""} · krok ${k + 1}`;
  jyModal(`<div class="jy-card"><span class="label">${lbl}</span><h2>📮 ${fresh ? "Pohľadnica od: " : ""}${esc(g.name)}</h2>
    ${media}<p>„${esc(g.steps[k])}“</p></div>`, [[fresh ? "Ďakujem! ✔" : "Zavrieť", "primary", after || null]]);
}
/* --- sprievodca láka na odbočku (bublina pri jeho obrázku na mape) --- */
function jyPickLure(i){
  const st = jyState(), p = st.places[i]; if (p.steps < 2 || p.bossWon) return null;
  const open = jySideOrder().filter(k => !jySideDone(p, k)); if (!open.length) return null;
  const k = open.find(k => !p.lured.includes(k)) || open[p.steps % open.length];
  if (!p.lured.includes(k)) jySavePlace(i, {lured:[...p.lured, k]});
  return k;
}
function jyShowLure(i, k){ if (JV.view !== "land" || JV.cur !== i) return; JV.lure = {place:i, k}; SFX.play("pop"); jyLandRender(); }
function jyLureHtml(i){
  const l = JV.lure; if (!l || l.place !== i) return "";
  const g = JY_SEASON.places[i].guide, sd = JY_SIDES[l.k];
  return `<div class="jy-lure" data-jy="lureclose"><div class="jy-lure-b"><b>${esc(g.name)}</b>${esc(g.lures[l.k])}<span class="jy-lure-k">${sd.icon} ${esc(sd.label)} – klikni na mapu</span><button aria-label="Zavrieť">×</button></div></div>`;
}

/* --- Kniha príbehov --- */
function jyBookRender(){
  const st = jyState(), P = JY_SEASON.places;
  const item = (act, t, sub, extra = "") => `<button class="jy-bk" data-jy="${act}" ${extra}><b>${t}</b><span>${sub}</span></button>`;
  let h = `<h3>Príbeh</h3><div class="jy-bks">${st.started ? item("comic", "Prológ", "Ako to celé začalo", 'data-c="prolog"') : '<p class="sub">Príbeh sa začne, keď vyrazíš na cestu.</p>'}`;
  P.forEach((L, i) => { const p = st.places[i];
    if (p.met) h += item("meet", `Stretnutie: ${L.guide.name}`, L.name, `data-i="${i}"`);
    if (p.bossWon) h += item("comic", `Medzihra ${i + 1}`, `${L.boss.name} porazený`, `data-c="${JY_AFTER_BOSS[i]}"`);
  });
  if (st.pos >= JY_N) h += item("comic", "Epilóg", JY_SEASON.epilogSub || "Slnko nad lesom", 'data-c="epilog"');
  h += `</div>`;
  const ep = st.albinEp || 0;
  h += `<h3>Albínove príbehy (${ep} z ${JY_ALBIN_TALES.length})</h3>` + (ep ? `<div class="jy-bks">${JY_ALBIN_TALES.slice(0, ep).map((t, k) => item("tale", `🐴 ${jyAlbinLabel(k).replace(/ z \d+$/, "")}`, esc(t.slice(0, 48)) + "…", `data-k="${k}"`)).join("")}</div>` : '<p class="sub">Každá návšteva Hradu otvorení ti prinesie ďalšiu časť Albínovho príbehu.</p>');
  h += `<h3>${JY_SEASON.lettersTitle || "Listy z lesa"}</h3>`;
  const letters = [];
  P.forEach((L, i) => jySideOrder().forEach(k => { if (jySideDone(st.places[i], k)) letters.push({i, k, L:L.letters[k]}); }));
  h += letters.length ? `<div class="jy-bks">${letters.map(x => item("letter", `${JY_SIDES[x.k].icon} ${esc(x.L.from)}`, esc(P[x.i].name), `data-i="${x.i}" data-k="${x.k}"`)).join("")}</div>`
    : `<p class="sub">Každá dokončená odbočka ti sem pošle ${jyLetterWord()} – kúsok príbehu, ktorý v hlavnej ceste nie je.</p>`;
  const nCards = P.reduce((n, _, i) => n + [0,1,2,3,4].filter(k => jyCardGot(st.places[i], k)).length, 0);
  h += `<h3>Pohľadnice (${nCards} z ${P.length * JY_STEPS})</h3><div class="jy-album">${P.map((L, i) => [0,1,2,3,4].map(k => jyCardGot(st.places[i], k)
    ? `<button data-jy="pc" data-i="${i}" data-k="${k}" title="${esc(L.guide.name)} · deň ${k + 1}"><img src="${jyCardImg(i, k)}" alt="" loading="lazy"></button>` : `<span class="jy-alb-empty"><img src="${JY_IMG(JY_SEASON.album || "album-prazdne")}" alt="" loading="lazy"></span>`).join("")).join("")}</div>`;
  const total = P.length * jySideOrder().length;
  jyShell(`<div class="jy-head">${jyBtn("board", "← Šachovnica")}<div class="jy-title"><h2>📖 Kniha príbehov</h2><span class="sub">${JY_SEASON.lettersTitle || "Listy z lesa"}: ${letters.length} z ${total}</span></div><span></span></div>
    <div class="panel jy-book">${h}</div>`);
}
function jyLetterText(i, k, n){
  const L = JY_SEASON.places[i].letters[k]; if (!n) return L.t;
  if (L["t" + n]) return L["t" + n];
  const r = jyS2() ? null : (JY_LETTER_R[i] || {})[k]; return r && r[n - 1] ? r[n - 1] + " " + L.t : L.t;
}
function jyLetter(i, k){
  const L = JY_SEASON.places[i].letters[k], n = ((jyState().places[i] || {}).stars || {})[k]; SFX.story("list", "page");
  jyModal(`<div class="jy-letter jy-paper"><span class="label">${JY_SEASON.letterLabel || "List z lesa"} · ${esc(JY_SEASON.places[i].name)}</span><h2>${JY_SIDES[k].icon} ${esc(L.from)}</h2><p>${esc(jyLetterText(i, k, n))}</p></div>`, [["Zavrieť", "", null]]);
}

/* ---------- komiks ---------- */
let JC = null;
function jyComicClearTimers(c){ if (c && c.timers){ c.timers.forEach(clearTimeout); c.timers = []; } }
function jyComic(name, done){ const p = typeof name === "string" ? JY_COMICS[name] : name; if (!p) { if (done) done(); return; } jyComicClearTimers(JC); JC = {p, i:0, done, timers:[], name: typeof name === "string" ? name : null}; $("#jy-comic").hidden = false; SFX.play("whoosh"); jyComicRender(); }
function jyComicClose(){ jyComicClearTimers(JC); const w = $("#jy-cwrap"); w.classList.remove("boardmode"); w.querySelectorAll(".jy-bub,.jy-cimg,.jy-stk,.jy-cboard").forEach(e => e.remove()); $("#jy-comic").hidden = true; const d = JC && JC.done; JC = null; if (d) d(); }
function jyComicBoard(ab, wrap, c, tok){
  const host = document.createElement("div"); host.className = "jy-cboard";
  host.innerHTML = `<div class="jy-cb-stage"><svg class="jy-cb-svg" viewBox="-26 -26 852 852" aria-label="${esc(ab.title || "Ukážka ťahov")}"></svg></div>
    <div class="jy-cb-side">
      <div class="jy-cb-head"><img src="${JY_IMG("guide-sova")}" alt=""><div><span class="jy-cb-tag">Ukážka na šachovnici</span><h3>${esc(ab.title || "")}</h3></div></div>
      <div class="jy-cb-cap"></div>
      <ol class="jy-cb-steps">${ab.steps.map((st, idx) => `<li data-k="${idx}"><b>${esc(st.san)}</b><span>${esc(st.text)}</span></li>`).join("")}</ol>
      <button type="button" class="jy-cb-replay">↺ Prehrať znova</button>
    </div>`;
  wrap.insertBefore(host, $("#jy-ctails"));
  const svg = host.querySelector(".jy-cb-svg"), cap = host.querySelector(".jy-cb-cap"), items = [...host.querySelectorAll(".jy-cb-steps li")];
  const sched = (fn, ms) => { const id = setTimeout(() => { if (JC !== c || c.tok !== tok) return; fn(); }, ms); c.timers.push(id); };
  const buildBoard = () => {
    const pcs = jyBoardPieces(ab.pos);
    if (ab.pawnSq) pcs[ab.pawnSq] = {name: jyS2() ? "w-cilka" : "w-becko", kind:"p"};
    let s = `<defs>${["light","dark"].map(t => [0,1,2,3].map(v => `<pattern id="jcb-${t}${v}" patternUnits="userSpaceOnUse" width="150" height="150" patternTransform="translate(${v*37} ${v*61}) rotate(${v*90} 75 75)"><image href="${JY_IMG("tile-" + t)}" x="0" y="0" width="150" height="150"/></pattern>`).join("")).join("")}
      <marker id="jcb-arr" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="4.2" markerHeight="4.2" orient="auto"><path d="M0 1 L9 5 L0 9 Z" fill="#ef4444"/></marker></defs>`;
    s += `<rect x="-26" y="-26" width="852" height="852" rx="18" fill="#5b3d24" stroke="#d8a852" stroke-width="5"/>`;
    for (let rk = 8; rk >= 1; rk--) for (let col = 0; col < 8; col++){
      const x = col * 100, y = (8 - rk) * 100, light = (rk + col) % 2 === 0;
      s += `<rect x="${x}" y="${y}" width="100.5" height="100.5" fill="url(#jcb-${light ? "light" : "dark"}${(col*3 + rk*5) % 4})"/>`;
      if (rk === 1) s += `<text x="${x+92}" y="${y+93}" font-size="16" font-weight="700" text-anchor="end" fill="#2b2015" opacity=".78">${"abcdefgh"[col]}</text>`;
      if (col === 0) s += `<text x="${x+7}" y="${y+20}" font-size="16" font-weight="700" fill="#f7f1e3" opacity=".88">${rk}</text>`;
    }
    s += `<g class="jy-cb-hl"></g><g class="jy-cb-pcs">`;
    for (const sq in pcs){ const [x, y] = jyXY(sq); s += `<g class="jy-piece" data-sq="${sq}" style="transform:translate(${x}px,${y}px)">${jyPieceImg(pcs[sq].name, pcs[sq].kind)}</g>`; }
    s += `</g><g class="jy-cb-fx"></g>`;
    svg.innerHTML = s;
  };
  const setHl = list => {
    const g = svg.querySelector(".jy-cb-hl"); if (!g) return;
    g.innerHTML = (list || []).map(h => {
      const [x, y] = jyXY(h.sq);
      return `<rect x="${x+2}" y="${y+2}" width="96" height="96" rx="6" fill="${h.col}" opacity="${h.op || .42}"/>`;
    }).join("");
  };
  const burst = (cx, cy) => {
    const fx = svg.querySelector(".jy-cb-fx"); if (!fx || (window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches)) return;
    for (let k = 0; k < 16; k++){
      const a = Math.PI * 2 * k / 16 + Math.random() * 0.25, d = 34 + Math.random() * 44;
      const e = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      e.setAttribute("cx", (cx + Math.cos(a) * d).toFixed(1)); e.setAttribute("cy", (cy + Math.sin(a) * d).toFixed(1));
      e.setAttribute("r", (4 + Math.random() * 5).toFixed(1)); e.setAttribute("fill", k % 2 ? "#f2c14e" : "#fff7d6");
      e.setAttribute("class", "jy-spark"); fx.appendChild(e); setTimeout(() => e.remove(), 1100);
    }
  };
  const run = () => {
    jyComicClearTimers(c);
    buildBoard();
    setHl(ab.introHl);
    cap.innerHTML = esc(ab.intro || "");
    items.forEach(li => li.className = "");
    let t = 0;
    ab.steps.forEach((st, idx) => {
      t += st.wait || 1500;
      sched(() => {
        items.forEach((li, k) => li.className = k < idx ? "done" : k === idx ? "now" : "");
        cap.innerHTML = `<b>${esc(st.san)}</b> – ${esc(st.text)}`;
        const hls = [{sq:st.from, col:"#f2c14e", op:.42}, {sq:st.to, col: st.mate ? "#ef4444" : "#f2c14e", op:.52}];
        if (st.mate) hls.push({sq:st.mate, col:"#ef4444", op:.62});
        setHl(hls);
        const target = st.cap ? svg.querySelector(`.jy-piece[data-sq="${st.to}"]`) : null;
        const piece = svg.querySelector(`.jy-piece[data-sq="${st.from}"]`);
        if (target){ target.removeAttribute("data-sq"); target.style.opacity = "0"; }
        if (piece){ const [x, y] = jyXY(st.to); piece.style.transform = `translate(${x}px,${y}px)`; piece.dataset.sq = st.to; }
        sched(() => SFX.play(target ? "capture" : "move"), 350);
        if (st.arrow || st.mate) sched(() => {
          const fx = svg.querySelector(".jy-cb-fx"); if (!fx) return;
          if (st.arrow){
            const [x1, y1] = jyXY(st.arrow[0]), [x2, y2] = jyXY(st.arrow[1]);
            const ln = document.createElementNS("http://www.w3.org/2000/svg", "line");
            [["x1", x1 + 50], ["y1", y1 + 50], ["x2", x2 + 30], ["y2", y2 + 50], ["stroke", "#ef4444"], ["stroke-width", "16"], ["stroke-linecap", "round"], ["opacity", ".88"], ["marker-end", "url(#jcb-arr)"]].forEach(([k, v]) => ln.setAttribute(k, v));
            fx.appendChild(ln);
          }
          if (st.mate){
            const [mx, my] = jyXY(st.mate); burst(mx + 50, my + 50);
            const [tx, ty] = jyXY(st.to); burst(tx + 50, ty + 50);
            const badge = document.createElementNS("http://www.w3.org/2000/svg", "g");
            badge.innerHTML = `<rect x="572" y="610" width="212" height="66" rx="16" fill="#dc2626" stroke="#fff7d6" stroke-width="5"/><text x="678" y="655" text-anchor="middle" font-size="36" font-weight="800" fill="#fff7d6">👑 MAT!</text>`;
            fx.appendChild(badge);
            SFX.play("win");
          }
        }, 700);
      }, t);
    });
  };
  host.querySelector(".jy-cb-replay").onclick = e => { e.stopPropagation(); SFX.play("whoosh"); run(); };
  run();
}
function jyComicStorm(wrap, tails){
  if (!document.getElementById("jy-storm-css")){
    const sc = document.createElement("style"); sc.id = "jy-storm-css";
    sc.textContent = `.jy-storm{position:absolute;left:0;top:0;width:100%;height:100%;pointer-events:none;opacity:0;transition:opacity .6s;border-radius:inherit}.jy-storm.on{opacity:1}`;
    document.head.appendChild(sc);
  }
  const cv = document.createElement("canvas"); cv.className = "jy-storm";
  wrap.insertBefore(cv, tails);
  const ctx = cv.getContext("2d");
  let W = 0, H = 0;
  const fit = () => { const r = wrap.getBoundingClientRect(); const d = Math.min(2, window.devicePixelRatio || 1);
    W = Math.max(1, r.width); H = Math.max(1, r.height); cv.width = W * d; cv.height = H * d; ctx.setTransform(d, 0, 0, d, 0, 0); };
  fit();
  const R = Math.random;
  const flakes = Array.from({length:260}, () => ({x:R(), y:R(), r:.6 + R() * 2.6, v:.5 + R() * 1.1, ph:R() * 6.3}));
  const gusts = Array.from({length:16}, () => ({x:R() * 1.4 - .2, y:R(), len:.18 + R() * .3, v:.9 + R() * .9, a:.10 + R() * .18, cur:(R() - .5) * .08}));
  let t0 = performance.now(), last = t0;
  const frame = now => {
    if (!cv.isConnected || $("#jy-comic").hidden) { cv.remove(); return; }
    const dt = Math.min(50, now - last) / 16.7; last = now;
    const r = wrap.getBoundingClientRect(); if (Math.abs(r.width - W) > 2 || Math.abs(r.height - H) > 2) fit();
    ctx.clearRect(0, 0, W, H);
    const g = ctx.createLinearGradient(0, 0, 0, H);
    g.addColorStop(0, "rgba(92,98,140,.50)"); g.addColorStop(.45, "rgba(150,160,195,.22)"); g.addColorStop(1, "rgba(225,232,245,.18)");
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    const gust = 1 + .6 * Math.sin((now - t0) / 900);
    ctx.lineCap = "round";
    gusts.forEach(s => {
      s.x += .010 * s.v * gust * dt; if (s.x > 1.25){ s.x = -.4; s.y = R(); }
      const x = s.x * W, y = s.y * H, L = s.len * W;
      ctx.strokeStyle = `rgba(255,255,255,${s.a})`; ctx.lineWidth = 2 + s.v * 2;
      ctx.beginPath(); ctx.moveTo(x, y); ctx.quadraticCurveTo(x + L / 2, y - s.cur * H - 10, x + L, y + s.cur * H); ctx.stroke();
    });
    ctx.fillStyle = "rgba(255,255,255,.92)";
    flakes.forEach(f => {
      f.x += .0045 * f.v * gust * dt; f.y += .0022 * f.v * dt + Math.sin(now / 400 + f.ph) * .0006;
      if (f.x > 1.02){ f.x = -.02; f.y = R(); } if (f.y > 1.02){ f.y = -.02; f.x = R(); }
      ctx.beginPath(); ctx.arc(f.x * W, f.y * H, f.r, 0, 6.283); ctx.fill();
    });
    requestAnimationFrame(frame);
  };
  requestAnimationFrame(frame);
  setTimeout(() => cv.classList.add("on"), 60);
}
function jyComicRender(){
  const c = JC, pn = c.p[c.i], wrap = $("#jy-cwrap"), tails = $("#jy-ctails"), tok = c.tok = (c.tok || 0) + 1;
  jyComicClearTimers(c);
  wrap.classList.toggle("boardmode", !!pn.animBoard);
  wrap.querySelectorAll(".jy-bub,.jy-cimg,.jy-stk,.jy-cboard,.jy-storm").forEach(e => e.remove()); tails.innerHTML = "";
  $("#jy-cdots").innerHTML = c.p.map((_, k) => `<i class="${k === c.i ? "on" : ""}"></i>`).join("");
  $("#jy-cprev").disabled = c.i === 0;
  $("#jy-cnext").textContent = c.i === c.p.length - 1 ? "Pokračovať ›" : "Ďalej ›";
  const nx = c.p[c.i + 1]; if (nx && (nx.img || nx.bg)) new Image().src = JY_IMG(nx.img || nx.bg);   // prednačítaj ďalší panel
  if (pn.animBoard){ jyComicBoard(pn.animBoard, wrap, c, tok); return; }
  // nový obrázok aj bubliny ukážeme až po načítaní – nebliká predošlá scéna ani prázdne bubliny
  const img = document.createElement("img"); img.className = "jy-cimg"; img.alt = ""; img.style.visibility = "hidden";
  let drawn = false;
  const draw = () => { if (drawn || JC !== c || c.tok !== tok) return; drawn = true; img.style.visibility = "";
    (pn.st || []).forEach(s => { const e = document.createElement("img"); e.className = "jy-stk" + (s.round ? " round" : ""); e.src = JY_IMG(s.img); e.alt = ""; e.style.left = s.x + "%"; e.style.top = s.y + "%"; e.style.width = s.w + "%"; wrap.insertBefore(e, tails); });
    if (pn.storm) jyComicStorm(wrap, tails);
    if (pn.sfx){ c.sfxDone = c.sfxDone || {}; if (!c.sfxDone[c.i]){ c.sfxDone[c.i] = 1; SFX.story(pn.sfx); } }
    jyComicBubbles(pn, wrap, tails); };
  img.onload = img.onerror = draw; img.src = JY_IMG(pn.img || pn.bg); wrap.insertBefore(img, tails);
  if (img.complete) draw();
}
function jyComicBubbles(pn, wrap, tails){
  pn.b.forEach((b, k) => {
    const d = document.createElement("div"); d.className = "jy-bub" + (b.narr ? " narr" : "");
    d.style.left = b.x + "%"; d.style.top = b.y + "%"; d.style.width = b.w + "%"; d.style.animationDelay = (0.35 + k * 0.7) + "s";
    d.innerHTML = (b.who ? `<b>${esc(b.who)}</b>` : "") + esc(b.t); wrap.appendChild(d);
    if (b.tail) requestAnimationFrame(() => {
      const W = wrap.clientWidth; if (!W || !d.isConnected) return; const r = d.getBoundingClientRect(), R = wrap.getBoundingClientRect();
      const bx = (r.left - R.left + r.width / 2) / W * 100, by = (r.bottom - R.top) / W * 100 - 0.6, tx = b.tail[0], ty = b.tail[1] * 0.7467;
      const p = document.createElementNS("http://www.w3.org/2000/svg", "path");
      p.setAttribute("d", `M${bx - 2.2} ${by} L${tx} ${ty} L${bx + 2.2} ${by} Z`); p.setAttribute("fill", "#fffdf6"); p.setAttribute("stroke", "#2b2218"); p.setAttribute("stroke-width", ".45");
      p.style.opacity = 0; p.style.transition = "opacity .3s"; tails.appendChild(p); setTimeout(() => p.style.opacity = 1, 350 + k * 700);
    });
  });
}
function jyComicNext(){ if (!JC) return; if (JC.i < JC.p.length - 1){ JC.i++; SFX.play("page"); jyComicRender(); } else jyComicClose(); }

/* ---------- modál ---------- */
function jyModal(html, buttons){
  const m = $("#jy-modal"); m.hidden = false;
  $("#jy-mbody").innerHTML = html;
  const b = $("#jy-mbtns"); b.innerHTML = "";
  buttons.forEach(([t, cls, fn]) => { const x = document.createElement("button"); x.textContent = t; if (cls) x.className = cls; x.onclick = () => { m.hidden = true; if (fn) fn(); }; b.appendChild(x); });
}

/* ---------- akcie ---------- */
function jyToast(t){ toast(t); const b = $("#toast-b"); if (b) b.hidden = true; }
function jyGo(view, i){ JV.lure = null; JV.view = view; if (i != null) JV.cur = i; JT = null; jyRender(); window.scrollTo({top: $("#v-jy").offsetTop - 10}); }
function jyEnterLand(i){
  const st = jyState(), p = st.places[i];
  if (jyS2() && i === 0 && !p.met && st.pos === 0 && JV.view === "board"){
    if (JV.busy) return;
    const svg = $("#jy-svg"), cilka = svg && svg.querySelector('.jy-piece[data-sq="c6"]');
    if (cilka){
      JV.busy = true;
      const [x, y] = jyXY("c7");
      cilka.style.transform = `translate(${x}px,${y}px)`;
      cilka.dataset.sq = "c7";
      setTimeout(() => { SFX.play("move"); jyBurst(svg, x + 50, y + 50); }, 450);
      const stEl = $("#jy-status"); if (stEl) stEl.innerHTML = "Biely: <b>1.c7</b> – Cilka vstupuje na Praskajúce jazero";
      setTimeout(() => {
        JV.busy = false; JV.cur = 0;
        jyComic(jyMeetComic(0), () => { jySavePlace(0, {met:true}); jyGo("land", 0); });
      }, 1150);
      return;
    }
  }
  if (jyS2() && i === 4 && !p.met && st.pos === 4 && JV.view === "board"){
    if (JV.busy) return;
    const svg = $("#jy-svg"), hugo = svg && svg.querySelector('.jy-piece[data-sq="c2"]');
    if (hugo){
      JV.busy = true;
      const [x, y] = jyXY("b3");
      hugo.style.transform = `translate(${x}px,${y}px)`;
      hugo.dataset.sq = "b3";
      setTimeout(() => { SFX.play("move"); jyBurst(svg, x + 50, y + 50); }, 450);
      const stEl = $("#jy-status"); if (stEl) stEl.innerHTML = "Biely: <b>7.Kb3!</b> – Kráľ Hugo vstupuje do Trónnej siene";
      setTimeout(() => {
        JV.busy = false; JV.cur = 4;
        const startMeet = () => jyComic(jyMeetComic(4), () => { jySavePlace(4, {met:true}); jyGo("land", 4); });
        if (JY_COMICS.vstup5) jyComic(JY_COMICS.vstup5, startMeet);
        else startMeet();
      }, 1150);
      return;
    }
  }
  JV.cur = i;
  if (!p.met && i === st.pos){ jyComic(jyMeetComic(i), () => { jySavePlace(i, {met:true}); jyGo("land", i); }); return; }
  jyGo("land", i);
}
function jyStartStep(){
  const st = jyState(), i = st.pos, p = st.places[i], L = JY_SEASON.places[i];
  if (jyStepUsed(st) || p.steps >= JY_STEPS) return;
  const list = jyPickRated(L.pools.core, rtOff("step").slice(0, JY_CORE_N), {filter: x => x.d <= 2});
  jyTaskStart({kind:"step", place:i, list, title:`Krok ${p.steps + 1} z ${JY_STEPS}`, say:L.guide.steps[p.steps]});
}
/* kto je s Béčkom v odbočke (namiesto sprievodcu miesta) – 17. 11. */
const JY_PREP_TIP = ["Pamätaj: jeden ťah môže urobiť dve veci naraz.", "Hľadaj ťah, po ktorom budeš hroziť dvoma vecami naraz.", "Pozri sa, kto ktorú figúrku chráni – a kto nie.", "Niekedy stačí uhnúť a otvoriť cestu inému.", "Kto je zviazaný v pavučine, nemôže sa pohnúť.", "Hľadaj ťah, po ktorom kráľ nemá kam ujsť."];
/* nové postavy odbočiek (18. 11.): Lumka – netopierica so svetluškovou lampou (jaskyňa), Žofka – žabka strážkyňa studnice.
   Kým nie sú ich obrázky (pc-lumka, pc-zofka), v úlohách ostáva Béčko. */
const JY_NEW_AV = new Set(["pc-lumka", "pc-zofka"]);
const JY_SIDE_CHAR = {
  datel:{img:"pc-datel", name:"Ďateľ", say:"Ťuk-ťuk! Tieto úlohy majú viac ťahov. Kým ťukneš, domysli všetko až do konca."},
  cave: JY_NEW_AV.has("pc-lumka") ? {img:"pc-lumka", name:"Lumka", say:"Posvietim ti! Dve ťažké úlohy – pozri sa poriadne do každého kúta šachovnice."}
    : {img:"pc-w-becko", name:"Béčko", say:"Je tu tma… ale ja sa nebojím. Dve ťažké úlohy a poklad je môj!"},
  well: JY_NEW_AV.has("pc-zofka") ? {img:"pc-zofka", name:"Žofka", say:"Kvák! Tieto úlohy už poznáš. Spomenieš si, prečo bol ten ťah dobrý?"}
    : {img:"pc-w-becko", name:"Béčko", say:"Studnička mi ukáže, čo som sa už naučil. Spomeniem si?"},
  prep:{img:"pc-w-viktor", name:"Viktor", say:i => "Natrénujme si to spolu pred súbojom! " + (JY_PREP_TIP[i] || "")}
};
/* prvé stretnutie so sprievodcom odbočky – len pri úplne prvom kliknutí na daný druh odbočky (18. 11.) */
const JY_MEET_IMGS = new Set(["odbocka-datel-stretnutie", "odbocka-pretek-stretnutie", "odbocka-hrad-stretnutie", "odbocka-jaskyna-stretnutie", "odbocka-studnica-stretnutie", "odbocka-priprava-stretnutie"]);
const JY_SIDE_MEET = {
  datel:{img:"odbocka-datel-stretnutie", av:"pc-datel", name:"Ďateľ", t:"Ťuk-ťuk! Ja som Ďateľ. Ťukám do stromov a poznám v nich tajné dvierka. Za nimi sú úlohy na viac ťahov – kto ich domyslí až do konca, dostane odo mňa čarovnú lupu."},
  race:{img:"odbocka-pretek-stretnutie", av:"pc-w-gusto", name:"Gusto", t:"Ahoj, ja som Gusto, najrýchlejší pešiak v celom lese! Zapretekáme sa? Kto rýchlejšie nájde dobrý ťah, vyhráva – a dostane odo mňa kompas do súboja! Ale pozor, za zlý ťah sú trestné sekundy!"},
  castle:{img:"odbocka-hrad-stretnutie", av:"pc-w-albin", name:"Albín", t:"Vitaj, mladý pešiak. Ja som Albín, starý jazdec. Kedysi som skákal najrýchlejšie v celom kráľovstve, dnes učím otvorenia. Kto dobre začne, má polovicu partie vyhranú."},
  cave:{img:"odbocka-jaskyna-stretnutie", av:"pc-lumka", name:"Lumka", t:"Pssst, neboj sa! Ja som Lumka a moja svetlušková lampa posvieti aj do najtmavšieho kúta. V jaskyni sú len dve úlohy, ale poriadne ťažké. Kto ich vyrieši, nájde svietiace srdce."},
  well:{img:"odbocka-studnica-stretnutie", av:"pc-zofka", name:"Žofka", t:"Kvák! Ja som Žofka a strážim Studnicu opakovania. V jej vode sa odrážajú úlohy, ktoré si už riešil. Kto si ich pamätá, tomu studnica daruje nápovedu do súboja."},
  prep:{img:"odbocka-priprava-stretnutie", av:"pc-w-viktor", name:"Viktor", t:"Béčko, prehra nie je hanba – aj najlepší bojovníci trénujú. Postavil som ti cvičisko. Vyskúšame si presne také úlohy, aké má súper, a potom to dokážeš!"}
};
const JY_HAVE_AV = new Set(["pc-datel","pc-w-gusto","pc-w-albin","pc-w-viktor"]);
function jySideOpen(k, from){
  const st = jyState();
  /* stretnutie sa ukáže, až keď je jeho obrázok – aby ho Filipko „nespotreboval“ bez obrázka */
  const SM = JY_SEASON.sideMeet || JY_SIDE_MEET;
  if (SM[k] && (JY_SEASON.sideMeet || JY_MEET_IMGS.has(SM[k].img)) && !st.sideMet[k]) return jySideMeet(k, () => { jySideOpen(k, from); });
  JV.lure = null;
  if (from === "after") JV.after = null;
  if (!from){
    const p = st.places[JV.cur], done = jySideDone(p, k), sd = k === "prep" ? {label:"Príprava na bossa", icon:"🎯", desc:"3 úlohy z témy, aby si bol na bossa pripravený."} : JY_SIDES[k];
    const pre = jySidePre(JV.cur, k), ns = (p.stars || {})[k] || (done ? 1 : 0);
    return jyModal(`<div class="jy-side-m">${pre ? jySidePic(pre) : `<div class="jy-oi">${sd.icon}</div>`}<h2>${pre ? sd.icon + " " : ""}${esc(sd.label)}${ns ? " " + "⭐".repeat(ns) : ""}</h2><p>${esc(sd.desc)}</p>${sd.perkT && !p.bossWon && !done ? `<p class="sub">Odmena: ${esc(sd.perkT)}</p>` : ""}${done ? `<p class="sub">Túto odbočku už máš – môžeš si ju zopakovať${ns < 3 ? " a skúsiť získať viac hviezdičiek" : ""}.</p>` : ""}</div>`,
      [["Ísť tam", "primary", () => jyStartSide(k)], ["Teraz nie", "", null]]);
  }
  return jyStartSide(k, from);
}
function jySideMeet(k, then){
  const m = (JY_SEASON.sideMeet || JY_SIDE_MEET)[k]; if (!m) return then();
  jySave({sideMet:{...(jyState().sideMet || {}), [k]:true}});
  SFX.story(k === "datel" ? "datel" : "list", "page");
  const av = !!JY_SEASON.sideMeet || JY_HAVE_AV.has(m.av) || JY_NEW_AV.has(m.av);
  jyModal(`<div class="jy-side-m">${JY_SEASON.sideMeet || JY_MEET_IMGS.has(m.img) ? jySidePic(m.img) : ""}<span class="label">Nový kamarát</span><h2>${esc(m.name)}</h2>
    <div class="jy-say big">${av ? `<img src="${JY_IMG(m.av)}" alt="">` : ""}<p>„${esc(m.t)}“</p></div></div>`,
    [[`Ahoj, ${m.name}!`, "primary", then]]);
}
function jyStartSide(k, from){
  const st = jyState(), i = JV.cur, p = st.places[i], L = JY_SEASON.places[i];
  if (k === "castle") return jyCastle(i);
  if (k === "race") return jyRaceStart(i);
  if (k === "dohraj") return jyEgStart(i);
  let list, title;
  if (k === "datel"){ list = jyPickRated(L.pools.core, rtOff("datel"), {filter: x => x.d >= 2}); title = "🌳 Ďateľov les"; setTimeout(() => SFX.story("datel"), 400); }
  else if (k === "cave"){ list = jyPickRated(L.pools.cave, rtOff("cave")); title = "💎 Tajná jaskyňa"; }
  else if (k === "well"){ list = jyWellPick(L, rtOff("well").length); title = "🔁 Studnica opakovania"; }
  else if (k === "prep"){ list = jyPickRated(L.pools.core, rtOff("prep")); title = "🎯 Príprava na bossa"; }
  const ch = (JY_SEASON.sideChar || {})[k] || (k === "prep" && JY_SEASON.prepTip ? {...JY_SIDE_CHAR.prep, say:i => "Natrénujme si to spolu pred súbojom! " + (JY_SEASON.prepTip[i] || "")} : JY_SIDE_CHAR[k]);
  jyTaskStart({kind:"side", side:k, place:i, list, title, who: ch ? ch.name : "", whoImg: ch ? ch.img : "", say: ch ? (typeof ch.say === "function" ? ch.say(i) : ch.say) : JY_SIDES[k].desc});
}
/* ---------- 🧊 Dohraj to (sezóna 2): vyhratá koncovka proti počítaču, tabuľky z eg.js ----------
   Štartové pozície: JY_SEASON.places[i].eg ({f, g:"p" premena | "m" mat, n = najkratšia cesta v ťahoch}).
   Limit = 2 × najkratšia cesta + 6. Ťah, ktorý pokazí výhru, sa označí; jedno vrátenie je zadarmo, pri druhom úloha nevyšla. */
function jyEgStart(i){
  const L = JY_SEASON.places[i], pool = L.eg || [], st = jyState();
  if (!pool.length || !window.EG){ JV.msg = "Koncovky sa ešte nenačítali."; return jyGo("land", i); }
  const seen = new Set(st.seen || []), id = e => "eg:" + e.f.split(" ")[0];
  const fresh = pool.filter(e => !seen.has(id(e))), from = fresh.length ? fresh : pool, e = from[Math.floor(Math.random() * from.length)];
  const x = {id:id(e), f:e.f, eg:true, g:e.g, n:e.n, limit:2 * e.n + 6, noRate:true, s:e.s};
  const ch = (JY_SEASON.sideChar || {}).dohraj || {name:"Viktor", img:"pc-w-viktor", say:""};
  const go = () => jyTaskStart({kind:"side", side:"dohraj", place:i, list:[x], title:"🧊 Dohraj to", who:ch.name, whoImg:ch.img, say:ch.say});
  const t = EG.fromFen(e.f).type;
  if (EG.ready && EG.ready[t]) return go();
  jyModal(`<div class="jy-say big"><img src="${JY_IMG(ch.img)}" alt=""><p><b>${esc(ch.name)}:</b> „Chvíľku… rozkladám figúrky na šachovnicu.“</p></div>`, []);
  requestAnimationFrame(() => setTimeout(() => { EG.build(t); EG.ready = {...(EG.ready || {}), [t]:true}; $("#jy-modal").hidden = true; go(); }, 80));
}
function jyEgMove(from, to, promo){
  const c = JT.c, x = JT.x, before = c.fen(), P = EG.fromFen(before);
  const m = c.move({from, to, promotion:promo || "q"}); JT.sel = null; if (!m) return;
  SFX.move(m); JT.egN = (JT.egN || 0) + 1; JT.arrow = null; JT.hint = null;
  const fen = c.fen();
  let win = false, bad = "";
  if (x.g === "m" && c.in_checkmate()) win = true;
  else if (m.promotion){ if (x.g === "p" && EG.build("P").safePromo(P.wk, P.bk, P.x) === m.promotion) win = true; else bad = c.in_stalemate() ? "To je pat!" : "Súper ti novú figúru zoberie."; }
  else if (c.in_stalemate()) bad = "To je pat – remíza! Súperov kráľ nemá kam ísť.";
  else if (EG.value(fen) < 0){ const cap = c.moves({verbose:true}).find(q => q.captured); bad = cap ? `Súper ti zoberie ${({r:"vežu", q:"dámu", p:"pešiaka"})[cap.captured]}!` : "Takto sa už výhra nedá dotiahnuť."; }
  if (win){
    JT.flash = {sqs:[m.from, m.to], cls:"flashok"}; JT.tries = JT.egUsed ? 1 : 0;
    JT.egStars = JT.egUsed ? 2 : 3; JT.egNote = `${x.g === "p" ? "Premena" : "Mat"} na ${JT.egN}. ťah (najkratšie sa dalo za ${x.n}).`;
    if (m.promotion === "r") JT.egNote += " Dáma by dala pat – preto veža, ako Cilka!";
    return jySolved(x.g === "m");
  }
  if (bad){
    if (JT.egUndo){ JT.egUndo = 0; JT.egUsed = true; c.load(before); JT.egN--; SFX.play("bad");
      JT.flash = {sqs:[m.to], cls:"wrong"}; JT.msg = `${sk(m.san)}? ${bad} Viktor ti ťah vrátil – skús iný.`; JT.msgCls = "bad"; return jyTaskRender(); }
    return jyEgFail(before, `${sk(m.san)}? ${bad}`);
  }
  if (JT.egN >= x.limit) return jyEgFail(null, `Limit ${x.limit} ťahov vypršal.`);
  JT.flash = {sqs:[m.from, m.to], cls:"last"}; JT.lock = true; JT.msg = "Súper premýšľa…"; JT.msgCls = ""; jyTaskRender();
  const tok = JT.tok;
  setTimeout(() => {
    if (!JT || JT.tok !== tok) return;
    const u = EG.blackReply(c.fen()); const r = u && c.move({from:u.slice(0, 2), to:u.slice(2, 4)});
    if (r) SFX.move(r); JT.lock = false; JT.flash = r ? {sqs:[r.from, r.to], cls:"last"} : null;
    const left = x.limit - JT.egN; JT.msg = left <= 3 ? `Pozor, zostávajú ${left} ťahy!` : "Dobre! Pokračuj."; JT.msgCls = left <= 3 ? "bad" : "";
    jyTaskRender();
  }, 450);
}
function jyEgFail(before, why){
  const c = JT.c; SFX.play("bad"); JT.egStars = 1; JT.egNote = "Koncovka tentoraz ušla – skús ju nabudúce znova.";
  let sol = null; if (before){ sol = EG.whiteBest(before); c.load(before); }
  JT.res.push(false); JT.lock = true; JT.flash = null;
  if (sol){ const sm = new Chess(c.fen()).move({from:sol.slice(0, 2), to:sol.slice(2, 4), promotion:sol[4] || undefined}); if (sm){ JT.arrow = {from:sm.from, to:sm.to, color:"best"}; why += ` Lepšie bolo ${sk(sm.san)}.`; } }
  JT.msg = why; JT.msgCls = "bad"; jyTaskRender();
  jyAfter(1500, jyTaskNext);
}
/* prvá štúdia otvorenia s nedokončenou kapitolou (idx = poradie kapitoly → variant obrázka) */
const jyOpenings = () => Object.keys(STUDIES).filter(k => STUDIES[k] && STUDIES[k].open);
function jyCastlePick(){
  const openings = jyOpenings();
  for (const sid of openings){ const chs = STUDIES[sid].chapters || []; const idx = chs.findIndex(ch => !chProg(sid, ch.id).stars); if (idx >= 0) return {sid, c:chs[idx], idx}; }
  return openings.length ? {sid:openings[0], c:null, idx:0} : null;
}
function jyCastle(i){
  const st = jyState(), p = st.places[i];
  const openings = jyOpenings();
  const cp = jyCastlePick();
  const sid = (JV.castleSid && openings.includes(JV.castleSid)) ? JV.castleSid : (cp ? cp.sid : openings[0]);
  JV.castleSid = sid;
  const chs = (STUDIES[sid] && STUDIES[sid].chapters) || [];
  const doneCh = chs.filter(ch => (chProg(sid, ch.id) || {}).stars);
  const nextCh = chs.find(ch => !chProg(sid, ch.id).stars) || chs[0] || null;
  let chSel = JV.castleCh;
  if (chSel !== "all" && !chs.some(ch => ch.id === chSel)) chSel = doneCh.length ? "all" : (nextCh ? nextCh.id : "all");
  JV.castleCh = chSel;
  const chTarget = chSel !== "all" ? chs.find(ch => ch.id === chSel) : nextCh;
  const qs = jyAlbinPool(sid, chSel), done = jySideDone(p, "castle");
  const best = (st.albinRace || {})[sid];
  const qN = Math.min(JY_ALB_N, qs.length), qWord = qN === 1 ? "otázka" : qN >= 2 && qN <= 4 ? "otázky" : "otázok";
  const openBtns = openings.map(k => `<button type="button" class="jy-csid${k === sid ? " primary" : ""}" data-jy="albsid" data-i="${i}" data-sid="${k}">${esc(STUDIES[k].name)}</button>`).join("");
  const chOpts = `<option value="all"${chSel === "all" ? " selected" : ""}>✨ Všetky prebrané kapitoly (${doneCh.length} z ${chs.length})</option>`
    + chs.map((ch, idx) => { const cs = (chProg(sid, ch.id) || {}).stars || 0; return `<option value="${esc(ch.id)}"${chSel === ch.id ? " selected" : ""}>${idx + 1}. ${esc(ch.title)}${cs ? " " + "⭐".repeat(cs) : ""}</option>`; }).join("");
  jyModal(`<div class="jy-say big"><img src="${JY_IMG("pc-w-albin")}" alt=""><div><h2>🏰 Hrad otvorení – ${esc(STUDIES[sid].name)}</h2>
    <p><b>Albín:</b> „${done ? "Vitaj späť, mladý! Uvidíme, čo si si zapamätal." : "V rohu sedím sto rokov a videl som každé otvorenie. Poď, vyskúšam ťa."}“</p></div></div>
    ${jyCastleGrow(st, i)}
    <div class="jy-csel">
      <div class="jy-csel-row"><span class="label">Otvorenie</span><div class="jy-csids">${openBtns}</div></div>
      <label class="jy-csel-row"><span class="label">Kapitola</span><select data-jy="albch-sel" data-i="${i}">${chOpts}</select></label>
    </div>
    <div class="jy-offer">
      ${qs.length >= 1 ? `<button data-jy="albq" data-i="${i}" data-t="0"><span class="jy-oi">📜</span><b>Skúška u Albína</b><span>${qN} ${qWord} · ${chSel === "all" ? "všetky prebrané kapitoly" : esc(chTarget ? chTarget.title : "")} · do ⭐⭐⭐</span></button>
      <button data-jy="albq" data-i="${i}" data-t="1"><span class="jy-oi">⏱</span><b>Pretek s Albínom</b><span>${best ? `Tvoj rekord: ${fmtS(best)}` : "Odpovedaj čo najrýchlejšie"} · do ⭐⭐⭐, rekord +1 ⭐</span></button>` : ""}
      <button data-jy="albch" data-i="${i}"><span class="jy-oi">📖</span><b>Celá kapitola</b><span>${chTarget ? esc(chTarget.title) : "v Štúdiách"} · do ⭐⭐⭐, nová kapitola +1 ⭐</span></button>
      ${st.albinEp ? `<button data-jy="albtales" data-i="${i}"><span class="jy-oi">🐴</span><b>Albínove príbehy</b><span>Prečítaj si všetky časti (${st.albinEp} z ${JY_ALBIN_TALES.length})</span></button>` : ""}
    </div>
    <p class="sub">Každá úloha pridá hviezdičky do hradu (každý druh ${JY_CASTLE_DAY_MAX}× za deň). ${jyCastleTrioT(st)}</p>
    ${done ? "" : `<p class="sub">${esc(JY_SIDES.castle.perkT)}</p>`}`,
    [["Teraz nie", "", null]]);
}
function jyCastleChapter(i, sid, chId){
  const openings = jyOpenings();
  const cp = jyCastlePick();
  sid = sid || JV.castleSid || (cp ? cp.sid : openings[0]);
  chId = chId || JV.castleCh;
  const chs = (STUDIES[sid] && STUDIES[sid].chapters) || [];
  let chi = chId && chId !== "all" ? chs.findIndex(c => c.id === chId) : -1;
  if (chi < 0) chi = chs.findIndex(ch => !chProg(sid, ch.id).stars);
  if (chi < 0) chi = 0;
  jySave({castleAt:Date.now(), castlePlace:i}); ls.set("sach.study", sid); ST = {sid, chi:null, orient:STUDIES[sid].side}; setTab("study");
  if (chs[chi]) startChapter(chi, "practice");
}
/* ---------- Albínova skúška a pretek (17. 11.): otázky = ťahy s otázkou (q) z kapitol štúdie ---------- */
const JY_ALB_N = 4, JY_ALB_RACE_N = 6;
function jyAlbinPool(sid, chId){
  const S0 = STUDIES[sid]; if (!S0 || typeof chStart !== "function") return [];
  const chs = S0.chapters || [];
  const out = [], take = (ch, max) => { try {
    const c = chStart(ch), me = ch.side || S0.side; let k = 0;
    for (const mv of ch.moves || []){
      if (mv.q && c.turn() === me && k < max){ const t = new Chess(c.fen()), m = t.move(mv.m); if (m) out.push({id:`alb:${sid}:${ch.id}:${k}`, f:c.fen(), tr:{[m.from + m.to + (m.promotion || "")]: null}, q:mv.q, c:mv.c, noRate:true, ch:ch.id}); k++; }
      if (!c.move(mv.m)) break;
    } } catch(e){} };
  if (chId && chId !== "all"){
    const one = chs.find(ch => ch.id === chId);
    if (one) take(one, 99);
    return out;
  }
  const doneCh = chs.filter(ch => (chProg(sid, ch.id) || {}).stars);
  doneCh.forEach(ch => take(ch, 99));
  // málo prebratých kapitol → doplň prvé otázky z nasledujúcich kapitol (otázky majú v sebe nápovedu)
  for (const ch of chs){ if (out.length >= 8) break; if (!(chProg(sid, ch.id) || {}).stars) take(ch, 3); }
  return out;
}
function jyAlbinStart(i, timed, sid, chId){
  const st = jyState(), cp = jyCastlePick();
  sid = sid || JV.castleSid || (cp ? cp.sid : jyOpenings()[0]);
  chId = chId || JV.castleCh || "all";
  const pool = jyAlbinPool(sid, chId);
  const seen = new Set(st.seen || []), fresh = pool.filter(x => !seen.has(x.id)), rest = pool.filter(x => seen.has(x.id));
  const list = [...jyShuffle(fresh), ...jyShuffle(rest)].slice(0, timed ? JY_ALB_RACE_N : JY_ALB_N);
  const chObj = chId !== "all" ? ((STUDIES[sid] && STUDIES[sid].chapters) || []).find(c => c.id === chId) : null;
  const chNote = chObj ? ` (${chObj.title})` : "";
  jyTaskStart({kind:"side", side:"castle", place:i, list, sid, timed:!!timed, tStart:performance.now(), title: (timed ? "⏱ Pretek s Albínom" : "📜 Skúška u Albína") + chNote,
    who:"Albín", whoImg:"pc-w-albin", say: timed ? "Ja ťahám rýchlo ako vietor. Uvidíme, či ma dobehneš!" : "Pamätáš si, ako sa hrá toto otvorenie? Ukáž mi to."});
}
function jyAlbinEnd(o, i, n, okN, fresh, better){
  const st = jyState(), ms = Math.round(performance.now() - o.tStart);
  let extra = `<p class="sub">Na prvý pokus: ${okN} z ${o.list.length}</p>`, rec = false;
  if (o.timed){ const prev = (st.albinRace || {})[o.sid]; rec = !!prev && ms < prev;
    if (!prev || ms < prev){ jySave({albinRace:{...(st.albinRace || {}), [o.sid]: ms}}); extra += `<p><b>⏱ ${fmtS(ms)}</b> – ${prev ? `nový rekord! (predtým ${fmtS(prev)})` : "tvoj prvý čas!"}</p>`; }
    else extra += `<p>⏱ ${fmtS(ms)} · rekord ${fmtS(prev)}. Nabudúce ho prekonáš!</p>`; }
  if (better) extra += `<p class="sub">Lepší výsledok ako minule! Prišiel nový ${jyLetterWord()}.</p>`;
  extra += jyCastleAdd(o.timed ? "race" : "ex", n, rec ? [["nový rekord", 1]] : []);
  JV.msg = ""; JV.view = "land"; JV.cur = i; jyRender();
  jySideResult(i, "castle", n, extra, () => jyAlbinEpisode(() => { if (fresh || better) jyLetter(i, "castle"); }), o.sid);
}
/* ---------- hrad, ktorý rastie (20. 11.): hviezdičky sa sčítavajú pri každej úlohe ----------
   Skúška a pretek 1–3 ⭐ (pretek +1 za nový rekord), kapitola 1–3 ⭐ (+1 za kapitolu prvýkrát), Albínova trojka +2 ⭐
   (všetky tri druhy v jeden deň). Každý druh sa do hradu počíta najviac JY_CASTLE_DAY_MAX× za deň. 8 štádií do 85 ⭐.
   Starý stav (najlepšie hviezdičky na miestach) sa pri prvom pripísaní započíta do castleBank. */
const JY_CASTLE_DAY_MAX = 2, JY_CASTLE_TRIO = 2;
const JY_CASTLE_STAGES = [0, 6, 14, 24, 36, 50, 66, 85];
const JY_CASTLE_PARTS = ["stará veža", "opravená veža a kamenný múr", "nová brána a zástavy", "druhá veža", "svetlá, kvety a kamenný mostík", "veže vľavo, balkón a girlandy", "zlaté strechy a malá vežička", "zlatý hrad"];
const JY_CASTLE_STAGE_IMG = ["hrad-v3-0", "hrad-v3-1", "hrad-v3-2", "hrad-v3-3", "hrad-v3-4", "hrad-v3-5", "hrad-v3-6", "hrad-v3-7"];
const JY_CASTLE_IMGS = new Set(JY_CASTLE_STAGE_IMG);
const JY_CASTLE_KIND = {ex:"Skúška", race:"Pretek", ch:"Kapitola"};
function jyCastleOld(st){ return (st.places || []).reduce((n, p) => n + Math.min(3, (p.stars || {}).castle || (jySideDone(p, "castle") ? 1 : 0)), 0); }
function jyCastleStars(st){ return st.castleBank != null ? st.castleBank : jyCastleOld(st); }
const jyCastleMax = () => JY_CASTLE_STAGES[JY_CASTLE_STAGES.length - 1];
function jyCastleStage(n){ let s = 0; JY_CASTLE_STAGES.forEach((t, j) => { if (n >= t) s = j; }); return s; }
function jyCastleImg(stage){ for (let j = stage; j >= 0; j--) if (JY_CASTLE_IMGS.has(JY_CASTLE_STAGE_IMG[j])) return JY_CASTLE_STAGE_IMG[j]; return null; }
function jyCastleToday(st){ const cd = st.castleDay; return cd && cd.d === jyToday() ? cd : {d:jyToday(), ex:0, race:0, ch:0, trio:false}; }
function jyCastleTrioT(st){
  const cd = jyCastleToday(st); if (cd.trio) return "Dnešnú Albínovu trojku už máš! 🏰";
  const miss = ["ex", "race", "ch"].filter(k => !cd[k]).map(k => JY_CASTLE_KIND[k].toLowerCase());
  return miss.length === 3 ? `Urob dnes skúšku, pretek aj kapitolu a Albín pridá +${JY_CASTLE_TRIO} ⭐.` : `Do Albínovej trojky (+${JY_CASTLE_TRIO} ⭐) ti dnes chýba: ${miss.join(", ")}.`;
}
/* pripíše hviezdičky do hradu, vráti riadok do okna s výsledkom */
function jyCastleAdd(kind, base, bonus){
  const st = jyState(), cd = {...jyCastleToday(st)};
  if ((cd[kind] || 0) >= JY_CASTLE_DAY_MAX) return `<p class="sub">🏰 ${JY_CASTLE_KIND[kind]}: táto úloha sa dnes do hradu počítala už ${JY_CASTLE_DAY_MAX}×. Skús iný druh úlohy alebo príď zajtra!</p>`;
  cd[kind] = (cd[kind] || 0) + 1;
  const parts = [`výsledok ${base} ⭐`]; let add = base;
  (bonus || []).forEach(([t, v]) => { add += v; parts.push(`${t} +${v}`); });
  if (!cd.trio && cd.ex && cd.race && cd.ch){ cd.trio = true; add += JY_CASTLE_TRIO; parts.push(`Albínova trojka +${JY_CASTLE_TRIO}`); }
  const before = jyCastleStars(st), after = before + add, s0 = jyCastleStage(before), s1 = jyCastleStage(after);
  jySave({castleBank:after, castleDay:cd});
  return `<p><b>🏰 Do hradu: +${add} ⭐</b> <span class="sub">(${parts.join(", ")})</span> · spolu ${after} ⭐</p>`
    + (s1 > s0 ? `<p><b>Hrad narástol – ${JY_CASTLE_PARTS[s1]}! 🏰</b></p>` : "");
}
function jyCastleGrow(st, i){
  const n = jyCastleStars(st), max = jyCastleMax(), stage = jyCastleStage(n), next = JY_CASTLE_STAGES[stage + 1];
  const im = jyCastleImg(stage), img = im ? `<img class="jy-sidepic" src="${JY_IMG(im)}" alt="">` : "";
  return `<div class="jy-grow">${img}<div class="jy-grow-t"><b>Albínov hrad: ⭐ ${n}</b> · štádium ${stage + 1} z ${JY_CASTLE_STAGES.length} – ${JY_CASTLE_PARTS[stage]}${next != null ? ` · ďalší kúsok pri ${next} ⭐` : " · hotový!"}</div>
    <div class="jy-grow-bar"><i style="width:${Math.min(100, Math.round(100 * n / max))}%"></i>${JY_CASTLE_STAGES.slice(1, -1).map(t => `<b style="left:${100 * t / max}%"></b>`).join("")}</div>
    ${stage > 0 && i != null ? `<button class="jy-gal-btn" data-jy="albgal" data-i="${i}" data-s="${stage}">🖼️ Ako hrad rástol (${stage + 1} z ${JY_CASTLE_STAGES.length})</button>` : ""}</div>`;
}
/* galéria štádií hradu (21. 11.): dosiahnuté štádiá s obrázkom, ďalšie zamknuté (bez obrázka, aby neprezradili prekvapenie) */
function jyCastleGallery(i, sel){
  const st = jyState(), n = jyCastleStars(st), cur = jyCastleStage(n), s = Math.max(0, Math.min(cur, sel == null ? cur : sel));
  const im = jyCastleImg(s);
  const thumbs = JY_CASTLE_STAGES.map((t, j) => j <= cur
    ? `<button class="jy-gal-t ${j === s ? "on" : ""}" data-jy="albgal" data-i="${i}" data-s="${j}"><img src="${JY_IMG(jyCastleImg(j))}" alt=""><span>${j + 1}</span></button>`
    : `<div class="jy-gal-t lock"><span>🔒<br>${t} ⭐</span></div>`).join("");
  jyModal(`<h2>🖼️ Ako rástol Albínov hrad</h2>
    ${im ? `<img class="jy-sidepic" src="${JY_IMG(im)}" alt="">` : ""}
    <p><b>Štádium ${s + 1} z ${JY_CASTLE_STAGES.length}: ${JY_CASTLE_PARTS[s]}</b>${s ? ` · od ${JY_CASTLE_STAGES[s]} ⭐` : " · tu to celé začalo"}</p>
    <div class="jy-gal">${thumbs}</div>
    <p class="sub">Máš ${n} ⭐.${cur + 1 < JY_CASTLE_STAGES.length ? ` Ďalší kúsok hradu pribudne pri ${JY_CASTLE_STAGES[cur + 1]} ⭐.` : " Hrad je celý!"}</p>`,
    [...(s > 0 ? [["◀ Predošlé", "", () => jyCastleGallery(i, s - 1)]] : []), ...(s < cur ? [["Ďalšie ▶", "", () => jyCastleGallery(i, s + 1)]] : []), ["🏰 Späť na hrad", "primary", () => jyCastle(i)]]);
}

/* ---------- Albínove príbehy na pokračovanie: po každej dokončenej návšteve hradu jedna časť ---------- */
const JY_ALBIN_TALES = [
  "Keď som bol mladý, volali ma Albín Bleskový. Skákal som cez figúrky do tvaru L rýchlejšie ako vietor. Raz ráno som na šachovnici uvidel niečo, čo som ešte nikdy nevidel… Ale to ti poviem nabudúce.",
  "…bola to čierna dáma! Stála uprostred šachovnice a všetci sa jej báli, lebo môže ísť rovno aj šikmo, ďaleko-preďaleko. Ja som však poznal jedno tajomstvo, ktoré ona nepoznala…",
  "Tajomstvo bolo toto: jazdca nikto nezastaví múrom – preskočí každú figúrku. Tak som skočil na pole, odkiaľ som napadol dámu aj kráľa naraz. Vidlička! Dáma zbledla. Lenže potom sa stalo niečo zlé…",
  "Čierny strelec ma zozadu chytil do väzby. Nemohol som sa pohnúť, lebo za mnou stál môj kráľ. Celú noc som tam stál a premýšľal. A ráno mi pomohol niekto, koho by si vôbec nečakal…",
  "Malý biely pešiak! Postavil sa medzi mňa a strelca a väzba bola preč. Odvtedy viem, že pešiaci sú statoční. Asi preto ti tak verím, Béčko. Ako som sa však dostal do rohu a1? To je ďalší príbeh…",
  "Po tej bitke mi kráľ povedal: „Albín, potrebujem niekoho, kto postráži roh a1.“ Myslel som si, že je to nudná práca. Nevedel som, že ten roh skrýva veľké tajomstvo…",
  "Na pole a1 sa chce dostať čierny pešiak, lebo tam sa premení na dámu! Tak som si tam sadol a čakal. Deň, týždeň, rok. A raz v noci som začul tiché kroky…",
  "Bol to čierny pešiak – ten istý, ktorého si videl na a2. Chcel prejsť popri mne. „Tadiaľto neprejdeš, mladý,“ povedal som. Odvtedy stojíme oproti sebe. Raz mi však povedal niečo zvláštne…",
  "„Albín, ja nechcem byť zlý. Temný kráľ ma sem poslal a nemal som na výber.“ Vtedy som pochopil, že aj čierni sa niekedy boja. Dal som mu kúsok svojej deky. A vieš, čo sa stalo potom?",
  "Každú noc sme si potichu rozprávali otvorenia. On mi ukazoval, ako hrajú čierni, ja jemu, ako bieli. Tak som sa naučil všetko, čo ťa teraz učím. Ale jedno otvorenie mi dlho nešlo…",
  "Gambit – keď daruješ pešiaka, aby si rýchlo vyviedol figúry. Myslel som, že darovať niečo je hlúposť. Až kým som nevidel, ako jeden mladý biely hráč daroval pešiaka a o pár ťahov dal mat. Hádaj, kto to bol!",
  "Bol to Kráľ Hugo, keď bol ešte malý princ! Áno, aj Hugo kedysi začínal a robil chyby. Teraz už vieš, prečo verím, že to dokážeš aj ty, Béčko. A čo sa stalo s čiernym pešiakom z a2? Ach… to je už celkom nová kniha. Príď zas.",
  /* Kniha 2 – Pepo z a2 */
  "Ten čierny pešiak sa volá Pepo. Ráno, keď nikto nepočúva, mi z a2 šepká „dobré ráno“. Lenže raz ráno nepovedal nič. Stál stuhnutý a pozeral na niečo za mojím chrbtom…",
  "Za mnou sa vznášal tieň Temného kráľa. „Pepo,“ zahučal, „počul som, že sa kamarátiš s bielym jazdcom. Zajtra pôjdeš dopredu – na a1 – a premeníš sa na dámu!“ Pepo sa triasol. A ja som vedel, že musím niečo vymyslieť…",
  "V noci som Pepovi povedal: „Pešiak ide len rovno dopredu a brať môže len šikmo. Ak stojím priamo pred tebou, nepohneš sa – a nikto ti to nemôže vyčítať.“ Tak som si sadol presne na a1. Ráno prišiel Temný kráľ a zúril…",
  "„Tak ho zober, Pepo!“ kričal. Ale pešiak nemôže zobrať figúru, ktorá stojí rovno pred ním. Pepo pokrčil plecami: „Nedá sa, Vaše Veličenstvo. Také sú pravidlá.“ Temný kráľ odletel. Lenže sa vrátil – a nebol sám…",
  "Priviedol čiernu vežu. Veža zahrmela po rade a mierila rovno na mňa. Pepo zbledol, lebo vedel, že jazdec nevie utiecť po rovnej čiare. Ale jazdec vie niečo, čo veža nevie…",
  "…jazdec vie preskočiť! Skočil som do tvaru L za skalu, kam veža nedovidí. Veža sa rozbehla, nezastavila sa a – žbluňk! – spadla do potoka. Pepo sa smial tak, že sa mu triasla čiapočka. Odvtedy sme mali pokoj. Až do jednej búrlivej noci…",
  "V tú noc fúkal vietor taký silný, že Pepa takmer odfúklo zo šachovnice. Chytil som ho za ruku a držal celú noc. Ráno mi dal malý zložený papier: „Našiel som ho pod kameňom na a2. Je na ňom tvoje meno.“",
  "Na papieri bola stará mapa. Uprostred stála kresba hradu a pod ňou písmo: „Hrad otvorení – pre toho, kto ho raz znova postaví.“ Áno, Béčko – je to tento hrad. Kedysi bol nádherný. Prečo z neho ostala len stará veža? To ti porozprávam nabudúce.",
  /* Kniha 3 – Mapa Hradu otvorení */
  "Kedysi dávno v tomto hrade bývali všetky otvorenia. Každé malo svoju izbu. Ale raz Temný kráľ zoslal fialovú hmlu, hrad sa rozpadol a otvorenia sa rozutekali. Zostala len jedna stará veža – a ja. Vieš, kto býval v najvyššej izbe?",
  "V najvyššej izbe bývala Talianska hra – tichá, múdra pani. Hovorievala: „Najprv vyveď jazdca a strelca, schovaj kráľa a až potom útoč.“ Jej strelec na c4 vždy mieril na pole f7, lebo to je najslabšie miesto čierneho kráľa. Ale v kuchyni pod ňou bývalo niečo hlučné…",
  "V kuchyni bývala Smažená pečeň! Áno, otvorenie s takýmto smiešnym menom. Kuchár tam raz zabudol, že pole f7 chráni len kráľ. Biely jazdec skočil na g5 a potom až na f7 a čierny kráľ musel vybehnúť do kuchyne v papučiach. Odvtedy všetci strážia f7. Ale pozor, za bránou čakal námorník…",
  "Pri bráne hradu kotvila loď kapitána Evansa. Ten kapitán sa na dlhých plavbách nudil, tak hrával šach – a vymyslel gambit: na štvrtom ťahu daroval pešiaka na b4. „Kto daruje pešiaka, získa čas!“ volal. A vieš, kto bol jeho najlepší žiak?",
  "Malý princ Hugo! Kapitán ho naučil, že darovať sa oplatí, len keď za to rýchlo vyvedieš figúry. Hugo raz daroval pešiaka priveľa a skoro prehral. Odvtedy počíta: koľko figúr mám vonku ja a koľko súper? Ale na severnej veži sa medzitým diali divné veci…",
  "Na severnej veži bývali Vikingovia – Škandinávska obrana. Ich dáma vyletela hneď na začiatku na d5 a kričala: „Kto sa odváži?“ Lenže biely jazdec skočil na c3 a dáma musela utekať. Naučili sa, že dáma, ktorá vyjde príliš skoro, stráca čas. Kam sa však všetci podeli, keď prišla hmla?",
  "Rozutekali sa do kníh – do tých, z ktorých sa teraz učíš. A teraz ti prezradím tajomstvo: vždy, keď sa naučíš kúsok otvorenia a získaš u mňa hviezdičku, jeden kameň hradu sa vráti na svoje miesto. Pozri sa niekedy na hrad – rastie s tebou.",
  "Keď bude hrad celý, všetky otvorenia sa vrátia domov a v oknách sa rozsvieti. Ja si vtedy sadnem na balkón najvyššej veže a zamávam ti. Ale dovtedy mám pre teba ešte kopu príbehov – o tvojich kamarátoch. Chceš počuť, ako Viktor prišiel k svojej zástavke?",
  /* Kniha 4 – Príbehy z rohu */
  "Viktor bol kedysi najpomalšia veža na šachovnici. Stál v rohu a nikto ho nepotreboval. Až raz kráľ povedal: „Viktor, poď ku mne!“ Kráľ urobil dva kroky nabok a Viktor ho preskočil. Rošáda! Kráľ bol v bezpečí a Viktor zrazu stál v strede boja. Za odmenu dostal modrú zástavku.",
  "Ela sa ako malá veža bála otvorených stĺpcov – dlhých ciest bez pešiakov. Raz však videla, že na otvorenom stĺpci dovidí až k súperovmu kráľovi. Odvtedy si vždy vyberie prázdnu cestu a uviaže si na ňu fialovú mašľu, aby ju našla. A vieš, kto jej pomáhal?",
  "Hrom! Keď som bol starší, Hrom bol môj žiak – divoký mladý jazdec. Skákal hore-dole bez rozmyslu. Naučil som ho: „Jazdec na kraji je smutný jazdec. Skáč do stredu, odtiaľ dosiahneš osem polí!“ Hrom to pochopil až vtedy, keď sa raz zasekol v rohu…",
  "…a musel som ho odtiaľ ťahať za uzdu. Odvtedy ju nosí, aby nezabudol. Teraz ti poviem o niekom rýchlom. Gusto vraj pozná trik, ktorý málokto vie – brať mimochodom. Vieš, čo to je?",
  "Keď súperov pešiak skočí zo svojho miesta o dve polia a pristane hneď vedľa tvojho pešiaka, môžeš ho zobrať, akoby urobil len jeden krok. Ale len hneď v nasledujúcom ťahu! Gusto na to raz čakal celé dopoludnie. Zato Lumka čaká trpezlivo úplne inak…",
  "Lumka si našla lampu v Tajnej jaskyni, keď bola ešte celkom malá. Lampa svieti len vtedy, keď sa niekto poriadne pozerá – na každú figúru, na každú hrozbu. Preto v jaskyni vidíš ťažšie úlohy: svetlo lampy ich ukáže len tomu, kto sa nebojí pozerať. A pri studničke býva niekto, kto si všetko pamätá…",
  "Žofka pri Studnici opakovania raz povedala: „Čo raz spadne do studne, to sa v nej odráža navždy.“ Preto sa v jej vode objavujú úlohy, ktoré už poznáš. Hovorí, že pamäť je ako sval – čím viac ju cvičíš, tým je silnejšia. A teraz posledný príbeh, ale pšššt…",
  "Za horami, kde padá sneh, žije malá biela pešiačka s mašľou. Volá sa Cilka. Raz ma navštívila a spýtala sa: „Albín, môže byť aj malý pešiak hrdina?“ Povedal som jej o tebe, Béčko. Čo sa s ňou stalo potom, to je už iná rozprávka. A možno ju raz budeš rozprávať ty."
];
/* knihy Albínových príbehov – od ktorej časti začínajú (20. 11.) */
const JY_ALBIN_BOOKS = [{from:0, t:"Albín Bleskový"}, {from:12, t:"Pepo z a2"}, {from:20, t:"Mapa Hradu otvorení"}, {from:28, t:"Príbehy z rohu"}];
const jyAlbinBook = k => { let b = 0; JY_ALBIN_BOOKS.forEach((x, j) => { if (k >= x.from) b = j; }); return b; };
const jyAlbinLabel = k => { const b = jyAlbinBook(k), B = JY_ALBIN_BOOKS[b], end = b + 1 < JY_ALBIN_BOOKS.length ? JY_ALBIN_BOOKS[b + 1].from : JY_ALBIN_TALES.length; return `Kniha ${b + 1}: ${B.t} · časť ${k - B.from + 1} z ${end - B.from}`; };
/* všetky odomknuté časti Albínovho príbehu naraz (z okna hradu), 17. 11. */
function jyAlbinTales(i){
  const ep = jyState().albinEp || 0, N = JY_ALBIN_TALES.length; SFX.story("list", "page");
  jyModal(`<div class="jy-say big"><img src="${JY_IMG("pc-w-albin")}" alt=""><div><h2>🐴 Albínov príbeh</h2><p class="sub">${ep < N ? `Prečítané ${ep} z ${N} častí. Ďalšia časť príde po ďalšej návšteve hradu.` : "Celý príbeh – všetkých " + N + " častí."}</p></div></div>
    <div class="jy-tales">${JY_ALBIN_TALES.slice(0, ep).map((t, k) => (JY_ALBIN_BOOKS.find(x => x.from === k) ? `<h3>📖 Kniha ${jyAlbinBook(k) + 1}: ${JY_ALBIN_BOOKS[jyAlbinBook(k)].t}</h3>` : "") + `<p class="jy-tale"><b class="jy-tale-n">${k - JY_ALBIN_BOOKS[jyAlbinBook(k)].from + 1}.</b> ${esc(t)}</p>`).join("")}${ep < N ? `<p class="sub">🔒 Časť ${ep + 1} – Albín ti ju porozpráva nabudúce.</p>` : ""}</div>`,
    [["🏰 Späť na hrad", "primary", () => jyCastle(i)], ["Zavrieť", "", null]]);
}
function jyAlbinEpisode(then){
  const st = jyState(), k = st.albinEp || 0; if (k >= JY_ALBIN_TALES.length){ if (then) then(); return; }
  jySave({albinEp:k + 1}); SFX.story("list", "page");
  jyModal(`<div class="jy-say big"><img src="${JY_IMG("pc-w-albin")}" alt=""><div><span class="label">Albín rozpráva · ${jyAlbinLabel(k)}</span>${JY_ALBIN_BOOKS.some(x => x.from === k && k > 0) ? `<h3 style="margin:4px 0">📖 Nová kniha: ${JY_ALBIN_BOOKS[jyAlbinBook(k)].t}</h3>` : ""}<p class="jy-tale">${esc(JY_ALBIN_TALES[k])}</p></div></div>`,
    [[k + 1 < JY_ALBIN_TALES.length ? "Teším sa na pokračovanie!" : "Ďakujem, Albín!", "primary", then || null]]);
}
/* odbočka Hrad otvorení sa splní, keď od kliknutia pribudne dokončená kapitola štúdie otvorenia */
function jyCastleCheck(){
  const st = jyState(); if (!st.started) return;
  const asked = st.castlePlace != null && st.castleAt, i = asked ? st.castlePlace : Math.min(st.pos, JY_LAST), p = st.places[i], done = jySideDone(p, "castle");
  // opakovanie (odbočka už hotová): počíta sa len kapitola dokončená po kliknutí na Hrad
  if ((done || p.bossWon) && !asked) return;
  // kapitola štúdie otvorenia dokončená po kliknutí na Hrad – alebo dnes kdekoľvek (Štúdie, blok C v Tréningu)
  const since = done || p.bossWon ? st.castleAt : st.castleAt && st.castlePlace === i ? Math.min(st.castleAt, midnight()) : midnight();
  let best = null;
  S.studyprog.forEach(d => { if (d.study === "tactics" || d.study === "endgame") return;
    Object.values(d.ch || {}).forEach(c => { const cs = Math.min(3, c.ls || c.stars || 0); if (cs && (c.last || 0) >= since && (!best || cs > best.ls)) best = {sid:d.study, n:Math.min(3, c.stars), ls:cs, first:(c.n || 1) === 1}; }); });
  if (!best || JT) return;
  const prevN = ((p.stars || {}).castle) || 0, fresh = jySideDoneSave(i, "castle");
  if (!fresh && !(done || p.bossWon)) return;
  jySave({castleAt:null});
  const better = !fresh && best.n > prevN, cx = jyCastleAdd("ch", best.ls, best.first ? [["nová kapitola", 1]] : []);
  setTimeout(() => jySideResult(i, "castle", best.n, `<p class="sub">${esc((STUDIES[best.sid] || {}).name || "")}</p>${cx}${better ? `<p class="sub">Lepší výsledok ako minule! Prišiel nový ${jyLetterWord()}.</p>` : ""}`, () => jyAlbinEpisode(() => { if (fresh || better) jyLetter(i, "castle"); }), best.sid), 700);
}
function jySideDoneSave(i, k){
  const st = jyState(), p = st.places[i]; if (jySideDone(p, k)) return false;
  const sides = {...p.sides, [k]: jyToday()}, perks = {...p.perks};
  const perk = k !== "prep" && JY_SIDES[k].perk; if (perk && !p.bossWon) perks[perk] = true;
  jySavePlace(i, {sides, perks}, {xp: st.xp + JY_XP.side});
  JV.fresh = {place:i, side:k};
  setTimeout(() => {
    if (k === "prep") jyToast("Príprava na bossa hotová ⭐ Teraz ho už zvládneš!");
    else { SFX.story("hmla"); jyToast(`Odbočka ${JY_SIDES[k].label} hotová ⭐ Hmla sa rozplynula. +${JY_XP.side} bodov`); }
  }, 300);
  return true;
}

/* ---------- riešenie úloh ---------- */
function jyTaskStart(o){
  if (!o.list || !o.list.length){ JV.msg = "Na toto miesto zatiaľ nemám úlohy."; return jyGo("land", o.place); }
  const st = jyState(), p = st.places[o.place];
  JT = {...o, i:-1, res:[], hearts:0, used:{}};
  if (o.kind === "boss"){ JT.hearts = 2 + (p.perks && p.perks.heart ? 1 : 0); JT.maxH = JT.hearts; JT.perks = {...(p.perks || {})}; }
  JV.view = "task"; jyTaskNext();
}
function jyTaskNext(){
  JT.i++; JT.tok = (JT.tok || 0) + 1;
  if (JT.i >= JT.list.length) return jyTaskEnd();
  const x = JT.list[JT.i];
  JT.x = x; JT.c = new Chess(x.f); JT.node = x.tr; JT.me = JT.c.turn(); JT.sel = null; JT.tries = 0; JT.show = false; JT.flash = null; JT.arrow = null; JT.zoom = null; JT.compass = null; JT.hint = null; JT.lock = false; JT.msg = ""; JT.why = ""; JT.rated = false; JT.helped = false; JT.wait = null; JT.egN = 0; JT.egUndo = x.eg ? 1 : 0; JT.egUsed = false;
  JT.t0 = performance.now();
  jyTaskRender();
}
function jyTaskTask(x, c){
  const who = c.turn() === "w" ? "Biely" : "Čierny";
  if (x.eg) return `${who} na ťahu: ${x.g === "p" ? "dotlač pešiaka a premeň ho" : "daj mat"} – najviac za ${x.limit} ťahov. Ťah ${JT.egN || 0} z ${x.limit}.` + (JT.egUndo ? " Jedno vrátenie ťahu máš zadarmo." : "");
  if (x.q) return `${who} na ťahu: ${x.q}`;
  if (x.id.startsWith("rush:w")) return `${who} na ťahu: získaj figúrku.`;
  if (x.m) return `${who} na ťahu: daj mat${x.k > 1 ? ` ${x.k} ťahmi` : x.id.startsWith("rush:m") ? " jedným ťahom" : ""}.`;
  return `${who} na ťahu: nájdi najlepší ťah${x.d > 1 ? " (a pokračuj, kým nevyhráš)" : ""}.`;
}
function jyTaskRender(){
  if (S.tab !== "jy" || !JT) return;
  let box = $("#jy-task");
  if (!box){
    const L = JY_SEASON.places[JT.place];
    const head = JT.kind === "boss"
      ? `<div class="jy-bosshead"><img id="jy-bossimg" src="${JY_IMG(L.boss.img)}" alt=""><div><span class="label">Súboj</span><h2>${esc(L.boss.name)}</h2><div class="jy-hearts" id="jy-hearts"></div></div></div>`
      : JT.kind === "race" ? `<div class="jy-racehead"><span class="label">⚡ Pretek rýchloviek</span><div class="jy-lane"><span>Ty</span><i><b id="jy-me"></b></i></div><div class="jy-lane gusto"><span>Gusto</span><i><b id="jy-gu"></b></i></div><div class="sub" id="jy-racet"></div></div>`
      : JT.whoImg ? `<div class="jy-say"><img src="${JY_IMG(JT.whoImg)}" alt=""><p><b>${esc(JT.who)}:</b> „${esc(JT.say || "")}“</p></div>`
      : `<div class="jy-say"><img src="${JY_IMG(L.guide.img)}" alt=""><p>${JT.kind === "step" ? `<b>${esc(L.guide.name)}:</b> „${esc(JT.say || "")}“` : esc(JT.say || "")}</p></div>`;
    jyShell(`<div class="jy-head">${jyBtn("quit", "← Mapa")}<div class="jy-title"><h2>${esc(JT.title || "")}</h2><span class="sub" id="jy-tpos"></span></div><span></span></div>
      <div class="jy-taskgrid"><div class="jy-tboard"><div class="board" id="jy-board"></div></div>
      <div class="panel jy-tside" id="jy-task">${head}<p class="jy-ttask" id="jy-ttask"></p><div class="pz-status" id="jy-tmsg"></div><div class="why" id="jy-twhy" hidden></div><div class="row" id="jy-tbtns"></div><div class="jy-dots" id="jy-tdots"></div></div></div>`, "jy-v-task");
    box = $("#jy-task");
  }
  const x = JT.x, c = JT.c, hl = {};
  if (JT.sel){ hl[JT.sel] = "sel"; for (const m of c.moves({square:JT.sel, verbose:true})) hl[m.to] = "tgt"; }
  if (JT.zoom) JT.zoom.forEach(q => { if (!hl[q]) hl[q] = "hint"; });
  if (JT.compass) JT.compass.forEach(q => { hl[q] = JT.zoom && JT.zoom.includes(q) ? "flashok" : (hl[q] || "hint"); });
  if (JT.hint && !hl[JT.hint]) hl[JT.hint] = "hint";
  if (JT.flash) JT.flash.sqs.forEach(q => hl[q] = JT.flash.cls);
  drawBoard($("#jy-board"), c.fen(), {orient:JT.me, hl, arrows: JT.arrow ? [JT.arrow] : []}); jyPaintPieces($("#jy-board"));
  $("#jy-tpos").textContent = `Úloha ${JT.i + 1} z ${JT.list.length}` + (JT.timed ? ` · ⏱ ${fmtS(performance.now() - JT.tStart)}` : "");
  if (JT.timed && !JT.tick){ const id = setInterval(() => { if (!JT || !JT.timed || JT.tick !== id){ clearInterval(id); return; } const e = $("#jy-tpos"); if (e) e.textContent = `Úloha ${JT.i + 1} z ${JT.list.length} · ⏱ ${fmtS(performance.now() - JT.tStart)}`; }, 250); JT.tick = id; }
  $("#jy-ttask").textContent = jyTaskTask(x, new Chess(x.f));
  const msg = $("#jy-tmsg"); msg.textContent = JT.msg || ""; msg.className = "pz-status " + (JT.msgCls || "");
  const whyBox = $("#jy-twhy");
  if (whyBox){
    if (JT.why && JT.wait){ whyBox.hidden = false; whyBox.innerHTML = `<b>Prečo to funguje:</b> ${esc(JT.why)}`; }
    else { whyBox.hidden = true; whyBox.innerHTML = ""; }
  }
  $("#jy-tdots").innerHTML = JT.list.map((_, k) => `<i class="${k < JT.res.length ? (JT.res[k] ? "ok" : "bad") : k === JT.i ? "on" : ""}"></i>`).join("");
  if (JT.wait){
    if (JT.kind === "boss") $("#jy-hearts").innerHTML = Array.from({length:JT.maxH}, (_, k) => `<span class="${k < JT.hearts ? "" : "off"}">❤️</span>`).join("");
    const last = JT.i + 1 >= JT.list.length || (JT.kind === "boss" && JT.hearts <= 0);
    $("#jy-tbtns").innerHTML = jyBtn("tnext", last ? "Pozrieť výsledok ›" : "Ďalšia úloha ›", "primary")
      + (JT.kind !== "race" ? jyBtn("ana", "🔍 Analyzovať pozíciu") : "");
  } else if (JT.kind === "boss"){
    $("#jy-hearts").innerHTML = Array.from({length:JT.maxH}, (_, k) => `<span class="${k < JT.hearts ? "" : "off"}">❤️</span>`).join("");
    const b = [];
    if (JT.perks.zoom && !JT.used.zoom) b.push(jyBtn("zoom", "🔍 Lupa"));
    if (JT.perks.compass && !JT.used.compass) b.push(jyBtn("compass", "🧭 Kompas"));
    if (JT.perks.hint && !JT.used.hint) b.push(jyBtn("hint", "💡 Nápoveda"));
    $("#jy-tbtns").innerHTML = b.join("");
  } else if (JT.kind !== "race") $("#jy-tbtns").innerHTML = JT.show ? "" : jyBtn("showsol", "Ukáž mi riešenie", "", JT.tries ? "" : "hidden");
  if (JT.kind === "race") jyRaceLanes();
}
function jySquare(sq){
  if (!JT || JT.lock) return;
  const c = JT.c, pc = c.get(sq), mine = pc && pc.color === c.turn();
  if (JT.sel && JT.sel !== sq && c.moves({square:JT.sel, verbose:true}).some(m => m.to === sq)){
    const from = JT.sel, tok = JT.tok;
    if (needsPromo(c, from, sq)){
      choosePromotion(c.turn(), $("#jy-board")).then(p => {
        if (!JT || JT.tok !== tok || JT.lock) return;
        if (!p){ JT.sel = null; jyTaskRender(); return; }
        jyMove(from, sq, p);
      });
      return;
    }
    return jyMove(from, sq, null);
  }
  JT.sel = mine && JT.sel !== sq ? sq : null;
  jyTaskRender();
}
function jyMove(from, to, promo){
  const c = JT.c, x = JT.x, before = c.fen();
  if (x.eg) return jyEgMove(from, to, promo);
  const m = c.move({from, to, promotion: promo || "q"}); JT.sel = null; if (!m) return;
  SFX.move(m);
  const u = m.from + m.to + (m.promotion || ""), node = JT.node || {};
  const key = Object.keys(node).find(k => k === u || (k.slice(0,4) === u.slice(0,4) && !k[4]));
  const mate = c.in_checkmate();
  const good = key != null || (x.m && mate);
  if (!good) return jyWrong(m, before);
  JT.flash = {sqs:[m.from, m.to], cls:"flashok"}; JT.arrow = null; JT.hint = null; JT.zoom = null; JT.compass = null;
  const next = key != null ? node[key] : null;
  if (mate || next == null || (Array.isArray(next) && false)){ return jySolved(mate); }
  // súper odpovie
  const [reply, sub] = next; JT.lock = true; JT.msg = "Správne! Súper odpovedá…"; JT.msgCls = "ok"; jyTaskRender();
  const tok = JT.tok;
  setTimeout(() => {
    if (!JT || JT.tok !== tok) return;
    const r = c.move({from:reply.slice(0,2), to:reply.slice(2,4), promotion:reply[4] || undefined});
    SFX.move(r); JT.node = sub; JT.lock = false; JT.flash = r ? {sqs:[r.from, r.to], cls:"last"} : null; JT.msg = "Pokračuj!"; JT.msgCls = "";
    if (!sub || (!Object.keys(sub).length && !x.m)) return jySolved(false);
    jyTaskRender();
  }, 550);
}
/* rating: len prvý výsledok nevidenej úlohy, bez lupy/nápovedy, nie v preteku */
function jyRate(ok){
  if (!JT || JT.rated || JT.kind === "race" || (JT.x && JT.x.noRate)) return;
  JT.rated = true;
  if (JT.helped || ((jyDoc() || {}).seen || []).includes(JT.x.id)) return;
  rtRecord(JT.x, ok, JT.kind === "side" ? JT.side : JT.kind);
}
/* po výsledku úlohy: pri úlohách na čas (pretek rýchloviek, pretek s Albínom) automaticky ďalej,
   inak počká na tlačidlo „Ďalšia úloha“, aby si dieťa stihlo prečítať výsledok a vysvetlenie (17. 11.) */
const jyIsTimed = () => JT && (JT.kind === "race" || JT.timed);
function jyAfter(ms, fn){
  const tok = JT.tok;
  if (jyIsTimed()) return setTimeout(() => { if (JT && JT.tok === tok) fn(); }, ms);
  JT.wait = fn; jyTaskRender();
  setTimeout(() => { const b = document.querySelector('#jy-tbtns [data-jy="tnext"]'); if (b) b.focus({preventScroll:true}); }, 50);
}
function jyExplain(x){
  if (!x) return "";
  if (x.w) return x.w;
  if (x.c) return x.c;
  if (typeof moveFeatures !== "function" || !x.tr) return "";
  const line = typeof wyMainLine === "function" ? wyMainLine(x.tr) : [Object.keys(x.tr)[0]].filter(Boolean);
  if (!line.length) return "";
  const f1 = moveFeatures(x.f, line[0]);
  if (f1.pts.length) return f1.pts.slice(0, 2).join(" ");
  if (line.length >= 3){
    const c1 = new Chess(x.f);
    if (c1.move(uciObj(line[0])) && c1.move(uciObj(line[1]))){
      const f3 = moveFeatures(c1.fen(), line[2]);
      if (f3.pts.length) return f3.pts.slice(0, 2).join(" ");
    }
  }
  return "";
}
function jySolved(mate){
  jyRate(JT.kind === "boss" ? true : !JT.show && JT.tries === 0);
  JT.res.push(JT.kind === "boss" ? true : !JT.show && JT.tries === 0);
  setTimeout(() => SFX.play("ok"), 120);
  JT.lock = true; JT.msg = mate ? "Mat! Výborne!" : JT.show ? "Áno, takto. Ide sa ďalej." : JT.tries ? "Správne – na druhý pokus!" : "Správne! Výborne!"; JT.msgCls = "ok";
  JT.why = !jyIsTimed() ? jyExplain(JT.x) : "";
  jyTaskRender();
  jyAfter(JT.kind === "race" ? 350 : 900, jyTaskNext);
}
/* prvý ťah riešenia v aktuálnej pozícii; pri „ľubovoľný mat“ ho dopočítame */
function jySol(){
  if (JT.x.eg) return window.EG ? EG.whiteBest(JT.c.fen()) : null;
  const k = Object.keys(JT.node || {})[0]; if (k) return k;
  if (JT.x.m){ const c = new Chess(JT.c.fen()); for (const m of c.moves({verbose:true})){ c.move(m); const mate = c.in_checkmate(); c.undo(); if (mate) return m.from + m.to + (m.promotion || ""); } }
  return null;
}
function jyWrong(m, before){
  const c = JT.c; c.load(before); SFX.play("bad");
  const sol = jySol();
  if (JT.kind === "boss" && JT.perks && JT.perks.undo && !JT.used.undo){
    JT.used.undo = true; JT.flash = {sqs:[m.to], cls:"wrong"}; setTimeout(() => SFX.story("list", "page"), 200);
    JT.msg = `🛡️ ${sk(m.san)} nie je dobré – Albín ti ťah vrátil. Skús znova, srdiečko ostáva!`; JT.msgCls = "bad"; jyTaskRender(); return;
  }
  if (JT.kind === "boss"){
    JT.hearts--; JT.res.push(false); JT.lock = true; jyRate(false); setTimeout(() => SFX.story("srdiecko"), 350);
    JT.flash = {sqs:[m.to], cls:"wrong"};
    if (sol){ const sm = new Chess(c.fen()).move({from:sol.slice(0,2), to:sol.slice(2,4), promotion:sol[4] || undefined}); if (sm) JT.arrow = {from:sm.from, to:sm.to, color:"best"}; }
    JT.msg = `${sk(m.san)} nie je správne.` + (JT.hearts > 0 ? " Stratil si srdiečko." : ""); JT.msgCls = "bad";
    JT.why = jyExplain(JT.x);
    jyTaskRender();
    jyAfter(1900, () => { if (JT.hearts <= 0) jyTaskEnd(); else jyTaskNext(); });
    return;
  }
  if (JT.kind === "race"){
    JT.pen = (JT.pen || 0) + JY_RACE_PEN; JT.res.push(false); JT.lock = true; JT.flash = {sqs:[m.to], cls:"wrong"};
    if (sol){ const sm = new Chess(c.fen()).move({from:sol.slice(0,2), to:sol.slice(2,4), promotion:sol[4] || undefined}); if (sm){ JT.arrow = {from:sm.from, to:sm.to, color:"best"}; JT.msg = `Správne bolo ${sk(sm.san)}. +5 s`; } }
    JT.msgCls = "bad"; jyTaskRender();
    const tok = JT.tok; setTimeout(() => { if (JT && JT.tok === tok) jyTaskNext(); }, 1300);
    return;
  }
  JT.tries++; JT.flash = {sqs:[m.to], cls:"wrong"}; jyRate(false);
  if (JT.tries >= 2) jyShowSol(); else { JT.msg = `${sk(m.san)} nie je ono. Skús ešte raz!`; JT.msgCls = "bad"; }
  jyTaskRender();
}
function jyShowSol(){
  const sol = jySol(); if (!sol) return;
  const sm = new Chess(JT.c.fen()).move({from:sol.slice(0,2), to:sol.slice(2,4), promotion:sol[4] || undefined});
  if (sm){ JT.arrow = {from:sm.from, to:sm.to, color:"best"}; JT.show = true; JT.msg = `Pozri šípku: ${sk(sm.san)}. Zahraj ho.`; JT.msgCls = ""; }
}
function jyUpdateHistory(st, o){
  const ids = o.list.filter(x => x && !x.eg && x.id).map(x => x.id);
  const seen = [...new Set([...(st.seen || []), ...ids])];
  const failSet = new Set(st.fail || []);
  o.list.forEach((x, idx) => {
    if (!x || x.eg || !x.id) return;
    if (o.res[idx]) failSet.delete(x.id);
    else failSet.add(x.id);
  });
  return {seen, fail:[...failSet]};
}
function jyTaskEnd(){
  rtFlush();
  const o = JT, i = o.place, L = JY_SEASON.places[i], st = jyState(), p = st.places[i];
  const {seen, fail} = jyUpdateHistory(st, o);
  const okN = o.res.filter(Boolean).length;
  JT = null;
  if (o.kind === "step"){
    const steps = p.steps + 1;
    jySavePlace(i, {steps}, {dayPlace:jyDayPlace(st, i), seen, fail, xp: st.xp + JY_XP.step, stats:[...st.stats.slice(-60), {d:jyToday(), k:"step", place:i, ok:okN, n:o.list.length}]});
    confetti(); jyCreditDay({jy:true}, o.res.length);
    JV.msg = steps >= JY_STEPS ? `<b>Cesta je za tebou!</b> Teraz ťa čaká <b>${esc(L.boss.name)}</b> – keď budeš pripravený. Vyriešené na prvý pokus: ${okN} z ${o.list.length}. +${JY_XP.step} bodov.`
      : `<b>Krok ${steps} z ${JY_STEPS} hotový!</b> Vyriešené na prvý pokus: ${okN} z ${o.list.length}. +${JY_XP.step} bodov. Pokračuj ďalším krokom, alebo si vyber odbočku na mape.`;
    JV.after = null; JV.view = "land"; JV.cur = i; jyRender();
    setTimeout(() => jyPostcard(i, steps - 1, true, () => { const k = jyPickLure(i); if (k) jyShowLure(i, k); }), 500);
    return;
  }
  if (o.kind === "side"){
    jySave({seen, fail}); jyCreditDay({}, o.res.length);
    if (o.tick) clearInterval(o.tick);
    const prevN = ((p.stars || {})[o.side]) || 0, fresh = jySideDoneSave(i, o.side), n0 = o.side === "dohraj" ? (o.egStars || 1) : jyStarsOf(okN, o.list.length), n = n0, better = !fresh && n > prevN;
    if (o.side === "castle") return jyAlbinEnd(o, i, n, okN, fresh, better);
    JV.msg = fresh ? "" : `${o.side === "prep" ? "Príprava" : JY_SIDES[o.side].label} – hotové! Vyriešené na prvý pokus: ${okN} z ${o.list.length}.`;
    JV.view = "land"; JV.cur = i; jyRender();
    return jySideResult(i, o.side, n, o.side === "dohraj" ? `<p class="sub">${esc(o.egNote || "")}</p>` : `<p class="sub">Na prvý pokus: ${okN} z ${o.list.length}</p>${better ? `<p class="sub">Lepší výsledok ako minule! Prišiel nový ${jyLetterWord()}.</p>` : ""}`, () => { if ((fresh || better) && o.side !== "prep") setTimeout(() => jyLetter(i, o.side), 300); });
  }
  if (o.kind === "race") return jyRaceEnd(o, seen, fail);
  if (o.kind === "boss"){
    const won = o.hearts > 0 && o.res.length === o.list.length;
    const stats = [...st.stats.slice(-60), {d:jyToday(), k:"boss", place:i, ok:okN, n:o.res.length, won}];
    jyCreditDay({jy:true}, o.res.length);
    if (!won){
      SFX.stinger("prehra", "lose");
      jySavePlace(i, {bossLost:jyToday(), bossTries:(p.bossTries || 0) + 1}, {dayPlace:jyDayPlace(st, i), seen, fail, stats});
      JV.msg = `Tentoraz to nevyšlo – ${esc(L.boss.name)} ešte stojí v ceste. Nevadí – skús odbočku 🎯 Príprava na bossa, ktorá sa objavila pri súboji, a potom to skús znova.`;
      return jyModal(`<div class="jy-win">${jySidePic("boss-prehra")}<h2>Tentoraz to nevyšlo</h2><p>${esc(L.boss.name)} ešte stojí v ceste. Nevadí – aj najodvážnejší pešiak si niekedy musí oddýchnuť. Pripravíš sa a skúsiš to znova!</p><p class="sub">Pri bossovi sa objavila odbočka 🎯 Príprava na bossa.</p></div>`, [["Ďalej", "primary", () => jyGo("land", i)]]);
    }
    jySavePlace(i, {bossWon:jyToday(), perks:{}}, {pos:Math.max(st.pos, i + 1), dayPlace:jyDayPlace(st, i), seen, fail, stats, xp: st.xp + JY_XP.boss});
    return jyBossWin(i);
  }
}
/* pomocníci pre príbehové sekvencie sezóny 2 po porazení bossa */
function jyS2MovePiece(svg, from, to, cb){
  const pc = svg && svg.querySelector(`.jy-piece[data-sq="${from}"]`);
  const [x, y] = jyXY(to);
  if (pc){ pc.style.transform = `translate(${x}px,${y}px)`; pc.dataset.sq = to; }
  setTimeout(() => SFX.play("move"), 450);
  setTimeout(() => { if (cb) cb(x, y); }, 1050);
}
function jyS2AskHugo(svg, fromSq, toSq, promptTxt, onMove){
  const stEl = $("#jy-status"); if (stEl) stEl.innerHTML = promptTxt;
  const old = svg.querySelector("#jy-s2-tgt"); if (old) old.remove();
  const [tx, ty] = jyXY(toSq);
  const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
  g.id = "jy-s2-tgt"; g.style.cursor = "pointer";
  g.innerHTML = `<rect x="${tx+3}" y="${ty+3}" width="94" height="94" rx="10" fill="#f2c14e" fill-opacity=".38" stroke="#f2c14e" stroke-width="5"/>
    <circle cx="${tx+50}" cy="${ty+50}" r="18" fill="#f2c14e" opacity=".9"/>
    <text x="${tx+50}" y="${ty+56}" text-anchor="middle" font-size="18" font-weight="800" fill="#1d2b3a">${toSq}</text>`;
  g.onclick = e => {
    e.stopPropagation(); g.remove();
    jyS2MovePiece(svg, fromSq, toSq, (x, y) => { jyBurst(svg, x + 50, y + 50); onMove(); });
  };
  svg.appendChild(g);
}
function jyS2RenderMapPieces(svg, map){
  const pcsG = svg.querySelector("#jy-pieces");
  if (pcsG) pcsG.innerHTML = Object.keys(map).map(sq => {
    const [x, y] = jyXY(sq);
    return `<g class="jy-piece" data-sq="${sq}" style="transform:translate(${x}px,${y}px);pointer-events:none">${jyPieceImg(map[sq].name, map[sq].kind)}</g>`;
  }).join("");
}
function jyS2BossWin(i){
  const L = JY_SEASON.places[i], B = L.boss;
  if (i === 0){
    SFX.stinger("vyhra", "win"); confetti(null);
    const m1 = JY_COMICS.m1 || [], p1a = m1[0] ? [m1[0]] : null, p1b = m1.length > 1 ? m1.slice(1) : null;
    const go = () => jyComic(p1a, () => {
      JV.view = "board"; JV.busy = true; jyS2BoardRender();
      const svg = $("#jy-svg"); if (!svg){ JV.busy = false; return; }
      const r0 = jyS2Game(0, true); r0.map.c7 = r0.map.c6; delete r0.map.c6;
      jyS2RenderMapPieces(svg, r0.map);
      setTimeout(() => {
        const stEl = $("#jy-status"); if (stEl) stEl.innerHTML = "Čierny: <b>1…Vd6+</b>";
        jyS2MovePiece(svg, "d5", "d6", () => jyComic(p1b, () => {
          JV.busy = false; jyS2BoardRender();
          const s2 = $("#jy-svg"), [bx, by] = jyXY("b6"); if (s2) jyBurst(s2, bx + 50, by + 50);
        }));
      }, 450);
    });
    const fx = `<img class="jy-open" src="${JY_IMG(B.imgDone)}" alt="">`;
    jyModal(`<div class="jy-win"><div class="jy-obst"><img src="${JY_IMG(B.img)}" alt="">${fx}</div><h2>${B.head || "Ľad vydržal!"}</h2><p>+${JY_XP.boss} bodov.</p></div>`, [["Pokračovať", "primary", go]]);
    setTimeout(() => { const o = document.querySelector(".jy-open"); if (o) o.classList.add("on"); }, 400);
    setTimeout(() => SFX.story(B.sfx || "s2-lad-zamrzne"), 350);
    return;
  }
  if (i === 1){
    SFX.stinger("vyhra", "win"); confetti(null);
    const m2 = JY_COMICS.m2 || [], p2a = m2[0] ? [m2[0]] : null, p2b = m2[1] ? [m2[1]] : null;
    const m3 = JY_COMICS.m3 || [], p3a = m3[0] ? [m3[0]] : null;
    const go = () => {
      JV.view = "board"; JV.busy = true; jyS2BoardRender();
      const svg = $("#jy-svg"); if (!svg){ JV.busy = false; return; }
      jyS2RenderMapPieces(svg, jyS2Game(1, true).map);
      jyS2AskHugo(svg, "b6", "b5", "Klikni na <b>b5</b> – posuň Kráľa Huga o jeden schod dolu!", () => {
        jyComic(p2a, () => {
          $("#jy-status").innerHTML = "Čierny: <b>2…Vd5+</b>";
          jyS2MovePiece(svg, "d6", "d5", () => {
            jyS2AskHugo(svg, "b5", "b4", "Klikni na <b>b4</b> – posuň Kráľa Huga dolu!", () => {
              $("#jy-status").innerHTML = "Čierny: <b>3…Vd4+</b>";
              jyS2MovePiece(svg, "d5", "d4", () => {
                jyComic(p2b, () => {
                  jyS2AskHugo(svg, "b4", "b3", "Klikni na <b>b3</b> – posuň Kráľa Huga o krok nižšie!", () => {
                    jyComic(p3a, () => {
                      $("#jy-status").innerHTML = "Čierny: <b>4…Vd3+</b>";
                      jyS2MovePiece(svg, "d4", "d3", () => {
                        jyS2AskHugo(svg, "b3", "c2", "Klikni na <b>c2</b> – schovaj Kráľa Huga do Strážnej chaty!", () => {
                          JV.busy = false; jyEnterLand(2);
                        });
                      });
                    });
                  });
                });
              });
            });
          });
        });
      });
    };
    jyModal(`<div class="jy-win"><img src="${JY_IMG(B.img)}" alt="" class="jy-defeat"><h2>${esc(B.name)} je porazený! 🏆</h2><p>+${JY_XP.boss} bodov. ${B.winTxt || ""}</p></div>`, [["Pokračovať", "primary", go]]);
    return;
  }
  if (i === 2){
    SFX.stinger("vyhra", "win"); confetti(null);
    const m3 = JY_COMICS.m3 || [], p3c = m3[1] ? [m3[1]] : null, p3def = m3.slice(2);
    const go = () => jyComic(p3c, () => {
      JV.view = "board"; JV.busy = true; jyS2BoardRender();
      const svg = $("#jy-svg"); if (!svg){ JV.busy = false; return; }
      const r2 = jyS2Game(2, true); if (r2.map.b3){ r2.map.c2 = r2.map.b3; delete r2.map.b3; }
      jyS2RenderMapPieces(svg, r2.map);
      setTimeout(() => {
        const stEl = $("#jy-status"); if (stEl) stEl.innerHTML = "Čierny: <b>Fujavica ustupuje na d4</b>";
        jyS2MovePiece(svg, "d3", "d4", () => jyComic(p3def.length ? p3def : null, () => {
          JV.busy = false; jyS2BoardRender();
          const s4 = $("#jy-svg"), [cx, cy] = jyXY("c8"); if (s4) jyBurst(s4, cx + 50, cy + 50);
        }));
      }, 450);
    });
    const fx = `<img class="jy-open" src="${JY_IMG(B.imgDone)}" alt="">`;
    jyModal(`<div class="jy-win"><div class="jy-obst"><img src="${JY_IMG(B.img)}" alt="">${fx}</div><h2>${B.head || "Fujavica utíchla!"}</h2><p>+${JY_XP.boss} bodov. ${B.winTxt || ""}</p></div>`, [["Pokračovať", "primary", go]]);
    setTimeout(() => { const o = document.querySelector(".jy-open"); if (o) o.classList.add("on"); }, 400);
    setTimeout(() => SFX.story(B.sfx || "s2-vanica"), 350);
    return;
  }
  if (i === 3){
    SFX.stinger("vyhra", "win"); confetti(null);
    const m4 = JY_COMICS.m4 || [], pre = m4.filter(x => !x.after), post = m4.filter(x => x.after);
    const go = () => jyComic(pre.length ? pre : null, () => {
      JV.view = "board"; JV.busy = true; jyS2BoardRender();
      const svg = $("#jy-svg"); if (!svg){ JV.busy = false; return; }
      svg.innerHTML = jyS2BoardSvg(3, false);
      setTimeout(() => {
        const stEl = $("#jy-status"); if (stEl) stEl.innerHTML = "Biely: <b>6.c8V!!</b>";
        const pc = svg.querySelector('.jy-piece[data-sq="c7"]'), [cx, cy] = jyXY("c8");
        if (pc){
          pc.style.transform = `translate(${cx}px,${cy}px)`; pc.dataset.sq = "c8";
          setTimeout(() => { pc.innerHTML = jyPieceImg("w-cilka-veza", "r"); jyBurst(svg, cx + 50, cy + 50, 20); SFX.play("promote"); SFX.story("premena"); }, 600);
        }
        setTimeout(() => SFX.play("move"), 450);
        setTimeout(() => jyComic(post.length ? post : null, () => {
          if (stEl) stEl.innerHTML = "Čierny: <b>6…Va4</b>";
          jyS2MovePiece(svg, "d4", "a4", () => {
            JV.busy = false; jyS2BoardRender();
            const s5 = $("#jy-svg"), [nx, ny] = jyXY(JY_SEASON.path[4]); if (s5) jyBurst(s5, nx + 50, ny + 50);
          });
        }), 1900);
      }, 450);
    });
    const fx = `<img class="jy-open" src="${JY_IMG(B.imgDone)}" alt="">`;
    jyModal(`<div class="jy-win"><div class="jy-obst"><img src="${JY_IMG(B.img)}" alt="">${fx}</div><h2>${B.head || "Zrkadlo prasklo!"}</h2><p>+${JY_XP.boss} bodov. ${B.winTxt || ""}</p></div>`, [["Pokračovať", "primary", go]]);
    setTimeout(() => { const o = document.querySelector(".jy-open"); if (o) o.classList.add("on"); }, 400);
    setTimeout(() => SFX.story(B.sfx || "s2-zrkadlo"), 350);
    return;
  }
  if (i === 4){
    JV.finale = true; SFX.play("win"); confetti(null);
    const fin = JY_COMICS.fin || [], f1 = fin.slice(0, 2), f1c = fin[2] ? [fin[2]] : null, f23 = fin.slice(3);
    const go = () => jyComic(f1.length ? f1 : null, () => {
      JV.view = "board"; JV.busy = true; jyS2BoardRender();
      const svg = $("#jy-svg"); if (!svg){ JV.busy = false; return; }
      const r4 = jyS2Game(4, true); if (r4.map.c2){ r4.map.b3 = r4.map.c2; delete r4.map.c2; }
      jyS2RenderMapPieces(svg, r4.map);
      const stEl = $("#jy-status");
      setTimeout(() => {
        if (stEl) stEl.innerHTML = "Čierny: <b>7…Vh4</b> – Fujavica uteká pred Kráľom Hugom!";
        jyS2MovePiece(svg, "a4", "h4", () => jyComic(f1c, () => {
          if (stEl) stEl.innerHTML = "Biely: <b>8.Vc1#</b> · 👑 <b>Mat!</b>";
          jyS2MovePiece(svg, "c8", "c1", () => {
            const mk = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            [["x",0],["y",700],["width",100],["height",100],["fill","#e4572e"],["opacity",".55"]].forEach(([a, v]) => mk.setAttribute(a, v));
            const fxG = svg.querySelector("#jy-fx"); if (fxG) fxG.before(mk);
            SFX.play("win"); jyBurst(svg, 50, 750, 20); jyBurst(svg, 250, 750, 20);
            setTimeout(() => {
              JV.busy = false;
              const ep = () => { jyRender(); if (!jyState().epilog) jyComic("epilog", () => { JV.finale = false; jySave({epilog:true}); }); else JV.finale = false; };
              if (f23.length) jyComic(f23, ep); else ep();
            }, 1600);
          });
        }));
      }, 450);
    });
    jyModal(`<div class="jy-win"><img src="${JY_IMG(B.img)}" alt="" class="jy-defeat"><h2>${esc(B.name)} je porazený! 🏆</h2><p>+${JY_XP.boss} bodov. ${B.winTxt || ""}</p></div>`, [["Pokračovať", "primary", go]]);
    return;
  }
}
/* výhra nad bossom: animácia prekážky → komiks → ťah na šachovnici */
function jyBossWin(i){
  if (jyS2()) return jyS2BossWin(i);
  const L = JY_SEASON.places[i], B = L.boss;
  if (i === JY_LAST) JV.finale = true;
  if (i < JY_LAST) SFX.stinger("vyhra", "win"); else SFX.play("win"); confetti(null);
  const all = JY_COMICS[JY_AFTER_BOSS[i]] || [], pre = all.filter(x => !x.after && !x.mid && !x.book), mid = all.filter(x => x.mid), post = all.filter(x => x.after);
  const go = () => jyComic(pre.length ? pre : null, () => jyAnimateAdvance(i, post.length ? done => jyComic(post, done) : null, mid));
  const wt = B.winTxt || `Béčko môže zahrať <b>${L.move}</b>.`;
  if (B.type !== "obstacle") return jyModal(`<div class="jy-win"><img src="${JY_IMG(B.img)}" alt="" class="jy-defeat"><h2>${esc(B.name)} je porazený! 🏆</h2><p>+${JY_XP.boss} bodov. ${wt}</p></div>`, [["Pokračovať", "primary", go]]);
  const fx = B.anim === "jump" ? `<div class="jy-jumper"><svg viewBox="0 0 100 100">${JY_PAWN()}</svg></div>` : `<img class="jy-open" src="${JY_IMG(B.imgDone)}" alt="">`;
  const head = B.head || (B.anim === "jump" ? "Béčko skočil o dve políčka naraz!" : B.anim === "fog" ? "Tieň sa rozplynul!" : "Brána sa odvalila!");
  jyModal(`<div class="jy-win"><div class="jy-obst"><img src="${JY_IMG(B.img)}" alt="">${fx}</div><h2>${head}</h2><p>+${JY_XP.boss} bodov. ${wt}</p></div>`, [["Pokračovať", "primary", go]]);
  setTimeout(() => { const o = document.querySelector(".jy-open"); if (o) o.classList.add("on"); }, 400);
  setTimeout(() => SFX.story(B.sfx || (B.anim === "jump" ? "priepast-skok" : B.anim === "fog" ? "hmla" : "brana")), B.anim === "jump" ? 500 : 350);
}
function jyStartBoss(){
  const st = jyState(), i = st.pos, L = JY_SEASON.places[i], p = st.places[i];
  if (jyStepUsed(st) || p.steps < JY_STEPS || p.bossWon) return;
  const ease = 50 * Math.min(p.bossTries || 0, 2);   // po prehre je ďalší súboj o kúsok ľahší
  const BN = JY_SEASON.bossN || JY_BOSS_N, list = jyPickRated(L.pools.core, [...rtOff("boss"), 0, 50].slice(0, BN).map(o => o - ease), {boss:true, asc:true});
  if (L.boss.sfxPre) setTimeout(() => SFX.story(L.boss.sfxPre), 300);
  jyModal(`<div class="jy-win"><img src="${JY_IMG(B_img(L))}" alt="" class="jy-defeat"><h2>${esc(L.boss.name)}</h2><p>${esc(L.boss.how)}</p>
    <p class="sub">${BN} pozícií, ktoré si ešte nevidel. Máš ${2 + (p.perks && p.perks.heart ? 1 : 0)} srdiečka – každá chyba stojí jedno.${p.perks && (p.perks.hint || p.perks.zoom || p.perks.compass) ? " Výhody z odbočiek môžeš použiť počas súboja." : ""}${p.perks && p.perks.undo ? " 🛡️ Albín ti raz vráti zlý ťah bez straty srdiečka." : ""}</p></div>`,
    [["⚔️ Do toho!", "primary", () => jyTaskStart({kind:"boss", place:i, list, title:`Súboj: ${L.boss.name}`})], ["Teraz nie", "", null]]);
}
const B_img = L => L.boss.img;

/* ---------- Pretek rýchloviek (Gusto) ---------- */
function jyRaceStart(i){
  const st = jyState(), prev = (st.race || []).filter(r => r.ms).slice(-1)[0] || null;
  const list = jyShuffle([...jyRushItems("m"), ...jyRushItems("w")]).slice(0, JY_RACE_N);
  jyModal(`<div class="jy-say big"><img src="${JY_IMG("pc-w-gusto")}" alt=""><div><h2>⚡ Gusto ťa vyzýva!</h2><p><b>Gusto:</b> „${prev ? `Minule si to dal za ${fmtS(prev.ms)}. Uvidíme, či ma dnes predbehneš!` : "Kto bude rýchlejší? Ja pobežím tak rýchlo ako ty – a nabudúce budem pretekať s tvojím dnešným časom!"}“</p>
    <p class="sub">${JY_RACE_N} jednoťahových úloh. Za chybu je +5 sekúnd.</p></div></div>`,
    [["Štart!", "primary", () => { jyTaskStart({kind:"race", place:i, list, title:"⚡ Pretek rýchloviek", shadow: prev ? prev.ms : null}); JT.start = performance.now(); JT.timer = setInterval(jyRaceLanes, 100); }], ["Teraz nie", "", null]]);
}
function jyRaceLanes(){
  if (!JT || JT.kind !== "race" || !JT.start) return;
  const el = (performance.now() - JT.start) + (JT.pen || 0), me = JT.res.length / JT.list.length;
  const gu = JT.shadow ? Math.min(1, el / JT.shadow) : Math.min(1, el / (JY_RACE_N * 6000));
  const a = $("#jy-me"), b = $("#jy-gu"); if (!a) return;
  a.style.width = (me * 100) + "%"; b.style.width = (gu * 100) + "%";
  $("#jy-racet").textContent = `Čas: ${fmtS(el)}${JT.shadow ? ` · Gustov čas: ${fmtS(JT.shadow)}` : ""}`;
}
function jyRaceEnd(o, seen, fail){
  clearInterval(o.timer);
  const st = jyState(), ms = Math.round(performance.now() - o.start + (o.pen || 0)), ok = o.res.filter(Boolean).length;
  const beat = o.shadow ? ms < o.shadow : null, err = o.list.length - ok, fast = beat === true || (beat === null && ms < JY_RACE_N * 6000);
  const n = fast && err <= 1 ? 3 : fast || err <= 1 ? 2 : 1;
  const prevN = ((st.places[o.place].stars || {}).race) || 0;
  jySaveStars(o.place, "race", n); if (beat === false) SFX.play("ok"); else SFX.stinger("vyhra", "win"); SFX.stars(n);
  jySave({race:[...(st.race || []).slice(-30), {date:jyToday(), ms, ok, n:o.list.length}], seen, fail});
  const fresh = jySideDoneSave(o.place, "race");
  jyCreditDay({rush:true}, o.res.length);
  jyModal(`${jySidePic(jySidePost("race", n))}${jyStarsHtml(n)}<div class="jy-say big"><img src="${JY_IMG("pc-w-gusto")}" alt=""><div><h2>${beat === true ? "Predbehol si Gusta! 🏁" : beat === false ? "Gusto bol tentoraz rýchlejší" : "Cieľ! 🏁"}</h2>
    <p>Tvoj čas: <b>${fmtS(ms)}</b> · správne ${ok} z ${o.list.length}${o.shadow ? ` · minule ${fmtS(o.shadow)}` : ""}</p>
    <p><b>Gusto:</b> „${beat === true ? "Čo?! Ty si rýchlejší ako ja? Zajtra ti to vrátim!" : beat === false ? "Hehe, tentoraz som bol prvý. Ale len o kúsok!" : "Dobre si bežal! Nabudúce budem pretekať s týmto tvojím časom."}“</p>${fresh && !st.places[o.place].bossWon && JY_SIDES.race.perkT ? `<p class="sub">${esc(JY_SIDES.race.perkT)}</p>` : ""}</div></div>`,
    [["Ďalej", "primary", () => { jyGo("land", o.place); if (fresh || n > prevN) setTimeout(() => jyLetter(o.place, "race"), 900); }]]);
}

/* ---------- pre rodiča ---------- */
function jyParentHtml(){
  const st = jyState(), last = st.stats.slice(-8).reverse();
  return `<details class="jy-parent"><summary>Pre rodiča</summary>
    <p class="sub">Za deň najviac 1 krajina (5 krokov aj súboj s bossom); po prehre so súbojom sa dá skúsiť znova ešte v ten deň. Súboj = ${JY_SEASON.bossN || JY_BOSS_N} nových pozícií z témy (odložené mimo tréningu), výhra pri najviac 1 chybe (2 s ❤️ z Tajnej jaskyne).</p>
    ${last.length ? `<div class="jy-plog">${last.map(r => `<div><span>${fmtDate(r.d)}</span><span>${r.k === "boss" ? "súboj" : "krok"} · ${esc(JY_SEASON.places[r.place].short)}</span><b>${r.ok}/${r.n}${r.k === "boss" ? (r.won ? " ✔" : " ✖") : ""}</b></div>`).join("")}</div>` : ""}
    ${rtParentHtml()}
    <div class="row">${jyBtn("unlock", "Povoliť ďalšiu krajinu ešte dnes")}${!jyS2() && window.JY_S2 && !jySeasonUnlocked() ? jyBtn("s2open", "Odomknúť sezónu 2 už teraz") : ""}</div></details>`;
}
/* rating pre rodiča: celkový, podľa tém, úspešnosť na 1. pokus z posledných 30 úloh a zmena za 7 dní */
function rtParentHtml(){
  const R = rtDoc(), log = R.log;
  if (!R.all.n) return `<p class="sub"><b>Rating úloh:</b> zatiaľ bez hodnotených úloh. Počíta sa prvý pokus o novú úlohu v krokoch, odbočkách a súbojoch (štart ${rtStart()}).</p>`;
  const wk = new Date(Date.now() - 7 * 864e5).toISOString().slice(0, 10);
  const prev = log.filter(e => e.d < wk).slice(-1)[0], trend = prev ? Math.round(R.all.r - prev.a) : null;
  const pct = es => es.length ? Math.round(100 * es.filter(e => e.s).length / es.length) + " %" : "–";
  const rows = Object.entries(RT_THEMES).map(([k, name]) => { const t = R.th[k], es = log.filter(e => e.t === k).slice(-30);
    return `<div><span>${name}</span><span>${t.n ? Math.round(t.r) : "–"}${t.n && t.n < 20 ? " <small>(predbežný)</small>" : ""}</span><b>${t.n} úloh · ${pct(es)}</b></div>`; }).join("");
  return `<p class="sub"><b>Rating úloh: ${Math.round(R.all.r)}</b>${R.all.n < 20 ? " (predbežný)" : ""} · ${R.all.n} hodnotených úloh · na 1. pokus ${pct(log.slice(-30))} z posledných 30${trend != null ? ` · za 7 dní ${trend >= 0 ? "+" : ""}${trend}` : ""}</p>
    <div class="jy-plog">${rows}</div>
    <p class="sub">Úlohy sa vyberajú podľa ratingu témy: krok cesty o 300 nižšie (~85 % úspech), Tajná jaskyňa okolo jeho úrovne, súboj stúpa od −350 po −100. Ratingy úloh z kníh sú odhad podľa sady.</p>`;
}

/* ---------- udalosti ---------- */
document.addEventListener("click", e => {
  const b = e.target.closest("[data-jy]"); if (!b || !(($("#v-jy") && $("#v-jy").contains(b)) || ($("#jy-modal") && $("#jy-modal").contains(b)))) return;
  if (JV.busy) return;
  const a = b.dataset.jy, st = jyState();
  if (a === "start"){ jyComic("prolog", () => { jySave({started:true, pos:0}); jyBoardRender(); setTimeout(() => { const svg = $("#jy-svg"), [x, y] = jyXY(JY_SEASON.path[0]); if (svg) jyBurst(svg, x + 50, y + 50); }, 100); }); return; }
  if (a === "land") return jyEnterLand(+b.dataset.i);
  if (a === "board") return jyGo("board");
  if (a === "book") return jyGo("book");
  if (a === "replay") return jyReplay();
  if (a === "season") return jySeasonGo(b.dataset.s);
  if (a === "s2open") return jyModal(`<div class="jy-win"><h2>❄️ Odomknúť sezónu 2?</h2><p>Sezóna 2 – Ľadová ríša sa normálne odomkne po epilógu sezóny 1. Ak chceš, môžeš ju odomknúť už teraz. Rozohraná sezóna 1 ostane tak, ako je.</p></div>`,
    [["Odomknúť", "primary", () => { jySave({s2open:true}); jyToast("Sezóna 2 je odomknutá ❄️"); jyRender(); }], ["Nie", "", null]]);
  if (a === "comic") return jyComic(b.dataset.c, null);
  if (a === "meet") return jyComic(jyMeetComic(b.dataset.i != null ? +b.dataset.i : JV.cur), () => { const i = b.dataset.i != null ? +b.dataset.i : JV.cur; if (!st.places[i].met) jySavePlace(i, {met:true}); });
  if (a === "letter") return jyLetter(+b.dataset.i, b.dataset.k);
  if (a === "tale") return jyModal(`<div class="jy-say big"><img src="${JY_IMG("pc-w-albin")}" alt=""><div><span class="label">Albín rozpráva · ${jyAlbinLabel(+b.dataset.k)}</span><p class="jy-tale">${esc(JY_ALBIN_TALES[+b.dataset.k])}</p></div></div>`, [["Zavrieť", "", null]]);

  if (a === "pc") return jyPostcard(+b.dataset.i, +b.dataset.k, false);
  if (a === "lureclose"){ JV.lure = null; return jyLandRender(); }
  if (a === "step") return jyStartStep();
  if (a === "boss") return jyStartBoss();
  if (a === "done"){ JV.after = null; jyToast(`Hotovo na dnes ✔ ${jyHero()} si oddýchne a zajtra pokračuje.`); return jyGo("board"); }
  if (a === "quit"){ if (JT && JT.timer) clearInterval(JT.timer); rtFlush(); const i = JT ? JT.place : JV.cur; JT = null; return jyGo("land", i); }
  if (a === "tnext"){ if (JT && JT.wait){ const f = JT.wait; JT.wait = null; f(); } return; }
  if (a === "ana" && JT){ anaFrom(JT.x.f, JT.c, JT.me, {tab:"jy"}); return; }
  if (a === "showsol"){ jyShowSol(); return jyTaskRender(); }
  if (a === "hint" && JT){ const sol = jySol(); if (sol){ JT.hint = sol.slice(0, 2); JT.used.hint = true; JT.helped = true; JT.msg = "Nápoveda: touto figúrkou."; JT.msgCls = ""; } return jyTaskRender(); }
  if (a === "zoom" && JT){ const sol = jySol(); if (sol){ const r = sol[3]; JT.zoom = "abcdefgh".split("").map(f => f + r); JT.used.zoom = true; JT.helped = true; JT.msg = "Lupa: hľadaj ťah na zvýraznený rad."; JT.msgCls = ""; } return jyTaskRender(); }
  if (a === "compass" && JT){ const sol = jySol(); if (sol){ const f = sol[2]; JT.compass = "12345678".split("").map(r => f + r); JT.used.compass = true; JT.helped = true; JT.msg = `Gustov kompas: hľadaj ťah na stĺpec ${f}.`; JT.msgCls = ""; } return jyTaskRender(); }
  if (a === "reset") return jyModal(`<div class="jy-win"><h2>↺ Začať putovanie odznova?</h2><p>${jyS2() ? JY_SEASON.txt.resetT : "Celé putovanie sa vymaže: kroky, odbočky, porazení bossovia, listy z lesa aj pohľadnice. Béčko sa vráti na b2 a príbeh začne prológom."}</p><p class="sub">Body, ktoré už máš, aj odznaky ostanú.</p></div>`,
    [["Áno, začať odznova", "danger", jyReset], ["Nie, nechať tak", "primary", null]]);
  if (a === "more") return jyModal(`<div class="jy-win"><h2>Hrať ďalej?</h2><p>Dnes si už prešiel celú krajinu – to je veľa! Novú krajinu si zaslúžiš zajtra s čerstvou hlavou.</p><p class="sub">Ak rodič súhlasí, môžeš pokračovať aj dnes.</p></div>`,
    [["Rodič súhlasí – hrať ďalej", "primary", () => { jySave({dayPlace:null}); JV.msg = "Ďalšia krajina je dnes povolená. Dobrú cestu!"; jyGo("land", jyState().pos); }], ["Pokračujem zajtra", "", null]]);
  if (a === "unlock"){ jySave({dayPlace:null}); JV.msg = "Ďalšia krajina je dnes povolená."; return jyGo("land", JV.cur); }
  if (a === "side") return jySideOpen(b.dataset.k, b.dataset.from);
  if (a === "guide"){ const L = JY_SEASON.places[JV.cur], p = st.places[JV.cur]; JV.msg = `<b>${esc(L.guide.name)}:</b> „${esc(p.steps >= JY_STEPS ? L.guide.preBoss : L.guide.steps[Math.min(p.steps, JY_STEPS - 1)])}“`; return jyLandRender(); }
  if (a === "stepdot"){ const p = st.places[JV.cur], k = +b.dataset.i; JV.msg = k < p.steps ? "Tento krok už máš za sebou ✓" : k > p.steps ? "Najprv predchádzajúce políčko." : jyStepUsed(st) ? "Dnes si už prešiel jednu krajinu – sem sa vydáš zajtra. Môžeš skúsiť odbočku!" : ""; if (!JV.msg && JV.cur === st.pos) return jyStartStep(); return jyLandRender(); }
  if (a === "bossdot"){ const p = st.places[JV.cur], L = JY_SEASON.places[JV.cur]; if (p.bossWon) JV.msg = `${esc(L.boss.name)} – zvládnuté 🏆`; else if (p.steps < JY_STEPS) JV.msg = `🔒 ${esc(L.boss.name)} sa ukáže až po ${JY_STEPS} krokoch cesty.`; else if (jyStepUsed(st)) JV.msg = "Dnes si už prešiel jednu krajinu – na bossa sa vrhneš zajtra."; else return jyStartBoss(); return jyLandRender(); }
});
document.addEventListener("click", e => { const q = e.target.closest("#jy-board [data-sq]"); if (q) jySquare(q.dataset.sq); });
document.addEventListener("DOMContentLoaded", () => {
  $("#jy-cnext").onclick = e => { e.stopPropagation(); jyComicNext(); };
  $("#jy-cwrap").onclick = jyComicNext;
  $("#jy-cprev").onclick = e => { e.stopPropagation(); if (JC && JC.i > 0){ JC.i--; jyComicRender(); } };
  $("#jy-cskip").onclick = e => { e.stopPropagation(); jyComicClose(); };
  document.addEventListener("keydown", e => { if (!JC) return; if (e.key === "ArrowRight" || e.key === " "){ e.preventDefault(); jyComicNext(); } if (e.key === "ArrowLeft" && JC.i > 0){ JC.i--; jyComicRender(); } if (e.key === "Escape") jyComicClose(); });
  window.addEventListener("resize", () => { if (JC) jyComicRender(); });
});

/* štýly pre titulnú obrazovku, prázdne políčka albumu a papier listov (16. 11.) */
(function(){ if (document.getElementById("jy-css-1611")) return; const c = document.createElement("style"); c.id = "jy-css-1611";
  c.textContent = `.jy-titlepic{width:100%;aspect-ratio:16/9;object-fit:cover;border-radius:18px;box-shadow:0 8px 28px #0007;display:block}
.jy-album span.jy-alb-empty{opacity:.85;background:none}
.jy-paper{background:url(${JY_IMG("list-z-lesa")}) center/100% 100% no-repeat;color:#3b2a16;padding:17% 16% 19%;border-radius:8px;aspect-ratio:3/4;max-width:460px;margin:0 auto;box-shadow:0 6px 20px #0006}
.jy-th-s2 .jy-paper{background-image:url(${JY_IMG("list-z-ladovej-rise")})}.jy-paper .label{color:#7a5a2e;opacity:1}.jy-paper h2{color:#3b2a16;margin:.3em 0}.jy-paper p{color:#3b2a16}`;
  document.head.appendChild(c); })();

/* úvodná veta listu z lesa podľa hviezdičiek odbočky (17. 11.): JY_LETTER_R[miesto][odbočka] = [⭐, ⭐⭐, ⭐⭐⭐] */
const JY_LETTER_R = {"0": {"datel": ["Dnes to dalo zabrať, ale nevzdal si sa – a to je pre ďatľa najdôležitejšie.", "Väčšinu úloh si trafil hneď, len pri pár si musel klopať dvakrát.", "Béčko, všetky úlohy na prvý pokus – klopal si presnejšie ako ja!"], "castle": ["U Albína si to dnes zvládol. Nevadí, že to ešte nešlo hladko – aj ja som sa učil roky.", "Otvorenie ti u Albína išlo pekne, už len pár ťahov si zapamätať lepšie.", "U Albína si to zvládol bez jedinej chyby – tak to robia veľmajstri!"], "cave": ["Ťažké úlohy ti dali zabrať, ale do hniezda si sa aj tak dostal.", "Jednu ťažkú úlohu si vyriešil hneď, pri druhej si potreboval ešte jeden pokus.", "Obe ťažké úlohy si vyriešil na prvý pokus a dračie hniezdo sa rozžiarilo."], "well": ["Voda bola zakalená, ale postupne sa vyjasnila. Niektoré úlohy si ešte zopakuj.", "Voda sa len trochu čerí – väčšinu úloh si si pamätal.", "Voda je dnes celkom čistá – všetky staré úlohy si vyriešil hneď."]}, "1": {"datel": ["Dnes si musel klopať viackrát, ale oba chodníky si nakoniec našiel.", "Väčšinu úloh si trafil hneď, len pri pár si zaváhal, ktorým chodníkom ísť.", "Všetky úlohy na prvý pokus – videl si obe hrozby skôr ako ja!"], "race": ["Tentoraz som bol rýchlejší ja – ale len o kúsok!", "Dobehli sme naraz, každý iným chodníkom! Nabudúce ťa však predbehnem.", "Predbehol si ma! Kým som sa rozhodoval, kadiaľ bežať, ty si už bol v cieli."], "castle": ["U Albína si to dotiahol do konca, hoci niektoré ťahy si treba zopakovať.", "Otvorenie ti išlo pekne, len občas si nevidel, čím hrozíš.", "U Albína bez chyby – každým ťahom si hrozil ako Viktor!"], "cave": ["Mapa bola stará a ťažko čitateľná, ale rozlúštil si ju.", "Jednu úlohu si vyriešil hneď, pri druhej si potreboval ešte pokus.", "Obe ťažké úlohy na prvý pokus – mapa sa sama rozvinula."], "well": ["Pár úloh si zabudol, ale voda ti ich rada pripomenie znova.", "Takmer všetko si si pamätal.", "Všetky úlohy si si pamätal – oba potôčiky sú čisté ako sklo."]}, "2": {"datel": ["Dnes si musel klopať viackrát, ale aj tak si sa dostal až na koniec. Aj sova sa niekedy pomýli.", "Sova hovorí, že si väčšinu úloh trafil hneď. Pri ostatných si sa len musel lepšie započúvať.", "Sova vraj počula, ako si všetky úlohy vyriešil na prvý raz. Bez jedinej chybičky!"], "race": ["Tentoraz som bol v cieli prvý ja – ale len o kúsok!", "Dobehli sme úplne naraz! Nabudúce ťa však určite predbehnem.", "Predbehol si ma! Asi preto, že ja sa pri behu stále obzerám."], "castle": ["U Albína si to dotiahol do konca, hoci pár ťahov ešte treba zopakovať.", "Väčšinu ťahov si zahral dobre, len občas si zabudol pozrieť, čo chce súper.", "Dnes si na každý ťah súpera odpovedal správne. Sova by bola hrdá!"], "cave": ["Úlohy boli ťažké, ale nakoniec si do jaskyne nahliadol.", "Jednu úlohu si vyriešil hneď, pri druhej si sa musel poobzerať.", "Obe ťažké úlohy si vyriešil hneď – ako keby si mal sovie oči."], "well": ["Na pár úloh si zabudol, ale studnička ti ich rada pripomenie znova.", "Takmer všetko si si pamätal.", "Všetky úlohy si si pamätal – hladina sa leskne ako zrkadlo."]}, "3": {"datel": ["Kamene boli dnes ťažké, ale každý si nakoniec odsunul.", "Väčšinu kameňov si odsunul hneď, pri pár si musel zatlačiť znova.", "Všetky kamene si odsunul hneď na prvý pokus! Čarodejník len pokýval hlavou."], "race": ["Dnes som bol prvý ja, ale ty sa každým pretekom zrýchľuješ.", "Zase sme v cieli naraz! Nabudúce ťa však predbehnem.", "Bol si rýchlejší ako ja – uhol si sa každej prekážke!"], "castle": ["Albínovu úlohu máš za sebou – nabudúce to pôjde ľahšie.", "Takmer každý ťah si zahral správne.", "Každý ťah si zahral presne ako v knihe!"], "cave": ["Kniha bola zaseknutá a dalo zabrať ju otvoriť, ale podarilo sa.", "Jedna úloha hneď, druhá na druhý pokus – a kniha sa pomaly otvorila.", "Obe úlohy na prvý pokus! Kniha sa otvorila sama."], "well": ["Niektoré úlohy si už zabudol – preto je dobré vracať sa.", "Väčšinu úloh si vyriešil hneď.", "Všetky staré úlohy hneď! Si rýchlejší ako kedykoľvek predtým."]}, "4": {"datel": ["Dnes si sa zamotal viackrát, ale z každej pavučiny si sa dostal von.", "Zamotal si sa len párkrát a vždy si sa vyslobodil.", "Prešiel si všetky úlohy bez jediného zamotania! To sa podarí málokomu."], "race": ["Dnes som ťa predbehol, ale len preto, že som pavučiny roztrhal.", "V cieli sme boli spolu – ani pavúk nevedel povedať, kto bol prvý. Nabudúce ťa predbehnem!", "Predbehol si ma aj v pavučinách! Ako si to dokázal?"], "castle": ["Albínovu úlohu máš za sebou. Zopakuj si ju a uvidíš, že to pôjde lepšie.", "Otvorenie ti išlo dobre, len občas si zaváhal.", "Všetko si zahral bez chyby!"], "cave": ["Pavučiny ťa trochu zdržali, ale do jaskyne si sa dostal.", "Raz si sa dotkol vlákna, ale prekĺzol si.", "Ani raz si sa nedotkol pavučiny – obe úlohy na prvý pokus!"], "well": ["Pár vlákien sa pretrhlo, ale nové pribúdajú.", "Pavučina drží, len jedno vlákno je ešte tenké.", "Všetky tri úlohy na prvý pokus – tvoja pavučina pamäti pevne drží."]}, "5": {"datel": ["Klopal si dnes viackrát, ale vydržal si až do konca. Medveď hovorí, že trpezlivosť je kráľovská vlastnosť.", "Väčšinu úloh si vyriešil hneď. Medveď sa raz-dvakrát pohol zo spánku, ale nezobudil sa.", "Všetky úlohy na prvý pokus – a tak potichu, že ani medveď sa nezobudil!"], "race": ["Tentoraz som vyhral ja, ale aj tak som na teba hrdý.", "Do cieľa sme dobehli spolu – ako najlepší kamaráti. Ale nabudúce ťa predbehnem!", "Predbehol si ma aj v poslednom preteku! Si najrýchlejší pešiak v celom lese."], "castle": ["Albínova úloha je za tebou. Aj starý jazdec ako ja potreboval veľa opakovaní.", "Otvorenie si zahral pekne, takmer bez chyby.", "Tri hviezdičky! Teraz už otvorenie hráš lepšie ako ja kedysi."], "cave": ["Liezť do dutiny bolo ťažké, ale dostal si sa až dnu.", "Jednu úlohu hneď, druhú na druhý pokus – dutina sa pomaly rozsvietila.", "Obe úlohy si vyriešil hneď a dutina dubu sa rozžiarila zlatom."], "well": ["Niečo sa ti ešte pletie, ale celú cestu máš za sebou.", "Takmer všetko si si zapamätal.", "Všetky úlohy na prvý pokus – nosíš si v hlave celú cestu."]}};

/* ===== Téma sezóny (17. 11.; od 19. 11. vo všetkých záložkách): celá aplikácia (hlavička, záložky, panely, tlačidlá, šachovnica úloh, okná)
   preberie štýl aktuálneho príbehu. Pre ďalšiu sezónu stačí pridať JY_THEMES.<id> s vlastnými farbami. ===== */
const JY_THEMES = {
  s1:{ // Les vidličiek – pergamen, drevo, mach, zlato
    vars:{"--bg":"#efe4c8","--panel":"#fffaf0","--ink":"#2b1d0e","--muted":"#5c4528","--line":"#d9c49a","--accent":"#e2a32a","--accent-ink":"#3b2410","--chart":"#5e7f3a","--inacc":"#9a7a00","--mistake":"#b85f12",
      "--sq-light":"#f0e4c4","--sq-dark":"#8db36b","--sq-sel":"#f6d36b","--sq-last":"#f3c95a","--pc-white":"#fffaf0","--pc-black":"#2a2b45","--pc-stroke":"#3b2a17",
      "--best":"#3f8a3a","--blunder":"#b8432c","--f-display":"Georgia,'Palatino Linotype','Book Antiqua',serif"},
    tint:"rgba(244,234,208,.88)", tint2:"rgba(244,234,208,.95)",
    edge:"#cfb27c", btn:["#fffaf0","#f1e2bf","#b8925a","#4a3216"], primary:["#f8cd5c","#e09c22","#a8690e","#3b2410"],
    wood:["#8a5a33","#5e3b1f"], say:["#f6ead0","#e2c98f"], tiles:false, pieces:false
  }
};
function jyThemeApply(){
  const id = JY_SEASON.id, t = JY_THEMES[id]; if (!t) return;
  const de = document.documentElement, inJy = typeof S !== "undefined" && S.tab === "jy";
  let st = null; try { st = jyDoc(); } catch(e){}
  const last = JY_SEASON.places.length - 1, i = !inJy || JV.view === "board" ? Math.min((st && st.pos) || 0, last) : Math.min(JV.cur || 0, last);
  de.style.setProperty("--jy-land", `url(${JY_IMG(JY_SEASON.places[i].img)})`);
  /* 19. 11.: téma platí v celej aplikácii (nielen v Putovaní) – trieda jy-th-<sezóna> na <html> */
  /* 19. 11.: Nastavenia → Téma: "story" (podľa príbehu, predvolená) alebo "orig" (pôvodná – príbehová téma ostane len v Putovaní) */
  let pref = "story"; try { pref = localStorage.getItem("sach.theme") || "story"; } catch(e){}
  de.classList.forEach(c => { if (c.startsWith("jy-th-") && c !== "jy-th-" + id) de.classList.remove(c); });
  if (pref === "orig" && !inJy) { de.classList.remove("jy-th-" + id); return; }
  de.classList.add("jy-th-" + id);
  if (document.getElementById("jy-theme-" + id)) return;
  /* vyššia špecifickosť než @media (prefers-color-scheme:dark) :root:not([data-theme]) – inak na zariadení v tmavom režime ostal svetlý text */
  const R = `html:root.jy-th-${id}:not(#jy-no-theme)`, V = `${R} #v-jy`, M = `${R} .jy-mbox`, A = R;
  const c = document.createElement("style"); c.id = "jy-theme-" + id;
  c.textContent = `${R}{${Object.entries(t.vars).map(([k, v]) => k + ":" + v).join(";")};color-scheme:light}
${R} body{background:linear-gradient(${t.tint},${t.tint2}),var(--jy-land,none) center/cover fixed}
${R} .panel,${M}{border:2px solid ${t.edge};border-radius:16px;box-shadow:0 3px 0 ${t.edge}66,0 10px 24px #5a3d1a22}
${R} button{border:2px solid ${t.btn[2]};border-radius:999px;background:linear-gradient(${t.btn[0]},${t.btn[1]});color:${t.btn[3]};box-shadow:0 3px 0 ${t.btn[2]};transition:transform .08s,box-shadow .08s}
${R} button:hover{filter:brightness(1.04)}
${R} button:active{transform:translateY(2px);box-shadow:0 1px 0 ${t.btn[2]}}
${R} button.primary{background:linear-gradient(${t.primary[0]},${t.primary[1]});border-color:${t.primary[2]};color:${t.primary[3]};box-shadow:0 3px 0 ${t.primary[2]}}
${R} button:disabled{box-shadow:none}
${R} .tab{background:none;border:none;border-bottom:3px solid transparent;border-radius:0;box-shadow:none;font-family:var(--f-display);color:var(--muted)}
${R} .tab[aria-selected="true"]{color:var(--ink);border-bottom-color:var(--accent)}
${R} .tab:active{transform:none}
${R} .navtabs{border-bottom:2px solid ${t.edge}}
${R} h1,${R} h2,${R} h3{font-family:var(--f-display)}
${R} input,${R} select,${R} textarea{background:#fffdf7;border-color:${t.edge}}
${V} .jy-say{background:${t.say[0]};border:2px solid ${t.say[1]}}
${V} .jy-say img{border-color:${t.primary[1]}}
${V} .jy-chip,${V} .jy-story{border:2px solid ${t.edge}}
${V} .jy-tboard{padding:3.2%;border-radius:14px;background:linear-gradient(135deg,${t.wood[0]},${t.wood[1]});box-shadow:inset 0 0 0 2px #0003,0 8px 22px #3b2a1755}
${V} .jy-tboard .board{border-radius:4px;box-shadow:0 0 0 2px #0004}
${t.tiles ? `${V} .sq.l{background:var(--sq-light) url(${JY_IMG("tile-light")}) center/cover}
${V} .sq.d{background:var(--sq-dark) url(${JY_IMG("tile-dark")}) center/cover}` : ""}
${A} .pc{filter:drop-shadow(0 2px 1px #0006)}
${A} .pc.w{-webkit-text-stroke:1.6px var(--pc-stroke)}
${A} .pc.b{-webkit-text-stroke:.8px var(--pc-black)}
${V} .jy-dots i{border:1px solid ${t.edge}}
${R} .boardrow .board{border:9px solid ${t.wood[1]};border-image:linear-gradient(135deg,${t.wood[0]},${t.wood[1]}) 1;border-radius:0;box-shadow:0 8px 22px #3b2a1755}
${R} .evalbar{border:2px solid ${t.wood[1]};border-radius:6px}
${R} .graph,${R} .tip,${R} .toast,${R} .trbar,${R} .promo-box{border:2px solid ${t.edge};border-radius:14px}
${R} .mode-hero,${R} .end-hero{border:2px solid ${t.edge}}
${R} .label{color:var(--muted)}
${A} .pc.pcimg{position:absolute;inset:0;display:flex;align-items:flex-end;justify-content:center;padding-bottom:2%;-webkit-text-stroke:0}
${A} .pc.w.pcimg{filter:drop-shadow(0 0 .6px #4a3216) drop-shadow(0 0 .6px #4a3216) drop-shadow(0 2px 2px #0006)}
${A} .pc.b.pcimg{filter:drop-shadow(0 0 .8px #e9dcff) drop-shadow(0 2px 2px #0007)}
${A} .pc.pcimg img{max-width:94%;width:auto;display:block;pointer-events:none;-webkit-user-drag:none}`;
  document.head.appendChild(c);
}

/* maľované figúrky na šachovnici úloh v Putovaní (17. 11., v2 = klasické figúrky bez tvárí): pcs-<farba>-<typ>.webp, výška ako podiel poľa */
const JY_PCS_H = {"wp": 0.883, "wn": 0.921, "wb": 0.933, "wr": 0.902, "wq": 0.948, "wk": 0.969, "bp": 0.88, "bn": 0.916, "bb": 0.925, "br": 0.909, "bq": 0.946, "bk": 0.971};
function jyPaintPieces(el){
  const t = JY_THEMES[JY_SEASON.id]; if (!t || !t.pieces || !el) return;
  const inv = {}; for (const k in GLYPH) inv[GLYPH[k]] = k;
  el.querySelectorAll(".pc").forEach(p => {
    const ty = inv[p.textContent.trim()] || inv[p.textContent], col = p.classList.contains("w") ? "w" : "b"; if (!ty) return;
    p.classList.add("pcimg"); p.innerHTML = `<img src="${JY_IMG("pcs-" + col + "-" + ty)}" alt="" draggable="false" style="height:${(JY_PCS_H[col + ty] * 100).toFixed(1)}%">`;
  });
}

/* štýly hradu (17. 11.) */
(function(){ if (document.getElementById("jy-css-hrad")) return; const c = document.createElement("style"); c.id = "jy-css-hrad";
  c.textContent = `.jy-grow{display:flex;flex-direction:column;gap:6px;margin:6px 0}.jy-grow-t{font-size:.92rem}
.jy-grow-bar{position:relative;height:12px;border-radius:6px;background:var(--line);overflow:hidden}.jy-grow-bar i{display:block;height:100%;background:linear-gradient(90deg,#e8b84a,#f6d36b);border-radius:6px}
.jy-gal-btn{align-self:flex-start;margin-top:2px}.jy-gal{display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin:8px 0}.jy-gal-t{position:relative;padding:0;border-radius:8px;overflow:hidden;aspect-ratio:16/9;border:2px solid transparent;background:var(--line)}.jy-gal-t img{width:100%;height:100%;object-fit:cover;display:block}.jy-gal-t span{position:absolute;left:4px;bottom:2px;font-weight:700;color:#fff;text-shadow:0 1px 3px #000}.jy-gal-t.on{border-color:#e8b84a}.jy-gal-t.lock{display:flex;align-items:center;justify-content:center;opacity:.7}.jy-gal-t.lock span{position:static;color:inherit;text-shadow:none;text-align:center;font-size:.8rem;font-weight:600}
.jy-grow-bar b{position:absolute;top:0;bottom:0;width:2px;background:#fff9}.jy-tale{font-family:Georgia,serif;font-size:1.08rem;line-height:1.55;font-style:italic;margin:4px 0 0}
.jy-tales{max-height:55vh;overflow:auto;padding:4px 6px;margin-top:8px}.jy-tales .jy-tale{margin:0 0 12px}.jy-tale-n{font-style:normal;color:var(--accent)}
.jy-csel{display:flex;flex-direction:column;gap:8px;margin:8px 0;padding:10px 12px;border:1px solid var(--line);border-radius:12px;background:var(--bg)}
.jy-csel-row{display:flex;flex-direction:column;gap:4px}.jy-csids{display:flex;flex-wrap:wrap;gap:6px}.jy-csid{padding:6px 10px;border-radius:999px;font-size:.88rem;font-weight:600}
.jy-cboard{position:absolute;inset:0;display:flex;align-items:center;gap:2.6%;padding:2.8%;background:radial-gradient(circle at 28% 50%,#2c231c,#141824 78%);color:#f7f1e3;font-family:var(--f-body)}
.jy-cb-stage{height:100%;aspect-ratio:1/1;flex:0 0 auto;display:flex;align-items:center;justify-content:center}
.jy-cb-svg{width:100%;height:100%;display:block;border-radius:12px;box-shadow:0 12px 32px #000a}
.jy-cb-side{flex:1;min-width:0;height:100%;display:flex;flex-direction:column;justify-content:space-between;gap:10px;padding:2% 1.5%;background:#1e2333cc;border:2px solid #d8a85266;border-radius:14px;overflow:hidden}
.jy-cb-head{display:flex;align-items:center;gap:10px}.jy-cb-head > div{min-width:0}.jy-cb-head img{width:clamp(34px,4.5vw,56px);height:clamp(34px,4.5vw,56px);border-radius:50%;object-fit:cover;border:2px solid #f2c14e;flex:0 0 auto}
.jy-cb-tag{display:block;font-size:clamp(10px,1vw,12px);text-transform:uppercase;letter-spacing:.6px;color:#f2c14e;font-weight:700}
.jy-cb-head h3{margin:2px 0 0;font-size:clamp(13px,1.55vw,20px);line-height:1.2;color:#fff7e6}
.jy-cb-cap{background:#fffdf6;color:#2b2218;border:2.5px solid #2b2218;border-radius:14px;padding:8px 11px;font-size:clamp(12px,1.4vw,17px);line-height:1.3;box-shadow:0 3px 0 #0004}
.jy-cb-cap b{color:#9a6b1f}
.jy-cb-steps{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:6px;flex:1;justify-content:center}
.jy-cb-steps li{display:flex;flex-direction:column;gap:1px;padding:6px 9px;border-radius:10px;background:#ffffff0d;border:1.5px solid transparent;opacity:.48;transition:all .3s ease;font-size:clamp(11px,1.15vw,14px);line-height:1.25}
.jy-cb-steps li b{color:#f2c14e;font-size:1.05em}
.jy-cb-steps li.done{opacity:.82;background:#ffffff14}
.jy-cb-steps li.now{opacity:1;background:#f2c14e22;border-color:#f2c14e;transform:translateX(3px)}
.jy-cb-replay{align-self:flex-start;padding:7px 13px;border-radius:10px;border:2px solid #f2c14e;background:#2b2218;color:#fff7e6;font-weight:700;font-size:clamp(11px,1.2vw,15px);cursor:pointer}
.jy-cb-replay:hover{background:#3d3022}
@media (max-width:720px){
  .jy-cwrap.boardmode{width:min(96vw,440px);aspect-ratio:auto;max-height:calc(100vh - 84px);overflow-y:auto}
  .jy-cwrap.boardmode .jy-cboard{position:static;flex-direction:column;gap:10px;padding:10px}
  .jy-cwrap.boardmode .jy-cb-stage{width:min(100%,46vh);height:auto}
  .jy-cwrap.boardmode .jy-cb-side{width:100%;height:auto;padding:10px 12px;gap:8px;overflow:visible}
  .jy-cwrap.boardmode .jy-cb-steps{gap:4px}
  .jy-cwrap.boardmode .jy-cb-steps li{padding:5px 8px;font-size:12px}
  .jy-cwrap.boardmode .jy-cb-cap{font-size:13px;padding:7px 10px}
  .jy-cwrap.boardmode .jy-cb-head h3{font-size:15px}
}`;
  document.head.appendChild(c); })();

/* tlačidlá vnútri okna hradu (okno je mimo #v-jy) */
document.addEventListener("click", e => {
  const b = e.target.closest("#jy-modal [data-jy]"); if (!b) return;
  const a = b.dataset.jy;
  if (a === "albsid"){ JV.castleSid = b.dataset.sid; JV.castleCh = null; jyCastle(+b.dataset.i); return; }
  if (a !== "albq" && a !== "albch" && a !== "albtales" && a !== "albgal") return;
  $("#jy-modal").hidden = true;
  if (a === "albgal") jyCastleGallery(+b.dataset.i, +b.dataset.s);
  else if (a === "albtales") jyAlbinTales(+b.dataset.i);
  else if (a === "albq") jyAlbinStart(+b.dataset.i, b.dataset.t === "1"); else jyCastleChapter(+b.dataset.i);
});
document.addEventListener("change", e => {
  const s = e.target.closest("#jy-modal select[data-jy='albch-sel']"); if (!s) return;
  JV.castleCh = s.value; jyCastle(+s.dataset.i);
});
