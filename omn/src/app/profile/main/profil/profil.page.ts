import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { ImageCard } from 'src/app/shared/models/component/image-card';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.page.html',
  styleUrls: ['./profil.page.scss'],
})
export class ProfilPage implements OnInit {
  cards: Array<ImageCard> = [
    {
      mainIcon: {
        name: 'md-user-light-ling',
        color: 'green-gradient',
        classes: 'icon-40 mt-16 mb-8',
      },
      textContent: [
        {
          text: 'Date Personale',
        },
      ],
      id: 'account',
      itemClass: 'mh-104 shadow-page-item',
      isButton: false,
      routerLink: ['date-personale'],
    },
    {
      mainIcon: {
        name: 'md-pin-ling',
        color: 'green-gradient',
        classes: 'icon-40 mt-16 mb-8',
      },
      textContent: [
        {
          text: 'Locuințe',
        },
      ],
      id: 'places',
      itemClass: 'mh-104 shadow-page-item',
    },
    {
      mainIcon: {
        name: 'md-car-ling',
        color: 'green-gradient',
        classes: 'icon-40 mt-16 mb-8',
      },
      textContent: [
        {
          text: 'Mașini',
        },
      ],
      id: 'cars',
      itemClass: 'mh-104 shadow-page-item',
    },
    {
      mainIcon: {
        name: 'md-grup-ling',
        color: 'green-gradient',
        classes: 'icon-40 mt-16 mb-8',
      },
      textContent: [
        {
          text: 'Persoane',
        },
      ],
      id: 'personas',
      itemClass: 'mh-104 shadow-page-item',
    },
    {
      mainIcon: {
        name: 'md-file-ling',
        color: 'green-gradient',
        classes: 'icon-40 mt-16 mb-8',
      },
      textContent: [
        {
          text: 'Documente',
        },
      ],
      id: 'docs',
      itemClass: 'mh-104 shadow-page-item',
    },
    {
      mainIcon: {
        name: 'md-email-light-ling',
        color: 'green-gradient',
        classes: 'icon-40 mt-16 mb-8',
      },
      textContent: [
        {
          text: 'Mesaje',
        },
      ],
      id: 'msg',
      itemClass: 'mh-104 shadow-page-item',
    },
  ];
  constructor(private menu: MenuController) {}

  ngOnInit() {}

  openCustom() {
    this.menu.enable(true, 'omn-menu');
    this.menu.open('omn-menu');
  }
}
