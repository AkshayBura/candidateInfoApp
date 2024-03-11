import { HttpHeaders } from "@angular/common/http";
import { AuthService } from "./app/Services/auth.service";

export function createHeaders(authService: AuthService): HttpHeaders {
  return new HttpHeaders({
    'Authorization': `Bearer ${authService.getToken()}` 
  });
}