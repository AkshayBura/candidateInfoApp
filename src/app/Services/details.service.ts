import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AddCandidateInfoModel, GetPersonalInfoDto } from '../form.model';
import { AuthService } from './auth.service';
import { createHeaders } from '../../header-utils';

@Injectable({
  providedIn: 'root'
})
export class DetailsService {

  private apiUrl = 'http://localhost:5115/api/';

  constructor(private _http: HttpClient, private _authService: AuthService) { }

  getInfo(): Observable <any>{
    const headers = createHeaders(this._authService);
    const options = { headers: headers}
    return this._http.get(`${this.apiUrl}candidateinfo`, options)
  }

  getInfoById(id: string): Observable <any>{
    const headers = createHeaders(this._authService);
    const options = { headers: headers}
    return this._http.get(`${this.apiUrl}candidateinfo/${id}`, options)
  }

  getPersonalInfo(): Observable<any>{
    const headers = createHeaders(this._authService);
    const options = { headers: headers}
    return this._http.get(`${this.apiUrl}personalinfo`, options)
  }

  deleteInfo(id: string, name: string): Observable<any>{
    const headers = createHeaders(this._authService);
    const options = { headers: headers}
    return this._http.delete(`${this.apiUrl}${name}/${id}`, options)
  }

  addInfo(info: AddCandidateInfoModel): Observable<any>{
    const headers = createHeaders(this._authService);
    const options = { headers: headers}
    return this._http.post(`${this.apiUrl}candidateinfo`, info, options)
  }

  updateInfo(id: string, info: AddCandidateInfoModel): Observable<any> {
    const headers = createHeaders(this._authService);
    const options = { headers: headers}
    return this._http.put(`${this.apiUrl}candidateInfo/${id}`, info, options)
  }

}
