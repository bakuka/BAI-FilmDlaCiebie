import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-accountcreated',
  templateUrl: './accountcreated.page.html',
  styleUrls: ['./accountcreated.page.scss'],
})
export class AccountcreatedPage implements OnInit {

  constructor(private router: Router ) { }

  clickAccountCreated(){
    this.router.navigate(['./filter'])
  }
  ngOnInit() {
  }

}
