import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SignUp } from '../form.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:5115/api/user'
  constructor(private _http: HttpClient) { }

  getUsers(): Observable<any>{
    return this._http.get(this.apiUrl)
  }

  createUser(user: SignUp): Observable<any> {
    return this._http.post(this.apiUrl, user)
  }
}
