// import { Injectable } from "@angular/core";
// import { Observable, from } from "rxjs";
// import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
// import { Platform, AlertController } from "ionic-angular";
// import { File } from "@ionic-native/file";
// import { AndroidPermissions } from '@ionic-native/android-permissions';
 
// @Injectable()
// export class DownloadService {
//     constructor(
//         private transfer: FileTransfer,
//         private file: File,
//         private platform: Platform,
//         private androidPermissions: AndroidPermissions,
//         private alertCtrl: AlertController
//     ) {
//     }
 
//     public downloadFile(fileId: number, fileName: string): Observable<any> {
//         return from(this.performDownload(fileId, fileName, fileExtension));
//     }
 
//     protected async performDownload(fileId: number, fileName: string){
// 				// We added this check since this is only intended to work on devices and emulators 
//         if (!this.platform.is('cordova')) {
//             console.warn('Cannot download in local environment!');
//             return;
//         }
 
//         const fileTransfer: FileTransferObject = this.transfer.create();
 
//         let uri = encodeURI(`www.yourapi.com/file/download?id=fileId`);
 
//         let path = await this.getDownloadPath();
 
//         let fullFileName = fileName + '.' + fileExtension;
 
// 	// Depending on your needs, you might want to use some form of authentication for your API endpoints
// 	// In this case, we are using bearer tokens
// 	let bearerToken = 'yourToken';
 
//         return fileTransfer.download(
//             uri,
//             path + fileName,
//             false,
//             {
//                 headers: {
//                     "Authorization": `Bearer ${bearerToken}`
//                 }
//             }
//         ).then(
//             result => {
//                 this.showAlert(true, fileName);
//             },
//             error => {
//                 this.showAlert(false, fileName);
//             }
//         )
//     }
 
//     public async getDownloadPath() {
//         if (this.platform.is('ios')) {
//             return this.file.documentsDirectory;
//         }
	
// 			// To be able to save files on Android, we first need to ask the user for permission. 
// 			// We do not let the download proceed until they grant access
//         await this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE).then(
//             result => {
//                 if (!result.hasPermission) {
//                     return this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE);
//                 }
//             }
//         );
 
//         return this.file.externalRootDirectory + "/Download/";
//     }
 
//     // Here we are using simple alerts to show the user if the download was successful or not
//     public showAlert(hasPassed: boolean, fileName: string) {
//         let title = hasPassed ? "Download complete!" : "Download failed!";
 
//         let subTitle = hasPassed ? `Successfully downloaded ${fileName}.` : `There was a problem while downloading ${fileName}`;
 
//         const alert = this.alertCtrl.create({
//             title: title,
//             subTitle: subTitle,
//             buttons: ['OK']
//         });
//         alert.present();
//     }
// }
