
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
        expect(component.dia).toBe('');
        expect(component.mes).toBe('');
    });
});
