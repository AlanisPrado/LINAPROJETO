import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MeuCardapioComponent } from './meu-cardapio';
import { RouterTestingModule } from '@angular/router/testing';

describe('MeuCardapioComponent', () => {
  let component: MeuCardapioComponent;
  let fixture: ComponentFixture<MeuCardapioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MeuCardapioComponent],
      imports: [RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(MeuCardapioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve trocar o dia selecionado', () => {
    component.selecionarDia('Terça');
    expect(component.diaSelecionado).toBe('Terça');
  });
});
