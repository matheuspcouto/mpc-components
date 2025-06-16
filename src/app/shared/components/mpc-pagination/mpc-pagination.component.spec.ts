import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SimpleChange } from '@angular/core';
import { MpcPaginationComponent } from './mpc-pagination.component';

describe('MpcPaginationComponent', () => {
  let component: MpcPaginationComponent;
  let fixture: ComponentFixture<MpcPaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MpcPaginationComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(MpcPaginationComponent);
    component = fixture.componentInstance;
  });

  describe('Inicialização', () => {
    it('deve criar o componente', () => {
      expect(component).toBeTruthy();
    });

    it('deve inicializar com valores padrão', () => {
      expect(component.id).toBe('');
      expect(component.tabIndex).toBe(0);
      expect(component.ariaLabel).toBe('Navegação de páginas');
      expect(component.totalItens).toBe(0);
      expect(component.mostrarSeletorItensPorPagina).toBe(true);
      expect(component['itensPorPagina']).toBe(10);
      expect(component['paginaAtual']).toBe(1);
      expect(component['maxPaginasVisiveis']).toBe(5);
      expect(component['opcoesSeletorItensPorPagina']).toEqual([10, 25, 50, 100]);
    });

    it('deve emitir índices iniciais no ngOnInit', () => {
      const spy = jest.spyOn(component.indices, 'emit');
      component.totalItens = 50;

      component.ngOnInit();

      expect(spy).toHaveBeenCalledWith({
        indiceInicial: 0,
        indiceFinal: 10
      });
    });
  });

  describe('Cálculos de paginação', () => {
    beforeEach(() => {
      component.totalItens = 100;
      component['itensPorPagina'] = 10;
    });

    it('deve calcular total de páginas corretamente', () => {
      component.ngOnInit();
      expect(component['totalPaginas']).toBe(10);
    });

    it('deve calcular total de páginas com resto', () => {
      component.totalItens = 95;
      component.ngOnInit();
      expect(component['totalPaginas']).toBe(10);
    });

    it('deve ajustar página atual se for maior que total de páginas', () => {
      component.totalItens = 50;
      component['paginaAtual'] = 10;
      component.ngOnInit();
      expect(component['paginaAtual']).toBe(5);
    });

    it('deve ajustar página atual para 1 se for menor que 1', () => {
      component['paginaAtual'] = 0;
      component.ngOnInit();
      expect(component['paginaAtual']).toBe(1);
    });

    it('deve ajustar página atual para 1 quando totalPaginas for 0', () => {
      component.totalItens = 0;
      component['paginaAtual'] = 5;
      component.ngOnInit();
      expect(component['paginaAtual']).toBe(1);
    });

    it('deve calcular páginas visíveis para início da lista', () => {
      component['paginaAtual'] = 1;
      component.ngOnInit();

      expect(component['paginasVisiveis']).toEqual([1, 2, 3, 4, 5]);
      expect(component['mostrarPrimeirasReticencias']).toBe(false);
      expect(component['mostrarUltimasReticencias']).toBe(true);
    });

    it('deve calcular páginas visíveis para meio da lista', () => {
      component.totalItens = 200;
      component['paginaAtual'] = 10;
      component.ngOnInit();

      expect(component['paginasVisiveis']).toEqual([8, 9, 10, 11, 12]);
      expect(component['mostrarPrimeirasReticencias']).toBe(true);
      expect(component['mostrarUltimasReticencias']).toBe(true);
    });

    it('deve calcular páginas visíveis para final da lista', () => {
      component.totalItens = 200;
      component['paginaAtual'] = 20;
      component.ngOnInit();

      expect(component['paginasVisiveis']).toEqual([16, 17, 18, 19, 20]);
      expect(component['mostrarPrimeirasReticencias']).toBe(true);
      expect(component['mostrarUltimasReticencias']).toBe(false);
    });

    it('deve calcular informações de itens exibidos', () => {
      component['paginaAtual'] = 3;
      component.ngOnInit();

      expect(component['primeiroItem']).toBe(21);
      expect(component['ultimoItem']).toBe(30);
    });

    it('deve ajustar último item na última página', () => {
      component.totalItens = 95;
      component['paginaAtual'] = 10;
      component.ngOnInit();

      expect(component['primeiroItem']).toBe(91);
      expect(component['ultimoItem']).toBe(95);
    });

    it('deve chamar calcularPaginasVisiveis e calcularItensVisiveis', () => {
      const paginasVisiveisSpy = jest.spyOn(component as any, 'calcularPaginasVisiveis');
      const itensVisiveisSpy = jest.spyOn(component as any, 'calcularItensVisiveis');

      component.ngOnInit();

      expect(paginasVisiveisSpy).toHaveBeenCalled();
      expect(itensVisiveisSpy).toHaveBeenCalled();
    });
  });

  describe('Navegação', () => {
    beforeEach(() => {
      component.totalItens = 100;
      component.ngOnInit();
    });

    it('deve navegar para página anterior', () => {
      component['paginaAtual'] = 3;
      component.irParaPagina(2);
      expect(component['paginaAtual']).toBe(2);
    });

    it('deve ir para primeira página', () => {
      component['paginaAtual'] = 3;

      component.irParaPrimeiraPagina();

      expect(component['paginaAtual']).toBe(1);
    });

    it('deve ir para última página', () => {
      component['paginaAtual'] = 1;

      component.irParaUltimaPagina();

      expect(component['paginaAtual']).toBe(10);
    });

    it('não deve navegar se já estiver na mesma página', () => {
      const calcularSpy = jest.spyOn(component as any, 'calcularPaginacao');
      const emitirSpy = jest.spyOn(component as any, 'emitirIndices');
      component['paginaAtual'] = 3;

      component.irParaPagina(3);

      expect(component['paginaAtual']).toBe(3);
      expect(calcularSpy).not.toHaveBeenCalled();
      expect(emitirSpy).not.toHaveBeenCalled();
    });

    it('deve navegar para próxima página', () => {
      component['paginaAtual'] = 3;
      component.irParaProximaPagina();
      expect(component['paginaAtual']).toBe(4);
    });

    it('deve navegar para página anterior', () => {
      component['paginaAtual'] = 3;

      component.irParaPaginaAnterior();

      expect(component['paginaAtual']).toBe(2);
    });

    it('deve ir para página específica', () => {
      component.irParaPagina(7);
      expect(component['paginaAtual']).toBe(7);
    });
  });

  describe('Emissão de índices', () => {
    it('deve emitir índices corretos', () => {
      const spy = jest.spyOn(component.indices, 'emit');
      component.totalItens = 100;
      component['paginaAtual'] = 3;
      component['itensPorPagina'] = 10;

      component['emitirIndices']();

      expect(spy).toHaveBeenCalledWith({
        indiceInicial: 20,
        indiceFinal: 30
      });
    });

    it('deve emitir índices para primeira página', () => {
      const spy = jest.spyOn(component.indices, 'emit');
      component.totalItens = 100;
      component['paginaAtual'] = 1;
      component['itensPorPagina'] = 10;

      component['emitirIndices']();

      expect(spy).toHaveBeenCalledWith({
        indiceInicial: 0,
        indiceFinal: 10
      });
    });
  });

  describe('gets', () => {
    it('get temPaginaAnterior', () => {
      component['paginaAtual'] = 2;
      expect(component.temPaginaAnterior).toBe(true);
    });

    it('get temProximaPagina', () => {
      component['totalPaginas'] = 5;
      component['paginaAtual'] = 2;
      expect(component.temProximaPagina).toBe(true);
    });

    it('get ehPrimeiraPagina', () => {
      component['totalPaginas'] = 5;
      component['paginaAtual'] = 2;
      expect(component.ehPrimeiraPagina).toBeFalsy();
    });

    it('get ehUltimaPagina', () => {
      component['totalPaginas'] = 5;
      component['paginaAtual'] = 4;
      expect(component.ehUltimaPagina).toBeFalsy();
    });

  });

  describe('Outros', () => {
    it('deve lidar com totalItens igual a zero', () => {
      component.totalItens = 0;
      component.ngOnInit();

      expect(component['totalPaginas']).toBe(0);
      expect(component['primeiroItem']).toBe(0);
      expect(component['ultimoItem']).toBe(0);
    });

    it('deve lidar com totalItens menor que itensPorPagina', () => {
      component.totalItens = 5;
      component.ngOnInit();

      expect(component['totalPaginas']).toBe(1);
      expect(component['ultimoItem']).toBe(5);
    });

    it('aoMudarItensPorPagina', () => {
      component.totalItens = 100;
      const event = { target: { value: 20 } };
      component.aoMudarItensPorPagina(event);
      expect(component['itensPorPagina']).toBe(20);
      expect(component['totalPaginas']).toBe(5);
    });
  });


});
