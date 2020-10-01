import { biometricsEndpoints } from './../../core/configs/endpoints';
import { Injectable } from '@angular/core';
import {
  Plugins,
  CameraResultType,
  Capacitor,
  FilesystemDirectory,
  CameraPhoto,
  CameraSource,
} from '@capacitor/core';
import { RequestService } from 'src/app/core/services/request/request.service';
const { Camera, Filesystem, Storage } = Plugins;

@Injectable({
  providedIn: 'root',
})
export class PhotoService {
  public photos: Photo[] = [];
  endpoints = biometricsEndpoints
  constructor(private reqS: RequestService) {}

  public async addNewToGallery() {
    // Take a photo
    try {
      const capturedPhoto = await Camera.getPhoto({
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera,
        quality: 100,
      });

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

  public getPhotos() {}

  public removePhoto() {
    this.photos.shift();
  }
  uploadImage(blobData, isSelfie) {
    const formData = new FormData();
    const timeStamp = Math.round(new Date().getTime()/1000)    
    formData.append('imageFile', blobData, `file-${timeStamp}.jpg`);
    formData.append('type', blobData.type);   
    return this.reqS.post(this.endpoints.uploadPicture+ '?isSelfie=' + isSelfie, formData)    
  }
  processPicture() { 
    return this.reqS.get(this.endpoints.processPicture)
    
  }
}

interface Photo {
  filepath: string;
  webviewPath: string;
  base64?: string;
}
