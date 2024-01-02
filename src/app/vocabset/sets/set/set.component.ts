import {Component, OnInit} from '@angular/core';
import {VocabularySet} from "../../models/sets.interface";
import {DatePipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {FormsModule} from "@angular/forms";
import {SetsService} from "../../services/sets.service";
import {EditSetService} from "../../../shared/services/reading-set.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-set',
  standalone: true,
  imports: [
    NgForOf,
    FontAwesomeModule,
    NgIf,
    FormsModule,
    DatePipe,
    NgClass
  ],
  templateUrl: './set.component.html',
  styleUrls: ['./set.component.css']
})
export class SetComponent implements OnInit{

  //zestawy
  allVocabularySets: VocabularySet[] = [];
  vocabularySet!: VocabularySet;

  constructor(private setsService: SetsService, private router: Router) {}


  ngOnInit(): void {
    this.loadAllVocabularySets();
  }

  loadAllVocabularySets(): void {
    this.setsService.getAllForUser().subscribe(
      response => {
        this.allVocabularySets = response.data;
        this.sortVocabularySets()
      },
      error => {
        console.error("Error getting set", error);
      }
    );
  }

  selectVocabularySet(set: VocabularySet): void {
    this.router.navigate(['/vocabulary-set/sets', set.id]);
  }

  isReviewedToday(lastReviewed: Date): boolean {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const reviewDate = new Date(lastReviewed);
    reviewDate.setHours(0, 0, 0, 0);
    return reviewDate.getTime() === today.getTime();
  }

  sortVocabularySets(): void {
    this.allVocabularySets.sort((a, b) => {
      const isReviewedTodayA = this.isReviewedToday(a.lastReviewed) && a.isActive;
      const isReviewedTodayB = this.isReviewedToday(b.lastReviewed) && b.isActive;

      if (isReviewedTodayA === isReviewedTodayB) {
        if (a.isActive === b.isActive) {
          return 0;
        }
        return a.isActive ? -1 : 1;
      }

      return isReviewedTodayA ? -1 : 1;
    });
  }


}
