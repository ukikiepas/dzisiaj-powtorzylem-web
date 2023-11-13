import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {User} from "../../account/models/user.interface";
import {Role} from "../../models/role.enum";
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from "../services/authentication.service";
import {RoutePaths} from "../../models/route-paths.enum";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {


  registerForm: FormGroup =this.fb.group({
    firstname: ['', Validators.required],
    lastname: ['', Validators.required],
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    isPublicAccount: [false],
    city: '',
    bio: ''
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authenticationService: AuthenticationService)
  {
  }



  register() {
    if(this.registerForm.valid){
      const userToRegister: User = {
        firstname: this.registerForm.value.firstname,
        lastname: this.registerForm.value.lastname,
        username: this.registerForm.value.username,
        email: this.registerForm.value.email,
        password: this.registerForm.value.password,
        city: this.registerForm.value.city,
        bio: this.registerForm.value.bio,
        role: Role.USER,
        isPublicAccount: this.registerForm.value.isPublicAccount,
        image: ""
      };
      console.log(userToRegister);
      this.authenticationService.register(userToRegister).subscribe(
        data => {
          console.log("rejestracja z sukcesem", data)
          this.router.navigate([RoutePaths.HOME]);
        }, error => {
          console.log(error)
        }
      )
    }else {
      //TODO ogarnać jakąś bibliotekę do ładniejszych popupów
      alert("UZUPELNIJ WSZYSTKIE POLA")
      this.markAllAsTouched();
    }
  }

  goToLoginPage() {
    this.router.navigate([RoutePaths.LOGIN])
  }

  private markAllAsTouched() {
    Object.values(this.registerForm.controls).forEach(control => {
      control.markAsTouched();
    });
  }
}
