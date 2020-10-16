import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { File } from '@ionic-native/file/ngx';
import { NavController, Platform, ToastController } from '@ionic/angular';
import { has } from 'lodash';
import { subPageHeaderPrimary } from 'src/app/shared/data/sub-page-header-primary';
import { DocumenteService } from '../documente/services/documente.service';
@Component({
  selector: 'app-document-page',
  templateUrl: './document-page.page.html',
  styleUrls: ['./document-page.page.scss'],
})
export class DocumentPagePage implements OnInit {
  headerConfig = subPageHeaderPrimary('OMNIASIG Vânzări', '/profil');
  doc: any;
  successMsg = 'Fișier descărcat cu succes';
  errorMsg = 'descărcarea fișierului nu a reușit';
  downloading = 'Descărcare...';
  constructor(
    private navCtrl: NavController,
    private docService: DocumenteService,
    private route: ActivatedRoute,
    private file: File,
    public toastController: ToastController,
    private platform: Platform
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      if (has(params, 'id')) {
        this.docService.GetDocumentById(params.id).subscribe((e) => {
          this.doc = e;
        });
      }
    });
  }

  downloadFile(file, name) {}
  // downloadFile( file, name ) {
  //   this.presentToast( this.downloading );
  //   fetch( 'data:application/pdf;base64,' + file, {
  //     method: 'GET',
  //   } )
  //     .then( ( res ) => res.blob() )
  //     .then( ( blob ) => {
  //       this.file
  //         .writeFile(
  //           // this.file.externalApplicationStorageDirectory,
  //           this.file.externalDataDirectory,
  //           name + '.pdf',
  //           blob,
  //           { replace: true }
  //         )
  //         .then( ( res ) => {
  //           this.presentToast( this.successMsg );
  //         } )
  //         .catch( ( err ) => {
  //           this.presentToast( this.errorMsg );
  //         } );
  //     } )
  //     .catch( ( err ) => { } );
  // }
  mainPage() {
    this.navCtrl.navigateBack(['/profil', 'documente']);
  }
}
