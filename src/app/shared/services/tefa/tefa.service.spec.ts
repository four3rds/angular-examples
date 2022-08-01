import { TestBed } from '@angular/core/testing';

import { TefaService } from './tefa.service';

describe('TefaService', () => {
  let service: TefaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TefaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
