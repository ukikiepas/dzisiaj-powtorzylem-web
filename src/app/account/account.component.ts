import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AccountService} from "./services/account.service";
import {UserDto} from "./models/user.interface";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ChangePasswordRequest} from "./models/password.interface";
import {Router} from "@angular/router";
import {take} from "rxjs";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  userData!: UserDto;
  base64Image: string = '';
  isImageChosen: boolean = false;
  protected readonly document = document;
  profileImageUrl!: string;
  @ViewChild('fileInput') fileInputRef!: ElementRef<HTMLInputElement>;


  submittedPassword = false;
  changePasswordSuccess = false;

  submittedAccount = false;
  changeAccountSuccess = false;


  constructor(
    private accountService: AccountService,
    private fb: FormBuilder) {}

  changePasswordForm: FormGroup = this.fb.group({
    oldPassword: ['', Validators.required],
    newPassword: ['', [Validators.required, Validators.minLength(8)]],
    newPasswordRepeat: ['', Validators.required]
  },{ validator: this.checkPasswords })

  editAccountForm:FormGroup = this.fb.group({
    firstname: ['', Validators.required],
    lastname: ['', Validators.required],
    city: [''],
    bio: [''],
    isPublicAccount: [false],
    parentEmail: [''],
    isParentNotified: [false]
  });

  //OBSŁUGA KONTA (STRONA GŁÓWNA)
  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    this.accountService.getUserData().subscribe(
      data =>{
        this.userData = data;
        if (data.image != null) {
          this.profileImageUrl = data.image;
        }
        this.editAccountForm.patchValue({
          firstname: this.userData.firstname,
          lastname: this.userData.lastname,
          city: this.userData.city,
          bio: this.userData.bio,
          isPublicAccount: this.userData.isPublicAccount,
          parentEmail: this.userData.parentEmail,
          isParentNotified: this.userData.isParentNotified,

        });

      },
      error => {
        console.error('Wystąpił błąd podczas ładowania profilu użytkownika', error);
      }
    );
  }

  //OBSŁUGA PROFILOWEGO
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      const file = input.files[0];

      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        // Zakodowany obraz w formacie Base64
        this.base64Image = e.target?.result as string;

        // Przypisz zakodowany obraz do zmiennej, aby wyświetlić go na stronie
        this.profileImageUrl = this.base64Image;
        this.isImageChosen = true;
      };
      reader.readAsDataURL(file);
    }
  }

  saveNewImage() {
    this.accountService.uploadFile(this.base64Image).pipe(
      take(1) // Bierze tylko jedno zdarzenie z Observable i automatycznie kończy subskrypcję
    ).subscribe(
      () => {
        // Tylko jeśli serwis zwróci sukces
        this.isImageChosen = false;
        // Możesz tutaj również zaktualizować `profileImageUrl`, jeśli serwer zwraca nowy URL obrazu
        this.profileImageUrl = this.base64Image; // lub zaktualizowany URL z odpowiedzi serwera
        this.userData.image = this.base64Image; // lub zaktualizowany URL z odpowiedzi serwera
        this.cleanInput(); // Załóżmy, że ta funkcja jest już poprawnie zaimplementowana
      },
      error => {
        // Obsłuż błędy, np. wyświetlając komunikat użytkownikowi
        console.error('Wystąpił błąd podczas ładowania obrazu', error);
      }
    );
  }


  discardNewImage() {
    if (this.userData.image != null) {
      this.profileImageUrl = this.userData.image;
    }
    this.isImageChosen = false;
    this.cleanInput();
  }

  private cleanInput() {
    const inputElement = this.fileInputRef.nativeElement;
    inputElement.value = '';
  }


  //ZMIANA HASŁA
  changePassword():void{
    this.submittedPassword = true;
    if(this.changePasswordForm.valid){
      if(this.changePasswordForm.value.newPassword === this.changePasswordForm.value.newPasswordRepeat){
        const changePasswordRequest:ChangePasswordRequest = {
          currentPassword: this.changePasswordForm.value.oldPassword,
          newPassword: this.changePasswordForm.value.newPassword,
          confirmationPassword: this.changePasswordForm.value.newPasswordRepeat
        }
        this.accountService.changePassword(changePasswordRequest).subscribe({
          next: () => {
            this.changePasswordSuccess = true;
          },
          error: err => {
            // ...
          }
        });
        this.submittedPassword = false;
      }
    }
  }

  private checkPasswords(group: FormGroup) {
    const pass = group.get('newPassword')?.value;
    const confirmPass = group.get('newPasswordRepeat')?.value;
    return pass === confirmPass ? null : { notSame: true };
  }

  closeModalPassword() {
    this.changePasswordSuccess = false;
    this.submittedPassword = false;
  }

  //OBSŁUGA ZMIANY KONTA
  changeAccountDetails():void {
    this.submittedAccount = true;
    if(this.editAccountForm.valid){
      const updatedUserDto:UserDto = {
        firstname: this.editAccountForm.value.firstname,
        lastname: this.editAccountForm.value.lastname,
        username: '',
        city: this.editAccountForm.value.lastname,
        bio: this.editAccountForm.value.lastname,
        isPublicAccount: this.editAccountForm.value.isPublicAccount,
        parentEmail: this.editAccountForm.value.parentEmail,
        isParentNotified: this.editAccountForm.value.isParentNotified,
      }
      this.accountService.changeUserDetails(updatedUserDto).subscribe({
        next: () => {
          this.changeAccountSuccess = true;
          this.userData.firstname = updatedUserDto.firstname;
          this.userData.lastname = updatedUserDto.lastname;
          this.userData.city = updatedUserDto.city;
          this.userData.bio = updatedUserDto.bio;
          this.userData.isPublicAccount = updatedUserDto.isPublicAccount;
          this.userData.parentEmail = updatedUserDto.parentEmail;
          this.userData.isParentNotified = updatedUserDto.isParentNotified;
        },
        error: err => {

        }
      });
    }
  }

  closeModalAccount(){
    this.changePasswordSuccess = false;
    this.submittedPassword = false;
  }
}
