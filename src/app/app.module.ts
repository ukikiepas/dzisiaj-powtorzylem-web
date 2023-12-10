import localePl from '@angular/common/locales/pl';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { RegisterComponent } from './auth/register/register.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NavbarComponent } from './utlis/navbar/navbar.component';
import { FooterComponent } from './utlis/footer/footer.component'
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { HomeComponent } from './homepage/home/home.component';
import { IrregularComponent } from './irregular/irregular.component';
import {JwtInterceptor} from "./auth/services/jwt-interceptor.service";
import { AccountComponent } from './account/account.component';
import { ReadingComponent } from './reading/reading.component';
import { ReadingSelectionComponent } from './reading/reading-selection/reading-selection.component';
import { FilterByLevelPipe } from './reading/reading-selection/filters/filter-by-level.pipe';
import {CommentsModule} from "./utlis/comments/comments.module";
import {registerLocaleData} from "@angular/common";
import {LOCALE_ID, NgModule} from "@angular/core";
import {LandingComponent} from "./landing/landing/landing.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent},
  { path: 'landing', component: LandingComponent},
  { path: 'home', component: HomeComponent},
  { path: 'irregular', component: IrregularComponent},
  { path: 'account', component: AccountComponent},
  { path: 'reading', component: ReadingSelectionComponent},
  { path: `reading/:readingId`, component: ReadingComponent}
];

registerLocaleData(localePl);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    LandingComponent,
    IrregularComponent,
    AccountComponent,
    ReadingComponent,
    ReadingSelectionComponent,
    FilterByLevelPipe,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    FontAwesomeModule,
    HttpClientModule,
    ReactiveFormsModule,
    CommentsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled', // lub 'top'
      anchorScrolling: 'enabled',
      // ... inne opcje
    }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: LOCALE_ID, useValue: 'pl' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
