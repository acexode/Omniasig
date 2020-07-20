import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { OmnAppLauncherService } from './services/omn-app-launcher.service';
import { AppLauncher } from '@ionic-native/app-launcher/ngx';
import { WebIntent } from '@ionic-native/web-intent/ngx';
@NgModule({
  declarations: [],
  imports: [CommonModule, IonicModule],
  providers: [OmnAppLauncherService, AppLauncher, WebIntent],
})
export class OmnAppLauncherModule {}
