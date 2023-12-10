import {Observable} from "rxjs";
import {RoutePaths} from "../../models/route-paths.enum";
import {HttpClient} from "@angular/common/http";
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

}
