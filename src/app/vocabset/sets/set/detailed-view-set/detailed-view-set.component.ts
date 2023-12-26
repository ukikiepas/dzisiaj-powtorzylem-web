import { Component } from '@angular/core';
import {VocabularySet} from "../../../models/sets.interface";
import {SetsService} from "../../../services/sets.service";
import {EditSetService} from "../../../../shared/services/reading-set.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-detailed-view-set',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    NgForOf
  ],
  templateUrl: './detailed-view-set.component.html',
  styleUrls: ['./detailed-view-set.component.css']
})
export class DetailedViewSetComponent {

  //zestawy
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


  constructor(private setsService: SetsService, private editSetService: EditSetService, private router: Router, private route: ActivatedRoute) {
    console.log('DetailedViewSetComponent initialized');
  }


  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const setId = params.get('setId');
      if (setId) {
        console.log('Loading set details for ID:', setId);
        this.loadSetDetails(setId);
      }
    });
  }

  loadSetDetails(setId: string){
    console.log('xDDD');
    this.setsService.getSet(setId).subscribe(
      response => {
        this.vocabularySet = response.data;
      }
    )
    this.vocabularySet.vocabularyDtos.forEach(() => this.flipped.push(false));
    this.flipped = Array(this.vocabularySet.vocabularyDtos.length).fill(false);
    this.showFlashcards = false;
    this.showTest = false;
    this.showResults = false;
  }

  toggleFlip(index: number): void {
    this.flipped[index] = !this.flipped[index];
  }

  toggleView(): void {
    this.showFlashcards = !this.showFlashcards;
  }

  //test
  startTest(): void {
    this.showTest = true;
    this.currentTestIndex = 0;
    this.userAnswers = [];
    this.score = 0;
  }

  retryTest(): void {
    this.showResults = false;
    this.startTest();
  }

  goBack(): void {
    this.showResults = false;
    this.showTest = false;
    this.showFlashcards = false;
  }

  submitAnswer(answer: string): void {
    answer = answer.trim() || "???";

    const correctAnswer = this.vocabularySet.vocabularyDtos[this.currentTestIndex].word;
    this.userAnswers.push(answer);

    if (answer.toLowerCase() === correctAnswer.toLowerCase()) {
      this.score++;
    }

    if (this.currentTestIndex < this.vocabularySet.vocabularyDtos.length - 1) {
      this.userAnswer = '';
      this.currentTestIndex++;
    } else {
      this.showTest = false;
      this.showResults = true;
    }
  }

  //edycja
  onEditSet(): void {
    this.editSetService.changeEditSet(this.vocabularySet);
    this.router.navigate(['/vocabulary-set/create-set']); // Przekierowanie do komponentu edycji
  }

}
