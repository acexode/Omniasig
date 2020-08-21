import { Component, OnInit } from '@angular/core';
//import { PhotoService } from '../services/photo.service';

@Component({
  selector: 'app-more-details',
  templateUrl: './more-details.component.html',
  styleUrls: ['./more-details.component.scss'],
})
export class MoreDetailsComponent implements OnInit {
 // photos = this.photoService.photos;
  
  // constructor(public photoService: PhotoService) { }

  // addPhotoToGallery() {
  //   this.photoService.addNewToGallery();
  // }

  constructor() { }

  ngOnInit() {}

}
