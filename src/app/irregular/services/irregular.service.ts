import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from '@angular/common/http';
import {IrregularVerb, IrregularVerbDtoResponse} from "../models/irregular.interface";

@Injectable({
  providedIn: 'root'
})
export class IrregularService {

  private readonly API_URL = 'http://localhost:8080/api/v1/auth/irregular';


  constructor(
    private http: HttpClient
  ) { }

  getIrregulars(count: number, level: string): Observable<any>{
    return this.http.get(`${this.API_URL}/getRandomSet?count=${count}&level=${level}`);
  }

  sendResponse(verbs: IrregularVerbDtoResponse[]): Observable<any>{
    return this.http.post(`${this.API_URL}/sendResponse`, verbs);
  }
}
