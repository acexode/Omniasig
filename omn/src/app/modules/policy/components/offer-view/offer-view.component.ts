import { Component, OnInit } from '@angular/core';
import { subPageHeaderSecondary } from 'src/app/shared/data/sub-page-header-secondary';

@Component({
  selector: 'app-offer-view',
  templateUrl: './offer-view.component.html',
  styleUrls: ['./offer-view.component.scss'],
})
export class OfferViewComponent implements OnInit {
  headerConfig = subPageHeaderSecondary('Oferta de asigurare');
  constructor() {}

  ngOnInit() {}

  back() {}
}
