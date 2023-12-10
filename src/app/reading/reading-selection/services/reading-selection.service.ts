import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {RoutePaths} from "../../../models/route-paths.enum";


@Injectable({
  providedIn: 'root'
})
export class ReadingSelectionService {

  constructor(
    private http: HttpClient) { }


  getReadings(level: string): Observable<any>{
    return this.http.get(`${RoutePaths.GENERAL_API}/readings/level/${level}`);
  }


}
