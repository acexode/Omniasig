import { Injectable } from '@angular/core';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { File, FileEntry } from '@ionic-native/file/ngx';
import { isPlatform } from '@ionic/angular';
import { Observable, Subject, throwError } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { CustomStorageService } from 'src/app/core/services/custom-storage/custom-storage.service';

@Injectable({
  providedIn: 'root',
})
export class SharedFileService {
  constructor(
    private file: File,
    private storeS: CustomStorageService,
    private fileOpener: FileOpener
  ) {}

  /**
   *
   * @param docTitle  title you want to name the doc when the user saves it;
   * Also Note that a title should always end with the file extenstion type. (e.g) 'title.pdf'
   */
  prepareDoc(docTitle: string, fileObj: any, format: string) {
    // TODO converts base64 to blob data so it can be read: this algorithms makes data processing easy... as the conversion is graudal

    const blobPdfFromBase64String = () => {
      const byteArray = Uint8Array.from(
        atob(fileObj)
          .split('')
          .map((char) => char.charCodeAt(0))
      );
      return new Blob([byteArray], { type: 'application/pdf' });
    };
    return this.openFile(blobPdfFromBase64String(), docTitle, format).pipe(
      map((v) => {
        return fileObj;
      })
    );
  }

  openFile(blob: Blob, docTitle: string, format: string) {
    //  Determine a native file path to save to
    let filePath: any;
    if (isPlatform('android')) {
      filePath = this.file.externalDataDirectory;
    }
    if (isPlatform('ios')) {
      filePath = this.file.documentsDirectory;
    } else {
      filePath = this.file.dataDirectory;
    }
    return new Observable((observer) => {
      this.file
        .writeFile(filePath, docTitle, blob, { replace: true })
        .then((fileEntry: FileEntry) => {
          this.fileOpener
            .showOpenWithDialog(fileEntry.toURL(), format)
            .then(() => {
              observer.next(blob);
            })
            .catch((e) => {
              observer.error(e);
            });
        })
        .catch((err) => {
          observer.error(err);
        });
    });
  }

  downloadAndOpenFile(conf: {
    fileName;
    storeKey;
    downloadService: Observable<any> | Subject<any>;
    fileFormat: string;
  }) {
    return this.storeS.getItem(conf.storeKey).pipe(
      switchMap((fileObj) => {
        if (fileObj) {
          return this.prepareDoc(conf.fileName, fileObj, conf.fileFormat);
        } else {
          return conf.downloadService.pipe(
            // Chain processing, saving, opening the file.
            switchMap((offerDocument) => {
              if (offerDocument) {
                return this.prepareDoc(
                  conf.fileName,
                  offerDocument,
                  conf.fileFormat
                );
              }
              return throwError('Fisierul nu a putut fi descarcat');
            }),
            switchMap((fileData) => {
              // Only cache if successful;
              // Probably can map some other data in here if we need it in the subscription.
              return this.storeS.setItem(conf.storeKey, fileData);
            })
          );
        }
      })
    );
  }
}
