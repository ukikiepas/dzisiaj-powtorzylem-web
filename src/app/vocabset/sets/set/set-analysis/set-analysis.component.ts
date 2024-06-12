import {Component, OnInit} from '@angular/core';
import {CalendarMonthModule} from "angular-calendar";
import {DatePipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {UserResultAnswer, UserResultDto} from "../../../models/results.interface";
import {SetsService} from "../../../services/sets.service";
import {Chart, ChartConfiguration, registerables} from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-set-analysis',
  standalone: true,
  imports: [
    CalendarMonthModule,
    NgIf,
    DatePipe,
    FormsModule,
    NgForOf,
    NgClass
  ],
  templateUrl: './set-analysis.component.html',
  styleUrls: ['./set-analysis.component.css']
})
export class SetAnalysisComponent implements OnInit {

  selectedDate: string;
  userResultDto!: UserResultDto[];
  private generalProgressChart!: Chart;
  private mistakesChart!: Chart;

  constructor(private setsService: SetsService) {
    const today = new Date();
    this.selectedDate = today.toISOString().split('T')[0];
  }

  ngOnInit() {
    this.onDateChange();
  }

  onDateChange(): void {
    this.setsService.getResultsDay(this.selectedDate).subscribe(
      resp => {
        this.userResultDto = resp;
        console.log(this.userResultDto);
        this.createChartGeneralProgress();
        this.createChartWrongAnswers()
      }
    );
  }

  openAccordionItem(index: number) {
    const id = `result-${index}`;
    const accordionItem = document.getElementById(id);

    if (accordionItem) {
      const button = accordionItem.querySelector('.accordion-button') as HTMLButtonElement;
      if (button && button.classList.contains('collapsed')) {
        button.click();
      }

      // Przewiń do kafelka
      setTimeout(() => {
        accordionItem.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    }
  }

  //Wykres dniowy
  createChartGeneralProgress() {
    if (this.generalProgressChart) {
      this.generalProgressChart.destroy();
    }
    const data = {
      labels: this.userResultDto.map((_, index) => `Próba ${index + 1}`),
      datasets: [{
        label: 'Wynik procentowy',
        data: this.userResultDto.map(result => result.score * 100),
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }]
    };

    const config: ChartConfiguration<'line'> = {
      type: 'line',
      data,
      options: {
        onClick: (event, elements) => {
          if (elements.length > 0) {
            const firstElement = elements[0];
            const index = firstElement.index;
            this.openAccordionItem(index);
          }
        }
      }
    };

    this.generalProgressChart = new Chart(
      document.getElementById('myChart') as HTMLCanvasElement,
      config
    );
  }

  //Wykres błędów
  getMostMistakenWords() {
    const mistakeCount: Record<string, number> = {};

    this.userResultDto.forEach(result => {
      result.answers.forEach(answer => {
        if (!answer.isCorrect) {
          mistakeCount[answer.vocabularyWord] = (mistakeCount[answer.vocabularyWord] || 0) + 1;
        }
      });
    });

    const sortedMistakes = Object.entries(mistakeCount).sort((a, b) => b[1] - a[1]);
    return sortedMistakes.slice(0, 5); // Zwraca 5 najczęściej mylonych słówek
  }

  createChartWrongAnswers() {
    if (this.mistakesChart) {
      this.mistakesChart.destroy();
    }

    const mostMistakenWords = this.getMostMistakenWords();
    const labels = mostMistakenWords.map(item => item[0]);
    const data = mostMistakenWords.map(item => item[1]);

    const chartData = {
      labels: labels,
      datasets: [{
        label: 'Liczba błędów',
        data: data,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 3
      }]
    };

    const config: ChartConfiguration<'bar'> = {
      type: 'bar',
      data: chartData,
      options: {
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1,
              callback: function(value, index, values) {
                if (typeof value === 'number' && value % 1 === 0) {
                  return value.toString();
                }
                return null;
              }
            }
          }
        }
      }
    };

    this.mistakesChart = new Chart(
      document.getElementById('mistakesChart') as HTMLCanvasElement,
      config
    );
  }

  formatDuration(durationMs: number): string {
    const totalSeconds = Math.floor(durationMs / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    if (minutes === 0) {
      return `${seconds} sek.`;
    } else {
      return `${minutes} min ${seconds} sek.`;
    }
  }

}


