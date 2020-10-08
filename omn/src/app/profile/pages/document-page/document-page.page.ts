import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { subPageHeaderPrimary } from 'src/app/shared/data/sub-page-header-primary';
import { DocumenteService } from '../documente/services/documente.service';
import { ActivatedRoute } from '@angular/router';
import { File } from '@ionic-native/file/ngx';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-document-page',
  templateUrl: './document-page.page.html',
  styleUrls: ['./document-page.page.scss'],
})
export class DocumentPagePage implements OnInit {
  headerConfig = subPageHeaderPrimary( 'OMNIASIG Vânzări', '/profil');
  doc;
  successMsg = 'Fișier descărcat cu succes';
  errorMsg = 'descărcarea fișierului nu a reușit';
  downloading = 'Descărcare...';
  constructor(
    private navCtrl: NavController,
    private docService: DocumenteService,
    private route: ActivatedRoute,
    private file: File,
    public toastController: ToastController
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      if (params.hasOwnProperties('id')) {
        this.docService.GetDocumentById(params.id).subscribe((e) => {
          this.doc = e;
        });
      }
    });
  }
  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
    });
    toast.present();
  }
  downloadFile(file, name) {
    this.presentToast(this.downloading);
    fetch('data:application/pdf;base64,' + file, {
      method: 'GET',
    })
      .then((res) => res.blob())
      .then((blob) => {
        this.file
          .writeFile(
            // this.file.externalApplicationStorageDirectory,
            this.file.externalDataDirectory,
            name + '.pdf',
            blob,
            { replace: true }
          )
          .then((res) => {
            this.presentToast(this.successMsg);
          })
          .catch((err) => {
            this.presentToast(this.errorMsg);
          });
      })
      .catch((err) => {});
  }
  mainPage() {
    this.navCtrl.navigateBack(['/profil', 'documente']);
  }
}
