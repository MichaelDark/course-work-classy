import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { map, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { ImageActions } from '@classy/store/actions';
import * as fromRoot from '@classy/store/reducers';
import { Image } from '@classy/store/models';

@Component({
  selector: 'app-folder-contents',
  templateUrl: './folder-contents.component.html',
  styleUrls: ['./folder-contents.component.css']
})
export class FolderContentsComponent {
  
  currentFolder: string;
  selectedImage: Image;
  klass: string;

  images$ = this.store.pipe(select(fromRoot.getImagesState));
  classes$: Observable<string[]>
  images: Image[] = [];

  modalRef: NgbModalRef;

  constructor(
    private route: ActivatedRoute,
    private store: Store<fromRoot.State>,
    private modalService: NgbModal
  ) {
    this.route.paramMap.subscribe(params => {
      this.currentFolder = params.get("class");
    });
  }

  ngOnInit() {
    this.images$.pipe(
      map(images =>
        images.filter(i => i.class == this.currentFolder)
      )
    ).subscribe(images => this.images = images);

    this.classes$ = this.images$.pipe(
      map(images => 
        images.map(x => x.class).filter(
          (val, idx, arr) => arr.indexOf(val) === idx
        )
      )
    ); // === distinct
  }

  openModal(content, image: Image) {
    this.selectedImage = image;
    this.modalRef = this.modalService.open(content);
  }

  save() {
    this.modalRef.close();
    this.store.dispatch(ImageActions.reclassify({
      fileName: this.selectedImage.file.name,
      newClass: this.klass
    }));
  }

  deleteImage() {
    if (confirm("Are you sure you want to delete this image's classification?")) {
      this.store.dispatch(ImageActions.deleteImage({ fileName: this.selectedImage.file.name }));
    }
  }

  public search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      switchMap(term => term.length < 2
        ? []
        : this.classes$.pipe(
          map(classes =>
            classes.filter(
              val => (val.toLowerCase().indexOf(term.toLowerCase()) > -1)
            ).slice(0, 10))
          )
      )
    );
}
