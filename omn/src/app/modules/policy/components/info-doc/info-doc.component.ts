import {
  Component,
  OnInit,
  HostBinding,
  Output,
  EventEmitter,
  Input,
} from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TipModalComponent } from '../modals/tip-modal/tip-modal.component';
import { subPageHeaderSecondary } from 'src/app/shared/data/sub-page-header-secondary';
import { ImageCard } from 'src/app/shared/models/component/image-card';

@Component({
  selector: 'app-info-doc',
  templateUrl: './info-doc.component.html',
  styleUrls: ['./info-doc.component.scss'],
})
export class InfoDocComponent implements OnInit {
  headerConfig = subPageHeaderSecondary('Document de Informare');
  @HostBinding('class') color = 'ion-color-white-page';
  @Output() continue = new EventEmitter();
  @Input() policyID;
  padHelpItems: Array<ImageCard> = [
    {
      mainIcon: {
        name: 'cutremur',
        color: 'green-gradient',
        classes: 'icon-40 mt-16 ion-align-self-start mb-0',
      },
      textContent: [
        {
          text: 'Cutremure de pământ',
        },
      ],
      id: '0',
      itemClass: 'mh-104',
    },
    {
      mainIcon: {
        name: 'alunecari',
        color: 'green-gradient',
        classes: 'icon-40 mt-16 mb-0 ion-align-self-start',
      },
      textContent: [
        {
          text: 'Alunecări de teren',
        },
      ],
      id: '0',
      itemClass: 'mh-104',
    },
    {
      mainIcon: {
        name: 'md-inundatie',
        color: 'green-gradient',
        classes: 'icon-40 mt-16 mb-0 ion-align-self-start',
      },
      textContent: [
        {
          text: 'Inundații',
        },
      ],
      id: '0',
      itemClass: 'mh-104',
    },
  ];

  amplusHelpItems: Array<ImageCard> = [
    {
      mainIcon: {
        name: 'casa',
        color: 'green-gradient',
        classes: 'icon-40 mt-16 ion-align-self-start mb-0',
      },
      textContent: [
        {
          text: 'Locuința',
        },
      ],
      id: '0',
      itemClass: 'mh-104',
    },
    {
      mainIcon: {
        name: 'bunuri',
        color: 'green-gradient',
        classes: 'icon-40 mt-16 mb-0 ion-align-self-start',
      },
      textContent: [
        {
          text: 'Bunurile',
        },
      ],
      id: '0',
      itemClass: 'mh-104',
    },
    {
      mainIcon: {
        name: 'md-petitie',
        color: 'green-gradient',
        classes: 'icon-40 mt-16 mb-0 ion-align-self-start',
      },
      textContent: [
        {
          text: 'Daune terți',
        },
      ],
      id: '0',
      itemClass: 'mh-104',
    },
  ];

  amplusCoveredRisks: Array<Array<ImageCard>> = [
    [
      {
        mainIcon: {
          name: 'incendiu',
          color: 'green-gradient',
          classes: 'icon-40 mt-16 ion-align-self-start mb-0',
        },
        id: '0',
        itemClass: 'h-100',
        riskText: 'Incendiu',
      },
      {
        mainIcon: {
          name: 'trasnet',
          color: 'green-gradient',
          classes: 'icon-40 mt-16 mb-0 ion-align-self-start',
        },
        id: '0',
        itemClass: 'h-100',
        riskText: 'Trăsnet',
      },
      {
        mainIcon: {
          name: 'explozie',
          color: 'green-gradient',
          classes: 'icon-40 mt-16 mb-0 ion-align-self-start',
        },
        id: '0',
        itemClass: 'h-100',
        riskText: 'Explozie',
      },
      {
        mainIcon: {
          name: 'cutremur',
          color: 'green-gradient',
          classes: 'icon-40 mt-16 mb-0 ion-align-self-start',
        },
        id: '0',
        itemClass: 'h-100',
        riskText: 'Cutremur',
      },
    ],
    [
      {
        mainIcon: {
          name: 'md-inundatie',
          color: 'green-gradient',
          classes: 'icon-40 mt-16 ion-align-self-start mb-0',
        },
        id: '0',
        itemClass: 'h-100',
        riskText: 'Inundație',
      },
      {
        mainIcon: {
          name: 'alunecari',
          color: 'green-gradient',
          classes: 'icon-40 mt-16 mb-0 ion-align-self-start',
        },
        id: '0',
        itemClass: 'h-100',
        riskText: 'Alunecări',
      },
      {
        mainIcon: {
          name: 'grindina',
          color: 'green-gradient',
          classes: 'icon-40 mt-16 mb-0 ion-align-self-start',
        },
        id: '0',
        itemClass: 'h-100',
        riskText: 'Grindină',
      },
      {
        mainIcon: {
          name: 'furtuna',
          color: 'green-gradient',
          classes: 'icon-40 mt-16 mb-0 ion-align-self-start',
        },
        id: '0',
        itemClass: 'h-100',
        riskText: 'Furtună',
      },
    ],
    [
      {
        mainIcon: {
          name: 'apa-de-conducta',
          color: 'green-gradient',
          classes: 'icon-40 mt-16 ion-align-self-start mb-0',
        },
        id: '0',
        itemClass: 'h-100',
        riskText: 'Apa de conductă',
      },
      {
        mainIcon: {
          name: 'furt',
          color: 'green-gradient',
          classes: 'icon-40 mt-16 mb-0 ion-align-self-start',
        },
        id: '0',
        itemClass: 'h-100',
        riskText: 'Furt',
      },
      {
        mainIcon: {
          name: 'centrala-termica',
          color: 'green-gradient',
          classes: 'icon-40 mt-16 mb-0 ion-align-self-start',
        },
        id: '0',
        itemClass: 'h-100',
        riskText: 'Avarii',
      },
      {
        mainIcon: {
          name: 'fenomene-electrice',
          color: 'green-gradient',
          classes: 'icon-40 mt-16 mb-0 ion-align-self-start',
        },
        id: '0',
        itemClass: 'h-100',
        riskText: 'Fenomene electrice',
      },
    ],
  ];

  tipItems: Array<ImageCard> = [
    {
      mainIcon: {
        name: 'md-tip-a',
        color: 'green-gradient',
        classes: 'icon-40 mt-16 mb-0 ion-align-self-start',
      },
      textContent: [
        {
          text: 'Tip A 20.000 Euro',
        },
      ],
      id: '0',
      itemClass: 'mh-104',
    },
    {
      mainIcon: {
        name: 'md-tip-b',
        color: 'green-gradient',
        classes: 'icon-40 mt-16 mb-8 ion-align-self-start',
      },
      textContent: [
        {
          text: 'Tip B 10.000 Euro',
        },
      ],
      id: '0',
      itemClass: 'mh-104',
    },
  ];

  cardInfo = [
    {
      classes: 'bg-green no-shadow',
      icon: {
        name: 'md-umbrella',
      },
      subtitle: {
        text: 'Ce se asigură?',
        classes: '',
      },
      listClass: 'green',
      textContents: [
        `Prin PAD se asigură exclusiv construcțiile cu destinația de locuință
        pentru următoarele trei riscuri: cutremure de pământ, alunecări de teren
        și inundații, ca fenomene naturale.`,
        `În cazul producerii unui risc asigurat se acordă despăgubiri și pentru:`,
        `daunele directe provocate locuinței, consecința indirectă a producerii
        riscurilor asigurate, ex. incendiul, explozia ca urmare a producerii unui
        cutremur ori alunecări de teren;`,
        `pentru pagubele indirecte provocate locuinței, consecința directă a
        producerii evenimentului asigurat, dacă daunele sunt confirmate de
        autoritățile competente.`,
        `În funcție de tipul locuinței, suma asigurată e reprezentată de
        echivalentul în lei al sumei de 20.000 EUR pentru locuințele „Tip A”,
        respectiv 10.000 EUR pentru cele „Tip B”, calculată la cursul Băncii
        Naționale a României valabil la data încheierii asigurării.`,
      ],
    },
    {
      classes: 'bg-red  no-shadow',
      icon: {
        name: 'md-exclusion',
      },
      subtitle: {
        text: 'Ce nu se asigură?',
        classes: '',
      },
      listClass: 'red',
      textContents: [
        `Daunele provocate bunurilor de orice fel, altele decât locuința;`,
        `Daunele provocate de inundații produse în timpul formării unor
        lacuri de acumulare sau de schimbarea artificială a cursurilor de
        apă;`,
        `Daunele provocate de evenimentele asigurate, dacă aceste fenomene
        au fost prilejuite, înlesnite ori agravate de săpături sau lucrări
        edilitare de orice fel, lucrări de prospecțiuni, explorări ori
        exploatări miniere sau petroliere, la suprafață ori în profunzime;`,
        `Daunele provocate de tasarea (lăsarea) terenului de fundație;`,
        `Daunele provocate de formarea de crăpături în terenul de fundație
        sau în terenul din preajma clădirii, datorită variației de volum a
        terenului, ca urmare a contracției/dilatării produse de
        îngheț/dezgheț;`,
        `Daunele provocate terenului care împrejmuiește locuința și care
        nu este asociat noțiunii de locuință și nu face obiectul asigurării.`,
      ],
    },
    {
      classes: 'bg-warning  no-shadow',
      icon: {
        name: 'md-restriction',
      },
      subtitle: {
        text: 'Există restricții de acoperire?',
        classes: '',
      },
      listClass: 'danger',
      textContents: [
        `Anexele, dependințele, dotările și utilitățile nelegate structural
        de locuință, anexele ce nu folosesc în mod direct scopului locativ
        (garaje, magazii, șoproane, grajduri, jardiniere, pergole,
        împrejmuiri, pătule, depozite etc.), sau instalațiile și amenajările
        speciale (piscine, saune, instalații solare sau eoliene, rampe auto
        etc.);`,
        `Locuințele situate în zone cu interdicție de construire;`,
        `Locuințele încadrate în clasa I de risc seismic.`,
      ],
    },
    {
      classes: 'bg-deep-blue  no-shadow',
      icon: {
        name: 'md-globe',
      },
      subtitle: {
        text: 'Unde beneficiez de asigurare?',
        classes: 'px-8',
      },
      listClass: 'blue',
      textContents: [
        `Obiectul contractului de asigurare îl reprezintă construcțiile cu
        destinația de locuință situate pe teritoriul României.`,
      ],
    },
    {
      classes: 'bg-light-green-2  no-shadow',
      icon: {
        name: 'md-handshake',
      },
      subtitle: {
        text: 'Ce obligații am?',
        classes: '',
      },
      listClass: 'green-2',
      textContents: [
        `Să încheiați câte un PAD pentru fiecare locuință deținută în proprietate și, la expirarea valabilității acestora, sa le reînnoiți;`,
        `Să predați, în cazul înstrăinării locuinței, PAD dobânditorului, noul proprietar având obligația de a notifica achiziția în 5 zile asigurătorului care a eliberat PAD;`,
        `Să întrețineți corespunzător locuința asigurată, în scopul prevenirii producerii ori apariției oricărui eveniment asigurat;`,
        `Să răspundeți în scris la solicitările PAID cu privire la împrejurările producerii evenimentului asigurat și să vă conformați recomandărilor PAID;`,
        `Să înștiințați imediat producerea evenimentului asigurat organelor abilitate potrivit legii (unitățile de pompieri, poliție, primăria localității etc.), cerând întocmirea de acte cu privire la cauzele și împrejurările producerii sau apariției evenimentului, daunele provocate, precum și precizarea vinovaților de eventuala mărire a pagubei și să le prezentați PAID;`,
        `Să înștiințați imediat în scris PAID ori asigurătorul care a eliberat PAD despre producerea riscului asigurat, precizând seria, numărul și data emiterii poliței, daunele suferite și mărimea probabilă a daunei;`,
        `Să faceți dovada dreptului de proprietate sau de administrare asupra locuinței asigurate.`,
      ],
    },
    {
      classes: 'bg-yellow  no-shadow',
      icon: {
        name: 'md-coins',
      },
      subtitle: {
        text: 'Când și cum plătesc?',
        classes: '',
      },
      listClass: 'yellow',
      textContents: [
        `Plata primei de asigurare se face integral și anticipat, în numerar sau prin virament în contul asigurătorului care eliberează PAD.`,
        `Primele de asigurare reprezintă echivalentul în lei, la cursul Băncii Naționale a României valabil la data efectuării plății, a 20 EUR pentru locuințele de „Tip A”, respectiv 10 EUR pentru locuințele de „Tip B”.`,
      ],
    },
    {
      classes: 'bg-light-blue  no-shadow',
      icon: {
        name: 'md-hourglass',
      },
      subtitle: {
        text: 'Când începe și când încetează acoperirea?',
        classes: '',
      },
      listClass: 'light-blue',
      textContents: [
        `În cazul polițelor noi, asigurarea începe din a cincea zi de la data plății primei și încheierii contractului de asigurare.`,
        `În cazul polițelor care se reînnoiesc, asigurarea începe din ziua următoare celei în care s-a plătit prima și încheiat contractul de asigurare, dar nu mai devreme de ora 0,00 a zilei următoare celei în care încetează vechiul contract.`,
        `Asigurarea încetează la ora 24,00 a ultimei zile de valabilitate înscrise în PAD sau anterior acestei date în momentul în care construcția asigurată își pierde integral destinația de locuință ori bunul piere din alte cauze decât cele cuprinse în asigurarea obligatorie. În aceste situații prima de asigurare nu se restituie.`,
      ],
    },
    {
      classes: 'bg-dark  no-shadow',
      icon: {
        name: 'md-annulment',
      },
      subtitle: {
        text: 'Cum pot sa reziliez contractul?',
        classes: '',
      },
      listClass: 'dark',
      textContents: [
        `PAD nu poate fi reziliată. Chiar și în cazul înstrăinării locuinței, PAD rămâne în vigoare pe întreaga perioadă de valabilitate. `,
      ],
    },
  ];

  amplusCardInfo = [
    {
      classes: 'bg-green no-shadow',
      icon: {
        name: 'md-umbrella',
      },
      subtitle: {
        text: 'Ce se asigură?',
        classes: '',
      },
      listClass: 'green amplus',
      textContents: [
        `Locuința(cu dependințele, dotările și instalațiile fixe) și, după caz, anexele(garaj, boxă, piscine etc.);`,
        `Bunurile conținute de tipul îmbrăcăminte, mobilier, echipamente electronice / electrocasnice(la o valoare globală egală cu 10 % din suma asigurată aferentă categoriei “locuinţă”);`,
        `Daunele provocate terților din culpa dumneavoastră(răspunderea civilă), pentru o limită de răspundere de 1.000 EUR pe eveniment şi pe an de asigurare.`,
        `Polița oferă protecție pentru avarierea sau distrugerea bunurilor asigurate din multe riscuri, dintre care amintim: `,
        `Incendiu, trăsnet, explozie, căderi de corpuri;`,
        `Riscuri de dezastre naturale(cutremur, inundații, alunecare / prăbușire de teren);`,
        `Greve, revolte, tulburări civile, vandalism;`,
        `Fenomene atmosferice(furtună, ploaie torențială, grindină);`,
        `Apă de conductă;`,
        `Furt prin efracție sau tâlhărie;`,
        `Fenomene electrice;`,
        `Avarii accidentale la centrala termică;`,
        `Asistență tehnică la domiciliu.`,
        `Închirierea / cazarea temporară la o altă locație pentru cazurile în care clădirea asigurată a devenit nelocuibilă ca urmare a producerii daunelor din riscuri acoperite;`,
        `Suma asigurată menționată în Poliță reprezintă valoarea pentru care se încheie asigurarea şi este maximul răspunderii OMNIASIG Vienna Insurance Group în cazul producerii sau apariţiei unuia sau mai multor evenimente asigurate.`,
      ],
    },
    {
      classes: 'bg-red no-shadow',
      icon: {
        name: 'md-exclusion',
      },
      subtitle: {
        text: 'Ce nu se asigură?',
        classes: '',
      },
      listClass: 'red amplus',
      textContents: [
        `Nu sunt acoperite prejudicii cauzate de: `,
        `Război, terorism, reacții nucleare;`,
        `Fapte săvârșite cu intenție sau din culpă gravă de către Asigurat(de ex.improvizații neconforme cu reglementările în vigoare la instalaţiile de gaze, încălzire sau electrice);`,
        `Pătrunderea apei de ploaie prin ferestre neetanșe sau neînchise sau prin deschizături care nu sunt produse de fenomenele atmosferice acoperite;`,
        `Tasare;`,
        `Igrasie.`,
      ],
    },
    {
      classes: 'bg-warning  no-shadow',
      icon: {
        name: 'md-restriction',
      },
      subtitle: {
        text: 'Există restricții de acoperire?',
        classes: '',
      },
      listClass: 'danger amplus',
      textContents: [
        `Nu se asigură:`,
        `Clădiri expertizate tehnic pentru riscul de cutremur;`,
        `Clădiri în curs de construcţie sau nefinalizate;`,
        `Clădiri situate în zone cu istoric de alunecări / prăbuşiri de teren;`,
        `Clădiri de patrimoniu;`,
        `Construcţii subterane, sere, solarii;`,
        `Bani, obiecte din metale preţioase, obiecte de artă;`,
        `Vehicule;`,
        `Orice tip de teren;`,
        `Bunuri degradate, ruinate sau a căror stare de întreținere este necorespunzătoare.`,
      ],
    },
    {
      classes: 'bg-deep-blue  no-shadow',
      icon: {
        name: 'md-globe',
      },
      subtitle: {
        text: 'Unde beneficiez de asigurare?',
        classes: '',
      },
      listClass: 'blue',
      textContents: [
        `Asigurarea este valabilă la locaţia asigurată menționată în Poliță.`,
      ],
    },
    {
      classes: 'bg-light-green-2  no-shadow',
      icon: {
        name: 'md-handshake',
      },
      subtitle: {
        text: 'Ce obligații am?',
        classes: '',
      },
      listClass: 'green-2 amplus',
      textContents: [
        `La începutul și pe durata contractului:`,
        `Să aveți încheiată în mod valabil o poliţă de asigurare obligatorie a locuinţei(PAD) ca o condiţie preliminară şi obligatorie încheierii poliţei facultative; în lipsa acesteia OMNIASIG Vienna Insurance Group nu poate încheia poliţa facultativă, iar aceasta nu poate intra în vigoare;`,
        `Să răspundeți sincer și complet la toate întrebările formulate de OMNIASIG Vienna Insurance Group;`,
        `Să plătiți prima de asigurare în întregime și la timp, conform scadenţelor stabilite;`,
        `Să ne informați cu privire la orice modificare apărută în legătură cu adresa declarată sau orice modificări ale împrejurărilor esenţiale privind riscul asigurat;`,
        `Să întreţineţi bunurile asigurate în condiţii corespunzătoare;`,
        `În cazul producerii unui eveniment, să ne înștiințați imediat și să luați toate măsurile rezonabile pentru limitarea daunelor.`,
      ],
    },
    {
      classes: 'bg-yellow  no-shadow',
      icon: {
        name: 'md-coins',
      },
      subtitle: {
        text: 'Când și cum plătesc?',
        classes: '',
      },
      listClass: 'yellow',
      textContents: [
        `Prima plată se efectuează la momentul încheierii Poliţei, prin virament bancar sau în numerar.`,
        `În cazul poliţelor pentru care se agreează plata în rate, scadenţa acestora va fi afişată în Poliţă.`,
      ],
    },
    {
      classes: 'bg-light-blue  no-shadow',
      icon: {
        name: 'md-hourglass',
      },
      subtitle: {
        text: 'Când începe și când încetează acoperirea?',
        classes: '',
      },
      listClass: 'light-blue',
      textContents: [
        `Perioada de valabilitate este cea menţionată în Poliţă.`,
        `Data de începere a acoperirii asigurării este condiţionată de plata integrală a Poliţei sau a primei rate de primă`,
      ],
    },
    {
      classes: 'bg-dark  no-shadow',
      icon: {
        name: 'md-annulment',
      },
      subtitle: {
        text: 'Cum pot sa reziliez contractul?',
        classes: '',
      },
      listClass: 'dark',
      textContents: [
        `La solicitarea dumneavoastră, contractul de asigurare îşi încetează efectele în termen de 20 zile calendaristice de la data notificării OMNIASIG Vienna Insurance Group în acest sens.`,
      ],
    },
  ];

  constructor(public modalController: ModalController) {}

  ngOnInit() {
    console.log(this.policyID);
  }

  back() {}

  next() {
    this.continue.emit();
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: TipModalComponent,
      cssClass: 'my-custom-modal-class',
    });
    return await modal.present();
  }
}
