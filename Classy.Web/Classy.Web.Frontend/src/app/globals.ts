import { Injectable } from '@angular/core';
import { Dictionary, DictionaryItem } from './dictionary';

@Injectable()
export class Globals {
  imageDictionary: Dictionary = new Dictionary();
  isUploading: boolean = true;
  isFoldersShowing: boolean = false;
  isContentShowing: boolean = false;
}
