import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import * as fromRoot from '@classy/store/reducers';
import { Image } from '@classy/store/models';
import { map, debounceTime, distinctUntilChanged, distinct, switchMap } from 'rxjs/operators';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ImageActions } from '@classy/store/actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-folder-contents',
  templateUrl: './folder-contents.component.html',
  styleUrls: ['./folder-contents.component.css']
})
export class FolderContentsComponent {
  closeResult: string;
  class: string;
  currentImage: Image;
  newClassModel: string;

  images$ = this.store.pipe(select(fromRoot.getImagesState));
  classes$: Observable<string[]>
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
    });

    this.classes$ = this.images$.pipe(map(images => images.map(x => x.class)
      .filter((val, idx, arr) => arr.indexOf(val) === idx))); // === distinct
  }

  openModal(content, image: Image) {
    this.currentImage = image;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
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
      return `with: ${reason}`;
    }
  }

  save() {
    let newClass = this.newClassModel;
    this.store.dispatch(ImageActions.reclassify({ fileName: this.currentImage.file.name, newClass }));
    // this.currentImage.class = newClass;
    // this.ngOnInit();
  }

  public search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      switchMap(term => term.length < 2 ? []
        : this.classes$.pipe(map(classes => classes.filter(
          val => (val.toLowerCase().indexOf(term.toLowerCase()) > -1)
        ).slice(0, 10)))));
}
