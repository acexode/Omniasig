import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../../../services/photo.service';

@Component({
  selector: 'app-complete-verification',
  templateUrl: './complete-verification.component.html',
  styleUrls: ['./complete-verification.component.scss'],
})
export class CompleteVerificationComponent implements OnInit {
  photo = this.photoService.photos;

  constructor(public photoService: PhotoService) { }

  completeVerification(){
    //Send data to backend
  }

  ngOnInit() {}

}
