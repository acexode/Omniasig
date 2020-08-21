import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../../services/photo.service';
import { subPageHeaderDefault } from 'src/app/shared/data/sub-page-header-default';

@Component({
  selector: 'app-capture-docs',
  templateUrl: './capture-docs.component.html',
  styleUrls: ['./capture-docs.component.scss'],
})
export class CaptureDocsComponent implements OnInit {
  headerConfig = subPageHeaderDefault('Carte de identitate');
  photo = this.photoService.photos;
  step = 1

  constructor(public photoService: PhotoService) { 
  }

  removePhoto() {
    this.photoService.removePhoto();
    this.photoService.addNewToGallery();
  }

  ngOnInit() {
    this.photoService.addNewToGallery();
    console.log(this.photo)
  }

}
