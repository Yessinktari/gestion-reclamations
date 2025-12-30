import { TestBed } from '@angular/core/testing';

import { RevendeurService } from './revendeur.service';

describe('RevendeurService', () => {
  let service: RevendeurService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RevendeurService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
