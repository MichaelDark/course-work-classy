import { Component, OnInit } from '@angular/core';
import { Image } from '@classy/store/models';
import { Store, select } from '@ngrx/store';
import * as fromRoot from '@classy/store/reducers';
import { skip, take, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-folder-test',
  templateUrl: './folder-test.component.html',
  styleUrls: ['./folder-test.component.scss']
})
export class FolderTestComponent {
  images$ = this.store.pipe(select(fromRoot.getImagesState));

  min: number = 0;
  max: number = 25;
  Images: string[] = [];
  ImageFileNames: string[] = [];
  class: string = "test";
  closeResult: string;

  constructor(
    private store: Store<fromRoot.State>,
    private modalService: NgbModal
  ) {
    let parent = this;
    this.images$.pipe(skip(this.min), take(25)).subscribe(images => {
      for (let img of images) {
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
    });
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  increment() {
    if (this.min < this.Images.length) {
      this.min += 5;
    }
  }

  decrement() {
    if (this.min > 0) {
      this.min -= 5;
    }
  }

  public startConvert(image: Image) {
    let reader = new FileReader();
    reader.readAsDataURL(image.file);
    return reader;
  }

}
