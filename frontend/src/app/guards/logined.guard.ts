import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const loginedGuard: CanActivateFn = (route, state) => {
  const _authS = inject(AuthService);
  const _router = inject(Router);
  if (_authS.isAuthenticated()) {
    _router.navigate(['/home']);
    return false;
  } else {
    return true;
  }
};
