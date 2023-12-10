import {Component, OnInit} from '@angular/core';
import { Router, NavigationEnd, Event } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./utlis/comments/app.component.css']
})

  export class AppComponent implements OnInit {
  title = 'dzisiaj-powtorzylem-web';
  showNavAndFooter = true;

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.pipe(
      filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      if (event.url === '/login' || event.url === '/register' || event.url ==='/landing' )  {
        this.showNavAndFooter = false;
      } else {
        this.showNavAndFooter = true;
      }
    });
  }
}

