import { ActivatedRoute, Router } from '@angular/router';
import { Component, HostBinding, OnInit } from '@angular/core';
import { subPageHeaderDefault } from 'src/app/shared/data/sub-page-header-default';
import { PhotoService } from '../../services/photo.service';

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
  saving = false;
  constructor(private photoService: PhotoService, private router: Router, private route: ActivatedRoute) {}

  removePhoto() {
    this.photoService.removePhoto();
    this.photoService.addNewToGallery();
  }

  async retake() {
    this.captured = await this.photoService.addNewToGallery();
  }

  async ngOnInit() {
    this.captured = await this.photoService.addNewToGallery();
  }
  async uploadPhoto(){
    this.saving = true;
    const blob = await fetch(this.photo[0].webviewPath).then(r =>  r.blob());
    this.photoService.uploadImage(blob, false).subscribe(data => {
      this.saving = false;
      this.router.navigate(['../capture-photo'], { relativeTo: this.route });
    }, error => {
      this.saving = false;
    });
  }
}
