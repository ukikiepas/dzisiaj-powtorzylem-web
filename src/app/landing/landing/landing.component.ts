import { Component } from '@angular/core';
import {RoutePaths} from "../../models/route-paths.enum";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent {

  constructor(private router: Router) {}

  moveToHomepage() {
    this.router.navigate([RoutePaths.HOME])
  }

}
