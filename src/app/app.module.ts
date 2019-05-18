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




const   firebase = {
  apiKey: "AIzaSyDO1W0CNBxbpP8qwO7fgDGg_gLQ8247gTY",
  authDomain: "login-test-58df5.firebaseapp.com",
  databaseURL: "https://login-test-58df5.firebaseio.com",
  projectId: "login-test-58df5",
  storageBucket: "login-test-58df5.appspot.com",
  messagingSenderId: "817195632401",
  appId: "1:817195632401:web:245df21381ec6fea"
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
    AngularFireModule.initializeApp(firebase),
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
  


  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
