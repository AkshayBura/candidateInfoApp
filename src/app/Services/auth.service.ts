import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private tokenKey = 'Authtoken'; 
  private loginData = "LoginData";

  constructor() { }

  saveToken(token: string): void {
    sessionStorage.setItem(this.tokenKey, token);
  }

  saveLoginData( Data : any){
    sessionStorage.setItem(this.loginData,JSON.stringify( Data));
  }

  getLoginData(): any{
    return sessionStorage.getItem(this.loginData)
  }

  getToken(): string | null {
    return sessionStorage.getItem(this.tokenKey);
  }

  logout(): void {
    sessionStorage.removeItem(this.tokenKey);
    sessionStorage.removeItem(this.loginData)
  }

}
