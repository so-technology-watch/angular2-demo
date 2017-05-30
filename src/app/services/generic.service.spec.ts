/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GenericService } from './generic.service';

describe('Service: Generic', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GenericService]
    });
  });

  it('should ...', inject([GenericService], (service: GenericService) => {
    expect(service).toBeTruthy();
  }));
});