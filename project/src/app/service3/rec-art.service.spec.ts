import { TestBed } from '@angular/core/testing';

import { RecArtService } from './rec-art.service';

describe('RecArtService', () => {
  let service: RecArtService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecArtService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
