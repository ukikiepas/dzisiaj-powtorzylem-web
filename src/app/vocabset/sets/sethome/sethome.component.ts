import { Component } from '@angular/core';
import {faPlusCircle} from "@fortawesome/free-solid-svg-icons/faPlusCircle";
import {faArrowDown, faFolderOpen} from "@fortawesome/free-solid-svg-icons";
import {faSearch} from "@fortawesome/free-solid-svg-icons/faSearch";

@Component({
  selector: 'app-vocabset',
  templateUrl: './sethome.component.html',
  styleUrls: ['./sethome.component.css']
})

export class SethomeComponent {


  protected readonly faPlus = faPlusCircle;
  protected readonly faSearch = faSearch;
  protected readonly faFolderOpen = faFolderOpen;
}
