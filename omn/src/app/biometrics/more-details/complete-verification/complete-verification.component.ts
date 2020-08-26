import { NavController } from '@ionic/angular';
import { Component, OnInit, HostBinding } from '@angular/core';
import { PhotoService } from '../../services/photo.service';

@Component({
  selector: 'app-complete-verification',
  templateUrl: './complete-verification.component.html',
  styleUrls: ['./complete-verification.component.scss'],
})
export class CompleteVerificationComponent implements OnInit {
  @HostBinding('class') color = 'ion-color-white-page';
  photo = this.photoService.photos;

  constructor(
    public photoService: PhotoService,
    private navCtrl: NavController
  ) {}

  completeVerification() {
    // Send data to backend
    this.navCtrl.navigateRoot('/home');
  }

  ngOnInit() {}
}
