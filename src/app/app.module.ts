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
import { LoginComponent } from './login/login.component';

import { FilmService } from './services/film.service';
import { AngularFirestore } from 'angularfire2/firestore';

import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/database';




const   firebase = {
  apiKey: "AIzaSyB4q0xgUAIQYkEZKP3ktUJU3Uom4ddEhZg",
  authDomain: "filmdlaciebie-e34b6.firebaseapp.com",
  databaseURL: "https://filmdlaciebie-e34b6.firebaseio.com",
  projectId: "filmdlaciebie-e34b6",
  storageBucket: "filmdlaciebie-e34b6.appspot.com",
  messagingSenderId: "153529790154",
  appId: "1:153529790154:web:292e36456aefd43b"
}


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    FilterComponent,
    LoginComponent
    

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
  },
  { path: 'login', component:LoginComponent}
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
