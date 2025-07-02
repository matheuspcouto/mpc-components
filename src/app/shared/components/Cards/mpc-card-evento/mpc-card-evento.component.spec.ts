
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MpcCardEventoComponent } from './mpc-card-evento.component';

describe('MpcCardEventoComponent', () => {
    let component: MpcCardEventoComponent;
    let fixture: ComponentFixture<MpcCardEventoComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                MpcCardEventoComponent
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(MpcCardEventoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('deve criar o componente', () => {
        expect(component).toBeTruthy();
    });

    it('deve ter valores padrão', () => {
        expect(component.id).toBe('');
        expect(component.tabIndex).toBe(0);
        expect(component.ariaLabel).toBe('');
        expect(component.titulo).toBe('');
        expect(component.subtitulo).toBe('');
        expect(component.dia).toBe('');
        expect(component.mes).toBe('');
        expect(component.descricao).toBe(undefined);
    });
});
