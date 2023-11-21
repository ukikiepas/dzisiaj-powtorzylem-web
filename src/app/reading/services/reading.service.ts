import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {RoutePaths} from "../../models/route-paths.enum";
import {QuestionWithAnswers} from "../models/question-with-answers.interface";
import {WordsDictionary} from "../models/words.dictionary";


@Injectable({
  providedIn: 'root'
})
export class ReadingService {

  constructor(
    private http: HttpClient) { }

  getReading(id: string): Observable<any>{
    return this.http.get(`${RoutePaths.GENERAL_API}/readings/${id}`);
  }

  getQuestionsWithAnswers(id: string): Observable<QuestionWithAnswers[]>{
    return this.http.get<QuestionWithAnswers[]>(`${RoutePaths.GENERAL_API}/readings/questions/${id}`);
  }

  getWordsDictionaries(id: string): Observable<WordsDictionary[]>{
    return this.http.get<WordsDictionary[]>(`${RoutePaths.GENERAL_API}/readings/words/${id}`);
  }




}
