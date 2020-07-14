import { Component, OnInit } from '@angular/core';
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
        name: 'md-user-light',
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
      isButton: true,
    },
    {
      mainIcon: {
        name: 'md-pin',
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
        name: 'md-car',
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
        name: 'md-grup',
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
        name: 'md-file',
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
        name: 'md-email-light',
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
  constructor() {}

  ngOnInit() {}
}
