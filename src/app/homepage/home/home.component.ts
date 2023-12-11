import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {HomepageService} from "../services/homepage.service";
import {VocabularyDtoInterface} from "../models/vocabularyDtoInterface";
import {ViewportScroller} from "@angular/common";
import {faArrowDown, faArrowUp, faPhone, faX} from "@fortawesome/free-solid-svg-icons";
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import {faFacebookF, faInstagram,faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faHeart as fasHeart } from '@fortawesome/free-solid-svg-icons';
import {tap} from "rxjs/operators";
import {catchError, of} from "rxjs";
import {ToastrService} from "ngx-toastr";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit{

  cards: VocabularyDtoInterface[] = [];
  constructor(private homepageService: HomepageService, private viewportScroller: ViewportScroller, private toastr: ToastrService,private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.homepageService.getVocabulary().subscribe(data => {
      this.cards = data;
      console.log(data);
    });
  }

  scrollToSection(sectionId: string): void {
    this.viewportScroller.scrollToAnchor(sectionId);
  }

  toggleFavourite(card: VocabularyDtoInterface): void {
    const request$ = card.isFavourited
      ? this.homepageService.deleteFromFavourite(card.wordId)
      : this.homepageService.addToFavourite(card.wordId);

    request$.pipe(
      tap(() => {
        card.isFavourited = !card.isFavourited;
      }),
      catchError(error => {
        this.toastr.error('Wystąpił błąd podczas dodawania/usuwania ulubionego słówka', 'Błąd');
        return of(null);
      })
    ).subscribe();
  }





  protected readonly faArrowUp = faArrowUp;
  protected readonly faArrowDown = faArrowDown;
  protected readonly faHeart = faHeart;
  protected readonly fasHeart = fasHeart; // solid heart icon


  protected readonly faPhone = faPhone;
  protected readonly faFacebookF = faFacebookF;
  protected readonly faInstagram = faInstagram;
  protected readonly faX = faX;
  protected readonly faYoutube = faYoutube;
}
