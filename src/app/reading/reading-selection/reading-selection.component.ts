import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {Reading} from "../models/reading.interface";
import {ReadingSelectionService} from "./services/reading-selection.service";

@Component({
  selector: 'app-reading-selection',
  templateUrl: './reading-selection.component.html',
  styleUrls: ['./reading-selection.component.css']
})
export class ReadingSelectionComponent implements OnInit{

  selectedLevel = 'A1';
  readings!:Reading[];

  constructor(private router: Router, private readingSelectionService: ReadingSelectionService) {}

  ngOnInit(): void {
    this.loadReadings();
  }

  loadReadings(): void {
    this.readingSelectionService.getReadings(this.selectedLevel).subscribe(
      data =>{
        this.readings = data;
      },
      error => {
        console.error('Wystąpił błąd podczas ładowania czytanek', error);
      }
    );
  }

  onLevelChange() {
    this.loadReadings();
  }

  goToReading(readingId: number) {
    this.router.navigate(['/reading/', readingId]);
  }

}
