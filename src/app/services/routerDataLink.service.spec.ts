/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RouterDataLinkService } from './routerDataLink.service';

describe('Service: RouterDataLink', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RouterDataLinkService]
    });
  });

  it('should ...', inject([RouterDataLinkService], (service: RouterDataLinkService) => {
    expect(service).toBeTruthy();
  }));
});