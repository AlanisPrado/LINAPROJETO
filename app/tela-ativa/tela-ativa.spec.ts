import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaAtiva } from './tela-ativa';

describe('TelaAtiva', () => {
  let component: TelaAtiva;
  let fixture: ComponentFixture<TelaAtiva>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TelaAtiva]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TelaAtiva);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
