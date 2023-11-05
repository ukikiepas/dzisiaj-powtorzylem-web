import { Component } from '@angular/core';
import {AuthenticationService} from "../../../../auth/services/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {


  constructor(
    private router: Router,
    private authenticationService: AuthenticationService) {
  }

  // logout() {
  //   this.router.navigate(['/login'])
  //   this.authenticationService.logout();
  // }

  logout() {
    this.authenticationService.logout().subscribe(
      () => {
        this.router.navigate(['/login']); //
      },
      error => {
        console.error("Błąd podczas wylogowywania:", error);
      }
    );
  }


}
