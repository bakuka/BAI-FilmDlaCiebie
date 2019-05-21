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
// import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AuthGuard } from './register/auth.guard';


import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import 'hammerjs';



import { AuthService } from './register/auth.service';
import { FilterComponent } from './filter/filter.component';
import { LoginComponent } from './login/login.component';
import {DragDropModule} from '@angular/cdk/drag-drop';

import { FilmService } from './services/film.service';
import { AngularFirestore } from 'angularfire2/firestore';

import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/database';
import {
  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule,
} from '@angular/material';
import {A11yModule} from '@angular/cdk/a11y';
import {PortalModule} from '@angular/cdk/portal';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';




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
    LoginComponent,
    MainNavComponent
    

  ],
  
  imports: [
    BrowserModule,
    MatSliderModule,
    AppRoutingModule,
    DragDropModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    RouterModule.forRoot([
    { path: '', redirectTo: 'register', pathMatch: 'full'},
    { path:'register', component: RegisterComponent},
    { path: 'filter' ,component: FilterComponent
    // canActivate: [AuthGuard]
  },
  { path: 'login', component:LoginComponent}
    // { path: 'selected', component: SelectedComponent}

    ]),
    MatFormFieldModule,
    BrowserAnimationsModule,
    // NoopAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    A11yModule,
    PortalModule,
    ScrollingModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonToggleModule,
  LayoutModule
  
  ],
  


  providers: [AuthService,FilmService,AngularFirestore],
  bootstrap: [AppComponent,FilterComponent],
  entryComponents:[FilterComponent]
  
})
export class AppModule { }
platformBrowserDynamic().bootstrapModule(AppModule);