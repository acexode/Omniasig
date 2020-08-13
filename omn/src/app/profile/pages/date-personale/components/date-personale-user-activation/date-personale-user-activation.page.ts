import { Component, OnInit } from '@angular/core';
import { UserActivateModes } from 'src/app/shared/models/modes/user-activate-modes';
import { ImageCard } from 'src/app/shared/models/component/image-card';
import { SubPageHeader } from 'src/app/shared/models/component/sub-page-header';
import { subPageHeaderSecondary } from 'src/app/shared/data/sub-page-header-secondary';

@Component({
  selector: 'app-date-personale-user-activation',
  templateUrl: './date-personale-user-activation.page.html',
  styleUrls: ['./date-personale-user-activation.page.scss'],
})
export class DatePersonaleUserActivationPage implements OnInit {
  userActivationModes = UserActivateModes;
  headerConfig: SubPageHeader = {
    ...subPageHeaderSecondary('Activare cont'),
    leadingIcon: null,
    trailingIcon: null,
  };
  displayMode: UserActivateModes = this.userActivationModes.EXISTING;
  itemClass = `p-16 flex-1 mb-16 ${this.displayMode === UserActivateModes.EXISTING && 'bg-light-green'}`;
  actions: Array<ImageCard> = [
    {
      mainIcon: {
        name: 'md-user-light',
        color: 'green-gradient',
        classes: 'icon-32 mt-0 mx-0 ion-align-self-start',
      },
      textContent: [
        {
          text: 'Verificare identitate',
          classes: 'ion-text-center'
        }
      ],
      id: 'validate-id',
      routerLink: [],
      itemClass: this.itemClass,
    },
    {
      mainIcon: {
        name: 'md-email-light',
        color: 'green-gradient',
        classes: 'icon-32 mt-0 mx-0 ion-align-self-start',
      },
      textContent: [
        {
          text: 'Validare adresă e-mail',
          classes: 'ion-text-center',
        }
      ],
      id: 'validate-email',
      routerLink: ['/profil', 'date-personale', 'validate-email'],
      itemClass: this.itemClass,
    },
  ];

  constructor() { }

  ngOnInit() {
  }

}
