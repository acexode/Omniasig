import { Component, OnInit, HostBinding } from '@angular/core';
import {Location} from '@angular/common';
import { PhotoService } from '../../services/photo.service';
import { subPageHeaderDefault } from 'src/app/shared/data/sub-page-header-default';

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
  captured

  constructor(public photoService: PhotoService, private _location: Location) {}

  removePhoto() {
    this.photoService.removePhoto();
    this.photoService.addNewToGallery();
  }

  async retake(){
    this.captured = await this.photoService.addNewToGallery()
  }

  async ngOnInit() {
    this.captured = await this.photoService.addNewToGallery()
  }
}
