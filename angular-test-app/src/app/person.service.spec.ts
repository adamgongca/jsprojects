import { TestBed } from '@angular/core/testing';

import { PersonService } from './person.service';

describe('PersonServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PersonService = TestBed.get(PersonService);
    expect(service).toBeTruthy();
  });
});