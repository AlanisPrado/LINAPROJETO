import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaAssinaturaComponent } from './tela-assinatura';

describe('TelaAssinatura', () => {
  let component: TelaAssinaturaComponent;
  let fixture: ComponentFixture<TelaAssinaturaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TelaAssinaturaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TelaAssinaturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
