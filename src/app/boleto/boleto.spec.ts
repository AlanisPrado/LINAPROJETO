import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Boleto } from './boleto';

describe('Boleto', () => {
  let component: Boleto;
  let fixture: ComponentFixture<Boleto>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Boleto]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Boleto);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
