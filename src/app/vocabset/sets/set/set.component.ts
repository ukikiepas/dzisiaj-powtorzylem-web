import {Component, OnInit} from '@angular/core';
import {VocabularySet} from "../../models/sets.interface";
import {NgForOf, NgIf} from "@angular/common";
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
    FormsModule
  ],
  templateUrl: './set.component.html',
  styleUrls: ['./set.component.css']
})
export class SetComponent implements OnInit{

  //zestawy
  allVocabularySets: VocabularySet[] = [];
  vocabularySet!: VocabularySet;
  //fiszki
  flipped: boolean[] = [];
  showFlashcards: boolean = false;
  //test
  showTest: boolean = false;
  currentTestIndex: number = 0;
  userAnswers: string[] = [];
  score: number = 0;
  userAnswer: string = ''; // Dodaj to
  showResults: boolean = false;


  constructor(private setsService: SetsService, private editSetService: EditSetService, private router: Router) {}


  ngOnInit(): void {
    this.loadAllVocabularySets();
  }

  loadAllVocabularySets(): void {
    this.setsService.getAllForUser().subscribe(
      response => {
        this.allVocabularySets = response.data;
        console.log(this.allVocabularySets);
      },
      error => {
        console.error("Error getting set", error);
      }
    );

    this.vocabularySet.vocabularyDtos.forEach(() => this.flipped.push(false));
  }

  selectVocabularySet(set: VocabularySet): void {
    this.router.navigate(['/vocabulary-set/sets', set.id]);
    this.vocabularySet = set;
    this.flipped = Array(set.vocabularyDtos.length).fill(false);
    this.showFlashcards = false;
    this.showTest = false;
    this.showResults = false;
  }


  //edycja
  onEditSet(): void {
    this.editSetService.changeEditSet(this.vocabularySet);
    this.router.navigate(['/vocabulary-set/create-set']); // Przekierowanie do komponentu edycji
  }

}
