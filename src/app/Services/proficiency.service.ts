import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProficiencyService {

  constructor(private _http: HttpClient) { }

  getProficiency(): Observable<any>{
    return this._http.get('http://localhost:5115/api/proficiency')
  }
}
