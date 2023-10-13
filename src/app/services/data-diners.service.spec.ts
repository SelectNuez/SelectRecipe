import { TestBed } from '@angular/core/testing';

import { DataDinersService } from './data-diners.service';

describe('DataDinersService', () => {
  let service: DataDinersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataDinersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
