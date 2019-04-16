import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoldersListPageComponent } from './folders-list-page.component';

describe('FoldersListPageComponent', () => {
  let component: FoldersListPageComponent;
  let fixture: ComponentFixture<FoldersListPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoldersListPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoldersListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
