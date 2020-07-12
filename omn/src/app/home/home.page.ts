import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AuthService } from '../core/services/auth/auth.service';
import { InsuranceListItem } from '../shared/models/component/insurance-list-item';
import { IonTextItem } from '../shared/models/component/ion-text-item';
import { ImageCard } from '../shared/models/component/image-card';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {
  account$ = this.authS.getAccountData();
  oferteTitle: IonTextItem = {
    text: 'Oferte',
    classes: 'color-white',
    color: 'omn-transparent-white',
  };
  asigTitle: IonTextItem = {
    text: 'Asigurări',
    classes: 'color-dark-green',
    color: 'omn-transparent-white',
  };
  emptyItem: InsuranceListItem = {
    id: '0',
    routerLink: null,
    itemClass: 'no-items',
    leftIcon: {
      name: 'md-no-policy-light',
      color: 'medium',
      classes: 'no-items icon-22',
    },
    rightIcon: null,
    textContent: {
      body: {
        text: 'Nici o poliță activă',
        classes: 'mb-0',
      },
    },
  };
  list: Array<InsuranceListItem> = [
    {
      id: '1',
      routerLink: '/home',
      leftIcon: {
        name: 'md-acasa-light',
        color: 'success',
      },
      rightIcon: {
        name: 'md-plata-light',
        color: 'danger',
      },
      textContent: {
        head: {
          text: 'Asigurarea facultativă a locuințelor',
        },
        body: {
          text: 'Garant AMPLUS',
          classes: 'mb-2',
        },
        footer: {
          text: 'Strada Traian 45, Brasov',
        },
      },
    },
    {
      id: '2',
      routerLink: '/home',
      leftIcon: {
        name: 'md-acasa-light',
        color: 'success',
        classes: 'pay',
      },
      rightIcon: {
        name: 'md-chevron-right',
        color: 'success',
        classes: 'chevron mr-2 icon-16',
      },
      textContent: {
        head: {
          text: 'Asigurarea facultativă a locuințelor',
        },
        body: {
          text: 'PAD - Polița de asigurare obligatorie',
          classes: 'mb-2',
        },
        footer: {
          text: 'Strada Traian 45, Brasov',
        },
      },
    },
  ];
  list2: Array<InsuranceListItem> = [
    {
      id: '1',
      routerLink: '/home',
      leftIcon: {
        name: 'md-acasa-light',
        color: 'success',
      },
      rightIcon: {
        name: 'md-plata-light',
        color: 'danger',
      },
      textContent: {
        head: {
          text: 'Asigurarea facultativă a locuințelor',
        },
        body: {
          text: 'Garant AMPLUS',
          classes: 'mb-2',
        },
        footer: {
          text: 'Strada Traian 45, Brasov',
        },
      },
    },
    {
      id: '2',
      routerLink: '/home',
      leftIcon: {
        name: 'md-acasa-light',
        color: 'success',
        classes: 'pay',
      },
      rightIcon: {
        name: 'md-chevron-right',
        color: 'success',
        classes: 'chevron mr-2 icon-16',
      },
      textContent: {
        head: {
          text: 'Asigurarea facultativă a locuințelor',
        },
        body: {
          text: 'PAD - Polița de asigurare obligatorie',
          classes: 'mb-2',
        },
        footer: {
          text: 'Strada Traian 45, Brasov',
        },
      },
    },
  ];

  daune?: Array<ImageCard> = [
    {
      mainIcon: {
        name: 'md-dosar',
        color: 'green-gradient',
      },
      textContent: [
        {
          text: 'Dosar Nr. 123456',
        },
        {
          text: '123456 dsdad sdas',
        },
      ],
      id: '0',
      routerLink: '/home',
      itemClass: 'mh-104',
    },
    {
      mainIcon: {
        name: 'md-plus',
        color: 'green-gradient',
        classes: 'icon-32 mt-20 mb-8',
      },
      textContent: [
        {
          text: 'Deschide dosar',
        },
      ],
      id: '0',
      routerLink: '/home',
      itemClass: 'mh-104 flex-0',
    },
  ];
  constructor(
    private menu: MenuController,
    private authS: AuthService,
    private cdRef: ChangeDetectorRef
  ) {}

  openCustom() {
    this.menu.enable(true, 'omn-menu');
    this.menu.open('omn-menu');
    console.log(this.menu);
  }
}
