import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FolderTestComponent } from './folder-test.component';

describe('FolderTestComponent', () => {
  let component: FolderTestComponent;
  let fixture: ComponentFixture<FolderTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FolderTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FolderTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
