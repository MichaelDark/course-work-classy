import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-folder-contents',
  templateUrl: './folder-contents.component.html',
  styleUrls: ['./folder-contents.component.css']
})
export class FolderContentsComponent {

  class: string;

  constructor(private route: ActivatedRoute) {
    this.class = route.snapshot.paramMap.get("class");
  }

}
