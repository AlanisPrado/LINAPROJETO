import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CasdastroLogin } from './casdastro-login';

describe('CasdastroLogin', () => {
  let component: CasdastroLogin;
  let fixture: ComponentFixture<CasdastroLogin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CasdastroLogin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CasdastroLogin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
