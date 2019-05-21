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
  filteredOptionsMin: Observable<string[]>;
  filteredOptionsMax: Observable<string[]>;

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

    this.filteredOptionsMin = this.yearsMinForm.valueChanges.pipe(
      startWith(''),
      map(value => this._filterMin(value))
    );  

    this.filteredOptionsMax = this.yearsMaxForm.valueChanges.pipe(
      startWith(''),
      map(value => this._filterMax(value))
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

  clickRandomFilm() {
    var chooseFilm: Film;
    var minYearFilter :string = this.yearsMinForm.value;
    var maxYearFilter :string = this.yearsMaxForm.value;
    if (minYearFilter == null){
      minYearFilter = "1850";
    }
    if (maxYearFilter == null){
      maxYearFilter = "2050";
    }

    var filteredFilms: Film[];
    filteredFilms = [];
    filteredFilms.pop();  
    filteredFilms = this.filterFilms(this.films, minYearFilter, maxYearFilter );

    chooseFilm = this.randomFilm(filteredFilms);
    window.alert(chooseFilm.tittle);
  }

  filterFilms(films,minYar,maxYear) {
    var filteredFilms: Film[];
    filteredFilms = [];
    filteredFilms.pop();
    return filteredFilms = films.filter(filterData => filterData.year >= Number.parseFloat(minYar) && filterData.year <= Number.parseFloat(maxYear));
  }
  
  randomFilm(films: Film[]) {
    var random = Math.floor(Math.random() * (films.length - 1) + 1);
    return films[random];
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
    for (var i = 1839; i < 2050; i++) {
      years.push(i.toString());
    }
    return years;
  }
}


