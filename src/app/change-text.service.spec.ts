import { TestBed } from '@angular/core/testing';

import { ChangeTextService } from './change-text.service';

describe('ChangeTextService', () => {
  let service: ChangeTextService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChangeTextService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
