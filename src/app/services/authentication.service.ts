import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import AuthProvider = firebase.auth.AuthProvider;


export interface Credentials {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public user: firebase.User;

  constructor(public afAuth: AngularFireAuth) { 
    afAuth.authState.subscribe(user => {
			this.user = user;
		});
  }

  
  get authenticated(): boolean {
		return this.user !== null;
  }
  
  logout() {
    return this.afAuth.auth.signOut();
}

register({ email, password }: Credentials) {
  return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
}

login({ email, password }: Credentials) {
  return this.afAuth.auth.signInWithEmailAndPassword(email, password);
}
}

