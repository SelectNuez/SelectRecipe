import { Injectable, OnInit } from '@angular/core';
import {
  Auth,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  User,
  onAuthStateChanged,
} from '@angular/fire/auth';
import { BehaviorSubject, Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class  UserService {
  private userSubject: BehaviorSubject<User | null> =
    new BehaviorSubject<User | null>(null);
  user$: Observable<User | null> = this.userSubject.asObservable();

  constructor(private auth: Auth, private cookies: CookieService) {
    onAuthStateChanged(this.auth, (user) => {
      this.userSubject.next(user);
    });
  }



  setCookie(loginWork: any) {
    loginWork.then((user) => {
      this.cookies.set('token', user.user?.refreshToken || '');
    });
  }

  getToken() {
    return this.cookies.get('token');
  }


  loginWithGoogle() {
    const loginwork = signInWithPopup(this.auth, new GoogleAuthProvider());
    this.setCookie(loginwork);
    return loginwork;
  }

  logout() {
    this.cookies.delete('token');
    return signOut(this.auth);
  }

  isLoged() {
    return this.userSubject.value !== null;
  }

  getUID(){
    return this.userSubject.value?.uid;
  }


}
