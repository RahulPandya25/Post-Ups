import { TestBed } from '@angular/core/testing';

import { UploadPostService } from './upload-post.service';

describe('UploadPostService', () => {
  let service: UploadPostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UploadPostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
