import {Component, OnInit} from '@angular/core';
import {HomepageService} from "../services/homepage.service";
import {VocabularyInterface} from "../models/vocabulary.interface";
import {ViewportScroller} from "@angular/common";
import {faArrowDown, faArrowUp, faPhone, faX} from "@fortawesome/free-solid-svg-icons";
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import {faFacebookF, faInstagram,faYoutube } from "@fortawesome/free-brands-svg-icons";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit{

  cards: VocabularyInterface[] = [];
  constructor(private homepageService: HomepageService, private viewportScroller: ViewportScroller) {}

  ngOnInit(): void {
    this.homepageService.getVocabulary().subscribe(data => {
      this.cards = data;
      console.log(data);
    });
  }

  scrollToSection(sectionId: string): void {
    this.viewportScroller.scrollToAnchor(sectionId);
  }


  protected readonly faArrowUp = faArrowUp;
  protected readonly faArrowDown = faArrowDown;
  protected readonly faHeart = faHeart;

  protected readonly faPhone = faPhone;
  protected readonly faFacebookF = faFacebookF;
  protected readonly faInstagram = faInstagram;
  protected readonly faX = faX;
  protected readonly faYoutube = faYoutube;
}
