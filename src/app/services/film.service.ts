import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Film } from '../models/Films';

import { AngularFireDatabase } from 'angularfire2/database';
import {Observable, Subject, of, from} from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class FilmService {
  filmCollection: AngularFirestoreCollection<Film>;
  films: Observable<Film[]>;

  constructor(public afs: AngularFireDatabase) { 
    this.films = this.afs.list('/films').valueChanges();
  }

  getFilms(){
    return this.films;
  }
}
