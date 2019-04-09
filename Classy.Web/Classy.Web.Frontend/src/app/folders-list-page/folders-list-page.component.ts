import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-folders-list-page',
  templateUrl: './folders-list-page.component.html',
  styleUrls: ['./folders-list-page.component.css']
})
export class FoldersListPageComponent implements OnInit {

  classFolders: string[] = ['cat', 'dog', 'river', 'house', 'apple'];

  constructor(private router: Router) { }

  ngOnInit() {
  }

  navigateToFolderContent(index: number) {
    localStorage.setItem('classIndex', index.toString());
    this.router.navigate(['/folder-contents']);
  }

}
