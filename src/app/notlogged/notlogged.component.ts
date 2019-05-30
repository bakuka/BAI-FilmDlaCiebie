import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-notlogged',
  templateUrl: './notlogged.component.html',
  styleUrls: ['./notlogged.component.css']
})
export class NotloggedComponent implements OnInit {

  constructor(private router: Router ) { }

  ngOnInit() {
  }

  clickLoggedIn(){
    this.router.navigate(['/filter'])
  }

}
