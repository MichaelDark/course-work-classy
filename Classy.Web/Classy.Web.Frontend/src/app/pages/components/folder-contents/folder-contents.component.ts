import { Component } from '@angular/core';

@Component({
  selector: 'app-folder-contents',
  templateUrl: './folder-contents.component.html',
  styleUrls: ['./folder-contents.component.css']
})
export class FolderContentsComponent {

  className: string;

  ngOnInit() {
  //   this.className = localStorage.getItem('class');
  //   return questions.filter(x => x.id === id);
  //   this.dictionaryItem = this.globals.imageDictionary.dict
  //   .find(x => x.imgClass === this.className);
  }

  ngOnDestroy() {
    localStorage.removeItem('class');
  }

}
