import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {RoutePaths} from "../../models/route-paths.enum";
import {CreateVocabularySetDto} from "../sets/create/models/createset.interface";
import {VocabularySet} from "../models/sets.interface";

@Injectable({
  providedIn: 'root'
})
export class SetsService {

  constructor(private http: HttpClient) { }

  //create set
  createSet(createdSet: CreateVocabularySetDto): Observable<any> {
    return this.http.post(`${RoutePaths.GENERAL_API}/vocabulary-set/create`, createdSet);
  }

  //update set
  updateSet(updatedSet: CreateVocabularySetDto): Observable<any> {
    return this.http.patch(`${RoutePaths.GENERAL_API}/vocabulary-set/update`, updatedSet);
  }

  getAllForUser():  Observable<VocabularySet[]> {
    return this.http.get<VocabularySet[]>(`${RoutePaths.GENERAL_API}/vocabulary-set/all-user`);
  }

  getSet(setId: string):  Observable<VocabularySet> {
    return this.http.get<VocabularySet>(`${RoutePaths.GENERAL_API}/vocabulary-set/${setId}`);
  }
}
