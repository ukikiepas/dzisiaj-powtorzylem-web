import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from '@angular/common/http';
import {IrregularVerb, IrregularVerbDtoResponse} from "../models/irregular.interface";
import {RoutePaths} from "../../models/route-paths.enum";

@Injectable({
  providedIn: 'root'
})
export class IrregularService {

  constructor(
    private http: HttpClient) { }

  getIrregulars(count: number, level: string): Observable<any>{
    return this.http.get(`${RoutePaths.GENERAL_API}/irregular/getRandomSet?count=${count}&level=${level}`);
  }

  sendResponse(verbs: IrregularVerbDtoResponse[]): Observable<any>{
    return this.http.post(`${RoutePaths.GENERAL_API}/irregular/sendResponse`, verbs);
  }
}
