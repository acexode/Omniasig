
import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { subPageHeaderPrimary } from 'src/app/shared/data/sub-page-header-primary';
import { DocumenteService } from '../documente/services/documente.service';
import { ActivatedRoute } from '@angular/router';
import { File } from '@ionic-native/file/ngx';
@Component({
  selector: 'app-document-page',
  templateUrl: './document-page.page.html',
  styleUrls: ['./document-page.page.scss'],
})
export class DocumentPagePage implements OnInit {
  headerConfig = subPageHeaderPrimary('OMNIASIG Vânzări');
  doc

  constructor(private navCtrl: NavController, private docService: DocumenteService,private route: ActivatedRoute, private file: File) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log(params) //log the entire params object
      console.log(params['id']) //log the value of id
      this.docService.GetDocumentById(params['id']).subscribe(e =>{
        console.log(e)
        this.doc = e
      })
    });
  }
  downloadFile(file,name){
    fetch('data:application/pdf;base64,' + file,
          {
            method: "GET"
          }).then(res => res.blob()).then(blob => {
            this.file.writeFile(this.file.externalApplicationStorageDirectory, name+'.pdf', blob, { replace: true }).then(res => {
              console.log(res)
            }).catch(err => {
              console.log('save error')    
       });
          }).catch(err => {
                 console.log('error')
          });
       
  }
  mainPage() {
    this.navCtrl.navigateBack(['/profil', 'documente']);
  }
}
