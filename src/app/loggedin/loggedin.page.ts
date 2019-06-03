import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loggedin',
  templateUrl: './loggedin.page.html',
  styleUrls: ['./loggedin.page.scss'],
})
export class LoggedinPage implements OnInit {

  constructor(private router: Router ) { }

  clickLoggedIn(){
    this.router.navigate(['/filter'])
  }

  ngOnInit() {
  }

}
