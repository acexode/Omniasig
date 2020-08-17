import { Component, OnInit } from '@angular/core';
import { LocuinteService } from 'src/app/profile/pages/locuinte/services/locuinte/locuinte.service';
import { subPageHeaderPrimary } from 'src/app/shared/data/sub-page-header-primary';

@Component({
  selector: 'app-adresa-locuinta',
  templateUrl: './adresa-locuinta.component.html',
  styleUrls: ['./adresa-locuinta.component.scss'],
})
export class AdresaLocuintaComponent implements OnInit {
  headerConfig = subPageHeaderPrimary('Adresă locuință');
  version = 1;
  list: any = [];
  constructor(private LocuinteS: LocuinteService) {}

  ngOnInit() {
    this.LocuinteS.getLocuinteWithPolicy('2').subscribe((v) => {
      this.list = v;
    });
  }

  continue() {
    if (this.version < 4) {
      this.version++;
      return;
    }
    this.version = 1;
  }
}