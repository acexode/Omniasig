import { ImageCard } from 'src/app/shared/models/component/image-card';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cont-creat',
  templateUrl: './cont-creat.component.html',
  styleUrls: ['./cont-creat.component.scss'],
})
export class ContCreatComponent implements OnInit {
  cards: Array<ImageCard> = [
    {
      mainIcon: {
        name: 'md-user-light-ling',
        color: 'green-gradient',
        classes: 'icon-40 mt-16 mb-8 ion-align-self-start',
      },
      textContent: [
        {
          text: 'Verificare identitate',
        },
      ],
      id: 'account',
      itemClass: 'mh-104 shadow-page-item',
      isButton: false,
      // routerLink: ['date-personale'],
    },
    {
      mainIcon: {
        name: 'md-email-light-ling',
        color: 'green-gradient',
        classes: 'icon-40 mt-16 mb-8 ion-align-self-start',
      },
      textContent: [
        {
          text: 'Validare adresă e-mail',
        },
      ],
      id: 'msg',
      itemClass: 'mh-104 shadow-page-item',
    },
  ];
  constructor() { }

  ngOnInit() {}

}
