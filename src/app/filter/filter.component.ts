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

  //Production year
  myControl = new FormControl();
  options: string[] = ["1838",
    "1839", "1840", "1841", "1842", "1843", "1844", "1845", "1846", "1847", "1848", "1849", "1850", "1851", "1852", "1853",
    "1854", "1855", "1856", "1857", "1858", "1859", "1860", "1861", "1862", "1863", "1864", "1865", "1866", "1867",
    "1868", "1869", "1870", "1871", "1872", "1873", "1874", "1875", "1876", "1877", "1878", "1879", "1880", "1881",
    "1882", "1883", "1884", "1885", "1886", "1887", "1888", "1889", "1890", "1891", "1892", "1893", "1894", "1895",
    "1896", "1897", "1898", "1899", "1900", "1901", "1902", "1903", "1904", "1905", "1906", "1907", "1908", "1909",
    "1910", "1911", "1912", "1913", "1914", "1915", "1916", "1917", "1918", "1919", "1920", "1921", "1922", "1923",
    "1924", "1925", "1926", "1927", "1928", "1929", "1930", "1931", "1932", "1933", "1934", "1935", "1936", "1937",
    "1938", "1939", "1940", "1941", "1942", "1943", "1944", "1945", "1946", "1947", "1948", "1949", "1950", "1951",
    "1952", "1953", "1954", "1955", "1956", "1957", "1958", "1959", "1960", "1961", "1962", "1963", "1964", "1965",
    "1966", "1967", "1968", "1969", "1970", "1971", "1972", "1973", "1974", "1975", "1976", "1977", "1978", "1979",
    "1980", "1981", "1982", "1983", "1984", "1985", "1986", "1987", "1988", "1989", "1990", "1991", "1992", "1993",
    "1994", "1995", "1996", "1997", "1998", "1999", "2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007",
    "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021",
    "2022", "2023", "2024", "2025", "2026", "2027", "2028", "2029", "2030", "2031", "2032", "2033", "2034", "2035", "2036",
    "2037", "2038", "2039", "2040", "2041", "2042", "2043", "2044", "2045", "2046", "2047", "2048", "2049", "2050"
  ];
  filteredOptions: Observable<string[]>;

  //End - Production Year

  constructor(private filmService: FilmService) { }

  ngOnInit() {
    console.log('ngOnInit run');
    this.filmService.getFilms().subscribe(films => {
      this.films = films;
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

  getAllGenres() {
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

    for (var i = 0; i < genresArray.length; i++) {
      document.getElementById("genresTA").innerHTML = document.getElementById("genresTA").innerHTML + genresArray[i] + '\n';
    }
  }

  clickGetAllGenres() {
    this.getAllGenres();
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

    for (var i = 0; i < countriesArray.length; i++) {
      document.getElementById("countriesTA").innerHTML = document.getElementById("countriesTA").innerHTML + countriesArray[i] + '\n';
    }
  }

  clickGetAllCountries() {
    this.getAllCountries();
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




  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

}


