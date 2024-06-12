import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {faMinusCircle} from "@fortawesome/free-solid-svg-icons";
import {faPlusCircle} from "@fortawesome/free-solid-svg-icons/faPlusCircle";
import {SetsService} from "../../services/sets.service";
import {CreateVocabularySetDto} from "./models/createset.interface";
import {VocabularySet} from "../../models/sets.interface";
import {EditSetService} from "../../../shared/services/reading-set.service";
import {CATEGORIES} from "../../../utlis/dictionaries/categories.constant";
import {Router} from "@angular/router";

@Component({
  selector: 'app-createset',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgForOf,
    FontAwesomeModule,
    NgIf,
  ],
  templateUrl: './createset.component.html',
  styleUrls: ['./createset.component.css']
})
export class CreatesetComponent implements OnInit{
  createSetForm!: FormGroup;
  isOptionalFieldsVisible = false;
  editingSet: VocabularySet | null = null;
  categories = CATEGORIES;

  @ViewChild('scrollTarget') scrollTarget!: ElementRef;

  constructor(private formBuilder: FormBuilder,
              private setsService: SetsService,
              private editSetService: EditSetService,
              private router: Router) {}

  ngOnInit(): void {
    this.createSetForm = this.formBuilder.group({
      id: [''],
      title: ['', Validators.required],
      description: [''],
      category: [''],
      isPublic: [false],
      newVocabularies: this.formBuilder.array([this.createVocabulary()])
    });

    this.editSetService.currentEditSet.subscribe(set => {
      if (set) {
        this.editingSet = set;
        this.fillFormWithSetData(set);
      }
    });
  }

  createVocabulary(): FormGroup {
    return this.formBuilder.group({
      wordId: [],
      word: ['', Validators.required],
      translation: ['', Validators.required],
      definition: [''],
      imageLocation: ['']
    });
  }

  vocabularies(): FormArray {
    return this.createSetForm.get('newVocabularies') as FormArray;
  }

  addVocabulary(): void {
    this.vocabularies().push(this.createVocabulary());
    setTimeout(() => this.scrollToBottom(), 100);
  }

  removeVocabulary(index: number): void {
    this.vocabularies().removeAt(index);
  }


  onSubmit(): void {
    if (this.createSetForm.valid) {
      const formValue = this.createSetForm.value;

      const createdSet: CreateVocabularySetDto = {
        id: formValue.id,
        title: formValue.title,
        description: formValue.description,
        category: formValue.category,
        isPublic: formValue.isPublic,
        vocabularyDtos: formValue.newVocabularies.map((vocabulary: any) => ({
          wordId: vocabulary.wordId,
          word: vocabulary.word,
          translation: vocabulary.translation,
          definition: vocabulary.definition,
          imageLocation: vocabulary.imageLocation
        }))
      };

      if (this.editingSet) {
        this.setsService.updateSet(createdSet).subscribe(
          response => {
            this.router.navigate(['/vocabulary-set/sets', this.editingSet?.id]);
          },
          error => {
            console.error("Error updating set", error);
          }
        );
      } else {
        this.setsService.createSet(createdSet).subscribe(
          response => {
            this.router.navigate(['/vocabulary-set/sets', response.data]);
          },
          error => {
            console.error("Error creating set", error);
          }
        );
      }
      } else {
        console.error("Form is invalid");
      }
  }

  toggleOptionalFields(): void {
    this.isOptionalFieldsVisible = !this.isOptionalFieldsVisible;
    const optionalFields = document.getElementById('optionalFields');
    if (optionalFields) {
      if (this.isOptionalFieldsVisible) {
        optionalFields.classList.add('show');
      } else {
        optionalFields.classList.remove('show');
      }
    }
  }

  handleFileInput(event: Event, index: number): void {
    const element = event.target as HTMLInputElement;
    const file = element.files ? element.files[0] : null;

    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const base64 = e.target.result as string;
        // Przypisz wartość base64 do odpowiedniego pola w formularzu
        const vocabulariesArray = this.vocabularies();
        if (index < vocabulariesArray.length) {
          const vocabularyGroup = vocabulariesArray.at(index) as FormGroup;
          vocabularyGroup.controls['imageLocation'].setValue(base64);
        }
      };
      reader.readAsDataURL(file);
    }
  }

  private scrollToBottom(): void {
    if (this.scrollTarget && this.scrollTarget.nativeElement) {
      this.scrollTarget.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }
  }

  private fillFormWithSetData(set: VocabularySet): void {
    this.createSetForm.patchValue({
      id: set.id,
      title: set.title,
      description: set.description,
      category: set.category,
      isPublic: set.isPublic,
      newVocabularies: [] // Usunięto inicjalizację pustą tablicą
    });

    const vocabulariesArray = this.vocabularies();
    vocabulariesArray.clear(); // Wyczyść obecną listę słówek

    // Dodaj słówka z zestawu do formularza
    set.vocabularyDtos.forEach(vocab => {
      vocabulariesArray.push(this.formBuilder.group({
        wordId: vocab.wordId,
        word: vocab.word,
        translation: vocab.translation,
        definition: vocab.definition,
        imageLocation: vocab.imageLocation
      }));
    });

    if (!set.id) {
      vocabulariesArray.push(this.createVocabulary());
    }
  }




  protected readonly faMinusCircle = faMinusCircle;
  protected readonly faPlusCircle = faPlusCircle;
}
