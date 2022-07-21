import { TestBed } from '@angular/core/testing';

import { ClassificationRollupService } from './classification-rollup.service';

describe('ClassificationRollupService', () => {
  let service: ClassificationRollupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClassificationRollupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
