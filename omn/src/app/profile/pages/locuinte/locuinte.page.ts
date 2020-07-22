import { Component, OnInit } from '@angular/core';
import { subPageHeaderDefault } from 'src/app/shared/data/sub-page-header-default';
import { ImageCard } from 'src/app/shared/models/component/image-card';

@Component({
  selector: 'app-locuinte',
  templateUrl: './locuinte.page.html',
  styleUrls: ['./locuinte.page.scss'],
})
export class LocuintePage implements OnInit {
  headerConfig = subPageHeaderDefault('Locuințe');
  cards: Array<ImageCard> = [
    {
      mainIcon: {
        name: 'md-pin-ling',
        color: 'green-gradient',
        classes: 'icon-40 mt-16 mb-8',
      },
      textContent: [
        {
          text: 'Acasă Traian 45, Brasov',
        },
      ],
      id: 'places',
      itemClass: 'mh-104 shadow-page-item',
      isButton: true,
      // routerLink: ['locuinte'],
    },
  ];
  constructor() {}

  ngOnInit() {}
}
