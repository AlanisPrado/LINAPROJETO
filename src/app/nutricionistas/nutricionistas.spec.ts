import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Nutricionistas } from './nutricionistas';

describe('Nutricionistas', () => {
  let component: Nutricionistas;
  let fixture: ComponentFixture<Nutricionistas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Nutricionistas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Nutricionistas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
