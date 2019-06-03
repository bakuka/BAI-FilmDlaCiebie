import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Film } from '../models/Films';
import { Observable } from 'rxjs';
import { FilmService } from '../services/film.service';
import { Router } from '@angular/router';
import { Filter } from '../models/filters';
import { map, startWith } from 'rxjs/operators';
import { YouTubeSearchResult } from '../youtube-search/youtube-search-result';
import { AuthenticationService } from '../services/authentication.service';


@Component({
  selector: 'app-filter',
  templateUrl: './filter.page.html',
  styleUrls: ['./filter.page.scss'],
})
export class FilterPage implements OnInit {

  @Output() loading: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() results: EventEmitter<YouTubeSearchResult[]> = new EventEmitter<YouTubeSearchResult[]>();

  valueOfSlider=0;

  films: Film[];
  filteredOptionsMin: Observable<string[]>;
  filteredOptionsMax: Observable<string[]>;
  genresTab :string[];
  userFilms: Film[];
  userAvoidFilms: Film[];
  userUID: String = null;
  
  filterProperty = {} as Filter;

  getGenres(){
    return this.genresTab;
  }

  //START years LOV initialization
  yearsMinForm = new FormControl();
  yearsMinTable: string[] = this.getYears();

  yearsMaxForm = new FormControl();
  yearsMaxTable: string[] = this.getYears();
  //END years LOV

  //START genres LOV initialization
  movieGenre = new FormControl();
  movieGenreList: string[] = [""]; 
  //END genres LOV

  /*YT*/
  player: YT.Player;

  savePlayer (player){
    this.player = player;
    console.log('player instance', player);
  }

  onStateChange(event){
  }
  /*****/

  //START countries LOV initialization
  filmCountry = new FormControl();
  filmCountryList: string[] = [""];
  //End - countries LOV

  constructor(private filmService: FilmService,
    private router: Router,
    private auth: AuthenticationService
    ) { }

  ngOnInit() {
    this.filmService.getFilms().subscribe(films => {
      this.films = films;
      this.movieGenreList = this.getAllGenres();
      this.filmCountryList = this.getAllCountries();
    });   

    this.filteredOptionsMin = this.yearsMinForm.valueChanges.pipe(
      startWith(''),
      map(value => this._filterMin(value))
    );  

    this.filteredOptionsMax = this.yearsMaxForm.valueChanges.pipe(
      startWith(''),
      map(value => this._filterMax(value))
    );

    /* for logged user */
    this.auth.afAuth.authState.subscribe(
      user => {
        if (user) {
          this.userUID = user.uid;
          this.filmService.getUserFilms(user.uid).subscribe(films => { /*get user films*/
            this.userFilms = films;
            console.log("liczba filmów zalogowanego użytkownika: " + this.userFilms.length );
          });
          this.filmService.getUserAvoidFilms(user.uid).subscribe(films => { /*get user avoid films*/
            this.userAvoidFilms = films;
            console.log("liczba filmów pomijanych przez użytkownika: " + this.userAvoidFilms.length );
          });  
        }
      });
    /*************/
  }

  getAllCountries() {
    var countriesArray: string[];
    countriesArray = [""];
    countriesArray.pop();

    for (var i = 0; i < this.films.length; i++) {
      for (var j = 0; j < this.films[i].countries.length; j++) {
        countriesArray.push(this.films[i].countries[j]);
      }
    }

    /*remove duplicate*/
    countriesArray = countriesArray.filter((el, i, a) => i === a.indexOf(el))
    countriesArray.sort();

    return countriesArray;
  }

  getAllGenres() :string[] {
    var genresArray: string[];
    genresArray = [""];
    genresArray.pop();

    for (var i = 0; i < this.films.length; i++) {
      for (var j = 0; j < this.films[i].genres.length; j++) {
        genresArray.push(this.films[i].genres[j]);
      }
    }

    /*remove duplicate*/
    genresArray = genresArray.filter((el, i, a) => i === a.indexOf(el))
    genresArray.sort();

    return genresArray;
  }

  clickRandomFilm() {
    var minYearFilter :string = this.yearsMinForm.value;
    var maxYearFilter :string = this.yearsMaxForm.value;
    var movieGenres :string[] = this.movieGenre.value;
    var movieCountries :string[] = this.filmCountry.value;
    
    /* if fields are null, this is the support of it*/
    if (minYearFilter == null || minYearFilter == ""){
      minYearFilter = "1850";
    }
    if (maxYearFilter == null || minYearFilter == ""){
      maxYearFilter = "2050";
    }   
    if (this.movieGenre.value == ""){
      movieGenres = null;
    }
    if (this.filmCountry.value == ""){
      movieCountries = null;
    }
    /*****/

    this.filterProperty.countries = movieCountries;
    this.filterProperty.genres = movieGenres;
    this.filterProperty.score = this.valueOfSlider;
    this.filterProperty.minYear = Number.parseInt(minYearFilter);
    this.filterProperty.maxYear = Number.parseInt(maxYearFilter);


    /*open new site with film parameters*/
    this.router.navigate(['/movie'], { state: { filterObj: this.filterProperty,
                                                filmsList: this.films,
                                                filmsUserList: this.userFilms,
                                                filmsuserAvoidList: this.userAvoidFilms,
                                                userUID: this.userUID
                                              }});
    /*****/

  }

  private _filterMin(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.yearsMinTable.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  private _filterMax(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.yearsMaxTable.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  getYears() :string[] {
    var years :string[] = [];
    for (var i = 2020; i > 1950; i--) {
      years.push(i.toString());
    }
    return years;
  }
}

