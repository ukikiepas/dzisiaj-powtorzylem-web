import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, catchError, Observable, throwError} from 'rxjs';
import { tap } from 'rxjs/operators';
import {User} from "../../account/models/user.interface";
import {RoutePaths} from "../../models/route-paths.enum";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private jwtTokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  constructor(private http: HttpClient) {
      const token = localStorage.getItem('access_token');
      this.jwtTokenSubject = new BehaviorSubject<string | null>(token);
    }

  register(registerRequest: User): Observable<any> {
    return this.http.post(`${RoutePaths.GENERAL_API}/register`, registerRequest);
  }

  login(authenticationRequest: any): Observable<any> {
    return this.http.post(`${RoutePaths.GENERAL_API}/authenticate`, authenticationRequest).pipe(
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

  logout(): Observable<void> {
    const accessToken = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    });

    return this.http.post<void>(`${RoutePaths.GENERAL_API}/logout`, {}, {headers: headers}).pipe(
      tap(() => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        this.jwtTokenSubject.next(null);
      })
    );
  }

  get accessToken(): Observable<string | null> {
    return this.jwtTokenSubject.asObservable();
  }

  refreshToken(): Observable<any> {
    const refreshToken = localStorage.getItem('refresh_token');
    const headers = {
      'Authorization': `Bearer ${refreshToken}`
    };
    return this.http.post(`${RoutePaths.GENERAL_API}/refresh-token`, {}, { headers: headers }).pipe(
      tap((response: any) => {
        localStorage.setItem('access_token', response.access_token);
        this.jwtTokenSubject.next(response.access_token);
      }),
      catchError(error => {
        console.error('Błąd podczas odświeżania tokena:', error);
        return throwError(error);
      })
    );
  }

  getUsernameFromToken(): string | undefined {
    const token = localStorage.getItem('access_token');
    if (token) {
      const payload = token.split('.')[1];
      const decodedPayload = atob(payload);
      const payloadObj = JSON.parse(decodedPayload);
      return payloadObj.sub;
    }
    return undefined;
  }
}
