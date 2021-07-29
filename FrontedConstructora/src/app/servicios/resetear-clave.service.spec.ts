import { TestBed } from '@angular/core/testing';

import { ResetearClaveService } from './resetear-clave.service';

describe('ResetearClaveService', () => {
  let service: ResetearClaveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResetearClaveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
