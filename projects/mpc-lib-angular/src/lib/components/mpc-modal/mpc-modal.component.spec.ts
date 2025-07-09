import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MpcModalComponent, MpcModalConfig, TipoModal } from './mpc-modal.component';
import { ToastrService } from 'ngx-toastr';

describe('MpcModalComponent', () => {
  let component: MpcModalComponent;
  let fixture: ComponentFixture<MpcModalComponent>;
  let mockToastrService: jest.Mocked<ToastrService>;

  const mockModalComImagemConfig: MpcModalConfig = {
    titulo: 'Título do Modal',
    texto: 'Texto do Modal',
    imagem: 'imagem.png',
    tipoModal: TipoModal.SUCESSO,
    botao: () => { },
    textoBotao: 'Botão',
    segundoBotao: () => { },
    textoSegundoBotao: 'Segundo Botão'
  }

  const mockModalSemImagemConfig: MpcModalConfig = {
    titulo: 'Título do Modal',
    texto: 'Texto do Modal',
    tipoModal: TipoModal.SUCESSO,
    textoBotao: 'Botão',
    segundoBotao: () => { },
    textoSegundoBotao: 'Segundo Botão'
  }

  beforeEach(async () => {
    const toastrServiceMock = {
      success: jest.fn(),
      error: jest.fn(),
      warning: jest.fn(),
      info: jest.fn()
    } as any;

    await TestBed.configureTestingModule({
      imports: [MpcModalComponent],
      providers: [
        { provide: ToastrService, useValue: toastrServiceMock }
      ]
    })
      .compileComponents();

    mockToastrService = TestBed.inject(ToastrService) as jest.Mocked<ToastrService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MpcModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve exibir o modal com imagem', () => {
    component.abrirModal(mockModalComImagemConfig);
    expect(component['exibirModal']).toBe(true);
  });

  it('deve exibir o modal sem imagem', () => {
    component.abrirModal(mockModalSemImagemConfig);
    expect(component['exibirModal']).toBe(true);
  });

  it('deve emitir evento ao fechar o modal', () => {
    component.fecharModal();
    expect(component['exibirModal']).toBe(false);
  });

  it('deve copiar o código para a área de transferência', () => {
    component['modal'] = {
      texto: 'Código Copiado'
    } as any;

    const writeTextMock = jest.fn();
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: writeTextMock },
      writable: true
    });

    component.copiarCodigo();
    expect(component['isCopiado']).toBe(true);
  });
});
