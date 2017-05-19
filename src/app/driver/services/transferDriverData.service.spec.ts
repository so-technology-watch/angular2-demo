/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TransferDriverDataService } from './transferDriverData.service';

describe('Service: TransferDriverData', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TransferDriverDataService]
    });
  });

  it('should ...', inject([TransferDriverDataService], (service: TransferDriverDataService) => {
    expect(service).toBeTruthy();
  }));
});