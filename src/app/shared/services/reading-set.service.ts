import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {VocabularySet} from "../../vocabset/models/sets.interface";

@Injectable({
  providedIn: 'root'
})
export class EditSetService {
  private editSetSource = new BehaviorSubject<VocabularySet | null>(null);

  currentEditSet = this.editSetSource.asObservable();

  constructor() {}

  changeEditSet(set: VocabularySet | null): void {
    this.editSetSource.next(set);
  }
}
