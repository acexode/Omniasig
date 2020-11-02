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
  ) { }

  removePhoto() {
    this.photoService.removePhoto('card');
    this.addPhotoToGallery(true);
  }

  async addPhotoToGallery(newF) {
    this.captured = this.photoService.addNewToGallery(newF, 'card', 'B');
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
    if (this.photo.card) {
      const blob = await fetch(this.photo.card.webviewPath).then((r) => r.blob());
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
    } else {
      this.hasErr = true;
      this.saving = false;
    }
  }
}
