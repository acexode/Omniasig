import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { File } from '@ionic-native/file/ngx';
import { IonicModule } from '@ionic/angular';
import { DownloadErrorModalComponent } from './components/download-error-modal/download-error-modal.component';
import { SharedFileService } from './services/shared-file.service';

@NgModule({
  declarations: [DownloadErrorModalComponent],
  imports: [CommonModule, IonicModule],
  providers: [SharedFileService, File, FileOpener],
  exports: [DownloadErrorModalComponent],
})
export class SharedFileModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedFileModule,
      providers: [SharedFileService, File, FileOpener],
    };
  }
}
