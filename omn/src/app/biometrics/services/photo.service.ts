import { biometricsEndpoints } from './../../core/configs/endpoints';
import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { RequestService } from 'src/app/core/services/request/request.service';

@Injectable({
  providedIn: 'root',
})
export class PhotoService {
  public photos: Photo[] = [];
  endpoints = biometricsEndpoints;

  options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.FILE_URI,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    saveToPhotoAlbum: true,
  };
  constructor(private reqS: RequestService, private camera: Camera) { }

  public async addNewToGallery() {
    // Take a photo
    try {
      const capturedPhoto = await this.camera.getPicture(this.options);

      // add the newly captured photo to our array
      this.photos.unshift({
        filepath: '',
        webviewPath: capturedPhoto.webPath,
      });

      return true;
    } catch (e) {
      return false;
    }
  }

  public getPhotos() { }

  public removePhoto() {
    this.photos.shift();
  }
  uploadImage(blobData, isSelfie) {
    const formData = new FormData();
    const timeStamp = Math.round(new Date().getTime() / 1000);
    formData.append('imageFile', blobData, `file-${timeStamp}.jpg`);
    formData.append('type', blobData.type);
    return this.reqS.post(this.endpoints.uploadPicture + '?isSelfie=' + isSelfie, formData);
  }
  processPicture() {
    return this.reqS.get(this.endpoints.processPicture);
  }
}

interface Photo {
  filepath: string;
  webviewPath: string;
  base64?: string;
}
