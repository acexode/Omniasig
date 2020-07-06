import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { fakeBackendProvider } from './interceptors/fake-backend';
import { ConfigService } from './services/config/config.service';
import { RequestService } from './services/request/request.service';
import { SideMenuComponent } from './components/side-menu/side-menu.component';

@NgModule({
  declarations: [SideMenuComponent],
  imports: [CommonModule, HttpClientModule],
  providers: [
    fakeBackendProvider,
    RequestService,
    ConfigService,
    // AuthService,
    // CustomStorageService,
  ],
  exports: [SideMenuComponent],
})
export class CoreModule {}
