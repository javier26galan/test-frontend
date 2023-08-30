import { CanActivateFn } from '@angular/router';
import { AuthService } from './auth.service';
import {  inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  let isAuthenticated = false;

  const auth = inject(AuthService);
  console.log(auth.getAuthStatus().pipe());


  return auth.getAuthStatus().pipe();
};
