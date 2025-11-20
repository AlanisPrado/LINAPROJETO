import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardapioSemanalComponent } from './cardapio-semanal';

describe('CardapioSemanalComponent', () => {
  let component: CardapioSemanalComponent;
  let fixture: ComponentFixture<CardapioSemanalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardapioSemanalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardapioSemanalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
