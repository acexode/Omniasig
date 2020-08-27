import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
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
import { RouterModule } from '@angular/router';
import { CustomTimersService } from './services/custom-timers/custom-timers.service';
import { RegistrationService } from './services/auth/registration.service';
import { JwtInterceptor } from './interceptors/JWTInterceptor';

@NgModule({
  declarations: [SideMenuComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    IonicModule,
    IonicStorageModule.forRoot({
      name: '__omndb',
      driverOrder: ['sqlite', 'indexeddb', 'localstorage', 'websql'],
    }),
  ],
  providers: [
    fakeBackendProvider,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    RequestService,
    ConfigService,
    AuthService,
    RegistrationService,
    CustomStorageService,
    CustomTimersService,
    MenuService,
  ],
  exports: [SideMenuComponent],
})
export class CoreModule {}
