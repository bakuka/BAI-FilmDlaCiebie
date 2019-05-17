import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { environment } from './../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule} from '@angular/material/form-field';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material';
import { AuthGuard } from './register/auth.guard';
import {MatButtonModule} from '@angular/material/button';
import { AuthService } from './register/auth.service';
import { FilterComponent } from './filter/filter.component';

import { FilmService } from './services/film.service';
import { AngularFirestore } from 'angularfire2/firestore';

import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/database';




const   firebase = {
  apiKey: "AIzaSyDWtXkgm0x-k8HWWI6Vc-3rllRDx_dwK7s",
  authDomain: "filmsbase-e4d63.firebaseapp.com",
  databaseURL: "https://filmsbase-e4d63.firebaseio.com",
  projectId: "filmsbase-e4d63",
  storageBucket: "filmsbase-e4d63.appspot.com",
  messagingSenderId: "905255718932",
  appId: "1:905255718932:web:2c35ef9e3f22debc"
}


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    FilterComponent,

  ],
  
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    RouterModule.forRoot([
    { path:'', component: RegisterComponent},
    { path: 'filter' ,component: FilterComponent,
    canActivate: [AuthGuard]
  }
    // { path: 'selected', component: SelectedComponent}

    ]),
    MatFormFieldModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule
  ],
  


  providers: [AuthService,FilmService,AngularFirestore],
  bootstrap: [AppComponent]
})
export class AppModule { }
