import { Component } from '@angular/core';
import {VocabularySet} from "../../../models/sets.interface";
import {SetsService} from "../../../services/sets.service";
import {EditSetService} from "../../../../shared/services/reading-set.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {faPlusCircle} from "@fortawesome/free-solid-svg-icons/faPlusCircle";
import {faCog, faQuestion, faSquarePollHorizontal, faSquarePollVertical} from "@fortawesome/free-solid-svg-icons";
import {AuthenticationService} from "../../../../auth/services/authentication.service";
import {UserResultAnswer, UserResultDto} from "../../../models/results.interface";

@Component({
  selector: 'app-detailed-view-set',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    NgForOf,
    FontAwesomeModule
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
  testStartTime!: Date;
  results!: UserResultAnswer[];


  constructor(private setsService: SetsService,
              private editSetService: EditSetService,
              private router: Router,
              private route: ActivatedRoute,
              private authenticationService: AuthenticationService)
  {
    this.results = [];
  }


  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const setId = params.get('setId');
      if (setId) {
        this.loadSetDetails(setId);
      }
    });
  }

  loadSetDetails(setId: string){
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
    this.testStartTime = new Date();
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

    const isCorrect = answer.toLowerCase() === correctAnswer.toLowerCase();
    const userResultAnswear: UserResultAnswer = {
      id: null,
      resultId: null,
      vocabularyWord: correctAnswer,
        userAnswer: answer,
        isCorrect: isCorrect
    }
    this.results.push(userResultAnswear);

    if (isCorrect) this.score++;

    if (this.currentTestIndex < this.vocabularySet.vocabularyDtos.length - 1) {
      this.userAnswer = '';
      this.currentTestIndex++;
    } else {
      this.showTest = false;
      this.showResults = true;
      this.saveTestResults();
    }
  }

  saveTestResults(): void {
    const testEndTime = new Date();
    const duration = testEndTime.getTime() - this.testStartTime.getTime();
    const userResult: UserResultDto = {
      resultId: null,
      setId: this.vocabularySet.id,
      username: this.vocabularySet.creator,
      correctAnswers: this.results.filter(r => r.isCorrect).length,
      badAnswers: this.results.filter(r => !r.isCorrect).length,
      score: parseFloat((this.score / this.vocabularySet.vocabularyDtos.length).toFixed(2)),
      durationTime: duration,
      insertTime: new Date(),
      answers: this.results
    };
    this.setsService.sendUserResult(userResult).subscribe({
      next: (resp) => {
        console.log(resp);
        this.results = [];
        this.userAnswer = ''
    },
      error: (error) => {
        console.log(error);
      }
    });
  }

  //edycja
  onEditSet(): void {
    this.editSetService.changeEditSet(this.vocabularySet);
    this.router.navigate(['/vocabulary-set/create-set']); // Przekierowanie do komponentu edycji
  }

  isOwner(set: any): boolean {
    let currentUsername = this.authenticationService.getUsernameFromToken();
    return currentUsername === set.creator;
  }

  copySet(setId: number): void {
    this.setsService.addToFavourites(setId).subscribe({
      next: (response) => {
        console.log("Zestaw dodany do ulubionych");
        this.router.navigate(['/vocabulary-set/sets'])
      },
      error: (error) => {
        console.error("Wystąpił błąd podczas dodawania do ulubionych");
      }
    });
  }

  protected readonly faPlus = faPlusCircle;
  protected readonly faCog = faCog;

  //Todo to be done
  deleteSet() {

  }

  goToProgress() {
    this.router.navigate([`/vocabulary-set/sets/analysis/${this.vocabularySet.id}`])
  }

  protected readonly faQuestion = faQuestion;
  protected readonly faSquarePollHorizontal = faSquarePollHorizontal;
  protected readonly faSquarePollVertical = faSquarePollVertical;


}
