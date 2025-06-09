
import { TestBed } from '@angular/core/testing';
import { MpcComprovanteService } from './mpc-comprovante.service';

describe('MpcComprovanteService', () => {
  let service: MpcComprovanteService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MpcComprovanteService]
    });
    service = TestBed.inject(MpcComprovanteService);
  });

  it('deve ser criado', () => {
    expect(service).toBeTruthy();
  });

  it('show', () => {
    service.show();
  });

  it('hide', () => {
    service.hide();
  });

});
