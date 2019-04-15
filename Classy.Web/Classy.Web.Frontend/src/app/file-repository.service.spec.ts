import { TestBed } from '@angular/core/testing';

import { FileRepository } from './file-repository.service';

describe('FileRepoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FileRepository = TestBed.get(FileRepository);
    expect(service).toBeTruthy();
  });
});
