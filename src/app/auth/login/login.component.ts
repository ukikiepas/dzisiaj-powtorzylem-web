import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../services/authentication.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { Modal } from 'bootstrap';
import {RoutePaths} from "../../models/route-paths.enum";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup =this.fb.group({
    username: ['', Validators.required],
    password: ['', [Validators.required]]
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authenticationService: AuthenticationService) {

  }

  login() {
    if(this.loginForm.valid){
      const authRequest = {
        username: this.loginForm.value.username,
        password: this.loginForm.value.password
      };
      this.authenticationService.login(authRequest).subscribe(
        response => {
          this.router.navigate([RoutePaths.LANDING])
        },
        error => {
          this.showModalOnLoginError();
          this.loginForm.get('password')?.reset();
        })
    }else {
      this.loginForm.markAllAsTouched();
    }
  }

  moveToRegister() {
    this.router.navigate([RoutePaths.REGISTER])
  }

  private showModalOnLoginError(){
    const element = document.getElementById('loginErrorModal');
    if (element instanceof Element) {
      let loginErrorModal = new Modal(element);
      loginErrorModal.show();
    }
}
}
