import { Injectable } from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import { Observable } from "rxjs";
import { RoutePaths } from "../../models/route-paths.enum";
import { CreateVocabularySetDto } from "../sets/create/models/createset.interface";
import {VocabularySet, VocabularySetViewDto} from "../models/sets.interface";
import {ApiResponse} from "../../utlis/apimodel.interface";

@Injectable({
  providedIn: 'root'
})
export class SetsService {

  constructor(private http: HttpClient) { }

  // Create set
  createSet(createdSet: CreateVocabularySetDto): Observable<ApiResponse<VocabularySet>> {
    return this.http.post<ApiResponse<VocabularySet>>(`${RoutePaths.GENERAL_API}/vocabulary-set/create`, createdSet);
  }

  // Update set
  updateSet(updatedSet: CreateVocabularySetDto): Observable<ApiResponse<VocabularySet>> {
    return this.http.patch<ApiResponse<VocabularySet>>(`${RoutePaths.GENERAL_API}/vocabulary-set/update`, updatedSet);
  }

  // Get all sets for user
  getAllForUser(): Observable<ApiResponse<VocabularySet[]>> {
    return this.http.get<ApiResponse<VocabularySet[]>>(`${RoutePaths.GENERAL_API}/vocabulary-set/all-user`);
  }

  // Get a specific set
  getSet(setId: string): Observable<ApiResponse<VocabularySet>> {
    return this.http.get<ApiResponse<VocabularySet>>(`${RoutePaths.GENERAL_API}/vocabulary-set/${setId}`);
  }

  findSets(searchTerm: string, category: string, page: number = 0, size: number = 5): Observable<any> {
    const params = new HttpParams()
      .set('searchTerm', searchTerm)
      .set('category', category || '')
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<any>(`${RoutePaths.GENERAL_API}/vocabulary-set/find`, { params });
  }

  addToFavourites(setId: number): Observable<any> {
    return this.http.post(`${RoutePaths.GENERAL_API}/vocabulary-set/add-fav/${setId}`, {});
  }

}
