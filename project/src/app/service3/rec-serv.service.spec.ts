import { TestBed } from '@angular/core/testing';

import { RecServService } from './rec-serv.service';

describe('RecServService', () => {
  let service: RecServService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecServService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
