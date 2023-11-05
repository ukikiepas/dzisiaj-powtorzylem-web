import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, catchError, Observable, throwError} from 'rxjs';
import { tap } from 'rxjs/operators';
import {User} from "../../models/user.interface";
import {RoutePaths} from "../../models/routepaths.enum";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private readonly API_URL = 'http://localhost:8080/api/v1/auth';
  private jwtTokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);


  constructor(private http: HttpClient) {
      const token = localStorage.getItem('access_token');
      this.jwtTokenSubject = new BehaviorSubject<string | null>(token);
    }


  login(authenticationRequest: any): Observable<any> {
    return this.http.post(`${this.API_URL}/authenticate`, authenticationRequest).pipe(
      tap((response: any) => {
        localStorage.setItem('access_token', response.access_token);
        localStorage.setItem('refresh_token', response.refresh_token);
        this.jwtTokenSubject.next(response.access_token);
      }),
      catchError(error => {
        console.error('Blad logowania', error);
        return throwError(error)
      })
    );
  }

  register(registerRequest: User): Observable<any> {
    return this.http.post(`${this.API_URL}/${RoutePaths.REGISTER}`, registerRequest);
  }

  refreshToken(): Observable<any> {
    const refreshToken = localStorage.getItem('refresh_token');
    const headers = {
      'Authorization': `Bearer ${refreshToken}`
    };
    return this.http.post(`${this.API_URL}/refresh-token`, {}, { headers: headers }).pipe(
      tap((response: any) => {
        localStorage.setItem('access_token', response.access_token);  // Zakładając, że odpowiedź zawiera nowy token dostępu
        this.jwtTokenSubject.next(response.access_token);
      }),
      catchError(error => {
        console.error('Błąd podczas odświeżania tokena:', error);
        return throwError(error);
      })
    );
  }


  get accessToken(): Observable<string | null> {
    return this.jwtTokenSubject.asObservable();
  }


  logout(): Observable<void> {

    // Pobierz token dostępu z localStorage.
    const accessToken = localStorage.getItem('access_token');

    // Stwórz nagłówki dla żądania wylogowania.
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}` // Dodajemy token dostępu do nagłówka Authorization.
    });

    return this.http.post<void>(`${this.API_URL}/logout`, {}, {headers: headers}).pipe(
      tap(() => {
        console.log(headers);
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        this.jwtTokenSubject.next(null);
      })
    );
  }
}
