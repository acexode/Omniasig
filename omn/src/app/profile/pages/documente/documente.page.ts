import { Component, OnInit, HostBinding } from '@angular/core';
import { NavController } from '@ionic/angular';
import { subPageHeaderPrimary } from 'src/app/shared/data/sub-page-header-primary';

@Component({
  selector: 'app-documente',
  templateUrl: './documente.page.html',
  styleUrls: ['./documente.page.scss'],
})
export class DocumentePage implements OnInit {
  @HostBinding('class') color = 'ion-color-white-page';
  headerConfig = subPageHeaderPrimary('Documente');
  items: any = [];
  itemHeight = 0;
  public documentes: Array<{ name: string; doc: any; id?: string }> = [
    {
      name: 'Oferte',
      doc: [
        {
          name: 'Asigurarea facultativă a locuinței Garant A...',
          desc: 'Oferta de asigurare a locuinței 123456',
          date: '01.06.2020',
          id: 'offer-1',
        },
      ],
    },
    {
      name: 'Asigurări',
      doc: [
        {
          name: 'Asigurarea facultativă a locuinței Garant A...',
          desc: 'Document de informare privind produsul de a...',
          date: '01.06.2020',
          id: 'asig-1',
        },
        {
          name: 'Asigurarea facultativă a locuinței Garant A...',
          desc: 'Formular de analiză a cerinţelor şi necesitatit...',
          date: '01.06.2020',
          id: 'asig-2',
        },
        {
          name: 'Asigurarea facultativă a locuinței Garant A...',
          desc: 'Conditii de asigurare 08.05.20.W.001.0.M',
          date: '01.06.2020',
          id: 'asig-3',
        },
      ],
    },
    {
      name: 'Daune',
      doc: [
        {
          name: 'Dosar 12345',
          desc: 'Declarație daune CASCO',
          date: '01.06.2020',
          id: 'dosar-1',
        },
        {
          name: 'Dosar 12345',
          desc: 'Proces verbal de constatare ',
          date: '01.06.2020',
          id: 'dosar-2',
        },
        {
          name: 'Dosar 12345',
          desc: 'Ofertă de despăgubire',
          date: '01.06.2020',
          id: 'dosar-3',
        },
        {
          name: 'Dosar 12345',
          desc: 'Cerere de despăgubire',
          date: '01.06.2020',
          id: 'dosar-4',
        },
      ],
    },
    {
      name: 'Prelucrarea datelor cu caracter personal',
      doc: [
        {
          name: 'Documente generale',
          desc: 'Termeni și condiții',
          date: '01.06.2020',
          id: 't-and-c',
        },
        {
          name: 'Documente generale',
          desc: 'Notă de informare privind prelucrarea datelor…',
          date: '01.06.2020',
          id: 'info-1',
        },
      ],
    },
  ];
  constructor(public navCtrl: NavController) {}
  ngOnInit(): void {}
}