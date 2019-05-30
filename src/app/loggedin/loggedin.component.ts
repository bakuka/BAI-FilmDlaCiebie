import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loggedin',
  templateUrl: './loggedin.component.html',
  styleUrls: ['./loggedin.component.css']
})
export class LoggedinComponent implements OnInit {

  constructor(private router: Router ) { }

  clickLoggedIn(){
    this.router.navigate(['/filter'])
  }

  ngOnInit() {
  }

}
