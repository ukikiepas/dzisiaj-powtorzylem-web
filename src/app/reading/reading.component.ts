import { Component } from '@angular/core';
import {Reading} from "./models/reading.interface";
import {ActivatedRoute, Router} from "@angular/router";
import {ReadingSelectionService} from "./reading-selection/services/reading-selection.service";
import {ReadingService} from "./services/reading.service";
import {QuestionWithAnswers} from "./models/question-with-answers.interface";
import {WordsDictionary} from "./models/words.dictionary";

@Component({
  selector: 'app-reading',
  templateUrl: './reading.component.html',
  styleUrls: ['./reading.component.css']
})

export class ReadingComponent {


  reading!:Reading;
  questionWithAnswers!:QuestionWithAnswers[];
  wordsDictionaries!:WordsDictionary[];
  userAnswers: Map<number, number> = new Map(); // Mapa śledząca wybory użytkownika
  showMessage: boolean = false;
  processedContent!: { text: string; highlight: boolean }[];



  constructor(private router: Router,private activatedRoute: ActivatedRoute, private readingService: ReadingService) {}

    ngOnInit(): void {
      const id:string | null = this.activatedRoute.snapshot.paramMap.get('readingId');
      if (id) {
        this.loadReading(id);
        this.loadQuestionWithAnswers(id);
        this.loadWordsDictionaries(id);
      }
    }

    loadReading(id:string): void {
    this.readingService.getReading(id).subscribe(
      data =>{
        this.reading = data;
      },
      error => {
        console.error('Wystąpił błąd podczas ładowania czytanek', error);
      }
    );
  }

  loadQuestionWithAnswers(id:string): void {
    this.readingService.getQuestionsWithAnswers(id).subscribe(
      data =>{
        this.questionWithAnswers = data;
        this.questionWithAnswers.forEach(q => q.highlight = false);
        // Teraz możemy bezpiecznie przetworzyć treść, ponieważ questionWithAnswers jest zainicjalizowane
        this.initializeContent();
      },
      error => {
        console.error('Wystąpił błąd podczas ładowania pytań i odpowiedzi', error);
      }
    );
  }

  loadWordsDictionaries(id:string): void {
    this.readingService.getWordsDictionaries(id).subscribe(
      data =>{
        this.wordsDictionaries = data.map(wordDictionary => ({
          ...wordDictionary,
          showDefinition: false // Dodajemy nową właściwość
        }));
      },
      error => {
        console.error('Wystąpił błąd podczas słownika', error);
      }
    );
  }


  onAnswerSelect(questionId: number, answerId: number) {
    this.showMessage = false;
    this.userAnswers.set(questionId, answerId);
  }

  checkAnswers() {
    this.showMessage = false;
    let allAnswered = true;

    this.questionWithAnswers.forEach(question => {
      if (!this.userAnswers.has(question.questionId)) {
        this.showMessage = true;
        allAnswered = false;
      }
    });

    if (!allAnswered) {
      return;
    }



    this.questionWithAnswers.forEach(question => {
      const correctAnswerId = question.answers.find(answer => answer.correct)?.answerId;
      const userAnswerId = this.userAnswers.get(question.questionId);

      question.answered = true;
      question.userCorrect = userAnswerId === correctAnswerId;
    });
  }


  initializeContent(): void {
    // Upewniamy się, że dane zostały już załadowane
    if(this.reading && this.questionWithAnswers) {
      let content = this.reading.content;

      // Usuwamy wszystkie markery z treści
      this.questionWithAnswers.forEach(question => {
        // Tworzymy wyrażenie regularne z uwzględnieniem znaków specjalnych
        const escapedMarker = question.answerMarker.replace(/[\*\[\](){}?+^$\\.|\-]/g, "\\$&");
        const markerRegex = new RegExp(escapedMarker, 'g');
        content = content.replace(markerRegex, '');
      });

      // Ustawiamy cały tekst jako niepodświetlony na początku
      this.processedContent = [{
        text: content,
        highlight: false
      }];
    }
  }


  highlightContent(): void {
    // Zakładając, że 'content' oryginalnie zawiera cały tekst, włącznie z markerami.
    let content = this.reading.content;

    // Tworzymy tymczasową kopię 'processedContent', która będzie aktualizowana.
    let newProcessedContent = [];

    // Sortujemy pytania po numerze zawartym w markerze, jeśli to potrzebne.
    // this.questionWithAnswers.sort((a, b) => parseInt(a.answerMarker.slice(1, -1)) - parseInt(b.answerMarker.slice(1, -1)));

    let lastIndex = 0;

    // Przechodzimy przez wszystkie markery w 'content'.
    this.questionWithAnswers.forEach(question => {
      console.log(question);
      const marker = question.answerMarker;
      const startMarkerIndex = content.indexOf(marker, lastIndex);
      const endMarkerIndex = content.indexOf(marker, startMarkerIndex + marker.length);

      if (startMarkerIndex !== -1 && endMarkerIndex !== -1) {
        // Dodajemy tekst przed markerem (niepodświetlony).
        newProcessedContent.push({
          text: content.substring(lastIndex, startMarkerIndex),
          highlight: false
        });

        // Tekst między markerami jest podświetlony tylko jeśli 'highlight' jest 'true'.
        newProcessedContent.push({
          text: content.substring(startMarkerIndex + marker.length, endMarkerIndex),
          highlight: question.highlight
        });

        // Przesuwamy 'lastIndex' za drugi marker.
        lastIndex = endMarkerIndex + marker.length;
      }
    });

    // Dodajemy resztę tekstu po ostatnim markerze.
    if (lastIndex < content.length) {
      newProcessedContent.push({
        text: content.substring(lastIndex),
        highlight: false
      });
    }

    // Zastępujemy 'processedContent' nową zawartością.
    this.processedContent = newProcessedContent;
  }


  xpp(questionId: number): void {
    const question = this.questionWithAnswers.find(q => q.questionId === questionId);
    if (question) {
      question.highlight = !question.highlight;
      // Aktualizujemy tylko podświetlenie, nie przetwarzamy treści od nowa.
      this.highlightContent();
    }
  }





}
