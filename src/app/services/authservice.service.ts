import { Injectable } from '@angular/core';
import { Router } from  "@angular/router";
import 'rxjs/add/operator/map';
import * as _ from "lodash"
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from "angularfire2/firestore";
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from  'firebase';
import { Account } from  '../models/account';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  user: User;
  account: Account;

  constructor(public  afAuth:  AngularFireAuth, public  router:  Router, private db: AngularFirestore) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
        this.getUser();
        this.account = JSON.parse(localStorage.getItem('dba'));
      } else {
        localStorage.setItem('user', null);
      }
    })
  }

  async  login(email:  string, password:  string) {
    try {
      await  this.afAuth.auth.signInWithEmailAndPassword(email, password);

      this.router.navigate(['/index']);
    } catch (e) {
      alert("Error!"  +  e.message);
    }
  }

  /*
  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.afAuth.auth.signInWithPopup(provider)
        .then(credential =>  {
          this.login(credential.user)
        })
  }
  */

  async logout(){
    await this.afAuth.auth.signOut();
    localStorage.removeItem('user');
    localStorage.removeItem('dba-id');
    localStorage.removeItem('dba');
    this.router.navigate(['/index']);
  }

  get isLoggedIn(): boolean {
    const  user  =  JSON.parse(localStorage.getItem('user'));
    return  user  !==  null;
  }

  async getUser() {
    const  userStorage  =  JSON.parse(localStorage.getItem('user'));
    const usersRef = await this.db.collection("user", ref => ref.where("user_id", '==', userStorage.uid));

    await usersRef
        .get()
        .subscribe(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            localStorage.setItem('dba', JSON.stringify(doc.data()));
            localStorage.setItem('dba-id', JSON.stringify(doc.id));
          });
        });
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
    const roles = this.account.roles;
    return !_.isEmpty(_.intersection(allowedRoles, roles ))
  }
}
