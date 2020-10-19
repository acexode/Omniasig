import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { IonicModule } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { JwtInterceptor } from './interceptors/JWTInterceptor';
import { AuthService } from './services/auth/auth.service';
import { RegistrationService } from './services/auth/registration.service';
import { ConfigService } from './services/config/config.service';
import { CustomStorageService } from './services/custom-storage/custom-storage.service';
import { CustomTimersService } from './services/custom-timers/custom-timers.service';
import { MenuService } from './services/menu/menu.service';
import { RequestService } from './services/request/request.service';
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
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    RequestService,
    ConfigService,
    AuthService,
    RegistrationService,
    CustomStorageService,
    CustomTimersService,
    MenuService,
    AppVersion,
  ],
  exports: [SideMenuComponent],
})
export class CoreModule {}
