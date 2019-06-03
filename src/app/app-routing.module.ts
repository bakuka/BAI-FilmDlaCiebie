import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'register',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  {
    path: 'list',
    loadChildren: './list/list.module#ListPageModule'
  },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
  { path: 'filter', loadChildren: './filter/filter.module#FilterPageModule' },
  { path: 'movie', loadChildren: './movie/movie.module#MoviePageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },  { path: 'loggedin', loadChildren: './loggedin/loggedin.module#LoggedinPageModule' },
  { path: 'loggedout', loadChildren: './loggedout/loggedout.module#LoggedoutPageModule' },
  { path: 'accountcreated', loadChildren: './accountcreated/accountcreated.module#AccountcreatedPageModule' },
  { path: 'notlogged', loadChildren: './notlogged/notlogged.module#NotloggedPageModule' }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
