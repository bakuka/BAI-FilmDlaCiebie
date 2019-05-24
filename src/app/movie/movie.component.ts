import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  constructor(private router: Router) {
    this.showFilm();
  }

  ngOnInit() {
  }

  showFilm(){
    console.log(this.router.getCurrentNavigation().extras.state.filmObj.tittle);
  }

}
