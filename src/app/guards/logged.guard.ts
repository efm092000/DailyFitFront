import { inject } from "@angular/core";
import { UserService } from "../services/user.service";
import { Router } from "@angular/router";

export const loggedGuard = (): boolean => {
  const userService = inject(UserService);
  const router = inject(Router);
  if (!userService.isLogged()) {
    router.navigate(['login'])
    return false
  }
  return true
}
