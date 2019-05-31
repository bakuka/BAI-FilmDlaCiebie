import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loggedout',
  templateUrl: './loggedout.page.html',
  styleUrls: ['./loggedout.page.scss'],
})
export class LoggedoutPage implements OnInit {

  constructor(private router: Router ) { }

  clickLoggedOut(){
    this.router.navigate([''])
  }

  ngOnInit() {
  }

}