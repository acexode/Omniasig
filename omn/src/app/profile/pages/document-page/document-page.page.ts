import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { subPageHeaderPrimary } from 'src/app/shared/data/sub-page-header-primary';

@Component({
  selector: 'app-document-page',
  templateUrl: './document-page.page.html',
  styleUrls: ['./document-page.page.scss'],
})
export class DocumentPagePage implements OnInit {
  headerConfig = subPageHeaderPrimary('OMNIASIG Vânzări');

  constructor(private navCtrl: NavController) {}

  ngOnInit() {}
  mainPage() {
    this.navCtrl.navigateBack(['/profil', 'documente']);
  }
}
