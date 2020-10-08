import { Component, HostBinding, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { subPageHeaderPrimary } from 'src/app/shared/data/sub-page-header-primary';
import { DocumenteService } from './services/documente.service';

@Component({
  selector: 'app-documente',
  templateUrl: './documente.page.html',
  styleUrls: ['./documente.page.scss'],
})
export class DocumentePage implements OnInit {
  @HostBinding('class') color = 'ion-color-white-page';
  headerConfig = subPageHeaderPrimary( 'Documente', '/profil');
  items: any = [];
  itemHeight = 0;
  offer: [];
  policy: [];

  constructor(public navCtrl: NavController, private docs: DocumenteService) {}
  ngOnInit(): void {
    this.docs.GetAllDocumentsForCurrentUser().subscribe((v: any) => {
      this.offer = v.filter((e) => e.offerCode != null);
      this.policy = v.filter((e) => e.offerCode == null);
    });
  }
}
