import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  let __Router = inject(Router);

  if (sessionStorage.getItem('token')) {
    return true;
  } else {
    __Router.navigate(['/auth/login']);
    return false;
  }
};
