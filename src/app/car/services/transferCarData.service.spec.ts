/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TransferCarDataService } from './transferCarData.service';

describe('Service: TransferCarData', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TransferCarDataService]
    });
  });

  it('should ...', inject([TransferCarDataService], (service: TransferCarDataService) => {
    expect(service).toBeTruthy();
  }));
});