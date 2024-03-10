import { Injectable } from "@angular/core";
import { CanActivate, CanActivateFn, Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate{
  constructor ( private route: Router ) {}

  canActivate(): boolean {
    const userData = sessionStorage.getItem('LoginData')
    const tokenExpiration = userData ? JSON.parse(userData).user.refreshTokenExpiryDate : null

    if (tokenExpiration && new Date(tokenExpiration) < new Date) {
      sessionStorage.removeItem('LoginData');
      sessionStorage.removeItem('Authtoken');

      this.route.navigate(['/signin']);
      return false;
    }

    if (sessionStorage.getItem('Authtoken')) {
      return true;
    } else {
      this.route.navigate(['/signin'])
      return false;
    }
  }
}