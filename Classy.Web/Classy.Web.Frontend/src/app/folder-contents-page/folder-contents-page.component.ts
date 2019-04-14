import { Component, OnInit, OnDestroy } from '@angular/core';
import { Globals } from '../globals';
import { Dictionary, DictionaryItem, JsonImage } from '../dictionary';
import { connect } from 'tls';

@Component({
  selector: 'app-folder-contents-page',
  templateUrl: './folder-contents-page.component.html',
  styleUrls: ['./folder-contents-page.component.css']
})
export class FolderContentsPageComponent implements OnInit, OnDestroy {

  className: string;
  dictionaryItem: DictionaryItem;

  constructor(private globals: Globals) { }

  ngOnInit() {
    this.className = localStorage.getItem('class');
   // return questions.filter(x => x.id === id);
    this.dictionaryItem = this.globals.imageDictionary.dict
    .find(x => x.imgClass === this.className);
  }

  ngOnDestroy() {
    localStorage.removeItem('class');
  }

}
