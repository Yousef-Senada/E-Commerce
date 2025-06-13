import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { myAccountResolver } from './my-account.resolver';

describe('myAccountResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => myAccountResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
