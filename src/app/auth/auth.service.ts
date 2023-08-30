import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, catchError, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../models/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authStatus = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) {}

  public sendUser(url: string, user: User) {
    this.authStatus.next(true);
    return this.http
      .post(url, user, { observe: 'response', withCredentials: true })
      .pipe(
        tap((response) => {
          const rawCookies = response.headers.getAll('Set-Cookie');
          console.log('body', response.headers);

          if (rawCookies && rawCookies.length > 0) {
            console.log('Cookies de la respuesta:', rawCookies);
          } else {
            console.log('No se encontraron cookies en la respuesta.');
          }
        })
      );
  }

  public logout(url: string) {
    console.log(`${url}/auth/logout`);
    this.authStatus.next(false);
    this.http.get(`${url}/auth/logout`).subscribe((response) => {
      console.log(response);
    });
  }

  getAuthStatus(): Observable<boolean> {
    return this.authStatus.asObservable();
  }
}
