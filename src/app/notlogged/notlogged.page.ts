import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notlogged',
  templateUrl: './notlogged.page.html',
  styleUrls: ['./notlogged.page.scss'],
})
export class NotloggedPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  clickLoggedIn() {
    this.router.navigate(['/filter'])
  }

}
