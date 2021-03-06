import { Component, HostBinding, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { subPageHeaderPrimary } from 'src/app/shared/data/sub-page-header-primary';
import { DocumenteService } from './services/documente.service';

@Component({
  selector: 'app-documente',
  templateUrl: './documente.page.html',
  styleUrls: ['./documente.page.scss'],
})
export class DocumentePage implements OnInit {
  @HostBinding('class') color = 'ion-color-white-page';
  headerConfig = {
    ...subPageHeaderPrimary('OMNIASIG Vânzări', '/profil'),
    ...{
      trailingIcon: null,
    },
  };
  items: any = [];
  itemHeight = 0;
  offer: [];
  policy: [];
  noDoc = true;
  loading = true;
  constructor(public navCtrl: NavController, private docs: DocumenteService) {}
  ngOnInit(): void {
    this.docs
      .GetAllDocumentsForCurrentUser()
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe((v: any) => {
        if (v.length) {
          this.noDoc = false;
          this.offer = v.filter((e) => e.offerCode != null);
          this.policy = v.filter((e) => e.offerCode == null);
        }
      });
  }

  closeAction() {
    this.navCtrl.navigateRoot('/profil');
  }
}
