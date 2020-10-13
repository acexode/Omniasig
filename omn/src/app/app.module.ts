import { Deeplinks } from '@ionic-native/deeplinks/ngx';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {
  IonicModule,
  IonicRouteStrategy,
  iosTransitionAnimation,
} from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { PolicySharedModule } from './modules/policy/policy-shared.module';
import { LocuinteSharedModule } from './profile/pages/locuinte/locuinte-shared.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot({
      mode: 'md',
      rippleEffect: false,
      navAnimation: iosTransitionAnimation,
    }),
    AppRoutingModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
    PolicySharedModule.forRoot(),
    LocuinteSharedModule.forRoot(),
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Deeplinks,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
