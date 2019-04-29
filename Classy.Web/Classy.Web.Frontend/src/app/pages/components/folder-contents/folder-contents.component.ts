import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import * as fromRoot from '@classy/store/reducers';
import { Image } from '@classy/store/models';
import { map } from 'rxjs/operators';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ImageActions } from '@classy/store/actions';

@Component({
  selector: 'app-folder-contents',
  templateUrl: './folder-contents.component.html',
  styleUrls: ['./folder-contents.component.css']
})
export class FolderContentsComponent {
  closeResult: string;
  class: string;
  currentImage: Image;

  images$ = this.store.pipe(select(fromRoot.getImagesState));
  images: Image[] = [];

  constructor(
    private route: ActivatedRoute,
    private store: Store<fromRoot.State>,
    private modalService: NgbModal
  ) {
    this.route.paramMap.subscribe(params => {
      this.class = params.get("class");
    });
  }

  ngOnInit() {
    this.images$.pipe(
      map(images => images.filter(i => i.class == this.class))
    ).subscribe(images => {
      this.images = images;
    })
  }

  openModal(content, image: Image){
    this.currentImage = image;
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

  save() {
    let newClass = document.getElementById('myInput').innerText;
    this.store.dispatch(ImageActions.reclassify({ fileName: this.currentImage.file.name, newClass }));
    // this.currentImage.class = newClass;
    // this.ngOnInit();
  }

}
