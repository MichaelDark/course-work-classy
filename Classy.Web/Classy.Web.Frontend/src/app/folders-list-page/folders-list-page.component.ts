import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-folders-list-page',
  templateUrl: './folders-list-page.component.html',
  styleUrls: ['./folders-list-page.component.css']
})
export class FoldersListPageComponent implements OnInit {

  classFolders: string[] = ['cat', 'dog', 'river', 'house', 'apple'];

  constructor() { }

  ngOnInit() {

  }

}
