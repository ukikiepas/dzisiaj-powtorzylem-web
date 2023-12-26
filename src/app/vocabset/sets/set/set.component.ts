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
      },
      error => {
        console.error("Error getting set", error);
      }
    );
  }

  selectVocabularySet(set: VocabularySet): void {
    this.router.navigate(['/vocabulary-set/sets', set.id]);
  }

}
