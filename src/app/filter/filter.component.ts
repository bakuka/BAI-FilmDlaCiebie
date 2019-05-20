import { Component, OnInit } from '@angular/core';
import { FilmService } from '../services/film.service';
import { Film } from '../models/Films';
import { coerceNumberProperty } from '@angular/cdk/coercion';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';


@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  films: Film[];
  filteredOptions: Observable<string[]>;

  //START years LOV initialization
  myControl = new FormControl();
  options: string[] = this.getYears();
  //END years LOV

  //START genres LOV initialization
  movieGenre = new FormControl();
  movieGenreList: string[] = [""]; 
  //END genres LOV

  //START countries LOV initialization
  filmCountry = new FormControl();
  filmCountryList: string[] = [""];
  //End - countries LOV

  constructor(private filmService: FilmService) { }

  ngOnInit() {
    console.log('ngOnInit run');
    this.filmService.getFilms().subscribe(films => {
      this.films = films;
      this.movieGenreList = this.getAllGenres();
      this.filmCountryList = this.getAllCountries();
    });

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );     
  }

  clickGetAllTittles() {
    for (var i = 0; i < this.films.length; i++) {
      document.getElementById("mainText").innerHTML = document.getElementById("mainText").innerHTML + this.films[i].tittle + ' - ' + this.films[i].time + ' - ';
      for (var j = 0; j < this.films[i].genres.length; j++) {
        document.getElementById("mainText").innerHTML = document.getElementById("mainText").innerHTML + this.films[i].genres[j] + ', ';
      }
      document.getElementById("mainText").innerHTML = document.getElementById("mainText").innerHTML + '\n';
    }
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

  filterData(films: Film) {
    return films.year >= 2000 && films.year <= 2018
      && films.score >= 8 && films.score <= 10;
  }

  filterFilms(films) {
    var filteredFilms: Film[];
    filteredFilms = [];
    filteredFilms.pop();
    return filteredFilms = films.filter(this.filterData);
  }

  clickFilterFilms() {
    var filteredFilms: Film[];
    filteredFilms = [];
    filteredFilms.pop();

    filteredFilms = this.filterFilms(this.films);
    for (var i = 0; i < filteredFilms.length; i++) {
      document.getElementById("filterFilmsTA").innerHTML = document.getElementById("filterFilmsTA").innerHTML + filteredFilms[i].tittle + ' - '
        + filteredFilms[i].score + ' - ' + filteredFilms[i].year + '\n';
    }
  }

  randomFilm(films: Film[]) {
    var random = Math.floor(Math.random() * (films.length - 1) + 1);
    return films[random];
  }

  clickRandomFilm() {
    var chooseFilm: Film;
    chooseFilm = this.randomFilm(this.filterFilms(this.films));
    document.getElementById("randomTA").innerHTML = chooseFilm.tittle;
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

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  getYears() :string[] {
    var years :string[] = [];
    for (var i = 1839; i < 2050; i++) {
      years.push(i.toString());
    }
    return years;
  }
}


