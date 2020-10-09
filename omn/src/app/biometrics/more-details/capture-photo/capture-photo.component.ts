import { ActionSheetController } from '@ionic/angular';
import { Component, OnInit, HostBinding } from '@angular/core';
import { PhotoService } from '../../services/photo.service';
import { subPageHeaderDefault } from 'src/app/shared/data/sub-page-header-default';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-capture-photo',
  templateUrl: './capture-photo.component.html',
  styleUrls: ['./capture-photo.component.scss'],
})
export class CapturePhotoComponent implements OnInit {
  @HostBinding('class') color = 'ion-color-white-page';
  photo = this.photoService.photos;
  headerConfig = subPageHeaderDefault('Fotografia ta');
  saving = false;
  constructor(
    private photoService: PhotoService,
    private router: Router,
    private route: ActivatedRoute,
    private actionSheetController: ActionSheetController
  ) {}

  removePhoto() {
    this.photoService.removePhoto();
    this.openChoice();
  }

  async openChoice() {
    let actionSheet = null;
    this.actionSheetController
      .create({
        header: 'Selectati sursa',
        buttons: [
          {
            text: 'Fotografie noua',
            cssClass:
              'mx-0 mt-0 mb-16 w-100 no-shadow ion-color text-weight-medium ion-color-success flat button button-block button-large button-solid',
            handler: () => {
              this.addPhotoToGallery(true);
            },
          },
          {
            text: 'Galerie de imagini',
            cssClass:
              'm-0 w-100 no-shadow ion-color text-weight-medium ion-color-success flat button button-block button-large button-solid',
            handler: () => {
              this.addPhotoToGallery(false);
            },
          },
          {
            text: 'Renunță',
            role: 'cancel',
            cssClass:
              'm-0 w-100 no-shadow ion-color-secondary button button-block button-large button-solid',
          },
        ],
      })
      .then((v) => {
        actionSheet = v;
        actionSheet.present();
      });
  }

  async addPhotoToGallery(newF = false) {
    this.photoService.addNewToGallery(newF);
  }

  ngOnInit() {}
  async uploadPhoto() {
    this.saving = true;
    const blob = await fetch(this.photo[0].webviewPath).then((r) => r.blob());
    this.photoService.uploadImage(blob, true).subscribe((data) => {
      this.photoService.processPicture().subscribe(
        (d) => {
          this.saving = false;
          this.router.navigate(['../complete-verification'], {
            relativeTo: this.route,
          });
        },
        (error) => {
          this.saving = false;
        }
      );
    });
  }
}
