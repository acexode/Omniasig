import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
  selector: 'app-insurance-conditions',
  templateUrl: './insurance-conditions.component.html',
  styleUrls: ['./insurance-conditions.component.scss'],
})
export class InsuranceConditionsComponent implements OnInit {
  @HostBinding('class') color = 'ion-color-white-page';
  conditions = [
    `1. CLAUZA OPERATIVĂ`,
    `1.1. OMNIASIG VIENNA INSURANCE GROUP se obligă ca, în urma producerii sau apariţiei oricărui eveniment asigurat, în baza informaţiilor furnizate de Asigurat / Contractant, precum şi a oricăror date privind riscurile asigurate transmise în scris de acesta, sub rezerva respectării întocmai a condiţiilor, excluderilor şi clauzelor stabilite de comun acord şi în baza plăţii primei de asigurare în cuantumul şi la scadenţele prevăzute în Poliţă, să plătească Asiguratului sau, după caz, Beneficiarului despăgubirea cuvenită în cuantumul şi în condiţiile prevăzute în prezenta Poliţă.`,
    `2. DEFINIŢII ŞI INTERPRETĂRI`,
    `În tot cuprinsul acestei Poliţe termenii de mai jos au numai înţelesul atribuit prin următoarele definiţii:`,
    `2.1. Alunecare de teren: mişcare lină a terenului cauzată de mişcări tectonice sau de eroziune naturală.`,
    `Anexe: construcţii care nu sunt legate structural de locuinţă (boxă, garaj exterior, magazii, foişoare, grajduri, garduri de împrejmuire, porţi şi construcţii speciale de tipul: piscine, saune, fântâni arteziene, recipiente GPL, instalaţii solare, eoliene, rampe auto, alei, pavaje, grătar / cuptor exterior);`,
    `2.2. Apă de conductă:`,
    `- scurgeri accidentale de apă din ţevi de aducţie, derivaţie, evacuare sau canalizare, din alte instalaţii de alimentare cu apă sau de încălzire cu apă sau aburi, ca urmare a avariilor accidentale produse la aceste instalaţii aflate în incintele asigurate sau aflate în spaţiile învecinate aflate în clădirea în care se găsesc bunurile asigurate;`,
    `- scurgeri de apă provenită din spaţiile învecinate de locuit (care nu aparţin Asiguratului) aflate în clădirea în care se găsesc bunurile asigurate, din alte cauze decât avariile accidentale.`,
    `2.3. Asigurat: titularul interesului cu privire la bunul asigurat, respectiv persoana care poate suferi un prejudiciu patrimonial în situaţia în care bunul asigurat suferă o daună.`,
    `În cazul asigurării de răspundere civilă faţă de terţi, noţiunea de Asigurat se referă atât la proprietarul / locatarul locuinţei cât şi la persoanele care în mod statornic locuiesc împreună cu acesta şi/sau care au calitatea de soţ / soţie sau persoane pentru care răspunde conform legii.`,
    `2.4. Avalanşă de zăpadă: masă de zăpadă care se desprinde de pe coasta unui munte şi alunecă spre vale.`,
    `2.5. Beneficiar: persoana îndreptăţită să primească despăgubirea în caz de daună.`,
    `2.6. Boom sonic: acţiunea directă a presiunii generată de spargerea zidului sonic de către o aeronavă în zbor.`,
    `2.7. Bunuri conţinute: bunurile (altele decât cele care prin natura lor fac parte integrantă din construcţie) aparţinând Asiguratului sau persoanelor care în mod statornic locuiesc cu Asiguratul ori deţinute spre păstrare, folosinţă ori în grijă sau custodie de aceştia.`,
    `2.8. Caz fortuit: eveniment care nu poate fi prevăzut şi nici împiedicat de către cel care ar fi fost chemat să răspundă dacă evenimentul nu s-ar fi produs.`,
    `2.9. Cădere de corpuri aeriene: căderea accidentală de corpuri aeriene pe bunul asigurat. Se iau în considerare căderi de corpuri cum ar fi aeronave, părţi ale acestora ori meteoriţi. Nu se consideră cădere de corpuri aeriene căderea de părţi ale bunului asigurat şi nici căderea sau prăbuşirea unor corpuri terestre.`,
    `2.10. Centrală termică: instalaţie sau ansamblu de instalaţii destinate producerii agentului termic şi apei calde, care echipează locuinţa asigurată (instalaţii individuale sau de bloc / scară). Noţiunea de centrală termică cuprinde şi instalaţiile auxiliare ataşate (instalaţii pentru dedurizarea apei, arzătoare, boilere, schimbătoare de căldură, instalaţii de evacuare a gazelor arse).`,
    `2.11. Coliziune cu (auto)vehicule: impact nemijlocit al (auto)vehiculelor cu bunurile asigurate (clădiri şi/sau bunuri conţinute în locuinţă), aflate la adresa menţionată în Poliţă.`,
    `2.12. Contractant: persoana care încheie contractul de asigurare cu OMNIASIG VIENNA INSURANCE GROUP pentru şi în numele Asiguratului şi se obligă faţă de OMNIASIG VIENNA INSURANCE GROUP să plătească prima de asigurare precum şi să respecte obligaţiile care îi revin prin contract.`,
    `2.13. Culpă: vinovăţie, sub forma imprudenţei sau neglijenţei.`,
    `2.14. Culpa gravă: acţionarea cu neglijenţă sau imprudenţă pe care nici persoana cea mai lipsită de dibăcie nu ar fi manifestat-o faţă de propriile interese.`,
    `2.15. Cutremur: mişcare seismică bruscă a scoarţei terestre, orizontală, verticală sau de torsiune, datorată unui dezechilibru fizic produs în interiorul acesteia, având origine tectonică, vulcanică sau de prăbuşire.`,
    `2.16. Daună: prejudiciu material (avariere, distrugere, pierdere) provocat bunurilor asigurate de un eveniment asigurat, precizat în şi acoperit de asigurarea oferită de Poliţă.`,
    `2.17. Daună parţială: daună a bunului asigurat, astfel încât prin reparare, recondiţionare sau restaurare ori înlocuirea unor părţi componente, poate fi adus în starea în care se afla înaintea producerii sau apariţiei oricărui eveniment asigurat, costul aferent acestor operaţii fiind mai mic decât valoarea de asigurare.`,
    `2.18. Daună totală: daună a bunului asigurat într-un asemenea grad încât refacerea, repararea, înlocuirea, recondiţionarea sau restaurarea părţilor sau pieselor componente nu mai este posibilă ori costul acestora ar fi egal cu sau mai mare decât valoarea de asigurare.`,
    `2.19. Despăgubire cuvenită: suma datorată de OMNIASIG VIENNA INSURANCE GROUP Asiguratului sau Beneficiarului, după caz, urmare a producerii sau apariţiei oricărui eveniment asigurat.`,
    `2.20. Eveniment asigurat: risc asigurat care s-a produs sau începe să se manifeste în timpul perioadei de asigurare, cauzator de daune şi în urma căruia se naşte dreptul la despăgubire.`,
    `Se consideră unul şi acelaşi eveniment asigurat:`,
    `(i) seria de riscuri asigurate de acelaşi tip, produse în mod imprevizibil şi accidental şi acoperite de prezenta Poliţă, care apar sau încep să se manifeste în timpul perioadei de asigurare. Pentru anumite riscuri asigurate, definite în prezentele condiţii de asigurare, se consideră unul şi acelaşi eveniment asigurat seria de astfel de riscuri asigurate care apar sau încep să se manifeste într-un interval determinat, precizat în prezentele condiţii de asigurare, care începe în timpul perioadei de asigurare; niciun risc asigurat individual de acelaşi tip, produs în afara acestui interval nu va face parte din acelaşi eveniment asigurat;`,
    `(ii) mai multe riscuri asigurate de tipuri diferite precizate în şi acoperite de prezenta Poliţă, care concură la producerea uneia şi aceleiaşi daune.`,
    `2.21. Explozie: eliberare bruscă şi violentă de energie ca urmare a unei reacţii chimice sau fizice, însoţită de dezvoltare de lucru mecanic într-un timp foarte scurt.`,
    `2.22. Forţa majoră: situaţie invocată de una din părţi, dovedită cu documente emise de autorităţi publice competente şi cauzată de un eveniment extern, imprevizibil, absolut invincibil şi inevitabil care a împiedicat una din părţi să îşi îndeplinească obligaţiile contractuale.`,
    `2.23. Franşiză: partea din daună suportată de Asigurat, stabilită fie ca valoare fixă, fie ca procent din suma asigurată totală a bunului sau categoriei de bunuri ori din limita / sublimita de răspundere, fie ca procent din daună.`,
    `2.24. Furt prin efracţie: fapta unei persoane sau grup de persoane săvârşită prin violenţă, care poate fi probată cu dovezi materiale, de a-şi însuşi pe nedrept bunuri ale Asiguratului, prin folosirea următoarelor mijloace:`,
    `(i) intrarea / ieşirea în / din clădirea sau incinta (spaţiul) în care se află bunurile asigurate prin spargerea / distrugerea pereţilor, acoperişului, tavanelor, uşilor, ferestrelor, pardoselilor, împrejmuirilor / gardurilor, porţilor sau prin stricarea sau forţarea dispozitivelor de închidere, precum şi furtul urmat de întrebuinţarea unor astfel de mijloace pentru păstrarea bunului furat sau pentru înlăturarea urmelor infracţiunii, ori pentru ca făptuitorul să-şi asigure scăparea.`,
    `(ii) spargerea unui seif sau unui alt spaţiu închis din clădire.`,
    `2.25. Furtună: mişcare puternică a aerului produsă de o perturbaţie atmosferică violentă, în general însoţită de descărcări electrice.`,
    `2.26. Greutatea stratului de zăpadă sau de gheaţă: distrugere provocată de excesul de masă de zăpadă sau gheaţă acumulată pe acoperişuri sau care acţionează asupra elementelor de sprijin ale construcţiilor.`,
    `2.27. Grevă: încetarea organizată şi voluntară a activităţii unei părţi importante a angajaţilor unui angajator, în scopul de a impune revendicări de ordin economic, social sau politic.`,
    `2.28. Grindină: precipitaţie atmosferică conţinând particule de gheaţă.`,
    `2.29. Incendiu: ardere cu flacără deschisă (foc) care s-a produs în absenţa unei vetre destinate acestui scop sau a ieşit din vatră, având forţa de a se extinde prin propria sa putere. Arderea cu aport limitat de oxigen (arderea mocnită), precum şi efectul aplicării deliberate a focului sau căldurii ca parte a unui proces sau a unei operaţii nu se consideră incendiu. De asemenea, efectul căldurii într-un scurt-circuit la instalaţia electrică nu se consideră incendiu, decât dacă flăcările produse prin scurt-circuit se extind.`,
    `2.30. Inundaţie: acoperirea cu apă a unei porţiuni de uscat, ca urmare a:`,
    `(i) revărsării peste marginile cursurilor sau bazinelor de apă (lacuri, mare);`,
    `(ii) ruperii digurilor, barajelor sau malurilor;`,
    `(iii) îngustării bruşte şi neaşteptate a cursului apei;`,
    `(iv) precipitaţiilor atmosferice abundente sau topirii zăpezilor;`,
    `(v) apelor subterane care ies la suprafaţa pământului şi/sau a pardoselii clădirii asigurate sau în care se află bunuri asigurate.`,
    `2.33. Limita de răspundere: suma maximă care reprezintă răspunderea OMNIASIG VIENNA INSURANCE GROUP în legătură cu toate evenimentele produse în perioada de asigurare (reprezintă maximul despăgubirii care poate fi plătită) - în cazul asigurării de răspundere civilă faţă de terţi.`,
    `2.34. Locuinţa: ansamblu care cuprinde:`,
    `(i) Clădirea – construcţie locuită permanent sau temporar (casă, vilă sau apartament în bloc / vilă), alcătuită din una sau mai multe camere de locuit, cu destinaţie de locuinţă şi folosită în acest scop;`,
    `(ii) dependinţele, dotările, utilităţile şi amenajările interioare legate structural de clădirea / construcţia cu destinaţie de locuinţă;`,
    `(iii) instalaţiile fixe aflate la locaţia asigurată:`,
    `- instalaţia electrică fixă: conductoarele instalaţiei electrice (de iluminat, prize şi de curenţi slabi) îngropate sub tencuială, inclusiv prizele şi întrerupătoarele şi corpurile de iluminat tip plafonieră sau spot încorporate (excepţie: lustre, lămpi, abajure, aplice, fasunguri, becuri, tuburi de iluminat);`,
    `- instalaţiile sanitare (alimentare cu apă, canalizare inclusiv obiectele sanitare);`,
    `- instalaţia de încălzire, inclusiv conductele şi radiatoarele (calorifere), instalaţiile de gaze naturale (inclusiv centrala termică, hidroforul şi boilerul, panourile solare / fotovoltaice);`,
    `- instalaţii de ventilare şi climatizare (fără ventilatoarele electrice şi aparatele de aer condiţionat mobile);`,
    `- instalaţie de protecţie (paratrăsnet / împământare, alarmă incendiu, alarmă furt), antene radio / TV / satelit.`,
    `În limita sumei asigurate pentru clădirea cu destinaţie de locuinţă, se includ în această categorie şi părţile comune conform cotei indivize.`,
    `Terenul aferent locuinţei nu este asociat noţiunii de locuinţă şi nu face obiectul asigurării.`,
    `2.35. Obiecte de artă: bunuri semnificative prin valoarea lor artistică, documentară, istorică, ştiinţifică, tehnică, culturală şi memorialistică.`,
    `2.36. Pătare cu fum: deteriorarea produsă în mod direct de fumul cauzat de incendiu.`,
    `2.37. Perioada de asigurare: intervalul de timp menţionat în Poliţă în care pot apărea evenimente asigurate pentru care OMNIASIG VIENNA INSURANCE GROUP datorează despăgubiri în baza prezentei Poliţe.`,
    `2.38. Ploaie torenţială: căderea unei mari cantităţi de precipitaţii în timp scurt şi pe o suprafaţă limitată.`,
    `2.39. Poliţă: contract de asigurare (formă scrisă) cuprinzând Specificaţia, Condiţiile de asigurare, Oferta de asigurare (după caz), eventualele acte adiţionale şi orice alt document anexat.`,
    `2.40. Prăbuşire de corpuri terestre: prăbuşirea / căderea accidentală pe bunurile asigurate de corpuri străine, altele decât aeronave, părţi ale acestora şi meteoriţi, precum: stânci, pietre, copaci, elemente ale reţelelor de distribuţie sau de transmisie energie electrică, elemente de transport pe cablu (stâlpi, cabluri, ţevi etc), relee de transmisiuni, macarale sau elemente componente (inclusiv a obiectelor ridicate / manipulate de acestea), elemente de construcţie ale clădirilor învecinate (inclusiv instalaţiile aferente acestor clădiri) etc.`,
    `2.41. Prăbuşire de teren: surparea bruscă a unei suprafeţe de teren cauzată de mişcări tectonice sau de eroziune naturală.`,
    `2.42. Prima de asigurare: suma datorată de Asigurat / Contractant pentru preluarea în asigurare de către OMNIASIG VIENNA INSURANCE GROUP a riscurilor asigurate.`,
    `2.43. Rea-credinţă: acea atitudine a unei persoane care comite o faptă contrară legii sau contractului în care este parte, fiind conştientă de caracterul ilicit al conduitei sale.`,
    `2.44. Refulare: evacuarea în sens opus celui proiectat a apelor reziduale / pluviale prin conductele de evacuare / canalizare aparţinând locuinţei asigurate, ca urmare a obturării acestor conducte sau ca urmare a debitului foarte mare prin aceste conducte.`,
    `2.45. Revoltă: Demonstraţii violente ce duc la agitaţie, însoţite de acţiuni ilegale şi ostilitate la adresa autorităţilor cu scopul de a distruge echilibrul existent.`,
    `2.46. Risc asigurat: eveniment viitor, posibil dar incert, acoperit de OMNIASIG VIENNA INSURANCE GROUP a cărui producere ar putea cauza daune.`,
    `2.47. Sublimită: Sumă stabilită în cadrul sumei asigurate / limitei de răspundere pentru anumite evenimente şi/sau costuri / cheltuieli asigurate nominalizate în Poliţă care reprezintă maximul răspunderii OMNIASIG VIENNA INSURANCE GROUP în cazul producerii sau apariţiei evenimentului respectiv sau în cazul efectuării costurilor / cheltuielilor respective; sublimita nu operează în nici o situaţie în sensul majorării sumei asigurate / limitei de răspundere asumate de OMNIASIG VIENNA INSURANCE GROUP.`,
    `2.48. Sumă asigurată: valoarea menţionată în Poliţă pentru care s-a încheiat asigurarea; reprezintă maximul răspunderii OMNIASIG VIENNA INSURANCE GROUP în cazul producerii sau apariţiei unuia sau mai multor evenimente asigurate. Dacă părţile nu convin altfel prin menţiuni exprese în Poliţă, suma asigurată conţine TVA.`,
    `2.49. Tâlhăria: furtul săvârşit prin întrebuinţare de violenţe sau ameninţări, ori prin punerea victimei în stare de inconştienţă sau neputinţa de a se apăra precum şi furtul urmat de întrebuinţarea unor astfel de mijloace pentru păstrarea bunului furat sau pentru înlăturarea urmelor infracţiunii ori pentru ca făptuitorul să-şi asigure scăparea.`,
    `2.50. Tornadă: vârtej de vânt devastator cu arie restrânsă, adesea însoţit de ploi torenţiale.`,
    `2.51. Trăsnet: descărcare electrică luminoasă, având o durată de ordinul microsecundelor şi o intensitate a curentului de ordinul sutelor de mii de amperi, care se produce între un nor şi sol sau obiecte aflate pe sol. Daunele produse de trăsnet constau în transferul nemijlocit al efectului acestuia asupra bunului asigurat.`,
    `2.52. Tulburări civile: Demonstraţii violente care nu intră în categoria revoltelor, degenerând în agitaţii culminând cu frământări sociale şi acţiuni ilegale.`,
    `2.53. Uragan: vânt foarte puternic cu acţiune distrugătoare, însoţit adesea de ploi torenţiale.`,
    `2.54. Uzură: deprecierea calităţilor unui bun stabilită funcţie de vechime, întrebuinţare şi starea de întreţinere a acestuia.`,
    `2.55. Valoare de asigurare: valoarea corectă, intrinsecă, a unui bun la un moment dat, în funcţie de semnificaţia sa. Semnificaţia valorii de asigurare poate fi: valoarea reală, valoarea de înlocuire, valoarea de piaţă sau valoarea evaluată de un evaluator autorizat.`,
    `(i) Valoare de înlocuire: costul construirii, producerii sau achiziţionării bunului respectiv sau al unui bun similar din punct de vedere al parametrilor funcţionali şi constructivi, la preţurile uzuale de piaţă în care sunt incluse costurile de transport, de instalare, de punere în funcţiune, precum şi taxe şi comisioane vamale.`,
    `(ii) Valoarea de piaţă: suma estimată pentru care un bun ar putea fi schimbat, la data evaluării, între un cumpărător hotărât şi un vânzător hotărât, într-o tranzacţie nepărtinitoare, după o activitate de marketing adecvată şi în care părţile au acţionat fiecare în cunoştinţă de cauză, prudent şi fără constrângere.`,
    `(iii) Valoare reală: valoare de înlocuire (de nou) a bunului din care se scade uzura.`,
    `(iv) Valoarea evaluată de un evaluator autorizat: valoarea unui bun (clădire, construcţie) determinată de un evaluator autorizat în cazul în care bunul respectiv este cesionat către o instituţie creditoare. În cazul clădirilor, valoarea de asigurare (ca valoare evaluată de un evaluator autorizat) nu trebuie să conţină valoarea terenului.`,
    // 2.56. Vandalism: fapta unei persoane sau a unui grup de persoane săvârşită doar cu scopul de a distruge sau avaria cu intenţie bunurile asigurate.
    // 2.57. Vătămare corporală: orice vătămare fizică suportată de către o terţă persoană, incluzând boala, incapacitatea fizică şi orice vătămare mentală, suferinţă sau şoc, rezultat al unei astfel de vătămări fizice.
    // 2.58. Viitură: masă importantă de apă care se deplasează cu putere în afara unei albii fireşti, din cauza creşterii bruşte a nivelului unei ape curgătoare ca urmare a creşterii debitului, sau din alte cauze, şi care antrenează de regulă mâl, pietriş, bolovani şi alte corpuri solide.
    // 3. INTERESUL ASIGURAT
    // 3.1. Asiguratul trebuie să aibă un interes cu privire la bunul asigurat.
    // 3.2. Interesul asigurat este dreptul de proprietate asupra bunului asigurat chiar dacă asigurarea a fost încheiată de un Contractant sau dacă despăgubirea, în caz de daună, este cesionată în favoarea unei terţe persoane, alta decât Asiguratul, pe baza manifestării de voinţă a acestuia din urmă.
    // 3.3. Dacă interesul asigurat este altul decât dreptul de proprietate asupra bunului asigurat, Asiguratul / Contractantul va trebui să declare acest fapt în scris, în mod explicit, înainte de încheierea Poliţei.
    // 3.4. Dacă interesul, aşa cum este expus mai sus, nu există Poliţa eventual încheiată este nulă de drept, iar OMNIASIG VIENNA INSURANCE GROUP are dreptul de a reţine primele încasate în cazul în care Asiguratul / Contractantul este de rea credinţă.
    // 4. OBIECTUL ASIGURĂRII
    // 4.1. Obiectul asigurării îl constituie:
    // 4.1.1. Bunurile menţionate expres în Poliţă, aflate pe teritoriul României, la adresa menţionată în aceasta, care pot fi:
    // (i) locuinţă;
    // (ii) anexe. Acestea se asigura numai dacă sunt menţionate expres în Poliţă.
    // (iii) bunuri conţinute (cu excepţia celor excluse prin prezentele Condiţii de asigurare);
    // 4.1.2. Răspunderea civilă a Asiguratului declanşată ca urmare a producerii în perioada de asigurare şi la locaţia asigurată a unor prejudicii (vătămari corporale, inclusiv deces, pagube la bunuri) suferite de terţe persoane (vizitatori, trecători, locatarii proprietăţilor învecinate), altele decât Asiguratul.
    // 5. RISCURILE ŞI COSTURILE / CHELTUIELILE ACOPERITE
    // 5.1. Riscurile asigurate:
    // OMNIASIG VIENNA INSURANCE GROUP acordă despăgubiri pentru daune provocate de următoarele riscuri în limitele sumelor asigurate / sublimitelor / limitei de răspundere precizate în Poliţă
    // 5.1.1. pentru bunurile menţionate la art. 4.1.1.
    // (i) riscuri FLEXA (Incendiu, Trăsnet, Explozie, Căderi de corpuri aeriene).
    // În cazul incendiului, OMNIASIG VIENNA INSURANCE GROUP acordă despăgubiri inclusiv pentru daunele produse bunurilor asigurate prin: carbonizare totală sau parţială, topire, avarieri accidentale ale instalaţiilor fixe care aparţin clădirii asigurate (instalaţii electrice, de gaze, apă, canal sau încălzire centrală, de climatizare, cablu TV, instalaţie de avertizare şi protecţie, inclusiv monitorizare etc.), pătarea cu fum, degajarea de gaze sau vapori în urma incendiului.
    // În cadrul acestui pachet de riscuri nu se despăgubesc daunele produse de incendiul şi/sau explozia provocate de cutremur.
    // (ii) riscuri de dezastre naturale:
    //  cutremur (inclusiv incendiul şi/sau explozia ca urmare a cutremurului). Intervalul maxim în care se poate produce unul şi acelaşi eveniment asigurat este de 168 de ore consecutive;
    //  inundaţie şi/sau viitură. Intervalul maxim în care se poate produce unul şi acelaşi eveniment asigurat este de 504 de ore consecutive;
    //  alunecări / prăbuşiri de teren. Intervalul maxim în care se poate produce unul şi acelaşi eveniment asigurat este de 168 de ore consecutive.
    // Pentru aceste riscuri se acoperă daunele materiale directe şi/sau indirecte produse bunurilor asigurate de oricare dintre formele de manifestare ale dezastrului natural menţionate anterior.
    // (iii) Fenomene atmosferice:
    //  furtună, uragan. Intervalul maxim în care se poate produce unul şi acelaşi eveniment asigurat este de 96 de ore consecutive;
    //  grindină, ploaie torenţială, tornadă. Intervalul maxim în care se poate produce unul şi acelaşi eveniment asigurat este de 72 de ore consecutive;
    //  greutatea stratului de zăpadă sau de gheaţă şi avalanşă de zăpadă. Intervalul maxim în care se poate produce unul şi acelaşi eveniment asigurat este de 168 de ore consecutive;
    // (iv) Prăbuşire de corpuri terestre;
    // (v) Coliziune cu (auto)vehicule şi boom sonic;
    // (vi) Acţiunea animalelor;
    // (vii) Greve, revolte, tulburări civile, prin:
    //  acţiunea persoanelor care iau parte la greve, revolte, tulburări civile;
    //  acţiunea oricărei autorităţi legal constituite în suprimarea sau în încercarea de a suprima sau limita consecinţele oricăror greve, revolte, tulburări civile.
    // (viii) Vandalism prin acţiunea persoanelor care iau parte la acte de vandalism, respectiv de acţiunea oricărei autorităţi legal constituite în suprimarea sau în încercarea de a suprima sau limita consecinţele oricăror acte de vandalism.
    // (ix) apă de conductă şi refulare;
    // (x) furt doar pentru bunurile conţinute asigurate prin:
    //  efracţie;
    //  acte de tâlhărie asupra Asiguratului, persoanelor care în mod statornic locuiesc împreună cu Asiguratul şi/sau care au calitatea de soţ/soţie sau persoanelor pentru care răspunde conform legii sau asupra unui prepus al Asiguratului;
    //  întrebuinţarea cheilor originale, însă numai dacă aceste chei au fost obţinute prin acte de tâlhărie.
    // 5.1.2. Pentru răspunderea civilă a Asiguratului faţă de terţi, menţionată la art.4.1.2 fapta săvârşită de Asigurat din culpa proprie sau fapta cauzată de lucruri / animale aflate în paza juridică a acestuia sau ruina edificiului datorată viciilor de construcţie / lipsei de întreţinere, în cazul în care Asiguratul are calitate de proprietar.
    // 5.2. OMNIASIG VIENNA INSURANCE GROUP acordă protecţie suplimentară, în plus faţă de acoperirea menţionată la art. 5.1 (în cadrul sumelor asigurate aferente bunurilor asigurate menţionate în Poliţă, fără majorarea acestora) şi pentru:
    // (i) daune materiale provocate direct, în mod imprevizibil şi accidental, instalaţiilor şi/sau echipamentelor aferente locuinţei asigurate (electrică, încălzire, climatizare, electronică şi electrocasnică), cauzate de: scurt-circuit, inducţie sau arc electric, supracurent, supratensiune electrică, indiferent dacă aceasta este datorată electricităţii atmosferice sau altui motiv,– pentru o sublimită unică pe eveniment şi pe an de asigurare în cuantum de 1000 EURO sau echivalentul acestei sume;
    // (ii) daunele provocate centralei termice reprezentând avarii accidentale cauzate de: defecte de material erori de fabricaţie, montare sau instalare, lipsa accidentală a apei, pentru o sublimită unică pe eveniment şi pe an de asigurare în cuantum de 1000 EURO sau echivalentul acestei sume;
    // (iii) daunele produse de apă de conductă şi refulare prin imprudenţa Asiguratului sau persoanelor care în mod statornic locuiesc împreună cu Asiguratul (o singură dată în perioada de asigurare, în limita a 500 EURO sau echivalentul acestei sume);
    // 5.3. Costuri / cheltuieli acoperite:
    // OMNIASIG VIENNA INSURANCE GROUP acordă despăgubiri (în cadrul sumelor asigurate menţionate în Poliţă, fără majorarea acestora) şi pentru următoarele categorii de costuri / cheltuieli:
    // (i) generate de lipsa de folosinţă a locuinţei asigurate, efectuate (conform documentelor justificative) pentru închirierea unui spaţiu de locuit, cazare în regim hotelier în perioada în care locuinţa asigurată este improprie locuirii, datorită producerii unui eveniment asigurat (în limita a 600 EURO sau echivalentul acestei sume / perioada de asigurare, perioada maximă de despăgubire fiind de 6 luni).
    // (ii) de prevenire a daunelor ce ar putea fi provocate de orice eveniment asigurat iminent (de exemplu: pericol iminent de declanşare a unui incendiu la bunurile asigurate), pentru o sublimită de 10% din suma asigurată a bunurilor afectate de evenimentul respectiv;
    // (iii) pentru stingerea oricărui incendiu, pentru o sublimită de 10% din suma asigurată a bunurilor afectate de incendiu;
    // (iv) pentru limitarea daunelor produse de orice eveniment asigurat, inclusiv pentru demolarea, demontarea ori mutarea (în acest scop) în alt loc a bunurilor asigurate, pentru o sublimită de 10% din suma asigurată a bunurilor afectate de evenimentul asigurat respectiv;
    // (v) pentru îndepărtarea urmărilor oricărui eveniment asigurat, respectiv pentru efectuarea lucrărilor de curăţare (ex.: ridicarea molozului) a locului unde s-a produs dauna, în măsura în care sunt în legătură cu evenimentele asigurate prin Poliţă şi sunt necesare pentru executarea lucrărilor de reparaţii, pentru o sublimită de 10% din suma asigurată a bunurilor afectate de evenimentul respectiv;
    // (vi) ocazionate de expertizarea daunei şi proiectare, pentru o sublimită de 10% din suma asigurată a bunurilor afectate de producerea evenimentului asigurat dar nu mai mult de 1000 EURO sau echivalentul acestei sume pentru orice eveniment;
    // (vii) În cazul riscului de furt, costuri / cheltuieli ocazionate de:
    // - daune produse prin spargerea sau deteriorarea cu prilejul furtului sau tentativei de furt prin efracţie a pereţilor, acoperişului, tavanelor, uşilor, ferestrelor şi pardoselilor, împrejmuirilor/ gardurilor, porţilor aparţinând clădirilor şi altor construcţii, precum şi a mobilierului, asigurate la OMNIASIG VIENNA INSURANCE GROUP;
    // - curăţarea sau înlocuirea încuietorilor avariate.
    // pentru o sublimită a 10% din suma asigurată a bunurilor conţinute asigurate dar nu mai mult de 1000 EURO sau echivalentul acestei sume, pentru orice eveniment.
    // (viii) În cazul răspunderii civile, cheltuielile acoperite sunt cele efectuate de către Asigurat în procesul civil, dacă a fost obligat la desdăunare (inclusiv în cazul în care acţiunea penală pusă în mişcare nu mai este judecată, iar acţiunea civilă rămâne în competenţa instanţei penale), decurgând din evenimente asigurate produse în perioada de asigurare.
    // 6. EXCLUDERI
    // 6.1. Bunuri excluse:
    // 6.1.1. OMNIASIG VIENNA INSURANCE GROUP nu acordă despăgubiri pentru:
    // (i) clădiri în curs de construcţie sau cele nefinalizate (inclusiv bunurile conţinute în acestea);
    // (ii) clădiri care au fost expertizate tehnic pentru riscul de cutremur aflate în evidenţa organelor abilitate centrale sau locale (inclusiv bunurile conţinute în acestea); acestea nu se asigură, dacă situaţiile menţionate existau la momentul încheierii Poliţei sau apar pe parcursul derulării Poliţei, indiferent dacă aceste situaţii erau sau nu cunoscute Asiguratului;
    // (iii) orice tip de teren;
    // (iv) bunuri care din cauza uzurii sau deteriorării nu mai pot fi folosite în conformitate cu destinaţia lor iniţială și / sau a căror stare de întreţinere este necorespunzătoare;
    // (v) clădiri şi bunuri conţinute în clădiri situate în zone pentru care la momentul includerii în asigurare existau interdicţii de construire emise de organele în drept prin acte publice (indiferent dacă Asiguratul avea cunoştinţă sau nu) sau comunicări în scris Asiguratului, sau ulterior constuirii au emis ordine de strămutare a acestor clădiri (exemple: clădire situată în zone inundabile potrivit cu reglementările legale în vigoare; clădire situată în zona de risc pentru producerea alunecărilor de teren potrivit cu reglementările legale în vigoare);
    // (vi) cladiri şi bunuri conţinute în clădiri situate în zone cu istoric de alunecări / prăbuşiri de teren şi/sau situate la mai puţin de 100 m de ape stătătoare (lacuri, mare) ş/sau cursuri de ape neregularizate potrivit cu normele legale în vigoare;
    // (vii) clădiri de patrimoniu (inclusiv monumente istorice);
    // (viii) construcţii subterane fără clădiri deasupra lor (exemple: bordeie în pământ, gheţării în pământ, puţuri, diguri, şanţuri, iezături şi construcţii de ameliorare);
    // (ix) coteţe de lemn pentru păsări şi/sau animale;
    // (x) construcţii uşoare: barăci, colibe, saivane, pătule, şoproane, sure, fânare etc.;
    // (xi) bunuri destinate domeniului comercial, productiv, industrial sau altui domeniu, altele decât cele necesare locuirii;
    // (xii) bunuri aflate în locuri deschise sau în aer liber, cu excepţia celor care din punct de vedere constructiv şi al destinaţiei pot fi folosite în aer liber (exemple: balansoare, mobilier de grădină);
    // (xiii) sere / solarii;
    // (xiv) bani, hârtii / titluri de valoare, arme (inclusiv arme de vânătoare) şi trofee de vânătoare;
    // (xv) obiecte din metale preţioase (bijuterii, monede etc) şi/sau cu pietre preţioase sau semipreţioase, colecţii de orice fel, obiecte de patrimoniu, obiecte unicat sau de serie redusă din ceramică, porţelan, sticlă etc., obiecte de artă, obiecte de valoare deosebită, manuscrise, antichităţi;
    // (xvi) bunuri stocate în vederea folosirii ulterioare (exemple: materiale de construcţie nepuse în operă, produse alimentare pentru vânzare), bunuri perisabile / consumabile (exemple: produse alimentare, băuturi, medicamente, parfumuri, produse cosmetice, cereale, combustibili solizi, furaje, produse pomicole, viticole);
    // (xvii) vehicule / autovehicule înmatriculate sau înmatriculabile, ambarcaţiuni, aeronave, inclusiv părţi componente, piese de schimb ale acestora;
    // (xviii) plantaţii, păduri, plante, animale, peşti şi alte vieţuitoare;
    // (xix) informaţiile de pe suporturile de date;
    // (xx) în cazul riscului de furt
    // - elementele de construcţie aparţinând locuinţei sau anexelor asigurate (exemple: învelitoare, elemente de tâmplărie exterioară sau interioară, elemente ale instalaţiilor fixe aferente clădirilor asigurate, elemente / materiale de închidere şi compartimentare, împrejmuiri / garduri);
    // 6.1.2. OMNIASIG VIENNA INSURANCE GROUP este îndreptăţit să nu acorde despăgubiri pentru locuinţele (inclusiv modificări / extinderi sau prelungiri pe verticală sau orizontală) construite / efectuate fără autorizaţie de construcţie, dacă autorizaţia era obligatorie la momentul construirii / modificării /extinderii locuinţei, conform legii.
    // 6.2. Riscuri excluse:
    // 6.2.1. OMNIASIG VIENNA INSURANCE GROUP nu răspunde pentru prejudicii cauzate, produse sau agravate, direct sau indirect, de sau ca o consecinţă a:
    // (i) războiului, invaziei, acţiunii unui duşman extern, ostilităţilor (indiferent dacă a fost declarată stare de război sau nu), războiului civil, rebeliunii, revoluţiei, conspiraţiei, insurecţiei, răscoalei, răzvrătirii militare cu sau fără uzurparea puterii, legii marţiale, actelor persoanelor răuvoitoare care acţionează în numele sau în legătură cu orice organizaţie politică, confiscării, naţionalizării, exproprierii, sechestrării, rechiziţionării, distrugerii sau avarierii din ordinul oricărui guvern de drept sau de fapt sau oricărei autorităţi publice;
    // (ii) terorismului; această asigurare nu acoperă daune, pierderi, costuri sau cheltuieli de orice natură cauzate direct sau indirect, rezultând din, întâmplate prin, derivate din sau în conexiune cu orice act de terorism, indiferent de orice altă cauză care contribuie direct sau indirect la respectiva daună, pierdere, cost sau cheltuială; în contextul acestei excluderi, terorismul se defineşte ca un act incluzând dar nelimitându-se la folosirea forţei sau violenţei şi/sau ameninţarea cu acestea săvârşit de o persoană sau de un grup ori grupuri de persoane, acţionând independent, în numele sau în legătură cu orice organizaţie sau guvern, având scopuri politice, religioase, ideologice sau altele similare, incluzând intenţia de a influenţa orice guvern şi/sau de a provoca frica în rândul populaţiei sau a unei părţi a populaţiei; în orice proces, acţiune legală sau orice altă procedură în care Asigurătorul pretinde că, din cauza acestei definiţii, o daună, pierdere, cost sau cheltuială nu este acoperită de această asigurare, dovada că o astfel de daună, pierdere, cost sau cheltuială este acoperită, cade în sarcina Asiguratului; în cazul în care se constată că o parte a acestei clauze nu este valabilă sau nu poate fi aplicată sau implementată, restul clauzei va rămâne în vigoare şi aplicată efectiv;
    // (iii) sabotajului;
    // (iv) reacţiei nucleare, radiaţiei nucleare sau contaminării radioactive;
    // (v) poluării sau contaminării de orice natură şi din orice cauză, chiar ca urmare a unor riscuri cuprinse în asigurare;
    // (vi) faptei săvârşite cu intenţie de către Asigurat, Contractant sau Beneficiar (persoane fizice) sau, după caz, de către persoanele fizice majore care, în mod statornic, locuiesc împreună cu Asiguratul sau Beneficiarul la locaţia asigurată, de către persoanele alese sau desemnate în conformitate cu prevederile legale şi autorizate să reprezinte Asiguratul, Contractantul sau Beneficiarul (persoane juridice), de către persoanele din conducerea acestora ori de către persoanele cărora le-au fost delegate atribuţii de conducere a acestora, de către asociaţii acestora;
    // (vii) erorilor, omisiunilor din proiectare, execuţie, defectelor sau viciilor ascunse, de care Asiguratul sau reprezentanţii săi au cunoştinţă indiferent dacă aceste erori, defecte sau vicii ascunse erau sau nu cunoscute de către OMNIASIG VIENNA INSURANCE GROUP;
    // (viii) degradărilor şi deteriorărilor progresive, precum şi fenomenelor cu evoluţie lentă în timp (exemple: abraziune, fermentaţie, oxidare, corodare, erodare, infiltraţii ori capilaritate, tasarea terenului, inclusiv ca urmare a variaţiei de volum a terenului fundaţiei datorată contracţiei, îngheţului, dezgheţului etc.), indiferent dacă sunt cauzate de sau generează riscuri asigurate în baza Poliţei, exceptând daunele cauzate de incendiu rezultat din aceste cauze, care se vor considera acoperite;
    // (ix) cauzelor necuprinse în asigurare (exemple: căldură, pârlire provenită dintr-o sursă normală de căldură inclusiv la bunurile supuse la foc sau căldură pentru prelucrare, îngheţarea apei în rezervoare, conducte sau vase, ploi acide, erupţii vulcanice, tsunami, păsări, rozătoare alţi dăunători, trepidaţii datorate circulaţiei rutiere sau pe calea ferată, de suprafaţă sau în subteran etc);
    // (x) daune indirecte (exemple: igrasie, descompunere umedă sau uscată, mucegăire, alterare, putrezire, ciuperci etc.) produse bunurilor asigurate, ca urmare a unor riscuri cuprinse în asigurare;
    // (xi) lucrărilor edilitare, explorărilor sau exploatărilor miniere sau petroliere şi oricăror altor lucrări de construcţii sau de intervenţii, executate la clădirea asigurată sau la cladirea în care se află bunurile asigurate sau la obiectivele învecinate bunurilor asigurate;
    // (xii) oricăror lucrări de construcţii / montaj / reparaţii executate în cadrul locaţiei asigurate;
    // (xiii) în cazul riscurilor de incendiu / explozie:
    // - acţiunii dispozitivelor şi materialelor pirotehnice, muniţiei, dispozitivelor explozive şi armelor de foc;
    // - nesupravegherii focului deschis, inclusiv a unei surse de lumină cu flacără deschisă (chiar apărată de sticlă sau sită) sau a unor reşouri sau fumatul în apropierea sau în interiorul clădirii asigurate şi/sau în care se află bunurile asigurate;
    // - explozie la aparate / insatalaţii determinată de uzuri, coroziune sau defecte de fabricaţie şi neurmată de incendiu, însă, daunele produse de explozie la alte bunuri asigurate sunt acoperite;
    // (xiv) culpei grave a Asiguratului, Beneficiarului sau a persoanelor care în mod statornic locuiesc împreună cu Asiguratul sau Beneficiarul la locaţia asigurată, ca de exemplu (exemplificarea nefiind limitativă):
    // - transvazarea conţinutului unor butelii (recipienţi) de aragaz sau alte gaze lichefiate sub presiune, în condiţiile interzise prin legislaţia în vigoare; aşezarea sau păstrarea buteliilor de gaze în apropierea oricăror surse de căldură ori sub acţiunea directă a razelor solare;
    // - nesupravegherea aparatelor electrice sub tensiune (de exemplu: fier de călcat);
    // - necurăţarea periodică a coşurilor sau canalelor de evacuare a fumului (inclusiv nerepararea acestora în situaţiile în care prezintă deteriorări, fisuri, obturări ori alte avarii);
    // - nerespectarea normelor tehnice şi a legilor în vigoare privind montarea şi utilizarea centralelor termice, a cazanelor de apă şi a recipientelor GPL;
    // - improvizaţii neconforme cu reglementările în vigoare la instalaţiile de gaze, încălzire sau electrice (exemple: siguranţe fuzibile supradimensionate, folosirea sobelor şi a altor mijloace de încălzire cu defecţiuni, cabluri electrice improvizate etc.);
    // - neizolarea corespunzătoare a coşurilor de fum care se află în contact cu elemente combustibile ale construcţiei;
    // - folosirea unor produse uşor inflamabile pentru curăţarea pardoselilor, hainelor etc. sau pentru alte scopuri decât cele menţionate, ori manipularea unor asemenea produse, în aceeaşi încăpere şi în acelaşi timp în care este aprins focul (chiar în sobă, plită sau maşină de gătit), în care este întreţinută lumina cu flacără (chiar apărată de sticlă sau sită) sau în care funcţionează reşouri ori radiatoare electrice;
    // (xv) În cazul riscurilor de fenomene atmosferice şi inundaţii:
    // - pătrunderii apei de ploaie, a particulelor de gheaţă rezultate din grindină, a zăpezii sau a murdăriei prin geamuri sau ferestre neetanşe sau neînchise ori prin alte deschizături, în afara cazului în care deschizăturile sunt produse de riscurile respective acoperite;
    // - deversării controlate a lacurilor de acumulare (inclusiv în timpul formării acestora), schimbării artificiale a cursurilor de apă sau altor lucrări hidrotehnice;
    // (xvi) În cazul riscului de coliziune cu (auto)vehicule:
    // - vehicule sau autovehicule aflate în interiorul clădirilor asigurate;
    // - vehicule sau autovehicule proprietate a sau folosite de Asigurat / Contractant, Beneficiarul asigurării sau membrii familiilor acestora.
    // (xvii) În cazul riscurilor de alunecare sau prăbuşire de teren:
    // - pentru prejudicii cauzate direct sau indirect de acţiuni umane;
    // (xviii) În cazul riscului de prăbuşire de corpuri terestre (prejudicii cauzate direct sau indirect):
    // - orice lucrări de construcţii sau de intervenţii executate la bunurile asigurate sau la alte obiective;
    // - căderi de corpuri produse în interiorul clădirilor şi/sau construcţiilor asigurate (de exemplu: prăbuşirea unei grinzi, căderea unui corp de mobilier sau a unui lampadar).
    // (xix) În cazul riscului de furt prin efracţie şi tâlhărie, pentru prejudicii produse în următoarele situaţii:
    // - în timpul şi în perioada imediat următoare producerii altor riscuri asigurate;
    // - furt prin înşelătorie, furt cu întrebuinţare de chei potrivite, mincinoase ori originale, cu excepţia cazurilor în care cheile originale au fost obţinute prin acte de tâlhărie.
    // - prin neasigurarea corespunzătoare a porţilor şi uşilor de acces, ferestrelor sau a altor deschideri exterioare ale locuinţei asigurate, cu sisteme de închidere corespunzătoare şi funcţionale (după caz: broaşte, yale, lacăte, zăvoare asigurate cu lacăt);
    // - Asiguratul, cu consimţământul său, a încredinţat bunul asigurat unei terţe persoane care nu îl restituie (abuz de încredere);
    // - dacă la poliţie nu s-a înregistrat o reclamaţie în legătură cu furtul sau tentativa de furt prin efracţie sau acte de tâlhărie.
    // (xx) În cazul riscului de apă de conductă şi refulare:
    // - lucrărilor de reparaţii la instalaţiile aflate în incintele aparţinând Asiguratului sau a lucrărilor de reparaţii la clădiri necesare în urma intervenţiei la instalaţiile respective;
    // - probelor / testelor tehnice, inclusiv cele efectuate după orice intervenţie asupra instalaţiilor aflate în incintele aparţinând Asiguratului;
    // - îngheţării apei din rezervoare, conducte, instalaţii şi vase din încăperi datorită culpei grave a Asiguratului (de exemplu: dacă instalaţia de alimentare cu apă nu a fost golită sau instalaţia de încălzire a fost oprită).
    // - Instalaţiilor a căror avariere a generat scurgerea de apă;
    // - altor conducte / instalaţii decât cele care echipează locuinţa asigurată (de exemplu: conductele stradale şi cele ce fac legătura cu instalaţia de canalizare a clădirii) – numai în cazul riscului de refulare;
    // - apa freatică, de apele stătătoare sau curgătoare, de inundaţii, viituri sau precipitaţii, determinate de starea vremii şi de împiedicarea, chiar şi parţială, a curgerii normale a apei.
    // 6.2.2. OMNIASIG VIENNA INSURANCE GROUP nu răspunde pentru:
    // (i) pierderi financiare de consecinta de orice fel, cum ar fi reducerea valorii bunurilor după reparaţii, pierderile de profit, cele generate de întreruperea folosirii bunurilor, chiar ca urmare a unor riscuri cuprinse în asigurare;
    // (ii) prejudicii generate de evenimente produse în perioada de suspendare a Poliţei.
    // 6.2.3. Pe lângă excluderile de mai sus, în cazul asigurării de răspundere civilă, OMNIASIG VIENNA INSURANCE GROUP nu acordă despăgubiri nici pentru:
    // - prejudicii de orice fel referitoare la persoana Asiguratului sau la bunurile acestuia ori la bunurile deţinute de Asigurat spre păstrare, folosinţă ori în grijă sau custodie, precum şi pentru bunuri vândute dar nepredate încă;
    // - prejudicii provenind din sau în legătură cu răspunderea care se naşte din orice contract sau înţelegere scrisă, verbală sau subînţeleasă;
    // - pretenţii de despăgubire rezultate din sau în legătură cu daunele morale;
    // - prejudicii produse ca urmare a comiterii unor infracţiuni, exceptând infracţiunea de distrugere din culpă, vătămare corporală din culpă sau ucidere din culpă comise ca urmare a producerii unuia sau mai multora dintre riscurile asigurate menţionate (bifate) expres în Poliţă;
    // - amenzi de orice fel, penalităţi, dobânzi precum şi cheltuieli de judecată la plata cărora ar fi obligat Asiguratul prin hotărâre penală, precum şi cheltuieli de executare a hotărârilor privind plata despăgubirilor;
    // - prejudicii provocate de sau în legătură cu mânuirea, tratarea şi/sau utilizarea azbestului;
    // - prejudicii cauzate direct sau indirect de infiltraţii, poluare sau contaminare a aerului, solului, apei sau a oricărui bun;
    // - prejudicii cauzate direct sau indirect de neînchiderea robinetelor instalaţiilor;
    // - prejudicii cauzate direct sau indirect de activităţi de construcţii, consolidări sau demolări efectuate de Asigurat sau de altă persoană fizică sau juridică;
    // - pretenţii de despăgubire rezultate din sau în legătură cu daune cauzate de Asigurat altor persoane incluse în noţiunea de Asigurat sau daune cauzate între persoanele incluse în noţiunea de Asigurat;
    // - pretenţii de despăgubiri pentru daune de care răspunde Asiguratul în legătură cu orice autovehicul, utilaj sau vehicul indiferent dacă este sau nu autorizat să circule pe drumurile publice, este sau nu supus înmatriculării / înregistrării, este sau nu prevăzută prin lege obligativitatea încheierii asigurării de răspundere civilă şi indiferent dacă este proprietatea Asiguratului, împrumutat, închiriat sau condus de acesta, precum şi pentru daune cauzate de sau în legătură cu folosinţa unei piese sau mecanism care face parte sau care este ataşată sau care are legătură cu orice vehicul cu motor sau remorcă;
    // - pretenţii de despăgubiri pentru daune de care răspunde Asiguratul în legătură cu orice ambarcaţiune sau mijloc de transport (aerian sau pe apă), proprietate a Asiguratului, împrumutat, închiriat sau condus de acesta, precum şi pentru daune cauzate de sau în legătură cu folosinţa unei piese sau mecanism care face parte sau care este ataşată ori care are legătură cu orice ambarcaţiune sau mijloc de transport menţionat mai sus;
    // - pretenţii de despăgubiri pentru daune de care răspunde Asiguratul în legătură cu descărcarea sau încărcarea oricărui mijloc de transport menţionat mai sus sau a oricărei remorci;
    // - prejudicii provocate de Asigurat în situaţia în care acesta se află sub influenţa narcoticelor, substanţelor excitante sau alcoolului;
    // - pretenţii de despăgubire rezultate din sau în legătură cu daune cauzate de persoane aflate ocazional la locuinţa asigurată;
    // 6.2.4. Pentru acoperirea conferită de art. 5.2. pct.(ii) OMNIASIG VIENNA INSURANCE GROUP nu despăgubeşte daunele cauzate de:
    // (i) exploatarea continuă (consecinţă directă) - de exemplu: uzura normală, coroziune, eroziune, cavitaţie, expunere continuă la influenţe chimice sau atmosferice, rugina, alte sedimente (ex.: piatra cazanelor);
    // (ii) insuficienţa sau lipsa apei în boilere sau recipienţi sub presiune cu excepţia cazurilor în care acest proces este automatizat şi dauna are loc ca urmare a unei avarii accidentale a acestui sistem;
    // (iii) operaţiunilor de testare, supraîncărcării, experimentelor ce presupun impunerea unor condiţii excepţionale de exploatare;
    // (iv) daune provocate de implozii.
    // 6.3. Costuri / cheltuieli excluse:
    // OMNIASIG VIENNA INSURANCE GROUP nu acordă despăgubiri pentru costuri / cheltuieli necesare pentru transformarea sau îmbunătăţirea stării locuinţei / bunurilor conţinute în comparaţie cu cea de dinaintea producerii sau apariţiei oricărui eveniment asigurat, cele pentru remedierea unor deteriorări sau distrugeri produse de cauze necuprinse în asigurare şi nici cele pentru recondiţionări, reparaţii sau restaurări nereuşite.
    // 6.4. Excludere referitoare la sancţiuni
    // OMNIASIG VIENNA INSURANCE GROUP nu oferă acoperire, nu va fi considerată răspunzătoare şi nici obligată să plătească vreo daună sau să furnizeze vreun beneficiu in baza prezentelor condiţii de asigurare, în măsura in care acoperirea riscurilor, plata unei daune pentru aceste riscuri sau furnizarea de beneficii aferente acestora ar expune OMNIASIG VIENNA INSURANCE GROUP la orice sancțiune, interdicție sau restricție in conformitate cu Rezoluțiile ONU sau cu sancțiunile comerciale sau economice, legile şi reglementările Uniunii Europene, României, Marii Britanii sau Statelor Unite ale Americii (cu condiția ca aceasta sa nu încalce orice reglementare sau legislație specifică aplicabilă OMNIASIG VIENNA INSURANCE GROUP).
    // 7. SUMA ASIGURATĂ / LIMITE / SUBLIMITE
    // 7.1. Bunurile cuprinse în Poliţă sunt asigurate la valorile declarate de Asigurat / Contractant, menţionate în Poliţă, reprezentând suma asigurată.
    // 7.2. Sumele asigurate trebuie să reprezinte valoarea de asigurare a bunurilor asigurate, astfel:
    // 7.2.1. pentru locuinţă şi anexe:
    // - valoarea de înlocuire - în cazul construcţiilor (case / vile şi apartamente în case / vile) cu structura de rezistenţă din beton armat (exemple cadre, diafragme, prefabricate), zidărie portantă (exemplu: cărămidă, piatră) sau metal cu vechimea maximă 30 ani (considerată din momentul recepţiei / dării în exploatare) şi al construcţiilor (case / vile şi apartamente în case / vile) din alte materiale cu vechimea maximă 20 ani;
    // - valoarea de piaţă - în cazul apartamentelor în blocuri de locuinţe;
    // - valoare evaluată de un evaluator autorizat - în cazul apartamentelor în blocuri de locuinţe, care sunt cesionate unei instituţii creditoare, cu condiţia ca la Poliţă să se anexeze copia raportului de evaluare, iar valoarea de asigurare să corespundă cu valoarea trecută în concluzia raportului de evaluare (exceptând valoarea terenului);
    // - valoarea reală – în celelalte situaţii;
    // 7.2.2. pentru bunurile conţinute: reprezintă o valoare globală egală cu 10% din suma asigurată aferentă categoriei “locuinţă şi anexe”, cu următoarele sublimite de despăgubire pentru categoriile de bunuri specificate mai jos:
    // (i) pentru bunuri electrocasnice, electronice, foto, audio-video:
    // - 40% din suma asigurată a bunurilor conţinute;
    // - 500 EURO sau echivalent, în funcţie de valuta Poliţei, pentru fiecare bun din această categorie;
    // (ii) pentru îmbrăcăminte, încălţăminte, accesorii, genţi, ceasuri:
    // - 20% din suma asigurată a bunurilor conţinute;
    // - 300 EURO sau echivalent, în funcţie de valuta Poliţei pentru fiecare bun din această categorie.
    // 7.2.3. pentru răspunderea civilă, este stabilită o limită de răspundere unică pe eveniment şi pe an de asigurare în cuantum de 1.000 EURO sau echivalent, în funcţie de valuta Poliţei.
    // 7.3. Suma asigurată / limita răspunderii poate fi stabilită în Lei (RON) sau în alta valută agreată de părţi.
    // 7.4. După fiecare daună, suma asigurată / limita de răspundere se micşorează, cu începere de la data producerii sau apariţiei oricărui eveniment asigurat, pentru restul perioadei de asigurare, cu despăgubirea cuvenită, asigurarea continuând cu suma rămasă, fără ca aceasta să afecteze prima de asigurare stabilită.
    // 7.5. La cererea Asiguratului / Contractantului şi cu acceptul OMNIASIG VIENNA INSURANCE GROUP, suma asigurată / limita de răspundere rămasă poate fi reîntregită printr-un act adiţional, în baza plăţii diferenţei de primă adecvate.
    // 8. PRIMA DE ASIGURARE
    // 8.1. Achitarea obligaţiilor de plată în baza Poliţei se face prin virament în contul OMNIASIG VIENNA INSURANCE GROUP sau în numerar, integral sau în rate (anuale/ subanuale), în cuantumul şi până la termenele menţionate în Poliţă.
    // 8.2. Prima de asigurare respectiv ratele de primă anuale/subanuale (dacă părţile au agreat modalitatea de plată a primei în rate) şi termenele de plată sunt menţionate în Poliţă.
    // 8.3. OMNIASIG VIENNA INSURANCE GROUP nu are obligaţia de a aminti Asiguratului / Contractantului scadenţa obligaţiilor de plată.
    // 8.4. Prima de asigurare se stabileşte şi plăteşte în aceeaşi valută în care a fost stabilită suma asigurată.
    // 8.5. În cazul în care suma asigurată şi prima de asigurare sunt exprimate în valută, se poate accepta plata primei de asigurare sau a ratelor acesteia în Lei (RON), la cursul valutar BNR din ziua plăţii.
    // 9. ÎNCEPUTUL ŞI SFÂRŞITUL ASIGURĂRII; RĂSPUNDEREA OMNIASIG VIENNA INSURANCE GROUP
    // 9.1. Perioada de asigurare este cea precizată în Poliţă.
    // 9.2. Răspunderea OMNIASIG VIENNA INSURANCE GROUP începe la ora 0:00 a zilei de început a perioadei de asigurare, dar nu mai devreme de ora 24:00 a zilei în care s-a plătit prima de asigurare sau, după caz, cea dintâi rată a acesteia şi s-a încheiat Poliţa.
    // 9.3. Pentru riscurile de inundaţie şi alunecare / prăbuşire de teren răspunderea începe la ora 0:00 a celei de a cincea zi calendaristică de la data la care s-a plătit prima de asigurare sau, după caz, cea dintâi rată a acesteia şi s-a încheiat Poliţa, excepţie făcând poliţele care se reînnoiesc (poliţe cu continuitate faţă de poliţa precedentă).
    // 9.4. Răspunderea OMNIASIG VIENNA INSURANCE GROUP încetează la ora 24:00 a ultimei zile a perioadei de asigurare sau anterior acestei date conform altor situaţii prevăzute în Poliţă.
    // 9.5. Pentru plata ratelor de primă următoare celei dintâi, OMNIASIG VIENNA INSURANCE GROUP acordă un termen de păsuire de 15 zile calendaristice de la datele scadente prevăzute în Poliţă.
    // 9.6. În caz de neplată la termenele scadente (inclusiv în termenul de păsuire menţionat mai sus) şi în cuantumul prevăzut a ratelor de primă următoare celei dintâi, Poliţa îşi suspendă automat efectele juridice pentru o perioadă de 60 zile calendaristice începând cu ora 0:00 a zilei următoare scadenţei ratei neplătite, iar răspunderea OMNIASIG VIENNA INSURANCE GROUP încetează pentru această perioadă, fără a fi necesară nici o notificare (în scris) sau altă formalitate prealabilă din partea OMNIASIG VIENNA INSURANCE GROUP, Asiguratul fiind de drept în întârziere prin simpla neîndeplinire a obligaţiei de plată a ratei la scadenţă.
    // Poliţa reintră în vigoare de la ora 0.00 a zilei următoarei celei în care s-a plătit rata de primă restantă până în acel moment, în cuantumul datorat conform Poliţei. În cazul în care Poliţa nu reintră în vigoare în termenul de 60 zile prevăzut mai sus, aceasta încetează de plin drept, începând cu ora 0:00 a zilei următoare scadenţei ratei neplătite, fără a mai fi necesară punerea în întârziere, Asiguratul / Contractantul fiind de drept în întârziere prin simpla neexecutare a obligaţiei de plată a primei, sau orice altă formalitate prealabilă, inclusiv dar nelimitându-se la intervenţia unei instanţe de judecată.
    // 10. OBLIGAŢIILE ASIGURATULUI / CONTRACTANTULUI
    // 10.1. Asiguratul / Contractantul are următoarele obligaţii:
    // 10.1.1. Înaintea intrării în vigoare a asigurării şi în timpul derulării acesteia:
    // (i) să furnizeze, în scris, către OMNIASIG VIENNA INSURANCE GROUP, la solicitarea acestuia, informaţii complete şi detaliate cu privire la împrejurările esenţiale privind riscul, precum şi să declare, la data încheierii Poliţei, orice informaţii sau împrejurări pe care le cunoaşte şi care, de asemenea, sunt esenţiale pentru evaluarea riscului. Sunt considerate împrejurări esenţiale privind evaluarea riscului acelea care ar putea să influenţeze OMNIASIG VIENNA INSURANCE GROUP în decizia sa de a accepta sau de a respinge riscul, ori de a-l accepta pe baza unor înţelegeri sau recomandări speciale;
    // (ii) să comunice în scris către OMNIASIG VIENNA INSURANCE GROUP orice modificare apărută referitor la adresa domiciliului / reşedinţei sale, precum şi orice modificări ale împrejurărilor esenţiale privind riscul bunurilor asigurate (exemple: schimbarea destinaţiei bunurilor asigurate; neocuparea şi nesupravegherea locuinţei asigurate, altfel ocupată permanent, pe o perioada mai mare de 30 zile calendaristice consecutive etc.), de îndată ce a luat cunoştinţă de acestea;
    // (iii) să nu facă şi/sau să nu permită modificări care ar duce la majorarea riscului, cu excepţia cazului în care, în urma îndeplinirii obligaţiei de la pct. (ii), OMNIASIG VIENNA INSURANCE GROUP confirmă în scris continuarea asigurării;
    // (iv) să achite obligaţiile de plată a primei de asigurare, în cuantumul şi la datele scadente stabilite în Poliţă;
    // (v) să răspundă în scris la solicitările OMNIASIG VIENNA INSURANCE GROUP cu privire la împrejurările esenţiale privind riscurile acoperite prin Poliţă (de exemplu: clădire situată în zonă cu istoric de alunecari de teren) şi să se conformeze recomandărilor făcute în scris de OMNIASIG VIENNA INSURANCE GROUP privind măsurile de prevenire a daunelor;
    // (vi) să întreţină bunurile asigurate în condiţii corespunzatoare prin întreprinderea tuturor acţiunilor necesare şi în conformitate cu dispoziţiile legale şi/sau recomandările / instrucţiunile producătorului, manifestând diligenţa unui bun proprietar, în scopul prevenirii producerii sau apariţiei oricărui eveniment asigurat;
    // (vii) să permită reprezentanţilor OMNIASIG VIENNA INSURANCE GROUP să efectueze inspecţiile de risc şi să verifice, ori de câte ori aceştia consideră necesar, modul în care sunt întreţinute bunurile asigurate şi în care sunt îndeplinite recomandările făcute cu ocazia efectuării inspecţiilor de risc;
    // (viii) să ia potrivit cu împrejurările, măsurile de prevenire suplimentare pentru evitarea producerii sau apariţiei unor daune, de exemplu:
    // - în cazul riscului de inundaţie şi/sau fenomene atmosferice :
    // - să scoată din funcţiune instalaţiile şi/sau echipamentele electrice în cazul unui pericol iminent sau în cazul în care, ca urmare a producerii acestor riscuri, există pericolul de pătrundere a apei în interiorul clădirii asigurate sau în care se află bunuri asigurate;
    // - în cazul riscurilor de apă de conductă şi refulare:
    // - să se conformeze dispoziţiilor legale şi indicatiilor scrise ale OMNIASIG VIENNA INSURANCE GROUP în ceea ce priveşte măsurile speciale împotriva gerului, montarea unor instalaţii suplimentare, modificări ori înlocuiri ale conductelor oricăror instalaţii prin care circulă apa;
    // - să închidă, să golească şi să menţină golite instalaţiile aferente clădirilor nefolosite sau părţilor nefolosite de clădire cu posibilităţi de separare a alimentării cu apă.
    // - să întrerupă / închidă deîndată alimentarea cu apă, în cazul producerii riscurilor de apă de conductă şi refulare;
    // - în cazul riscului de prăbuşire de corpuri terestre, dacă devine previzibilă prăbuşirea de corpuri (de exemplu: copac uscat sau stâlp avariat în vecinătatea bunurilor asigurate şi pentru care există un pericol iminent de prăbuşire peste bunurile asigurate), să anunţe de îndată organele abilitate (după caz: primăria, staţiile locale de distribuţie a energiei electrice etc) cu privire la situaţiile apărute, în scopul întreprinderii de acţiuni specifice necesare împiedicării producerii acestui risc asigurat;
    // - în cazul riscului de furt, în eventualitatea absenţei Asiguratului sau persoanelor fizice majore care în mod statornic locuiesc împreună cu Asiguratul şi/sau care au calitatea de soţ/soţie de la locuinţa asigurată, porţile, uşile de acces în locuinţă, ferestrele şi celelalte deschideri prin care se poate avea acces în locuinţa asigurată, să fie tot timpul încuiate cu dispozitive de închidere, iar toate sistemele de siguranţă existente în momentul încheierii asigurării sau asupra cărora se cade de acord ulterior - în special sistemele de alarmă antifurt - să fie bine întreţinute şi menţinute în stare de funcţionare.
    // (ix) să comunice în scris, în termen de 10 zile calendaristice, către OMNIASIG VIENNA INSURANCE GROUP dispariţia interesului asigurat şi noul titular al interesului asigurat în scopul stabilirii posibilităţilor de continuare a poliţei cu acesta din urmă, în calitate de Asigurat (de exemplu: în situaţia înstrăinării bunului asigurat).
    // 10.1.2. În cazul producerii sau apariţiei oricărui eveniment asigurat:
    // (i) să înştiinţeze de îndată, potrivit evenimentului asigurat, unităţile de pompieri, poliţia sau alte organe abilitate prin lege, cele mai apropiate de locul producerii sau apariţiei evenimentului, cerând întocmirea de acte cu privire la cauzele şi împrejurările producerii sau apariţiei evenimentului, la daunele provocate, precum şi la precizarea eventualilor vinovaţi;
    // (ii) să ia, potrivit cu împrejurările, toate măsurile necesare pentru limitarea daunelor, respectiv pentru protejarea, salvarea, păstrarea şi paza bunurilor asigurate rămase ca urmare a producerii sau apariţiei evenimentului asigurat, precum şi pentru prevenirea degradărilor ulterioare ale acestora;
    // (iii) să înştiinţeze OMNIASIG VIENNA INSURANCE GROUP în scris sau telefonic la numărul de Call Center despre producerea sau apariţia evenimentului asigurat, cât mai curând posibil, dar nu mai târziu de 48 de ore de la momentul când a cunoscut sau trebuia să cunoască producerea sau apariţia acestuia, precizând seria, numărul şi data emiterii Poliţei, precum şi locul unde se află bunurile avariate sau distruse şi/sau după caz persoanele vătămate;
    // (iv) să trimită în scris la OMNIASIG VIENNA INSURANCE GROUP pretenţiile de despăgubire în termen de 10 zile calendaristice de la momentul când a cunoscut sau trebuia să cunoască producerea sau apariţia evenimentului asigurat, dând informaţii despre natura daunei, locul, data, ora, cauzele şi împrejurările producerii sau apariţiei evenimentului asigurat, mărimea prejudiciului suferit;
    // (v) să păstreze starea de fapt în urma producerii sau apariţiei evenimentului asigurat până la obţinerea acordului OMNIASIG VIENNA INSURANCE GROUP pentru începerea activităţilor de îndepărtare a urmărilor evenimentului, cu excepţia măsurilor care se impun pentru limitarea daunei (conform pct. (ii) din acest articol), şi să furnizeze către OMNIASIG VIENNA INSURANCE GROUP toate informaţiile şi probele solicitate, permiţând acesteia să facă investigaţii referitoare la cauza şi mărimea daunei, precum şi la mărimea despăgubirii cuvenite;
    // (vi) să pună de îndată la dispoziţia OMNIASIG VIENNA INSURANCE GROUP toate actele încheiate de organele abilitate (conform pct. (i) din acest articol), documentele şi evidenţele necesare pentru verificarea existenţei şi valorii bunurilor asigurate, precum şi orice alte detalii, probe şi dovezi care au relevanţă pentru stabilirea dreptului la despăgubire şi a despăgubirii cuvenite;
    // (vii) să repună în funcţiune bunurile dăunate, numai după primirea acordului OMNIASIG VIENNA INSURANCE GROUP;
    // (viii) să ia toate măsurile şi să îndeplinească toate formalităţile pentru conservarea dreptului la regres al OMNIASIG VIENNA INSURANCE GROUP faţă de terţii vinovaţi de producerea daunei;
    // (ix) să facă dovada interesului asigurat;
    // (x) să informeze în scris OMNIASIG VIENNA INSURANCE GROUP dacă bunurile asigurate sunt ipotecate şi, în caz afirmativ, si creditorul ipotecar;
    // (xi) sa depuna documentele necesare instrumentarii daunei într-un termen de maxim 90 zile de la data producerii evenimentului asigurat
    // (xii) să informeze în scris OMNIASIG VIENNA INSURANCE GROUP, în termen de maxim 72 de ore de la momentul luării la cunoştinţă, despre începerea urmăririi penale pentru fapte care au legătură cu producerea evenimentului asigurat împotriva:
    // - Asiguratului, Contractantului sau Beneficiarului (persoane fizice),
    // - persoanelor fizice majore care, în mod statornic, locuiesc împreună cu Asiguratul sau Beneficiarul la locaţia asigurată,
    // - persoanelor alese sau numite în conformitate cu prevederile legale şi autorizate să reprezinte Asiguratul, Contractantul sau Beneficiarul (persoane juridice), persoanelor din conducerea acestora cărora le-au fost delegate atribuţii de conducere sau asociaţilor acestora;
    // (xiii) în cazul asigurării de răspundere civilă:
    // - să comunice către OMNIASIG VIENNA INSURANCE GROUP, în scris, pretenţiile formulate de cei păgubiţi şi să depună la OMNIASIG VIENNA INSURANCE GROUP orice acte primite în legătură cu aceste pretenţii;
    // - să nu recunoască nici o răspundere şi să nu facă nici o ofertă, promisiune, tranzacţie sau plată fără acordul scris al OMNIASIG VIENNA INSURANCE GROUP;
    // - să permită OMNIASIG VIENNA INSURANCE GROUP să facă investigaţii referitoare la cauza şi întinderea daunelor;
    // - să anunţe de îndată OMNIASIG VIENNA INSURANCE GROUP că a fost acţionat în judecată şi să se apere în proces ţinând seama şi de eventualele recomandări făcute de OMNIASIG VIENNA INSURANCE GROUP, inclusiv cu privire la angajarea unui apărător în toate fazele procesuale;
    // 10.2. În cazul neîndeplinirii obligaţiilor prevazute la art. 10.1:
    // (i) Poliţa este lovită de nulitate în caz de declaraţie inexactă sau de reticenţă făcută cu rea-credinţă de către Asigurat sau Contractant cu privire la împrejurări care, dacă ar fi fost cunoscute de către OMNIASIG VIENNA INSURANCE GROUP, ar fi determinat-o pe aceasta din urmă să nu încheie Poliţa ori să nu o încheie în condiţiile respective, chiar dacă declaraţia sau reticenţa nu a avut influenţă asupra producerii evenimentului asigurat. Primele de asigurare plătite rămân dobândite de OMNIASIG VIENNA INSURANCE GROUP, care, de asemenea, poate cere şi plata primelor cuvenite până la momentul la care a luat cunoştinţă de cauza de nulitate;
    // (ii) în caz de declaraţie inexactă sau de reticenţă făcută din culpă de către Asigurat sau Contractant, constatată înainte de producerea evenimentului asigurat, cu privire la împrejurări care, dacă ar fi fost cunoscute de către OMNIASIG VIENNA INSURANCE GROUP, ar fi determinat-o pe aceasta din urmă să nu încheie Poliţa ori să nu o încheie în condiţiile respective, OMNIASIG VIENNA INSURANCE GROUP are dreptul de a lua una dintre următoarele măsuri:
    // - menţinerea în vigoare a Poliţei, solicitând modificarea termenilor şi condiţiilor Poliţei (inclusiv majorarea corespunzătoare a primei de asigurare),
    // - rezilierea Poliţei, la împlinirea unui termen de 10 zile calendaristice calculate de la notificarea primită de Asigurat sau Contractant în acest sens, restituindu-i acestuia din urmă partea din primele de asigurare plătite aferentă perioadei ulterioare rezilierii, exceptând situaţia în care s-au plătit deja despăgubiri sau sunt avizate daune în baza Poliţei;
    // (iii) în caz de declaraţie inexactă sau de reticenţă făcută din culpă de către Asigurat sau Contractant, constatată după producerea evenimentului asigurat, cu privire la împrejurări care, dacă ar fi fost cunoscute de către OMNIASIG VIENNA INSURANCE GROUP, ar fi determinat-o pe aceasta din urmă să nu încheie Poliţa ori să nu o încheie în condiţiile respective, OMNIASIG VIENNA INSURANCE GROUP are dreptul să reducă despăgubirea în raport cu proporţia dintre nivelul primelor de asigurare plătite şi nivelul primelor de asigurare ce ar fi trebuit să fie plătite dacă OMNIASIG VIENNA INSURANCE GROUP ar fi cunoscut respectivele împrejurări;
    // (iv) în alte cazuri decât cele stabilite mai sus, OMNIASIG VIENNA INSURANCE GROUP are dreptul:
    // - să rezilieze Poliţa prin notificare scrisă transmisă Asiguratului sau Contractantului în acest sens, rezilierea devenind efectivă fără alte formalităţi sau intervenţia instanţelor de judecată, Asiguratul / Contractantul fiind de drept în întârziere prin simpla neexecutare a obligaţiei, începând cu ora 0.00 a zilei următoare datei primirii notificării de către Asigurat sau Contractant;
    // - să propună modificarea Poliţei, inclusiv cu ajustarea corespunzătoare a primei de asigurare; dacă Asiguratul sau Contractantul nu-şi exprimă acordul în termen de 5 zile de la data primirii solicitării de modificare, Poliţa se reziliază de drept de la data împlinirii termenului de 5 zile, Asiguratul / Contractantul fiind de drept în întârziere prin simpla neexecutare a obligaţiei, fără alte formalităţi sau intervenţia instanţelor de judecată.
    // În aceste situaţii, Asiguratul sau Contractantul are dreptul la restituirea părţii din primele de asigurare achitate aferente perioadei ulterioare rezilierii, exceptând situaţia în care s-au plătit deja despăgubiri sau sunt avizate daune în baza Poliţei.
    // - să refuze plata despăgubirii, integral sau parţial, corespunzător influenţei obligaţiilor neîndeplinite asupra producerii evenimentului asigurat, majorării daunei, stabilirii despăgubirii.
    // În cazul nerespectării de către Asigurat sau Contractant a obligaţiei de comunicare a producerii evenimentului asigurat în termenul stabilit prin Poliţă, OMNIASIG VIENNA INSURANCE GROUP are dreptul să refuze plata despăgubirii dacă din acest motiv nu a putut determina cauza producerii evenimentului asigurat şi întinderea daunei.
    // 10.3. În cazul în care Poliţa este semnată de un Contractant, acesta va trebui să respecte obligaţiile
    // care derivă din Poliţă, în afara celor care prin natura lor nu pot fi respectate decât de Asigurat.
    // 10.4. Asiguratului / Beneficiarului îi este opozabilă neîndeplinirea de către Contractant a obligaţiilor
    // asumate prin prezenta Poliţă.
    // 11. CONSTATAREA ŞI EVALUAREA DAUNELOR; STABILIREA ŞI PLATA DESPĂGUBIRILOR
    // 11.1. Constatarea daunelor se face de către OMNIASIG VIENNA INSURANCE GROUP, direct sau prin împuterniciţi, împreună cu Asiguratul sau împuterniciţii săi şi/sau terţul păgubit, după caz, inclusiv prin experţi, în baza documentelor şi informaţiilor furnizate de Asigurat.
    // 11.2. În cazul în care, cu ocazia reparaţiei sau restaurării bunurilor avariate rezultă şi alte avarii apărute ca urmare a producerii sau apariţiei oricărui eveniment asigurat, ce nu au putut fi constatate iniţial, Asiguratul trebuie să înştiinţeze OMNIASIG VIENNA INSURANCE GROUP, în vederea efectuării unei constatări suplimentare.
    // 11.3. Evaluarea daunelor se face de către OMNIASIG VIENNA INSURANCE GROUP, inclusiv prin experţi, în baza documentelor şi informaţiilor furnizate de Asigurat.
    // Evaluarea daunelor şi plata despăgubirilor se fac în funcţie de starea bunului din momentul producerii sau apariţiei evenimentului asigurat, pe baza documentelor referitoare la cauzele, împrejurările şi consecinţele producerii sau apariţiei evenimentului asigurat şi, dacă este cazul, a oricăror alte documente solicitate de OMNIASIG VIENNA INSURANCE GROUP, pe care Asiguratul are obligaţia legală de a le deţine.
    // 11.4. În cazul în care daunele au fost mărite / agravate din alte cauze decât din riscurile asigurate, despăgubirea se va stabili numai pentru acea parte din daună care, după constatările ce se mai pot face cu certitudine, a fost cauzată de riscul asigurat.
    // 11.5. La producerea sau apariţia fiecărui eveniment asigurat,despăgubirea cuvenită se calculează prin deducerea din cuantumul daunei a franşizei prevăzute în Poliţă.
    // 11.6. La cererea expresă a Asiguratului, OMNIASIG VIENNA INSURANCE GROUP poate să acorde avansuri din despăgubiri de până la 50% din cuantumul despăgubirii, evaluat şi stabilit cu certitudine până în acel moment, ca urmare a unei daune deja constatate, dar nu mai mult de echivalentul a 500.000 EURO, pe baza unui deviz antecalcul întocmit ţinând cont de preţurile de catalog şi a tarifelor de manoperă la data producerii sau apariţiei oricărui eveniment asigurat.
    // 11.7. La producerea sau apariţia unei daune pentru care s-a formulat o cerere de despăgubire, OMNIASIG VIENNA INSURANCE GROUP sau orice altă persoană autorizată de acesta, fără a-şi afecta drepturile decurgând din Poliţă sau a-şi mări responsabilitatea ce-i revine conform prevederilor acesteia, poate:
    // (i) prelua şi menţine controlul asupra bunurilor asigurate;
    // (ii) administra în mod rezonabil conservarea acestor bunuri.
    // Bunurile preluate, aflate sub controlul sau în administrarea OMNIASIG VIENNA INSURANCE GROUP în condiţiile prevăzute de paragrafele de mai sus, nu pot fi abandonate de Asigurat, în favoarea OMNIASIG VIENNA INSURANCE GROUP.
    // 11.8. OMNIASIG VIENNA INSURANCE GROUP este îndreptăţit:
    // 11.8.1. să suspende instrumentarea dosarului de daună până la finalizarea procesului penal dacă în legătură cu producerea sau apariţia oricărui eveniment asigurat a început urmărirea penală împotriva Asiguratului Contractantului sau Beneficiarului (persoane fizice), persoanelor fizice majore care, în mod statornic, locuiesc împreuna cu Asiguratul sau Beneficiarul la locaţia asigurată sau persoanelor alese sau numite în conformitate cu prevederile legale şi autorizate să reprezinte Asiguratul, Contractantul sau Beneficiarul (persoane juridice), persoanelor din conducerea acestora cărora le-au fost delegate atribuţii de conducere, sau asociaţilor acestora;
    // 11.8.2. să desfasoare investigaţii, să efectueze cercetări (inclusiv expertize) prin orice mijloace legale (direct sau prin persoane autorizate) având ca scop stabilirea realității, cauzelor și împrejurărilor producerii evenimentului asigurat, precum și mărimea pagubei, dacă există suspiciuni întemeiate cu privire la aceste aspecte; OMNIASIG VIENNA INSURANCE GROUP va notifica în scris Asiguratul / Beneficiarul despre începerea investigațiilor / cercetărilor mai sus-menționate în termen de 15 zile calendaristice de la data demarării acestora, urmând, de asemenea, să notifice Asiguratului / Beneficiarului rezultatul investigațiilor în termen de 15 zile de la finalizarea acestora; termenul de finalizare a investigațiilor / cercetărilor depinde de eventualele proceduri legale implicate, precum și de complexitatea respectivelor investigații și/sau cercetări
    // 11.8.3. să nu acorde despăgubiri dacă:
    // (i) Asiguratul, Contractantul sau Beneficiarul este de rea credinţă în sensul că în declaraţiile acestuia sau ale reprezentanţilor acestuia, care sunt făcute cu ocazia avizării daunei şi/sau în timpul instrumentării acesteia, se constată neadevăruri, falsuri, aspecte frauduloase sau omisiuni care conduc la inducerea în eroare a OMNIASIG VIENNA INSURANCE GROUP;
    // (ii) Asiguratul sau Beneficiarul nu poate justifica dreptul său la plata despăgubirii;
    // (iii) rezultatele obţinute în urma investigaţiilor şi/sau cercetărilor efectuate de către OMNIASIG VIENNA INSURANCE GROUP denotă aspecte frauduloase, contrazic declaraţiile referitoare la cauzele şi împrejurările producerii evenimentului asigurat sau în
    // 08.04.09.W.001.0.L
    // Pagina 17 din 25
    // legătură cu dauna;
    // (iv) daunele la bunurile asigurate au fost produse sau agravate, pentru partea de daună care s-a mărit, ca o consecinţă directă a nerespectării dispoziţiilor legale referitoare la autorizarea, construirea, recepţia, exploatarea bunurilor asigurate, indiferent dacă OMNIASIG VIENNA INSURANCE GROUP avea cunoştinţă sau nu de aceste aspecte; astfel, această prevedere nu operează în situaţia în care dauna sau o parte din aceasta s-ar fi produs oricum şi indiferent de respectarea sau nerespectarea dispoziţiilor legale menţionate anterior.
    // 11.8.4. să dobândească dreptul de proprietate asupra bunului asigurat în starea în care acesta se găseşte după producerea sau apariţia oricărui eveniment asigurat, prin plata despăgubirii în caz de daună totală; fac excepţie de la această prevedere clădirile sau alte construcţii de orice fel.
    // 11.8.5. să iniţieze, după plata despăgubirii şi în limita acesteia, acţiune de regres împotriva persoanelor vinovate de producerea sau mărirea daunei, pentru partea de daună care s-a mărit.
    // 11.9. În cazul Poliţelor care au ca obiect bunuri grevate de o ipotecă, despăgubirea este afectată la plata respectivelor creanţe privilegiate sau ipotecare, după rangul lor, conform art. 2.330 şi următoarelor din Codul civil.
    // Despăgubirea cuvenită în baza Poliţei se va achita conform notificării cesiunii sau ipotecii primite de OMNIASIG VIENNA INSURANCE GROUP, cu respectarea dispoziţiilor din Codul civil aplicabile cesiunilor de creanţă sau ipotecilor asupra creanţelor.
    // Despăgubirea se acordă Asiguratului în cazurile cesiunilor sau ipotecilor pentru care există acordul în acest sens al terţei persoane în favoarea căreia s-a efectuat cesiunea sau este instituită ipoteca.
    // 11.10. Dacă legea nu prevede altfel, despăgubirea va fi plătită în termen de maxim 15 zile calendaristice de la data depunerii ultimului document necesar instrumentării daunei, document care trebuie depus nu mai târziu de împlinirea termenului maxim de completare a dosarului de daună de către Asigurat sau Beneficiar conform art. 10.1.2. (xi).
    // 11.11. Despăgubirea cuvenită se plăteşte în România, astfel:
    // (i) Pentru poliţele la care prima de asigurare a fost plătită în Lei (RON), despăgubirea se plăteşte în Lei (RON). În situaţia în care documentele de plată sunt în valută despăgubirea cuvenită se va determina prin aplicarea cursului valutar de referinţă din ziua producerii evenimentului asigurat.
    // (ii) Pentru poliţele la care prima a fost plătită în valută:
    // - pentru cazul daunei totale despăgubirea cuvenită se achită în aceeaşi valută în care a fost plătită prima de asigurare sau în altă valută agreată de părţi;
    // - pentru cazul daunei parţiale despăgubirea cuvenită se achită în valută pentru documentele de plată în valută, respectiv în Lei (RON) pentru documentele de plată în Lei (RON).
    // (iii) Indiferent de valuta în care s-a plătit prima de asigurare (Lei/RON sau altă valută), orice transformare de curs de schimb valutar se va face la cursul de referinţă BNR din ziua producerii evenimentului asigurat.
    // 11.12. În asigurările de bunuri, persoanele păgubite se pot îndrepta împotriva persoanelor responsabile de producerea daunei, potrivit dreptului comun, pentru tot ceea ce depăşeşte despăgubirea cuvenită conform Poliţei.
    // 11.13. Despăgubirea cuvenită nu poate depăşi nici cuantumul daunei, nici suma asigurată / limita de răspundere, nici valoarea de asigurare a bunurilor la data producerii sau apariţiei oricărui eveniment asigurat şi nici oricare sublimită, atunci când aceasta există, stabilită prin Poliţă. Ca urmare, despăgubirea nu poate depăşi niciuna din valorile menţionate anterior.
    // 11.14. În cazul asigurării de bunuri, prin cuantumul daunei se înţelege:
    // (i) în caz de daună totală, valoarea de asigurare la data producerii sau apariţiei oricărui eveniment asigurat, a bunurilor distruse sau dispărute, din care se scade valoarea la aceeaşi dată a eventualelor resturi ce se mai pot întrebuinţa şi valorifica;
    // (ii) în caz de daună parţială, costul reparaţiei, recondiţionării sau restaurării părţilor componente sau pieselor avariate ori costul de înlocuire, limitat la valorea de asigurare a bunului asigurat la data producerii daunei, din care se scade valoarea resturilor ce se mai pot întrebuinţa şi valorifica; manopera, transportul, autorizaţiile şi alte taxe ocazionate de şi necesare la efectuarea reparaţiilor sunt luate în calculul cuantumului despăgubirii integral, dar materialele de construcţii sau orice alte materiale sau piese folosite în cadrul reparaţiei sunt luate în calculul cuantumului despăgubirii cu scăderea uzurii.
    // În cazul refacerii finisajelor clădirilor precum şi în cazul pardoselilor interioare ca urmare a
    // 08.04.09.W.001.0.L
    // Pagina 18 din 25
    // producerii evenimentului asigurat, despăgubirile se vor acorda proporţional cu suprafeţele afectate; pentru zugrăveli sau vopsiri ale pereţilor precum si pentru pardoseli se va despăgubi costul refacerii acestora pentru întreaga încăpere dacă prin reparaţie nu se poate asigura aceeaşi calitate şi nuanţă pentru toată încăperea sau dacă este afectată minim 80% din suprafaţa încăperii.
    // În cazul asigurării locuinţei la valoare de înlocuire, despăgubirile pentru daune parţiale se acordă fără a se ţine cont de uzură.
    // În cazul clădirilor pentru care valoarea de asigurare reprezintă valoare de piaţă, iar valoarea de înlocuire este mai mică decât valoarea de piaţă, pentru daune parţiale, cuantumul daunei este limitat la valoarea de înlocuire şi din cuantumul daunei nu se scade uzura pentru piesele şi materialele înlocuite.
    // (iii) pentru bunuri conţinute:
    // - despăgubirea se acordă raportat la valoarea de înlocuire, reprezentând valoarea de asigurare la data producerii evenimentului asigurat, numai dacă vechimea acestora la data producerii evenimentului asigurat nu depăşeşte 50% din durata normală de funcţionare (utilizare), stabilită prin dispoziţiile legale în vigoare sau prin recomandările tehnice ale producătorului.
    // - dacă vechimea bunurilor asigurate la data producerii evenimentului asigurat depăşeşte plafonul menţionat, despăgubirea va fi limitată la valoarea reală, reprezentând valoarea de asigurare la data producerii evenimentului asigurat. În caz de daună parţială, din cuantumul daunei nu se scade uzura corespunzătoare pentru piesele şi materialele înlocuite.
    // 11.15. La stabilirea cuantumului daunei se consideră preţurile uzuale de piaţă. Acestea nu includ adaosuri pentru munca prestată în regim excepţional (exemple: adaosuri datorate muncii în regim de ore suplimentare, zile libere sau sărbători legale, transport rapid sau aerian, alte prestaţii în regim de urgenţă).
    // 11.16. În cazul avarierii unui ansamblu sau subansamblu, la calculul cuantumului daunei se ia în considerare numai înlocuirea / repararea părţilor componente care au fost avariate, chiar dacă în cadrul reparaţiei se înlocuieşte / repară întregul ansamblu / subansamblu. Face excepţie de la această prevedere situaţia în care la reparaţie piesa / partea componentă avariată nu se poate înlocui individual ci numai împreună cu ansamblul / subansamblul din care face parte. Părţile componente sau piesele avariate se pot înlocui numai dacă valoarea reparaţiilor egalează sau depăşeşte valoarea reală a acestora ori dacă procesele tehnologice existente nu permit reparaţia.
    // 11.17. În cazul furtului prin efracţie si actelor de tâlhărie:
    // (i) daca înainte de plata despăgubirii, bunurile furate au fost găsite, despăgubirea se acordă numai pentru eventualele daune apărute ca urmare a furtului.
    // (ii) plata despăgubirii se face numai cu condiţia ca Asiguratul să dea o declaraţie prin care se obligă să restituie total sau parţial, după caz, despăgubirea primită, dacă, după plata despăgubirii, bunurile sau o parte dintre acestea au fost găsite; cuantumul restituirii va fi egal cu valoarea bunurilor găsite, din care se scade, dacă este cazul, valoarea daunelor produse bunurilor respective.
    // (iii) OMNIASIG VIENNA INSURANCE GROUP acordă despăgubiri numai în cazul în care organele de Poliţie confirmă, în scris, declanşarea urmăririi penale, faptul că bunurile nu au fost găsite după trecerea termenului de 30 de zile calendaristice de la declararea furtului sau, după caz, starea în care acestea au fost găsite.
    // 11.18. Dreptul la despăgubire în caz de daună, în condiţiile prevăzute în Poliţă, aparţine Asiguratului iar Contractantul nu poate exercita acest drept chiar dacă este în posesia Poliţei, cu excepţia cazului în care este împuternicit în acest sens de către Asigurat.
    // 11.19. La producerea evenimentului asigurat, OMNIASIG VIENNA INSURANCE GROUP are dreptul de a compensa ratele de prima neplătite şi datorate până la sfârşitul perioadei pentru care s-a închieat Poliţa sau pentru anul de asigurare în care s-a produs evenimentul asigurat (în cazul poliţelor multianuale). În caz de daună totală, această compensare se realizează obligatoriu.
    // 11.20. Prin plata despăgubirii se sting orice pretenţii ale Asiguratului sau, după caz, Beneficiarului, faţă de OMNIASIG VIENNA INSURANCE GROUP, în legătură cu dauna respectivă.
    // 11.21. În cazul asigurării de răspundere civilă:
    // (i) Despăgubirile se stabilesc pe baza înţelegerii tripartite dintre Asigurat, Beneficiar şi OMNIASIG VIENNA INSURANCE GROUP, sau prin hotărâre judecătorească definitivă, învestită cu formulă executorie.
    // Tranzacţia încheiată între Asigurat şi Beneficiar cu privire la plata despăgubirilor nu obligă
    // 08.04.09.W.001.0.L
    // Pagina 19 din 25
    // OMNIASIG VIENNA INSURANCE GROUP la nici un fel la plată, nefiindu-i opozabilă.
    // (ii) Stabilirea despăgubirilor pe baza înţelegerii dintre părţi (pe cale amiabilă) se poate face numai dacă din actele întocmite de organele competente şi din înştiinţarea Asiguratului rezultă cu certitudine răspunderea civilă a acestuia pentru producerea daunelor, iar persoana păgubită face dovada prejudiciului suferit.
    // (iii) Despăgubirile nu pot fi stabilite pe baza înţelegerii dintre părţi, în cazul în care:
    // - nu pot fi elucidate cauzele şi împrejurările producerii evenimentului asigurat, persoana răspunzătoare de producerea daunelor, sau cuantumul acestora;
    // - persoana păgubită formulează pretenţii de despăgubiri ce se cuvin sub formă de prestaţii băneşti periodice (de exemplu: pensie de întreţinere), precum şi în cazul în care pentru aceste prestaţii se solicită o sumă globală.
    // (iv) În cazul în care producerea unui eveniment asigurat se datorează acţiunii simultane sau succesive a mai multor persoane, OMNIASIG VIENNA INSURANCE GROUP acordă despăgubiri conform procentului de culpă al Asiguratului rezultat din documentele emise de organele competente şi/sau declaraţii de martori.
    // (v) În situaţiile de culpă comună măsura răspunderii fiecărei persoane vinovate de producerea evenimentelor asigurate va fi cea rezultată din actele emise de organele competente. În cazul în care din aceste acte nu rezultă măsura răspunderii fiecărei persoane, aceasta se va stabili în cote egale în raport cu numărul părţilor implicate în producerea evenimentului asigurat.
    // (vi) În cazul în care Beneficiarul a contribuit din culpă la producerea evenimentului asigurat sau la mărirea daunei, Asiguratul va fi ţinut răspunzător numai pentru partea din daună pe care a produs-o.
    // (vii) Despăgubirea nu poate depăşi nivelul limitelor de răspundere asumate prin Poliţă.
    // (viii) În cazul daunelor produse bunurilor (mobile sau imobile), despăgubirea nu poate depăşi valoarea reală a bunurilor la data producerii evenimentului asigurat.
    // (ix) În cazul daunelor materiale, dacă bunurile avariate sau distruse pentru care se datorează despăgubiri fac obiectul unor contracte de asigurare de bunuri, OMNIASIG VIENNA INSURANCE GROUP acordă despăgubiri Beneficiarului în limita diferenţei dintre cuantumul daunei şi despăgubirile plătibile la asigurările încheiate.
    // (x) În cazul decesului sau vătămării corporale a unor persoane, OMNIASIG VIENNA INSURANCE GROUP plăteşte indemnizaţia la care persoana prejudiciată are dreptul conform prezentelor Condiţii de asigurare independent de despăgubirile ce se acordă în baza unei eventuale asigurări facultative de accidente de persoane.
    // (xi) În cazul în care, prin hotărâre judecătorească, Asiguratul este obligat la plata unei prestaţii băneşti periodice, OMNIASIG VIENNA INSURANCE GROUP va plăti suma stabilită prin această hotărâre în aceeaşi formă, până la concurenţa sumei stabilite sau a limitei de răspundere stabilită prin Poliţă, care este atinsă mai întâi.
    // (xii) Dacă după stabilirea prestaţiei periodice starea persoanei vătămate s-a îmbunătăţit, OMNIASIG VIENNA INSURANCE GROUP va comunica în scris că încetează plata despăgubirilor până la pronunţarea unei alte hotărâri judecătoreşti. Asiguratul sau, după caz, OMNIASIG VIENNA INSURANCE GROUP (dacă a fost parte în proces) va solicita instanţei micşorarea cuantumului sumelor prestaţiilor periodice sau încetarea plăţii acestora, pe baza documentelor emise de organele competente.
    // (xiii) OMNIASIG VIENNA INSURANCE GROUP plăteşte despăgubirea cuvenită nemijlocit Beneficiarului, înştiinţând despre aceasta în scris pe Asigurat, în măsura în care Beneficiarul nu a fost despăgubit de Asigurat. Despăgubirea se plăteşte Asiguratului, cu condiţia ca aceasta să fie justificată de acesta şi recunoscută de OMNIASIG VIENNA INSURANCE GROUP, în cazul în care Asiguratul dovedeşte că a despăgubit pe Beneficiar.
    // (xiv) În cazul daunelor materiale, ca şi în cazul decesului sau vătămării corporale, când organele competente nu au emis acte privitoare la cauzele şi împrejurările în care s-a produs răspunderea civilă a Asiguratului, precum şi privitoare la prejudiciu, acestea pot fi dovedite către OMNIASIG VIENNA INSURANCE GROUP prin orice mijloace legale de probă, inclusiv declaraţii ale martorilor.
    // (xv) În cazul vătămării corporale OMNIASIG VIENNA INSURANCE GROUP acordă numai despăgubirea care depăşeşte cuantumul indemnizaţiei primite în cadrul asigurării sociale sau din fondurile angajatorului, faţă de veniturile nete ale persoanei vătămate.
    // (xvi) În situaţia în care persoana vătămată nu beneficiază de drepturile sociale prevăzute la alineatul de mai sus, despăgubirea va avea la bază o adeverinţă de venituri în ultimele 6 luni lucrate
    // 08.04.09.W.001.0.L
    // Pagina 20 din 25
    // premergătoare evenimentului, emisă de organele competente (administraţia financiară sau angajatorii).
    // (xvii) OMNIASIG VIENNA INSURANCE GROUP este îndreptăţit să iniţieze, după plata despăgubirii şi în limita acesteia, acţiune de recuperare împotriva persoanelor vinovate de producerea sau mărirea daunei, pentru partea de daună care s-a mărit, în situaţia în care ulterior plăţii despăgubirii se constată că, în baza prevederilor Poliţei, aceasta nu trebuia acordată, inclusiv în situaţia în care hotărârea judecătorească definitivă şi irevocabilă în temeiul căreia s-au acordat despăgubiri este schimbată, în tot sau în parte, prin promovarea unei căi extraordinare de atac.
    // 12. ALTE ASIGURĂRI
    // 12.1. După producerea sau apariţia oricărui eveniment asigurat, Asiguratul are obligaţia să înştiinţeze în scris OMNIASIG VIENNA INSURANCE GROUP, cu ocazia avizării producerii sau apariţiei evenimentului asigurat, despre existenţa oricărei alte asigurări (contractată de către Asigurat sau în numele acestuia) în vigoare la data producerii sau apariţiei evenimentui asigurat, având obiectul asigurării, riscurile şi costurile / cheltuielile asigurate parţial sau în totalitate similare cu cele asigurate prin prezenta Poliţă.
    // Atunci când există mai multe asigurări încheiate pentru acelaşi bun, fiecare asigurător este obligat la plată proporţional cu suma asigurată şi până la concurenţa acesteia, fără ca asiguratul să poată încasa o despăgubire mai mare decât prejudiciul efectiv, consecinţă directă a riscului.
    // 12.2. Părţile declară şi înţeleg faptul că prezenta Poliţă de asigurare facultativă nu constituie o poliţă de asigurare obligatorie împotriva dezastrelor naturale (PAD) în sensul Legii nr. 260/2008, fiind o poliţă separată şi excedentară asigurării obligatorii (PAD).
    // 12.3. Prezenta Poliţă facultativă nu va acoperi niciun eveniment care este sau ar trebui să fie acoperit în baza unei astfel de asigurări obligatorii, cu excepţia diferenţei dintre despăgubirea cuvenită conform prezentei Poliţe şi suma asigurată obligatorie stabilită în baza asigurării obligatorii (PAD), indiferent dacă este în vigoare sau nu o astfel de asigurare obligatorie şi indiferent dacă Asiguratul / Beneficiarul este sau nu despăgubit în baza acesteia.
    // 12.4. Asiguratul declară în mod expres şi înţelege totodată că, potrivit dispoziţiilor legale în vigoare, are obligaţia de a-şi încheia în mod valabil o poliţă de asigurare obligatorie a locuinţei (PAD) ca o condiţie preliminară şi obligatorie încheierii poliţei facultative sau a menţinerii în vigoare a poliţei facultative multianuale pentru anii succesivi de asigurare, în lipsa căreia OMNIASIG VIENNA INSURANCE GROUP nu poate încheia poliţa facultativă sau menţine în vigoare poliţa facultativă multianuală pentru anii succesivi de asigurare.
    // 12.5. Verificarea încheierii poliţei de asigurare PAD se realizează de către OMNIASIG VIENNA INSURANCE GROUP conform normelor legale în vigoare, atât la încheierea poliţei facultative cât şi la fiecare aniversare anuală a acesteia în cazul poliţelor multianuale.
    // 12.6. În cazul în care imobilul care face obiectul asigurării facultative îşi schimbă integral destinaţia constructivă de locuinţă, Asiguratul este obligat să comunice în scris Asigurătorului acest lucru şi să facă dovada acestui fapt cu un extras de carte funciară nu mai vechi de 30 de zile.
    // 12.7. Poliţa facultativă este nulă de drept în situaţia în care se constată, indiferent de momentul constatării, că la data emiterii acesteia nu era valabil încheiată o poliţă PAD şi fără ca aceasta să fi ieşit din valabilitate.
    // 12.8. În cazul poliţelor facultative multianuale, acestea încetează de drept, fără nicio formalitate prealabilă, Asiguratul fiind de drept în întârziere prin simpla neexecutare a obligaţiei prevăzută la art. 12.4.din prezentele Condiţii, în situaţia în care se constată, indiferent de momentul constatării, că la data aniversării anuale a acesteia nu era valabil încheiată o poliţă PAD şi fără ca aceasta să fi ieşit din valabilitate.
    // 12.9. În cazul în care sunt incidente prevederile art. 12.7 sau 12.8 din prezentele Condiţii, plata oricăror prime de asigurare aferente poliţei facultative nu constituie un acord tacit de intrare / menţinere în vigoare a acesteia. În consecinţă, orice primă plătită în această situaţie se returnează, la cerere, Asiguratului / Contractantului.
    // 13. SUPRAASIGURARE / SUBASIGURARE
    // 13.1. Subasigurarea este situaţia în care suma asigurată a bunurilor / categoriilor de bunuri care fac obiectul unei daune, este inferioară valorii de asigurare a acestora. În cazul în care se constată că la data producerii evenimentului asigurat bunurile asigurate se aflau în situaţia de subasigurare, atunci cuantumul daunei se reduce corespunzător raportului dintre suma asigurată a bunurilor / categoriilor de
    // 08.04.09.W.001.0.L
    // Pagina 21 din 25
    // bunuri prevăzută în contract şi valoarea de asigurare a acestora (principiul proporţionalităţii).
    // Subasigurarea nu se aplică în situaţia în care sunt îndeplinite cumulativ următoarele condiţii:
    // (i) diferenţa dintre valoarea de asigurare a bunurilor / categoriilor de bunuri asigurate şi suma asigurată a acestora, prevăzută în Poliţă, este mai mică decât 20% din suma asigurată respectivă;
    // (ii) diferenţa dintre valoarea de asigurare şi suma asigurată este mai mică decât echivalentul a 20.000 EURO.
    // 13.2. În cazul bunurilor la care valoarea de asigurare este cea evaluată de un evaluator autorizat, subasigurarea nu se aplică, cu condiţia ca suma asigurată să fie chiar valoarea menţionată în concluzia raportului de evaluare.
    // 13.3. Pentru bunurile conţinute, riscurile de apă de conductă şi refulare, precum şi pentru răspunderea civilă faţă de terţi, nu se aplică principiul proporţionalităţii.
    // 13.4. Supraasigurarea este situaţia în care suma asigurată a bunurilor / categoriilor de bunuri care fac obiectul unei daune, este superioară valorii de asigurare a acestora. În cazul în care se constată că la data producerii evenimentului asigurat bunurile asigurate se aflau în situaţia de supraasigurare, OMNIASIG VIENNA INSURANCE GROUP va recalcula prima de asigurare şi va restitui, la cerere, Asiguratului sau Contractantului, după caz, partea aferentă supraasigurării. Totodată, Asiguratul are dreptul să ceară, oricând, reducerea sumei asigurate pe care o consideră supraasigurată şi recalcularea corespunzătoare a primei de asigurare.
    // 13.5. În situaţia de supraasigurare, OMNIASIG VIENNA INSURANCE GROUP nu va plăti Asiguratului / Beneficiarului mai mult decât despăgubirea cuvenită.
    // 14. INCETARE / REZILIERE ; NOTIFICĂRI / COMUNICĂRI
    // 14.1. Poliţa încetează de plin drept, fără a mai fi necesară nici o formalitate prealabilă, partea fiind de drept în întârziere, din momentul în care bunul asigurat a fost înstrăinat, în afara cazului în care OMNIASIG VIENNA INSURANCE GROUP şi-a dat acordul expres pentru continuarea asigurării.
    // 14.2. În cazul în care Asiguratul este de rea-credinţă (excepţie în situaţia în care Poliţa este lovită de nulitate absolută), OMNIASIG VIENNA INSURANCE GROUP are dreptul să rezilieze Poliţa, fără niciun demers prealabil, partea fiind de drept în întârziere, fără restituirea primei de asigurare, rezilierea devenind efectivă de la data primirii notificării de către Asigurat sau Contractant în acest sens.
    // 14.3. Părțile convin ca în situațiile:
    // - inexistenței sau neîndeplinirii uneia sau mai multor condiții și/sau rezerve astfel cum au fost ele prevăzute în Poliță
    // - includerii Asiguratului într-un program de sancțiuni internaționale
    // prezentul contract încetează de drept la momentul îndeplinirii condiției rezolutorii, fără niciun alt demers prealabil și fără intervenția instanței de judecată, părțile fiind de drept în întârziere prin simpla îndeplinire a condiției rezolutorii
    // 14.4. În cazul în care Poliţa încetează ca urmare a imposibilităţii producererii riscurilor asigurate, dispariţiei / distrugerii bunurilor asigurate din alte cauze decât cele acoperite prin Poliţă sau dispariţiei interesului asigurat, prima de asigurare datorată va fi cea aferentă perioadei în care Poliţa de asigurare a fost valabilă, excepţie fiind situaţia în care s-au plătit deja despăgubiri sau sunt avizate daune în baza Poliţei încetate pentru care se aplică prevederile art. 14.5 (i) de mai jos.
    // 14.5. În cazul încetării Poliţei din orice motiv (denunţare, încetare de drept, reziliere etc.):
    // (i) în situaţia în care s-au plătit deja despăgubiri sau sunt avizate daune în baza Poliţei încetate, prevederile acesteia se aplică pentru toate evenimentele asigurate survenite înainte de data încetării, până la lichidarea definitivă a acestora şi OMNIASIG VIENNA INSURANCE GROUP nu restituie prime de asigurare.
    // Asiguratul / Contractantul datorează plata primei de asigurare pentru întreaga perioadă pentru care s-a încheiat Poliţa sau pentru anul de asigurare în care s-a produs evenimentul asigurat (în cazul poliţelor multianuale).
    // (ii) În celelalte situaţii, OMNIASIG VIENNA INSURANCE GROUP va restitui Asiguratului / Contractantului, la cerere, diferenţa dintre prima plătită de acesta şi prima datorată pentru perioada anterioară încetării, dacă nu se prevede altfel, în mod expres, prin prezentele condiţii de asigurare. Prima de asigurare datorată se calculează ”pro-rata temporis”, în funcţie de numărul de zile cuprinse în asigurare.
    // În cazul în care plata primei de asigurare s-a efectuat în echivalentul în lei al unei valute, restituirea diferenţei de primă se face în lei, la cursul BNR din data încetării valabilităţii poliţei.
    // 14.6. Orice notificare, comunicare, avizare sau înştiinţare în legătură cu încheierea, executarea, modificarea sau încetarea contractului de asigurare, se consideră efectuată dacă va fi transmisă în
    // 08.04.09.W.001.0.L
    // Pagina 22 din 25
    // scris, prin unul din următoarele mijloace:
    // (ii) scrisoare cu confirmare de primire trimisă la adresa Asiguratului / Contractantului menţionată în Poliţă sau, în cazul în care aceasta a fost schimbată, la ultima adresă comunicată de către Asigurat / Contractant, iar în cazul OMNIASIG VIENNA INSURANCE GROUP, la adresa unităţii OMNIASIG VIENNA INSURANCE GROUP cu care Asiguratul / Contractantul a încheiat Poliţa, respectiv, după caz, adresa Sucursalei / Agenţiei sau a Centralei;
    // (iii) prin înmânare directă, astfel :
    // (i) depunere la registratura unităţii OMNIASIG VIENNA INSURANCE GROUP cu care Asiguratul / Contractantul a încheiat Poliţa, respectiv, după caz, Sucursala / Agenţia sau Centrala OMNIASIG VIENNA INSURANCE GROUP, iar în cazul Asiguratului, persoană juridică, la registratura acestuia;
    // (ii) prin semnătură de primire, în cazul Asiguratului / Contractantului, persoană fizică.
    // (iii) prin fax, astfel :
    // - Asiguratul / Contractantul va transmite notificările la numărul de fax al unităţii OMNIASIG VIENNA INSURANCE GROUP cu care Asiguratul / Contractantul a încheiat Poliţa, respectiv, după caz, Sucursala / Agenţia sau Centrala, iar OMNIASIG VIENNA INSURANCE GROUP va transmite notificarea la numărul de fax al Asiguratului / Contractantului comunicat la momentul încheierii Poliţei;
    // - Notificările transmise pe fax până în ora 17.00 vor fi considerate primite în aceeaşi zi, iar cele transmise după această oră vor fi considerate primite şi vor fi înregistrate în următoarea zi lucrătoare;
    // (iv) prin mijloace electronice (e-mail) la adresa comunicată de părţi la momentul încheierii Poliţei.
    // 15. SUBROGARE
    // 15.1. Prin plata despăgubirilor şi în limita acestora, OMNIASIG VIENNA INSURANCE GROUP este subrogat în toate drepturile Asiguratului sau Beneficiarului contra persoanelor răspunzătoare de producerea daunei ori de mărirea acesteia, pentru partea de daună care s-a mărit.
    // 15.2. Asiguratul şi/sau Beneficiarul răspund faţă de OMNIASIG VIENNA INSURANCE GROUP pentru prejudiciile aduse prin acte care ar împiedica exercitarea dreptului de regres împotriva persoanelor răspunzătoare de producerea daunei ori de mărirea acesteia, pentru partea de daună care s-a mărit.
    // Dacă Asiguratul sau, după caz, Beneficiarul renunţă prin orice modalitate juridică la drepturile sale de despăgubire faţă de terţii răspunzători sau face o tranzacţie, despăgubirea ce s-ar cuveni Asiguratului sau, după caz, Beneficiarului se va reduce în mod corespunzător cu sumele care au făcut obiectul acestor acte juridice.
    // Dacă plata despăgubirii a fost deja efectuată, Asiguratul sau, după caz, Beneficiarul este obligat să înapoieze despăgubirea încasată.
    // 16. FORŢA MAJORĂ ŞI CAZUL FORTUIT
    // 16.1. Dacă legea nu prevede contrariul, părţile vor fi exonerate de răspundere în condiţiile în care vor dovedi că nerespectarea obligaţiilor asumate se datorează forţei majore sau cazului fortuit.
    // 17. MODIFICAREA POLIŢEI
    // 17.1. Prevederile Poliţei, inclusiv condiţiile de asigurare, pot fi modificate prin acordul părţilor oricând pe parcursul perioadei de asigurare, modificările respective intrând în vigoare în condiţiile şi de la data convenite de părţi.
    // Pe parcursul perioadei de asigurare şi în limita acesteia, se pot încheia acte adiţionale pentru modificarea Poliţei, de exemplu pentru:
    // (i) actualizarea sumelor asigurate iniţial, atunci când acestea nu mai reflectă valoarea de asigurare a bunului asigurat, inclusiv în cazul îmbunătăţirilor, extinderilor sau dotărilor suplimentare efectuate;
    // (ii) asigurarea altor bunuri, riscuri care nu au fost cuprinse în contractul iniţial;
    // (iii) reîntregirea sumei asigurate sau limitei de răspundere în caz de daună;
    // (iv) modificarea perioadei de asigurare;
    // 17.2. În cazurile în care, OMNIASIG VIENNA INSURANCE GROUP constată modificarea nivelului de risc sau apariţia unor riscuri suplimentare (inclusiv cu prilejul efectuării unei inspecţii de risc sau în baza comunicării Asiguratului / Contractantului), OMNIASIG VIENNA INSURANCE GROUP va reevalua riscul va putea decide:
    // (i) menţinerea în vigoare a Poliţei cu stabilirea de către Asigurător, dacă este cazul, a unor noi termeni şi condiţii privind acoperirea prin asigurare, corespunzători noilor împrejurări privind riscul,
    // 08.04.09.W.001.0.L
    // Pagina 23 din 25
    // precum și modificarea primei de asigurare în raport cu noile condiții de risc. Dacă Asiguratul nu este de acord cu privire la modificarea condiţiilor contractuale, acesta poate denunţa Polița în termen de 10 de zile de la data primirii notificării de modificare.
    // (ii) suspendarea Poliţei printr-o notificare scrisă, suspendarea încetând la data semnării de către părţi a unui act adiţional de modificare a acoperirii – termeni, condiţii şi/sau prima de asigurare.
    // 17.3. În cazul poliţelor facultative multianuale:
    // (i) OMNIASIG VIENNA INSURANCE GROUP îşi rezervă dreptul să modifice termenii și condițiile Poliței (inclusiv actualizarea primei de asigurare anuale) pentru anii succesivi de asigurare, notificând Contractantul / Asiguratul cu cel puţin 30 zile înainte de expirarea fiecărui an de asigurare (aniversare anuală), luând în calcul daunele înregistrate la nivel de Poliță și/sau segment de portofoliu, termenii și condițile reasigurării și/sau orice alte costuri cu impact asupra executării contractului, Asiguratul având drept să denunțe contractul cu preaviz de 20 de zile dacă nu este de acord cu modificarea.
    // (ii) orice parte are dreptul de a notifica celeilalte părti intenția de a nu mai continua Polița pentru anii succesivi din perioada de asigurare, cu 30 de zile calendaristice înainte de expirarea fiecărui an de asigurare (aniversare anuală).
    // 18. LEGISLAŢIE
    // 18.1. Persoanele care obţin sau încearcă prin orice mijloace să obţină pe nedrept despăgubiri din asigurare sau cei care înlesnesc asemenea fapte, se pedepsesc potrivit legii penale ori de câte ori fapta întruneşte elementele unei infracţiuni.
    // 18.2. Asigurarea încheiată potrivit prevederilor Poliţei este supusă legilor din România, acestea completându-se cu prevederile legale în vigoare de drept comun, precum și cele specifice asigurărilor.
    // 18.3. În vederea protejării asiguraţilor, beneficiarilor asigurării şi terţelor persoane păgubite, prin contribuţia asigurătorilor există Fondul de garantare, destinat plăţilor de indemnizaţii / despăgubiri rezultate din contractele de asigurare facultative şi obligatorii, încheiate în condiţiile legii, în cazul declarării falimentului Asigurătorului.
    // 19. LITIGII
    // 19.1. Orice litigiu în legătură cu aplicarea Poliţei se rezolvă prin conciliere directă între părţi sau, în cazul în care acest lucru nu este posibil, de către instanţele judecătoreşti competente din România.
    // 19.2. În cazul asigurării de răspundere civilă, OMNIASIG VIENNA INSURANCE GROUP este îndreptăţit, conform legii, să intervină în proces în interesul Asiguratului.
    // SECŢIUNEA DE ASISTENŢĂ TEHNICĂ LA LOCAŢIA ASIGURATĂ
    // 1. CLAUZĂ OPERATIVĂ
    // 1.1. Prezenta Secţiune este valabilă numai împreună cu Condiţiile de asigurare privind asigurarea Locuinţelor GARANT AMPLUS, în completarea acestora.
    // 1.2. Toate prevederile Condiţiilor de asigurare privind asigurarea locuinţelor – GARANT AMPLUS sunt valabile în măsura în care nu contravin prevederilor din prezenta Secţiune. În situaţia în care, prin cumularea prevederilor din cuprinsul condiţiilor de asigurare privind asigurarea locuinţelor – GARANT AMPLUS şi prezenta Secţiune:
    //  există capitole cu acelaşi titlu / conţinut, prevederile acestora se cumulează;
    //  apar contradicţii, se consideră valabile numai prevederile din prezenta Secţiune.
    // 2. DEFINIŢII ŞI INTERPRETĂRI
    // În tot cuprinsul acestei Secţiuni termenii de mai jos au numai înţelesul atribuit prin următoarele definiţii:
    // 2.1. Societate de asistenţă: furnizorul de servicii prin intermediul căruia OMNIASIG VIENNA INSURANCE GROUP oferă acoperire pentru servicii de asistenţă tehnică.
    // 2.2. Servicii de asistenţă tehnică: serviciile prestate în regim de urgenţă de către instalatori, electricieni, geamgii, dulgheri, tinichigii, lacătuşi, tâmplari, în scopul remedierii prejudiciilor produse de evenimentele acoperite, conform prevederilor prezentei Secţiuni.
    // 2.3. Evenimente acoperite: evenimente accidentale / situaţii de urgenţă produse în perioada de asigurare şi care nu intră sub incidenţa excluderilor mentionate la cap. 4 din prezenta Secţiune.
    // 08.04.09.W.001.0.L
    // Pagina 24 din 25
    // 3. RISCURILE ŞI COSTURILE / CHELTUIELILE ACOPERITE
    // 3.1. OMNIASIG VIENNA INSURANCE GROUP acoperă, prin intermediul societăţii de asistenţă, în limitele / condiţiile de despăgubire aferente abonamentului specific, contravaloarea serviciilor de asistenţă tehnică accesate şi a materialelor / pieselor de schimb necesare prestării acestora, ca urmare a apariţiei evenimentelor acoperite prin prezenta Secţiune (indiferent de numărul acestora).
    // Evenimentele acoperite în baza prezentei Secţiuni pot fi generate de următoarele cauze:
    // (i) avarii la instalaţiile de apă, canalizare şi termoficare (exemple: spargerea, înfundarea sau îngheţarea conductelor de apă, defectare robineţi etc.);
    // (ii) avarii la instalaţia de încălzire proprie (exemple: spargerea conductelor, defectare robineţi, îngheţarea apei în conducte etc.);
    // (iii) avarii accidentale produse la centrala termică, din orice cauză, apărută pe perioada de funcţionare, ce aduce centrala termică în stare de nefuncţionare;
    // (iv) avarii la instalaţia de gaze (exemplu: inclusiv la conducte de transport sau aparate de consum);
    // (v) avarierea acoperişului clădirilor asigurate datorată furtunii, căderii crengilor / copacilor, grindinei, ploii torenţiale;
    // (vi) avarierea uşilor exterioare (inclusiv blocarea), geamurilor / tâmplăriei ferestrelor exterioare;
    // (vii) avarii la instalaţia electrică / pene de curent;
    // (viii) daune produse clădirilor în care se află bunurile asigurate (pereţi, tavane, uşi, încuietori, ferestre, duşumele, acoperiş) cu prilejul furtului sau tentativei de furt prin efracţie;
    // (ix) deteriorarea, furtul, pierderea sau uitarea în interiorul clădirii a cheilor de acces;
    // 3.2. Se acordă, peste limita de despăgubire aferentă abonamentului specific VIP, despăgubiri pentru costurile reparaţiilor de repunere a locului în situaţia anterioară producerii evenimentului acoperit, în cazul în care au fost necesare, în scopul efectuării intervenţiei, spargerea zidului şi/sau altă acţiune similară pentru a identifica şi ajunge la sursa cauzatoare de prejudicii. Aceste costuri rămân în sarcina Asiguratului în cazul agreării abonamentului GOLD, conform menţiunii din Poliţă.
    // 4. EXCLUDERI
    // 4.1. Nu sunt incluse în serviciile de asistenţă tehnică la locuinţa asigurată şi deci nu se acordă despăgubiri pentru:
    // (i) avarierea unei părţi comune a imobilului din care face parte locuinţa asigurată, dacă locuinţa asigurată nu este afectată;
    // (ii) servicii sau reparaţii legate direct sau indirect de operaţiile curente de întreţinere sau de garanţia producătorului / furnizorului;
    // (iii) avarii generate de următoarele riscuri catastrofice: cutremur de pământ; inundaţii şi/sau aluviuni provenind din revărsarea apelor de suprafaţă (curgătoare sau stătătoare), din precipitaţii atmosferice temporare, inclusiv din topirea zăpezii ori gheţii; prăbusire şi/sau alunecare de teren;
    // (iv) avarii generate de: greve, tulburari civile şi acţiuni ale unor grupuri răuvoitoare;
    // (v) dacă Asiguratul / soţul sau soţia acestuia / rudele Asiguratului / persoanele care locuiesc la locuinţa asigurată nu au permis accesul furnizorilor agreaţi pentru efectuarea lucrărilor de reparaţii de urgenţă;
    // (vi) remedierea avariei de către Asigurat sau de către alţi furnizori de servicii decât cei agreaţi de OMNIASIG VIENNA INSURANCE GROUP.
    // 5. LIMITE DE DESPĂGUBIRE
    // În funcţie de abonamentul specific menţionat expres în Poliţă, limitele de despăgubire sunt:
    // 5.1. pentru abonament GOLD:
    // (i) pentru costuri / cheltuieli (piese / materiale şi manoperă) aferente serviciilor de asistenţă tehnică prestate, pentru orice intervenţie: 1.000 lei (inclusiv TVA);
    // (ii) suplimentarea plafonului de la pct. (i) sub formă de achiziţie a pieselor necesare intervenţiilor la centrala termică, pentru orice intervenţie: 500 lei (inclusiv TVA).
    // 5.2. pentru abonament VIP:
    // (i) pentru costuri / cheltuieli (piese / materiale şi manoperă) aferente serviciilor de asistenţă tehnică prestate, pentru orice intervenţie: 2.000 lei (inclusiv TVA);
    // (ii) suplimentarea plafonului de la pct. (i) sub formă de achiziţie a pieselor necesare intervenţiilor la centrala termică, pentru orice intervenţie: 1.000 lei (inclusiv TVA).
    // 6. OBLIGAŢIILE ASIGURATULUI / CONTRACTANTULUI
    // 6.1. Asiguratul / Contractantul are următoarele obligaţii:
    // (i) să anunţe (notificare telefonică) evenimentul produs la Centrul de Urgenţe, care este apelabil 24 de ore din 24, la numărul de telefon (cu tarif normal): 021.9669;
    // (ii) să acţioneze potrivit instrucţiunilor date de Centrul de Urgenţă;
    // (iii) să nu modifice, fără acordul Centrului de Urgenţă, starea de fapt survenită în urma producerii evenimentului acoperit, exceptând situaţiile în care se pot lua imediat măsuri de limitare a avariei şi/sau urmărilor acesteia, cu suportarea costului de către OMNIASIG VIENNA INSURANCE GROUP;
    // (iv) să permită accesul specialiştilor agreaţi de OMNIASIG VIENNA INSURANCE GROUP pentru efectuarea constatării şi a reparaţiilor de urgenţă.
    // 7. CONSTATAREA ŞI EVALUAREA DAUNELOR; STABILIREA ŞI PLATA DESPĂGUBIRILOR
    // 7.1. Constatarea evenimentului, evaluarea consecinţelor şi efectuarea serviciilor acoperite se realizează numai prin intermediul Centrului de Urgenţă / societăţii de asistenţă.
    // 7.2. OMNIASIG VIENNA INSURANCE GROUP, prin intermediul Centrului de Urgenţă, se obligă să contacteze Asiguratul şi să îl informeze cu privire la organizarea intervenţiei de urgenţă în maximum 2 ore de la notificarea evenimentului.
    // 7.3. Intervenţia şi remedierea avariilor se asigură de către societatea de asistenţă în termen de maxim 3 ore (Bucureşti şi reşedinţele de judeţ) şi 5 ore (alte localităţi), de la înregistrarea apelului telefonic venit din partea Asiguratului / OMNIASIG VIENA INSURANCE GROUP.
    // 7.4. Orice constatare, evaluare sau prestaţie se efectuează numai în prezenţa la locuinţa asigurată a Asiguratului sau reprezentantului / împuternicitului său legal.
    // 7.5. Despăgubirile se plătesc în limitele / condiţiile stipulate în prezenta Secţiune, prin decontare directă cu societatea de asistenţă, Asiguratul nefiind implicat financiar.
    // 7.6. În situaţia în care Societatea de asistenţă nu este disponibilă pentru oferirea serviciilor, Asiguratul va contacta OMNIASIG VIENNA INSURANCE GROUP şi vor agrea împreună furnizorul de servicii de asistenţă şi serviciile pe care acesta le va presta.
    // 7.7. OMNIASIG VIENNA INSURANCE GROUP nu răspunde pentru calitatea serviciilor prestate de societatea de asistenţă. OMNIASIG VIENNA INSURANCE GROUP are dreptul:
    // - să aleagă modalitatea prestaţiilor, la costuri optime şi în condiţii de eficienţă;
    // - ulterior intervenţiei, să efectueze o expertiză (direct sau prin personal autorizat) asupra evenimentului produs, urmărilor acestuia, modului în care s-a efectuat intervenţia.
  ];
  constructor() {}

  ngOnInit() {}
}
