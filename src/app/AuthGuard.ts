import { Injectable } from "@angular/core";
import { CanActivate, CanActivateFn, Router } from "@angular/router";
import { AuthService } from "./Services/auth.service";

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate{
  constructor ( private route: Router, private _authService: AuthService ) {}

  canActivate(): boolean {
    const userData = this._authService.getLoginData();
    const tokenExpiration = userData ? JSON.parse(userData).user.refreshTokenExpiryDate : null

    if (tokenExpiration && new Date(tokenExpiration) < new Date) {
      this._authService.logout();

      this.route.navigate(['/signin']);
      return false;
    }

    if (this._authService.getToken()) {
      return true;
    } else {
      this.route.navigate(['/signin'])
      return false;
    }
  }
}