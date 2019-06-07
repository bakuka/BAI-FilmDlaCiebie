import { Component, OnInit, ViewChild } from '@angular/core';
import { Film } from '../models/Films';
import { Filter } from '../models/filters';
import { Router } from '@angular/router';
import { YouTubeSearchService } from '../youtube-search/youtube-search.service';
import { DeviceMotion, DeviceMotionAccelerationData, DeviceMotionAccelerometerOptions } from '@ionic-native/device-motion';
import { IonContent } from '@ionic/angular';
import { FilmService } from '../services/film.service';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-movie',
  templateUrl: './movie.page.html',
  styleUrls: ['./movie.page.scss'],
})
export class MoviePage implements OnInit {

  userUID: String = null;
  showUserWatchButton: Boolean = false;
  showYTPlayer: Boolean = false;
  choosedFilm: Film;
  userFilms: Film[];
  userAvoidFilms: Film[];
  currentDisplayedFilm: Film;

  /**motion */
  subscription: any;
  /*** */

  /*YT*/
  player: YT.Player;
  public idRadomFIlmYT: string;
  /****/

  /*page binds*/
  skippedFilms = {} as Film[];
  filmsList = {} as Film[];
  filterProperty = {} as Filter;

  pageFilmTitle: string;
  pageFilmYear: number;
  pagefilmScore: number;
  pageFilmGenres: string;
  pageFilmCountries: string;
  pageimgURL: string;
  pageFilmOriginalTitle: string;
  pageFilmDescription: string;
  /*******/

  constructor(private router: Router,
    private youtube: YouTubeSearchService,
    public alertController: AlertController,
    private filmService: FilmService) {
    this.initializePage();
  }

  ngOnInit() {

  }

  // Scrolling to element
  @ViewChild(IonContent) content: IonContent;

  logScrollStart() {
  }
  logScrolling() {
  }
  logScrollEnd() {
  }
  ScrollToBottom() {
    this.content.scrollToBottom(1500);
  }
  ScrollToTop() {
    this.content.scrollToTop(1500);
  }
  // end scrolling

  /***YT */
  savePlayer(player) {
    this.player = player;
  }

  onStateChange(event) {
  }
  /*****/

  initializePage() {
    this.startMotion();
    this.skippedFilms = [];
    this.filterProperty = this.router.getCurrentNavigation().extras.state.filterObj;
    this.filmsList = this.router.getCurrentNavigation().extras.state.filmsList;
    this.userFilms = this.router.getCurrentNavigation().extras.state.filmsUserList;
    this.userAvoidFilms = this.router.getCurrentNavigation().extras.state.filmsuserAvoidList;
    this.userUID = this.router.getCurrentNavigation().extras.state.userUID;
    if (this.userUID != null) {
      this.showUserWatchButton = true; /* show button for logged user*/
    }

    var chooseFilm = this.filterAndRandomFilm(this.filterProperty.minYear, this.filterProperty.maxYear,
      this.filterProperty.genres, this.filterProperty.countries);

    if (chooseFilm != null) {
      this.bindVariables(chooseFilm);
      this.choosedFilm = chooseFilm;
    }
  }

  bindVariables(film: Film) {
    var tempGenres = "";
    var tempCountries = "";
    this.pageFilmTitle = film.tittle;
    this.pageFilmYear = film.year;
    this.pagefilmScore = film.score;
    for (var i = 0; i < film.genres.length; i++) {
      tempGenres = tempGenres + film.genres[i] + ", ";
    }
    this.pageFilmGenres = tempGenres.slice(0, -2);
    for (var i = 0; i < film.countries.length; i++) {
      tempCountries = tempCountries + film.countries[i] + ", ";
    }
    this.pageFilmCountries = tempCountries.slice(0, -2);
    this.pageimgURL = film.imgURL;
    this.pageFilmOriginalTitle = film.originalTittle;
    this.pageFilmDescription = film.description;

    this.currentDisplayedFilm = film; /**remember current dispayed film. Needed for showing previous films*/

    this.youtube.search(film.tittle + "zwiastun PL").switch().subscribe(); / load trailer from YT /
  }

  clickRandomNextFilm() {
    var chooseFilm: Film;
    var minYearFilter: number = this.filterProperty.minYear;
    var maxYearFilter: number = this.filterProperty.maxYear;
    var movieGenres: string[] = this.filterProperty.genres;
    var movieCountries: string[] = this.filterProperty.countries;

    chooseFilm = this.filterAndRandomFilm(minYearFilter, maxYearFilter, movieGenres, movieCountries);

    if (chooseFilm != null) {
      this.bindVariables(chooseFilm);
      this.choosedFilm = chooseFilm;
    }
    /***turn off the trialer*/
    this.showYTPlayer = false;
    this.player.stopVideo();
    /*****/
  }

  filterFilms(films, minYar, maxYear, genresTab, countriesTab, minScore) {
    var filteredFilms: Film[] = [];
    filteredFilms.pop();

    return filteredFilms = films.filter(filterData => {

                                                        /* checking if the film is in user list*/
                                                        if (this.userUID != null) {
                                                          for (var i = 0; i < this.userFilms.length; i++) {
                                                            if (this.userFilms[i].id == filterData.id) {
                                                              return null;
                                                            }
                                                          }
                                                        }
                                                        /**********/

                                                        /* checking if the film is in user avoid list*/
                                                        if (this.userUID != null) {
                                                          for (var i = 0; i < this.userAvoidFilms.length; i++) {
                                                            if (this.userAvoidFilms[i].id == filterData.id) {
                                                              return null;
                                                            }
                                                          }
                                                        }
                                                        /**********/

                                                        /* checking if the film has been choosen before, if yes, it cannot be choosen*/
                                                        for (var i = 0; i < this.skippedFilms.length; i++) {
                                                          if (this.skippedFilms[i].id == filterData.id) {
                                                            return null;
                                                          }
                                                        }
                                                        /********* */

                                                        if (genresTab != null) {
                                                          var checkFilmGenre: Boolean = false;
                                                          for (var i = 0; i < filterData.genres.length; i++) {
                                                            for (var j = 0; j < genresTab.length; j++) {
                                                              if (filterData.genres[i] == genresTab[j]) {
                                                                checkFilmGenre = true;
                                                              }
                                                            }
                                                          }
                                                          if (checkFilmGenre == false) {
                                                            return null;
                                                          }
                                                        }
                                                        if (countriesTab != null) {
                                                          var checkFilmCountries: Boolean = false;
                                                          for (var i = 0; i < filterData.countries.length; i++) {
                                                            for (var j = 0; j < countriesTab.length; j++) {
                                                              if (filterData.countries[i] == countriesTab[j]) {
                                                                checkFilmCountries = true;
                                                              }
                                                            }
                                                          }
                                                          if (checkFilmCountries == false) {
                                                            return null;
                                                          }
                                                        }

                                                        return filterData.year >= Number.parseFloat(minYar) && filterData.year <= Number.parseFloat(maxYear)
                                                          && filterData.score >= minScore;
                                                      }
                                      );
  }

  randomFilm(films: Film[]) {
    var random = Math.floor(Math.random() * (films.length - 1) + 1);
    return films[random];
  }

  filterAndRandomFilm(minYearFilter, maxYearFilter, movieGenres, movieCountries) {
    var filteredFilms: Film[] = [];
    filteredFilms = this.filterFilms(this.filmsList, minYearFilter, maxYearFilter, movieGenres, movieCountries, this.filterProperty.score);

    if (filteredFilms.length == 0) {
      this.noFilmsAlert();
      this.router.navigate(['/filter']);
      return;
    } else if (filteredFilms.length == 1) {
      this.skippedFilms.push(filteredFilms[0]) /* adding to skipped list*/
      return filteredFilms[0];
    } else {
      var film: Film = this.randomFilm(filteredFilms);
      this.skippedFilms.push(film) /* adding to skipped list*/
      return film;
    }
  }

  clickTrailer() {
    this.showYTPlayer = true;
    this.player.loadVideoById(String(this.youtube.getFilmId()));
  }

  startMotion() {
    var previousValueX = 0;
    var previousValueY = 0;
    var previousValueZ = 0;

    var datePrevious = new Date();
    var previousDate = datePrevious.getTime();

    var options: DeviceMotionAccelerometerOptions = {
      frequency: 500
    };

    this.subscription = DeviceMotion.watchAcceleration(options).subscribe((acceleration: DeviceMotionAccelerationData) => {

      var date = new Date();
      var actualDate = date.getTime();

      if ( actualDate - previousDate > 1000 && (acceleration.x - previousValueX > 10 || acceleration.y - previousValueY > 10 || acceleration.z - previousValueZ > 10)) {
        this.clickRandomNextFilm();
        previousDate = date.getTime();
      }
      previousValueX = acceleration.x;
      previousValueY = acceleration.y;
      previousValueZ = acceleration.z;
    })
  }

  stopMotion() {
    this.subscription.unsubscribe();
  }

  clickUserWatched() {
    if (this.userUID != null) {
      this.filmService.addUserFilm(this.userUID, this.choosedFilm);
      this.viewedAlert();
      this.clickRandomNextFilm();
    } else {
      alert("Użytkownik nie zalogowany, prosze się zalogować");
    }
  }

  clickUserAvoidFilm() {
    if (this.userUID != null) {
      this.filmService.addUserAvoidFilm(this.userUID, this.choosedFilm);
      this.noShowAlert();
      this.clickRandomNextFilm();
    } else {
      alert("Użytkownik nie zalogowany, prosze się zalogować");
    }
  }

  async noFilmsAlert() {
    const alert = await this.alertController.create({
      header: 'Uwaga',
      subHeader: 'Brak filmów z podanymi kryteriami',
      buttons: ['OK'],
      mode: 'ios'
    });
    await alert.present();
  }

  async noShowAlert() {
    const alert = await this.alertController.create({
      header: 'Uwaga',
      subHeader: 'Film "' + this.choosedFilm.tittle + '" nie będzie więcej pokazywany.',
      buttons: ['OK'],
      mode: 'ios'
    });
    await alert.present();
  }

  async viewedAlert() {
    const alert = await this.alertController.create({
      // header: 'Film Dla Ciebie',
      subHeader: 'Film "' + this.choosedFilm.tittle + '" został dodany do twojej listy obejrzanych.',
      buttons: ['OK'],
      mode: 'ios'
    });
    await alert.present();
  }

  clickPreviousButton(){
    for (var i = 0; i < this.skippedFilms.length; i++) {
      if (this.skippedFilms[i].id == this.currentDisplayedFilm.id && i>0) {
        this.bindVariables(this.skippedFilms[i-1]);
      }
    }    
  }
}