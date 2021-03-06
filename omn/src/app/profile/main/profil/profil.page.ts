import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { ImageCard } from 'src/app/shared/models/component/image-card';

@Component( {
  selector: 'app-profil',
  templateUrl: './profil.page.html',
  styleUrls: [ './profil.page.scss' ],
} )
export class ProfilPage implements OnInit {
  cards: Array<ImageCard> = [
    {
      mainIcon: {
        name: 'md-user-light-ling',
        color: 'green-gradient',
        classes: 'icon-40 mt-16 mb-8 ion-align-self-start',
      },
      textContent: [
        {
          text: 'Date Personale',
        },
      ],
      id: 'account',
      itemClass: 'mh-104 shadow-page-item',
      isButton: true,
      routerLink: [ 'date-personale' ],
    },
    {
      mainIcon: {
        name: 'md-pin-ling',
        color: 'green-gradient',
        classes: 'icon-40 mt-16 mb-8 ion-align-self-start',
      },
      textContent: [
        {
          text: 'Locuințe',
        },
      ],
      id: 'places',
      itemClass: 'mh-104 shadow-page-item',
      isButton: true,
      routerLink: [ 'locuinte' ],
    },
    // {
    //   mainIcon: {
    //     name: 'md-car-ling',
    //     color: 'green-gradient',
    //     classes: 'icon-40 mt-16 mb-8 ion-align-self-start',
    //   },
    //   textContent: [
    //     {
    //       text: 'Mașini',
    //     },
    //   ],
    //   id: 'cars',
    //   itemClass: 'mh-104 shadow-page-item',
    // },
    // {
    //   mainIcon: {
    //     name: 'md-grup-ling',
    //     color: 'green-gradient',
    //     classes: 'icon-40 mt-16 mb-8',
    //   },
    //   textContent: [
    //     {
    //       text: 'Persoane',
    //     },
    //   ],
    //   id: 'personas',
    //   itemClass: 'mh-104 shadow-page-item',
    // },
    {
      mainIcon: {
        name: 'md-file-ling',
        color: 'green-gradient',
        classes: 'icon-40 mt-16 mb-8 ion-align-self-start',
      },
      textContent: [
        {
          text: 'Documente',
        },
      ],
      id: 'docs',
      itemClass: 'mh-104 shadow-page-item',
      routerLink: [ 'documente' ]
    },
    {
      mainIcon: {
        name: 'md-email-light-ling',
        color: this.disableMesaje ? 'medium' : 'green-gradient',
        classes: 'icon-40 mt-16 mb-8 ion-align-self-start',
      },
      textContent: [
        {
          text: 'Mesaje (în curând)',
        },
      ],
      id: 'msg',
      itemClass: 'mh-104 shadow-page-item',
      isButton: false,
      isDisabled: this.disableMesaje,
    },
  ];
  constructor( private menu: MenuController ) { }

  ngOnInit() { }

  openCustom() {
    this.menu.enable( true, 'omn-menu' );
    this.menu.open( 'omn-menu' );
  }
  get disableMesaje() {
    return true;
  }
}
