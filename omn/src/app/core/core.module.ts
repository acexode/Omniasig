import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { fakeBackendProvider } from './interceptors/fake-backend';
import { ConfigService } from './services/config/config.service';
import { RequestService } from './services/request/request.service';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { IonicStorageModule } from '@ionic/storage';
import { CustomStorageService } from './services/custom-storage/custom-storage.service';
import { AuthService } from './services/auth/auth.service';
import { MenuService } from './services/menu/menu.service';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [SideMenuComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    IonicModule,
    IonicStorageModule.forRoot({
      name: '__omndb',
      driverOrder: ['sqlite', 'indexeddb', 'localstorage', 'websql'],
    }),
  ],
  providers: [
    fakeBackendProvider,
    RequestService,
    ConfigService,
    AuthService,
    CustomStorageService,
    MenuService,
  ],
  exports: [SideMenuComponent],
})
export class CoreModule {}
