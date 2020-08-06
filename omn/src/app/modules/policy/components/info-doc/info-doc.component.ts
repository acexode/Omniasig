import { Component, OnInit, HostBinding } from '@angular/core';
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
  helpItems: Array<ImageCard> = [
    {
      mainIcon: {
        name: 'cutremur',
        color: 'green-gradient',
        classes: 'icon-40 mt-16 ion-align-self-start',
      },
      textContent: [
        {
          text: 'Cutremure de pământ',
        },
      ],
      id: '0',
      routerLink: '/home',
      itemClass: 'mh-104',
    },
    {
      mainIcon: {
        name: 'alunecari',
        color: 'green-gradient',
        classes: 'icon-40 mt-16 mb-8 ion-align-self-start',
      },
      textContent: [
        {
          text: 'Alunecări de teren',
        },
      ],
      id: '0',
      routerLink: '/home',
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
      routerLink: '/home',
      itemClass: 'mh-104',
    },
  ];

  tipItems: Array<ImageCard> = [
    {
      mainIcon: {
        name: 'md-tip-a',
        color: 'green-gradient',
        classes: 'icon-40 mt-16 ion-align-self-start',
      },
      textContent: [
        {
          text: 'Tip A 20.000 Euro',
        },
      ],
      id: '0',
      routerLink: '/home',
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
      routerLink: '/home',
      itemClass: 'mh-104',
    },
    // {
    //   mainIcon: {
    //     name: 'md-infomation',
    //     color: 'green-gradient',
    //     classes: 'icon-40 mt-16 mb-0 ion-align-self-start',
    //   },
    //   textContent: [
    //     {
    //       text: '',
    //     },
    //   ],
    //   id: '0',
    //   routerLink: '/home',
    //   itemClass: 'mh-104',
    // },
  ];

  cardInfo = [
    {
      classes: 'bg-green',
      icon: {
        name: 'md-umbrella',
      },
      subtitle: {
        text: 'Ce se asigură?',
        classes: '',
      },
      textContents: [
        `✔︎ Prin PAD se asigură exclusiv construcțiile cu destinația de locuință
        pentru următoarele trei riscuri: cutremure de pământ, alunecări de teren
        și inundații, ca fenomene naturale.`,
        `✔︎ În cazul producerii unui risc asigurat se acordă despăgubiri și pentru:`,
        ` ⁃ daunele directe provocate locuinței, consecința indirectă a producerii
        riscurilor asigurate, ex. incendiul, explozia ca urmare a producerii unui
        cutremur ori alunecări de teren;`,
        ` ⁃ pentru pagubele indirecte provocate locuinței, consecința directă a
        producerii evenimentului asigurat, dacă daunele sunt confirmate de
        autoritățile competente.`,
        `✔︎ În funcție de tipul locuinței, suma asigurată e reprezentată de
        echivalentul în lei al sumei de 20.000 EUR pentru locuințele „Tip A”,
        respectiv 10.000 EUR pentru cele „Tip B”, calculată la cursul Băncii
        Naționale a României valabil la data încheierii asigurării.`,
      ],
    },
    {
      classes: 'bg-red',
      icon: {
        name: 'md-exclusion',
      },
      subtitle: {
        text: 'Ce nu se asigură?',
        classes: '',
      },
      textContents: [
        `✖︎ Daunele provocate bunurilor de orice fel, altele decât locuința;`,
        `✖︎ Daunele provocate de inundații produse în timpul formării unor
        lacuri de acumulare sau de schimbarea artificială a cursurilor de
        apă;`,
        ` ✖︎ Daunele provocate de evenimentele asigurate, dacă aceste fenomene
        au fost prilejuite, înlesnite ori agravate de săpături sau lucrări
        edilitare de orice fel, lucrări de prospecțiuni, explorări ori
        exploatări miniere sau petroliere, la suprafață ori în profunzime;`,
        ` ✖︎ Daunele provocate de tasarea (lăsarea) terenului de fundație;`,
        `✖︎ Daunele provocate de formarea de crăpături în terenul de fundație
        sau în terenul din preajma clădirii, datorită variației de volum a
        terenului, ca urmare a contracției/dilatării produse de
        îngheț/dezgheț;`,
        `✖︎ Daunele provocate terenului care împrejmuiește locuința și care
        nu este asociat noțiunii de locuință și nu face obiectul asigurării.`,
      ],
    },
    {
      classes: 'bg-danger',
      icon: {
        name: 'md-restriction',
      },
      subtitle: {
        text: 'Există restricții de acoperire?',
        classes: '',
      },
      textContents: [
        `! Anexele, dependințele, dotările și utilitățile nelegate structural
        de locuință, anexele ce nu folosesc în mod direct scopului locativ
        (garaje, magazii, șoproane, grajduri, jardiniere, pergole,
        împrejmuiri, pătule, depozite etc.), sau instalațiile și amenajările
        speciale (piscine, saune, instalații solare sau eoliene, rampe auto
        etc.);`,
        `! Locuințele situate în zone cu interdicție de construire;`,
        `! Locuințele încadrate în clasa I de risc seismic.`,
      ],
    },
    {
      classes: 'bg-deep-blue',
      icon: {
        name: 'md-globe',
      },
      subtitle: {
        text: 'Unde beneficiez de asigurare?',
        classes: 'px-8',
      },
      textContents: [
        `✔︎ Obiectul contractului de asigurare îl reprezintă construcțiile cu
        destinația de locuință situate pe teritoriul României.`,
        `! Locuințele situate în zone cu interdicție de construire;`,
        `! Locuințele încadrate în clasa I de risc seismic.`,
      ],
    },
    {
      classes: 'bg-light-green-2',
      icon: {
        name: 'md-handshake',
      },
      subtitle: {
        text: 'Ce obligații am?',
        classes: '',
      },
      textContents: [
        `• 	Să încheiați câte un PAD pentru fiecare locuință deținută în proprietate și, la expirarea valabilității acestora, sa le reînnoiți;`,
        `• 	Să predați, în cazul înstrăinării locuinței, PAD dobânditorului, noul proprietar având obligația de a notifica achiziția în 5 zile asigurătorului care a eliberat PAD;`,
        `• 	Să întrețineți corespunzător locuința asigurată, în scopul prevenirii producerii ori apariției oricărui eveniment asigurat;`,
        `• 	Să răspundeți în scris la solicitările PAID cu privire la împrejurările producerii evenimentului asigurat și să vă conformați recomandărilor PAID;`,
        `• 	Să înștiințați imediat producerea evenimentului asigurat organelor abilitate potrivit legii (unitățile de pompieri, poliție, primăria localității etc.), cerând întocmirea de acte cu privire la cauzele și împrejurările producerii sau apariției evenimentului, daunele provocate, precum și precizarea vinovaților de eventuala mărire a pagubei și să le prezentați PAID;`,
        `• 	Să înștiințați imediat în scris PAID ori asigurătorul care a eliberat PAD despre producerea riscului asigurat, precizând seria, numărul și data emiterii poliței, daunele suferite și mărimea probabilă a daunei;`,
        `• 	Să faceți dovada dreptului de proprietate sau de administrare asupra locuinței asigurate.`,
      ],
    },
    {
      classes: 'bg-light-green-2',
      icon: {
        name: 'md-coins',
      },
      subtitle: {
        text: 'Când și cum plătesc?',
        classes: '',
      },
      textContents: [
        `Plata primei de asigurare se face integral și anticipat, în numerar sau prin virament în contul asigurătorului care eliberează PAD.`,
        `Primele de asigurare reprezintă echivalentul în lei, la cursul Băncii Naționale a României valabil la data efectuării plății, a 20 EUR pentru locuințele de „Tip A”, respectiv 10 EUR pentru locuințele de „Tip B”.`,
      ],
    },
    {
      classes: 'bg-light-blue',
      icon: {
        name: 'md-hourglass',
      },
      subtitle: {
        text: 'Când începe și când încetează acoperirea?',
        classes: '',
      },
      textContents: [
        `În cazul polițelor noi, asigurarea începe din a cincea zi de la data plății primei și încheierii contractului de asigurare.`,
        `În cazul polițelor care se reînnoiesc, asigurarea începe din ziua următoare celei în care s-a plătit prima și încheiat contractul de asigurare, dar nu mai devreme de ora 0,00 a zilei următoare celei în care încetează vechiul contract.`,
        `Asigurarea încetează la ora 24,00 a ultimei zile de valabilitate înscrise în PAD sau anterior acestei date în momentul în care construcția asigurată își pierde integral destinația de locuință ori bunul piere din alte cauze decât cele cuprinse în asigurarea obligatorie. În aceste situații prima de asigurare nu se restituie.`,
      ],
    },
    {
      classes: 'bg-dark',
      icon: {
        name: 'md-annulment',
      },
      subtitle: {
        text: 'Cum pot sa reziliez contractul?',
        classes: '',
      },
      textContents: [
        `PAD nu poate fi reziliată. Chiar și în cazul înstrăinării locuinței, PAD rămâne în vigoare pe întreaga perioadă de valabilitate. `,
      ],
    },
  ];
  constructor() {}

  ngOnInit() {}
}
