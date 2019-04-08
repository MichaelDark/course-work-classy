import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FolderContentsPageComponent } from './folder-contents-page.component';

describe('FolderContentsPageComponent', () => {
  let component: FolderContentsPageComponent;
  let fixture: ComponentFixture<FolderContentsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FolderContentsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FolderContentsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
