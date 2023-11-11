import {Component, OnInit} from '@angular/core';
import {IrregularVerbDtoResponse, IrregularVerb} from "./models/irregular.interface";
import {IrregularService} from "./services/irregular.service";
import {FormBuilder, FormGroup} from "@angular/forms";


//TODO obsluzyc sytuacje gdzie z backendu przychodzi z dwiema opcjami dreamed/dreamt xD (albo nie i uczyc ze sa 2 opcje hehe)
//TODO dalekie todo ogarnac cos z generowaniem strony zeby nie dalo sie oszukiwac odswiezajac zakladke i szukac odpowiednich czasownikow
@Component({
  selector: 'app-irregular',
  templateUrl: './irregular.component.html',
  styleUrls: ['./irregular.component.css']
})
export class IrregularComponent {

  verbs: IrregularVerb[] = [];
  form: FormGroup = this.fb.group({
    selectedLevel: ['A2'],
    selectedCount: [20]
  });
  verbsGenerated = false;
  formSubmitted = false;


  constructor(
    private irregularService: IrregularService,
    private fb: FormBuilder
  ) {}

  fetchVerbs() {
    const { selectedLevel, selectedCount } = this.form.value;
    this.irregularService.getIrregulars(selectedCount, selectedLevel).subscribe(
      data => {
        this.formSubmitted = false;
        this.verbsGenerated = true;
        this.verbs = data;
        console.log(data);
      },
      error => {
        console.error('There was an error!', error);
      }
    );
  }

  validateVerbs() {
    this.formSubmitted = true;
    this.verbs.forEach(verb => {
      verb.isPastSimpleCorrect = verb.userPastSimple === verb.pastSimple;
      verb.isPastParticipleCorrect = verb.userPastParticiple === verb.pastParticiple;
      verb.isTranslationCorrect = verb.userTranslation === verb.translation;
    });
    this.sendUserAnswers();
  }

  resetState() {
    this.verbs = [];
    this.formSubmitted = false;
    this.verbsGenerated = false;
  }

  private sendUserAnswers(): void{
    const responseToSend: IrregularVerbDtoResponse[] = this.verbs.map(verb => ({
      baseForm: verb.baseForm,
      userPastSimple: verb.userPastSimple !== undefined ? verb.userPastSimple : '',
      userPastParticiple: verb.userPastParticiple !== undefined ? verb.userPastParticiple : '',
      userTranslation: verb.userTranslation !== undefined ? verb.userTranslation : '',
      isPastSimpleCorrect: verb.isPastSimpleCorrect,
      isPastParticipleCorrect: verb.isPastParticipleCorrect,
      isTranslationCorrect: verb.isTranslationCorrect
    }));
    console.log(this.verbs.at(0)?.userPastSimple);
    console.log(responseToSend)
    this.irregularService.sendResponse(responseToSend).subscribe();
  }

}
