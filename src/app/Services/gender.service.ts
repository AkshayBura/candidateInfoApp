import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Gender } from '../form.model';
import { AuthService } from './auth.service';
import { createHeaders } from '../../header-utils';

@Injectable({
  providedIn: 'root'
})
export class GenderService {

  constructor(private _http: HttpClient, private _authService: AuthService) { }

  getGenders(): Observable<any>{
    const headers = createHeaders(this._authService);
    const options = { headers: headers}
    return this._http.get('http://localhost:5115/api/gender', options);
  }
}
