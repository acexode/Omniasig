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
  constructor(private photoService: PhotoService, private router: Router, private route: ActivatedRoute) {}

  removePhoto() {
    this.photoService.removePhoto();
    this.photoService.addNewToGallery();
  }

  addPhotoToGallery() {
    this.photoService.addNewToGallery();
  }

  ngOnInit() {}
  async uploadPhoto(){
    this.saving = true;
    const blob = await fetch(this.photo[0].webviewPath).then(r =>  r.blob());
    this.photoService.uploadImage(blob, true).subscribe(data => {
      this.photoService.processPicture().subscribe(d => {
        this.saving = false;
        this.router.navigate(['../complete-verification'], { relativeTo: this.route });
      },error => {
        this.saving = false;
      });
    });
  }
}
