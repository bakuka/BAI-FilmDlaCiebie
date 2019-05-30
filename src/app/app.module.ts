import { NgModule } from '@angular/core';
import { BrowserModule,HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth'
import { environment } from 'src/environments/environment';
import { FilmService } from './services/film.service';
import { AngularFirestore } from 'angularfire2/firestore';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/database';
import { HttpModule } from '@angular/http';
import {YoutubePlayerModule} from 'ng2-youtube-player';
import { youTubeSearchInjectables } from './youtube-search/youtube-search-injectables';
import { YouTubeSearchBoxComponent } from './youtube-search/youtube-search-box.component';
import { YouTubeSearchResultComponent } from './youtube-search/youtube-search-result.component';
import { YouTubeSearchComponent } from './youtube-search/youtube-search.component';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import * as firebase  from 'firebase';
import { Shake } from '@ionic-native/shake/ngx';
import { Platform } from 'ionic-angular';
import 'hammerjs';
import { GestureConfig } from '@angular/material';





firebase.initializeApp(environment.firebase)
@NgModule({
  declarations: [AppComponent,
                 YouTubeSearchBoxComponent,
                 YouTubeSearchResultComponent,
                 YouTubeSearchComponent  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    YoutubePlayerModule,
    HttpModule,
 
  ],
  providers: [
    StatusBar,
    SplashScreen,
    FilmService,AngularFirestore,
    youTubeSearchInjectables,
 
 
    
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy
       },
       {provide: HAMMER_GESTURE_CONFIG, useClass: GestureConfig},
       GooglePlus,
       Shake,
       Platform
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
