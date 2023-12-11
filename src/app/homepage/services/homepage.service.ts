import {Observable} from "rxjs";
import {RoutePaths} from "../../models/route-paths.enum";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Injectable} from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class HomepageService {

    constructor(
        private http: HttpClient) { }

    getVocabulary(): Observable<any>{
        return this.http.get(`${RoutePaths.GENERAL_API}/vocabulary`);
    }

  addToFavourite(wordId: number): Observable<any> {
    const params = new HttpParams().set('wordId', wordId.toString());
    return this.http.post(`${RoutePaths.GENERAL_API}/vocabulary/add-fav`, {}, { params });
  }

  deleteFromFavourite(wordId: number): Observable<any> {
    const params = new HttpParams().set('wordId', wordId.toString());
    return this.http.delete(`${RoutePaths.GENERAL_API}/vocabulary/delete-fav`, { params });
  }



}
