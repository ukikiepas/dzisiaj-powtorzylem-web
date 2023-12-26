import { Component } from '@angular/core';
import {SetsService} from "../../services/sets.service";
import {Router} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {DatePipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons/faSearch";
import { faHeart as fasHeart } from '@fortawesome/free-solid-svg-icons';
import {CATEGORIES} from "../../../utlis/dictionaries/categories.constant";
import {faHeart} from "@fortawesome/free-regular-svg-icons";
import {AuthenticationService} from "../../../auth/services/authentication.service";

@Component({
  selector: 'app-findset',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    NgForOf,
    FontAwesomeModule,
    DatePipe,
    NgClass
  ],
  templateUrl: './findset.component.html',
  styleUrls: ['./findset.component.css']
})
export class FindsetComponent {

  searchTerm: string = '';
  selectedCategory: string = '';
  searchResults: any[] = [];
  categories: string[] = CATEGORIES;
  currentPage: number = 0;
  pageSize: number = 5;
  totalPages: number = 0;
  addedToFavourites: Set<number> = new Set(); // Struktura do śledzenia dodanych zestawów


  constructor(private setsService: SetsService, private router: Router, private authenticationService: AuthenticationService) {}

  onSearch(page: number = 0): void {
    this.currentPage = page;
    this.setsService.findSets(this.searchTerm, this.selectedCategory, this.currentPage, this.pageSize).subscribe(response => {
      this.searchResults = response.data.content;
      this.totalPages = response.data.totalPages;
    });
  }

  onNextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.onSearch(this.currentPage + 1);
    }
  }

  onPrevPage(): void {
    if (this.currentPage > 0) {
      this.onSearch(this.currentPage - 1);
    }
  }

  viewSet(setId: number): void {
    this.router.navigate(['/vocabulary-set/sets', setId]);
  }

  //fav
  toggleFavourite(setId: number): void {
    if (this.isFavourite(setId)) {
      console.log("Ten zestaw jest już w ulubionych.");
      return;
    } else {
      this.addSetToFavourites(setId);
    }
  }

  isFavourite(set: any): boolean {
    let currentUsername = this.authenticationService.getUsernameFromToken();
    return currentUsername === set.creator;
  }


  private addSetToFavourites(setId: number): void {
    this.setsService.addToFavourites(setId).subscribe({
      next: (response) => {
        console.log("Zestaw dodany do ulubionych");
      },
      error: (error) => {
        console.error("Wystąpił błąd podczas dodawania do ulubionych");
      }
    });
  }


  protected readonly faSearch = faSearch;

  //TODO ogarnac ze jak sie kopiuje, zeby tez sie slowka kopiowały
}
