import { Component, OnInit } from '@angular/core';
import { Image } from '@classy/store/models';

@Component({
  selector: 'app-folder-test',
  templateUrl: './folder-test.component.html',
  styleUrls: ['./folder-test.component.scss']
})
export class FolderTestComponent implements OnInit {

  Images: Image[] = [];
  class: string = "test";
  constructor() { }

  ngOnInit() {
  
  }

}
