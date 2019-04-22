import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Image } from '@classy/store/models';
import { Store, select } from '@ngrx/store';
import * as fromRoot from '@classy/store/reducers';
import { skip, take, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-folder-test',
  templateUrl: './folder-test.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./folder-test.component.scss'],
  styles: [`
    .dark-modal .modal-content {
      background-color: #292b2c;
      color: white;
    }
    .dark-modal .close {
      color: white;
    }
    .light-blue-backdrop {
      background-color: #5cb3fd;
    }
  `]
})
export class FolderTestComponent {
  images$ = this.store.pipe(select(fromRoot.getImagesState));

  min: number = 0;
  max: number = 25;
  Images: string[] = [];
  DisplayedImages: string[] = [];
  ImageFileNames: string[] = [];
  class: string = "test";
  closeResult: string;

  currentFolder$ = this.store.pipe(select(fromRoot.getCurrentFolder));
  currentFolder: null | string;

  constructor(
    private store: Store<fromRoot.State>,
    private modalService: NgbModal
  ) {
    let parent = this;
    this.images$.pipe().subscribe(images => {
      for (let img of images) {
        if (img.class == this.currentFolder) {
          if (!parent.ImageFileNames.includes(img.file.name)) {
            parent.ImageFileNames.push(img.file.name);
          }
          else {
            continue;
          }

          let reader = parent.startConvert(img);
          reader.addEventListener('loadend', () => {
            let result = reader.result.toString();
            parent.Images.push(result);
          });
        }
      }
    });

  }

  ngOnInit() {
    this.currentFolder$.subscribe(currentFolder => this.currentFolder = currentFolder);
    this.DisplayedImages = this.Images.slice(this.min, this.max);
  }

  openLg(content) {
    this.DisplayedImages = this.Images.slice(this.min, this.max);
    this.modalService.open(content, { size: 'lg' });
  }

  increment() {
    if (this.max < this.Images.length) {
      this.min += 5;
      this.max += 5;
    }
    this.DisplayedImages = this.Images.slice(this.min, this.max);
  }

  decrement() {
    if (this.min > 0) {
      this.min -= 5;
      this.max -= 5;
    }
    this.DisplayedImages = this.Images.slice(this.min, this.max);
  }

  public startConvert(image: Image) {
    let reader = new FileReader();
    reader.readAsDataURL(image.file);
    return reader;
  }

}
