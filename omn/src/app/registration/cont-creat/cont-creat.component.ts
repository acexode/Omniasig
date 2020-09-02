import { RegistrationService } from './../../core/services/auth/registration.service';
import { ImageCard } from 'src/app/shared/models/component/image-card';
import { Component, HostBinding, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cont-creat',
  templateUrl: './cont-creat.component.html',
  styleUrls: ['./cont-creat.component.scss'],
})
export class ContCreatComponent implements OnInit, AfterViewInit {
  @HostBinding('class') color = 'ion-color-white-page';
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
      isButton: true,
      routerLink: ['/biometrics'],
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
      isButton: true,
      routerLink: ['/profil/date-personale/validate'],
    },
  ];
  constructor(
    private router: Router,
    private regService: RegistrationService
  ) {}

  ngOnInit() {}
  ngAfterViewInit() {
    this.regService.clearUserObj();
  }
}
