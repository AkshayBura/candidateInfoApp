import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Gender } from '../form.model';

@Injectable({
  providedIn: 'root'
})
export class GenderService {

  constructor(private _http: HttpClient) { }

  getGenders(): Observable<any>{
    return this._http.get('http://localhost:5115/api/gender');
  }
}
