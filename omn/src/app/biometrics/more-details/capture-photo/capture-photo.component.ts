import { Component, OnInit, HostBinding } from '@angular/core';
import { PhotoService } from '../../services/photo.service';
import { subPageHeaderDefault } from 'src/app/shared/data/sub-page-header-default';

@Component({
  selector: 'app-capture-photo',
  templateUrl: './capture-photo.component.html',
  styleUrls: ['./capture-photo.component.scss'],
})
export class CapturePhotoComponent implements OnInit {
  @HostBinding('class') color = 'ion-color-white-page';
  photo = this.photoService.photos;
  headerConfig = subPageHeaderDefault('Fotografia ta');

  constructor(public photoService: PhotoService) {}

  removePhoto() {
    this.photoService.removePhoto();
    this.photoService.addNewToGallery();
  }

  addPhotoToGallery() {
    this.photoService.addNewToGallery();
  }

  ngOnInit() {}
}
