import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginCadastro } from './login-cadastro';

describe('LoginCadastro', () => {
  let component: LoginCadastro;
  let fixture: ComponentFixture<LoginCadastro>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginCadastro]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginCadastro);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
