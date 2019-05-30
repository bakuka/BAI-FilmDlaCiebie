import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-accountcreated',
  templateUrl: './accountcreated.component.html',
  styleUrls: ['./accountcreated.component.css']
})
export class AccountcreatedComponent implements OnInit {

  constructor(private router: Router ) { }

  clickAccountCreated(){
    this.router.navigate(['./filter'])
  }
  ngOnInit() {
  }

}
