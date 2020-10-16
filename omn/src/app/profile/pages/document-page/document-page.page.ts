import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';
import { get, has } from 'lodash';
import { of } from 'rxjs';
import { subPageHeaderPrimary } from 'src/app/shared/data/sub-page-header-primary';
import { SharedFileService } from 'src/app/shared/modules/shared-file/services/shared-file.service';
import { DocumenteService } from '../documente/services/documente.service';
@Component({
  selector: 'app-document-page',
  templateUrl: './document-page.page.html',
  styleUrls: ['./document-page.page.scss'],
})
export class DocumentPagePage implements OnInit {
  headerConfig = subPageHeaderPrimary('OMNIASIG Vânzări', '/profil/documente');
  doc: any;
  successMsg = 'Fișier descărcat cu succes';
  errorMsg = 'descărcarea fișierului nu a reușit';
  downloading = false;
  loading = false;
  fileId = null;
  constructor(
    private navCtrl: NavController,
    private docService: DocumenteService,
    private route: ActivatedRoute,
    public toastController: ToastController,
    private fileS: SharedFileService
  ) {}

  ngOnInit() {
    this.loading = true;
    this.route.params.subscribe((params) => {
      if (has(params, 'id')) {
        this.fileId = params.id;
        this.docService.GetDocumentById(params.id).subscribe((e) => {
          this.doc = e;
          this.loading = false;
        });
      } else {
        this.doc = null;
        this.fileId = null;
        this.loading = false;
      }
    });
  }

  downloadFile() {
    const file = get(this.doc, 'file', null);
    if (!file) {
      return this.presentDocModal(
        'Documentul nu este disponibil',
        'Documentul este in curs de pregatire. Reincercati mai tarziu.'
      );
    } else {
      this.downloading = true;
      this.fileS
        .downloadAndOpenFile({
          fileName: get(this.doc, 'title', 'document--' + this.fileId),
          storeKey: get(this.doc, 'title', 'document--' + this.fileId),
          downloadService: of(file),
          fileFormat: 'application/pdf',
        })
        .subscribe(
          (v) => {
            this.downloading = false;
          },
          (err) => {
            Promise.resolve(
              this.presentDocModal(
                'Nu am putut descarca fisierul',
                err ? get(err, 'error', '') : ''
              )
            );
            this.downloading = false;
          }
        );
    }
  }
  mainPage() {
    this.navCtrl.navigateBack(['/profil', 'documente']);
  }
  async presentDocModal(title, description) {
    const modal = await this.fileS.createErrorModal(title, description);
    return await modal.present();
  }
}
