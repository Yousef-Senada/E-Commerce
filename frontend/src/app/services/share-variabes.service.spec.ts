import { TestBed } from '@angular/core/testing';

import { ShareVariabesService } from './share-variabes.service';

describe('ShareVariabesService', () => {
  let service: ShareVariabesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShareVariabesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
