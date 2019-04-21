import { Component, OnInit } from '@angular/core';
import { Image } from '@classy/store/models';

@Component({
  selector: 'app-folder-test',
  templateUrl: './folder-test.component.html',
  styleUrls: ['./folder-test.component.scss']
})
export class FolderTestComponent implements OnInit {
  min: number = 0;
  max: number = 25;
  Images: string[] = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
  DisplayedImages: string[] = this.Images.slice(this.min, this.max);
  class: string = "test";
  constructor() { }

  ngOnInit() {

  }

  increment(){
    if (this.max < this.Images.length){
      this.min +=5;
      this.max +=5;
    }
    this.DisplayedImages = this.Images.slice(this.min, this.max);
  }

  decrement(){
    if (this.min >0){
      this.min -=5;
      this.max -=5;
    }
    this.DisplayedImages = this.Images.slice(this.min, this.max);
  }

}
