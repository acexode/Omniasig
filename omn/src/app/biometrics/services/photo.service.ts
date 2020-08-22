import { Injectable } from '@angular/core';
import { Plugins, CameraResultType, Capacitor, FilesystemDirectory, CameraPhoto, CameraSource } from '@capacitor/core';
const { Camera, Filesystem, Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  public photos: Photo[] = [];

  constructor() { }

  public async addNewToGallery() {
    // Take a photo
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri, 
      source: CameraSource.Camera, 
      quality: 100 
    });

    //add the newly captured photo to our array
    this.photos.unshift({
      filepath: "",
      webviewPath: capturedPhoto.webPath
    });
  }

  public getPhotos(){

  }

  public removePhoto(){
    this.photos.shift()
  }

}

interface Photo {
  filepath: string;
  webviewPath: string;
  base64?: string;
}