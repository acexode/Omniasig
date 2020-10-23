import { Component, OnInit, HostBinding } from '@angular/core';
import { NavController } from '@ionic/angular';
import { subPageHeaderDefault } from 'src/app/shared/data/sub-page-header-default';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
})
export class InfoComponent implements OnInit {  
  @HostBinding('class') color = 'ion-color-white-page';
  headerConfig = subPageHeaderDefault('Verificare identitate');

  constructor(private navCtrl: NavController) {}

  ngOnInit() {}

  goBack(){
    this.navCtrl.navigateRoot('/biometrics');
  }
}

