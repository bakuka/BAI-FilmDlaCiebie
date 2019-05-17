import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from "@angular/router";
import { User } from 'firebase';
import { Observable } from 'rxjs/index';
import * as firebase from 'firebase/app';

export interface Credentials {
    email: string;
    password: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
    readonly authState$: Observable<User | null> = this.fireAuth.authState;
    _firebaseAuth: any;

    constructor(private fireAuth: AngularFireAuth) { }

    get user(): User | null {
        return this.fireAuth.auth.currentUser;
    }

    login({ email, password }: Credentials) {
        return this.fireAuth.auth.signInWithEmailAndPassword(email, password);
    }

    register({ email, password }: Credentials) {
        return this.fireAuth.auth.createUserWithEmailAndPassword(email, password);
    }

    logout() {
        return this.fireAuth.auth.signOut();
    }

    googleLogin() {
        return this.fireAuth.auth.signInWithPopup(
            new firebase.auth.GoogleAuthProvider()
        )
    }

}