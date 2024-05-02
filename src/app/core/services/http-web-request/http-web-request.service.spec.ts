import { TestBed } from '@angular/core/testing';

import { HttpWebRequestService } from './http-web-request.service';

describe('HttpWebRequestService', () => {
  let service: HttpWebRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpWebRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
