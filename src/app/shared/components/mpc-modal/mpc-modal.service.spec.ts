
import { TestBed } from '@angular/core/testing';
import { MpcModalService } from './mpc-modal.service';

describe('MpcModalService', () => {
  let service: MpcModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MpcModalService]
    });
    service = TestBed.inject(MpcModalService);
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
