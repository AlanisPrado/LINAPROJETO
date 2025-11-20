import { TestBed } from '@angular/core/testing';

import { CardapioService } from '../services/cardapio';

describe('Cardapio', () => {
  let service: CardapioService ;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CardapioService );
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
