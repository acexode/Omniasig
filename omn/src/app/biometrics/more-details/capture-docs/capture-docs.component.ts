import { ActivatedRoute, Router } from '@angular/router';
import { Component, HostBinding, OnInit } from '@angular/core';
import { subPageHeaderDefault } from 'src/app/shared/data/sub-page-header-default';
import { PhotoService } from '../../services/photo.service';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';

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
  msg = {
    text: 'Te rugam sa activezi camera pentru aplicatia OMNIASIG din setarile telefonului.',
    class: 'color-red',
  };
  noPermission = false;
  constructor(
    private photoService: PhotoService,
    private router: Router,
    private route: ActivatedRoute,
    private diagnostic: Diagnostic,
  ) { }

  removePhoto() {
    this.photoService.removePhoto();
    this.addPhotoToGallery(true);
  }

  async addPhotoToGallery(newF) {
    this.diagnostic.isCameraAuthorized()
    .then(async (authorized) => {
      if (authorized){
        this.captured = await this.photoService.addNewToGallery(newF, 'B');
      } else {
        this.diagnostic.requestCameraAuthorization()
        .then(async (status) => {
          if (status == this.diagnostic.permissionStatus.GRANTED){
            this.captured = await this.photoService.addNewToGallery(newF, 'B');
          } else {
            this.noPermission = true;
          }
        }).catch(e => {
          this.router.navigateByUrl('/home');
        });
      }
    }).catch(e => {
      this.router.navigateByUrl('/home');
    });
}

  toHome() {
    this.router.navigateByUrl('/home');
  }

  async retake() {
    this.addPhotoToGallery(true);
  }

  async ngOnInit() {
    this.addPhotoToGallery(true);
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
