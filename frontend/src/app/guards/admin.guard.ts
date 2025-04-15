import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const adminGuard: CanActivateFn = (route, state) => {
  const _authS = inject(AuthService);
  const _router = inject(Router);

  if (_authS.isAuthenticated() && _authS.isAdmin()) {
    return true;
  } else if (_authS.isAuthenticated()) {
    _router.navigate(['/my-account']);
    return false;
  } else {
    _router.navigate(['/login']);
    return false;
  }
};
