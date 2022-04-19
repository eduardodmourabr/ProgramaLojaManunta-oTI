import { TestBed } from '@angular/core/testing';

import { FuncionarioHttpService } from './funcionario-http.service';

describe('FuncionarioHttpService', () => {
  let service: FuncionarioHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FuncionarioHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
