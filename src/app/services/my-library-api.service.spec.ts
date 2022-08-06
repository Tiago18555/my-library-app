import { TestBed } from '@angular/core/testing';

import { MyLibraryApiService } from './my-library-api.service';

describe('MyLibraryApiService', () => {
  let service: MyLibraryApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyLibraryApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
