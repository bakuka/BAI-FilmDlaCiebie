import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../register/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent {
  user = this.authService.user;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver,
    private router: Router,
    private authService: AuthService) {}

  logout() {
    this.authService.logout()
      .then(() => this.router.navigate(['/register']));
  }

  toFilter() {
  this.router.navigate(['/filter']);
  }

  toMovie() {
    this.router.navigate(['/movie']);
    }

}
