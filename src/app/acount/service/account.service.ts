import { Injectable } from '@angular/core';

// external
import { AngularFireAuth } from '@angular/fire/auth';
// @ts-ignore
import firebase, { auth } from 'firebase/app';
// @ts-ignore
import { User } from 'firebase';
import {first} from 'rxjs/operators';
import {Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AccountService {

  public userData$: Observable<firebase.User>;
  public auth: auth;
  public user: User;
  constructor( public afAuth: AngularFireAuth) {
    this.userData$ = afAuth.authState;
  }

  // @ts-ignore
  async onLogin( email: string, password: string ): Promise<firebase.auth.UserCredential> {
    try {
      const result = await this.afAuth.signInWithEmailAndPassword(
        email,
        password
      );
      return result;
    }catch (err){
     alert('Datos incorectos');
    }
  }

  async logout(): Promise<void> {
    await this.afAuth.signOut();
  }
  // tslint:disable-next-line:typedef
  getCurrentUser() {
    return this.afAuth.authState.pipe(first()).toPromise();
  }
}
