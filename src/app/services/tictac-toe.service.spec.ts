import { TestBed } from '@angular/core/testing';

import { TictacToeService } from './tictac-toe.service';

describe('TictacToeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TictacToeService = TestBed.get(TictacToeService);
    expect(service).toBeTruthy();
  });
});
