import {AuthService} from "./auth.service";
import {inject} from "@angular/core";
import {Router} from "@angular/router";

export const authGuard = ()=> {

  const authService = inject(AuthService);
  const router = inject(Router);
  const isAuthenticated = authService.getIsAuth();

  if(!isAuthenticated){
    router.navigate(['/']);
  }
  return isAuthenticated;
}
