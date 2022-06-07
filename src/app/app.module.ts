import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { AlertController, IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { SplashScreen } from '@awesome-cordova-plugins/splash-screen/ngx';

import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';

import { StatusBar } from '@awesome-cordova-plugins/status-bar/ngx';

import { HttpClientModule } from '@angular/common/http';

import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation/ngx';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,HttpClientModule],
  providers: [StatusBar,AlertController ,SplashScreen, BarcodeScanner, ScreenOrientation, { provide: RouteReuseStrategy, useClass: IonicRouteStrategy}],
  bootstrap: [AppComponent],
})
export class AppModule {}
