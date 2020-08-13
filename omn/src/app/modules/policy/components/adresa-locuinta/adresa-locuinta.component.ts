import { Component, OnInit } from '@angular/core';
import { subPageHeaderPrimary } from 'src/app/shared/data/sub-page-header-primary';

@Component({
  selector: 'app-adresa-locuinta',
  templateUrl: './adresa-locuinta.component.html',
  styleUrls: ['./adresa-locuinta.component.scss'],
})
export class AdresaLocuintaComponent implements OnInit {
  headerConfig = subPageHeaderPrimary('Adresă locuință');
  version: number = 1;
  constructor() {}

  ngOnInit() {}

  continue(){
    if(this.version < 4){
      this.version++;
      return
    }
    this.version = 1;
    
  }
}
