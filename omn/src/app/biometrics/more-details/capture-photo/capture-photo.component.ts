import { AuthService } from 'src/app/core/services/auth/auth.service';
import { Component, HostBinding, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionSheetController, NavController } from '@ionic/angular';
import { get } from 'lodash';
import { throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { subPageHeaderDefault } from 'src/app/shared/data/sub-page-header-default';
import { PhotoService } from '../../services/photo.service';

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
  hasErr = false;
  hasVerificationError = false;
  errMsg = [
    {
      classes: 'ion-text-center',
      text: 'Validarea biometrică nu a reusit din cauza:',
    },
  ];
  errTitle = {
    text: 'Ne pare rău...',
    class: '',
  };
  constructor(
    private photoService: PhotoService,
    private router: Router,
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private authS: AuthService,
    private actionSheetController: ActionSheetController
  ) { }

  removePhoto() {
    this.photoService.removePhoto('face');
    this.addPhotoToGallery(true);
  }

  async addPhotoToGallery(newF) {
    return this.photoService.addNewToGallery(newF, 'face', 'F');
  }

  ngOnInit() { }

  async uploadPhoto() {
    this.saving = true;
    this.hasErr = false;
    if (this.photo.face) {
    const blob = await fetch(this.photo.face.webviewPath).then((r) => r.blob());
    this.photoService
      .uploadImage(blob, true)
      .pipe(
        catchError((err) => {
          return throwError('NO_FILE');
        }),
        switchMap(() => {
          return this.photoService.processPicture();
        })
      )
      .subscribe(
        (data) => {
          this.hasErr = false;
          this.saving = false;
          this.authS.refreshProfile().subscribe((v) => {
            this.router.navigate(['../complete-verification'], {
              relativeTo: this.route,
            });
          });
        },
        (err) => {
          if (err === 'NO_FILE') {
            this.hasErr = true;
          } else {
            this.errMsg.push({
              classes: 'ion-text-center',
              text: err instanceof String ? err : get(err, 'error', ''),
            });
            this.hasVerificationError = true;
          }
          this.saving = false;
        }
      );
    }
  }
  backError() {
    this.navCtrl.navigateRoot('/biometrics');
  }
}
