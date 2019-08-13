import { Injectable } from '@angular/core';
import { Router } from  "@angular/router";
import 'rxjs/add/operator/map';
import * as _ from "lodash"
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from "angularfire2/firestore";
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from  'firebase';
import { Account } from '../models/account.model';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import { HttpClient } from '@angular/common/http';

interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private _account: Account;
  isLoggedIn : BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(public  afAuth:  AngularFireAuth, public  router:  Router, private db: AngularFirestore, private http: HttpClient) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.getAccountFromDb(user).then(() => this.isLoggedIn.next(true));
      } else {
        console.log('no user');
      }
    })
  }

  async  login(email:  string, password:  string) {
    try {
      await this.afAuth.auth.signInWithEmailAndPassword(email, password);
    } catch (e) {
      alert("Error!"  +  e.message);
    }
  }

  signup(email: string, password: string) {
    return this.http.post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=AIzaSyClgZaB7oe_otLva7qgyPJYKiBHT4TiRJY',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        });
  }

  async logout(){
    await this.afAuth.auth.signOut().then(() => this.isLoggedIn.next(false));
    this.router.navigate(['/index']);
  }

  async getAccountFromDb(user: User) {
    await this.db.collection("user", ref => ref.where("user_id", '==', user.uid)).get().subscribe((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        this._account = <Account> doc.data();
      });
    });
  }

   get account() : Account {
    return this._account;
  }

  get isTeacher(): boolean {
    const allowed = ['teacher'];
    return this.matchingRole(allowed);
  }

  get isStudent(): boolean {
    const allowed = ['student'];
    return this.matchingRole(allowed);
  }

  private matchingRole(allowedRoles): boolean {
    const roles = this._account.roles;
    return !_.isEmpty(_.intersection(allowedRoles, roles ))
  }
}
