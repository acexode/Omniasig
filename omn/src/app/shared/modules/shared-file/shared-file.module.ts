import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { File } from '@ionic-native/file/ngx';
import { SharedFileService } from './services/shared-file.service';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [SharedFileService, File, FileOpener],
})
export class SharedFileModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedFileModule,
      providers: [SharedFileService, File, FileOpener],
    };
  }
}
