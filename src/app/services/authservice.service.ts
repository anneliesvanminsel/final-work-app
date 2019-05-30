import { Injectable } from '@angular/core';
import { Router } from  "@angular/router";
import * as firebase from 'firebase';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from "angularfire2/firestore";
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from  'firebase';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  user: User;

  constructor(public  afAuth:  AngularFireAuth, public  router:  Router) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
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
    this.router.navigate(['/index']);
  }

  get isLoggedIn(): boolean {
    const  user  =  JSON.parse(localStorage.getItem('user'));
    return  user  !==  null;
  }

  getUser() {
    const  user  =  JSON.parse(localStorage.getItem('user'));
    return user;
  }

}
