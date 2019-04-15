import { TestBed } from '@angular/core/testing';

import { FileRepository } from './file-repository';

describe('FileRepo', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FileRepository = TestBed.get(FileRepository);
    expect(service).toBeTruthy();
  });
});
