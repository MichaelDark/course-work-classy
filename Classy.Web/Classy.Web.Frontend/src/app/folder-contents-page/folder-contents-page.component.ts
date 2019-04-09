import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-folder-contents-page',
  templateUrl: './folder-contents-page.component.html',
  styleUrls: ['./folder-contents-page.component.css']
})
export class FolderContentsPageComponent implements OnInit, OnDestroy {

  imageClassIndex: number;

  constructor() { }

  ngOnInit() {
    this.imageClassIndex = Number.parseInt(localStorage.getItem('classIndex'), 10);
  }

  ngOnDestroy() {
    localStorage.removeItem('classIndex');
  }

}
