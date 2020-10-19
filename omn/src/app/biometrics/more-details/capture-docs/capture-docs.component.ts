import { ActivatedRoute, Router } from '@angular/router';
import { Component, HostBinding, OnInit } from '@angular/core';
import { subPageHeaderDefault } from 'src/app/shared/data/sub-page-header-default';
import { PhotoService } from '../../services/photo.service';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-capture-docs',
  templateUrl: './capture-docs.component.html',
  styleUrls: ['./capture-docs.component.scss'],
})
export class CaptureDocsComponent implements OnInit {
  @HostBinding('class') color = 'ion-color-white-page';
  headerConfig = subPageHeaderDefault('Carte de identitate');
  photo = this.photoService.photos;
  step = 1;
  captured;
  hasErr = false;
  saving = false;
  constructor(
    private photoService: PhotoService,
    private router: Router,
    private route: ActivatedRoute,
    // private actionSheetController: ActionSheetController
  ) {}

  removePhoto() {
    this.photoService.removePhoto();
    this.addPhotoToGallery(true);
    // this.openChoice();
  }

  // async openChoice() {
  //   let actionSheet = null;
  //   this.actionSheetController
  //     .create({
  //       header: 'Selectati sursa',
  //       buttons: [
  //         {
  //           text: 'Fotografie noua',
  //           cssClass:
  //             'mx-0 mt-0 mb-16 w-100 no-shadow ion-color text-weight-medium ion-color-success flat button' +
  //             'button-block button-large button-solid',
  //           handler: () => {
  //             this.addPhotoToGallery(true);
  //           },
  //         },
  //         {
  //           text: 'Galerie de imagini',
  //           cssClass:
  //             'm-0 w-100 no-shadow ion-color text-weight-medium ion-color-success flat button button-block button-large button-solid',
  //           handler: () => {
  //             this.addPhotoToGallery(false);
  //           },
  //         },
  //         {
  //           text: 'Renunță',
  //           role: 'cancel',
  //           cssClass:
  //             'm-0 w-100 no-shadow ion-color-secondary button button-block button-large button-solid',
  //         },
  //       ],
  //     })
  //     .then((v) => {
  //       actionSheet = v;
  //       actionSheet.present();
  //     });
  // }

  async addPhotoToGallery(newF = false) {
    this.captured = this.photoService.addNewToGallery(newF);
  }

  async retake() {
    this.addPhotoToGallery(true);
    // this.openChoice();
  }

  async ngOnInit() {
    this.addPhotoToGallery(true);
    // this.openChoice();
  }

  async uploadPhoto() {
    this.saving = true;
    this.hasErr = false;
    const blob = await fetch(this.photo[0].webviewPath).then((r) => r.blob());
    this.photoService.uploadImage(blob, false).subscribe(
      (data) => {
        this.hasErr = false;
        this.saving = false;
        this.router.navigate(['../capture-photo'], { relativeTo: this.route });
      },
      (error) => {
        this.hasErr = true;
        this.saving = false;
      }
    );
  }
}
