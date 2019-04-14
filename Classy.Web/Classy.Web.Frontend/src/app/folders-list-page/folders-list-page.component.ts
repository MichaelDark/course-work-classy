import { Component, OnInit, OnDestroy, AfterContentInit } from '@angular/core';
import { Router } from '@angular/router';
import {Globals} from '../globals';
import {Dictionary, DictionaryItem, imageJSON} from '../dictionary';

@Component({
  selector: 'app-folders-list-page',
  templateUrl: './folders-list-page.component.html',
  styleUrls: ['./folders-list-page.component.css']
})
export class FoldersListPageComponent implements OnInit {

  classFolders: Dictionary;

  constructor(private router: Router, private globals: Globals) { }

  ngOnInit() {
    this.classFolders = this.globals.imageDictionary;
  }

  navigateToFolderContent(index: number) {
    localStorage.setItem('classIndex', index.toString());
    this.router.navigate(['/folder-contents']);
  }

}
