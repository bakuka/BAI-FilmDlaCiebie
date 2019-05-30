import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RegisterPage } from './register.page';
import { FilterPage } from '../filter/filter.page'
import { AlertController } from 'ionic-angular';
import { App, Config } from 'ionic-angular';





const routes: Routes = [
  {
    path: '',
    component: RegisterPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,

  ],
  declarations: [RegisterPage]
  ,
  providers: [AlertController, App, Config]
})
export class RegisterPageModule {}
