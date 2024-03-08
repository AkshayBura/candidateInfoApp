import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AddCandidateInfoModel, GetPersonalInfoDto } from '../form.model';

@Injectable({
  providedIn: 'root'
})
export class DetailsService {

  private apiUrl = 'http://localhost:5115/api/';
  constructor(private _http: HttpClient) { }

  getInfo(): Observable <any>{
    return this._http.get(`${this.apiUrl}candidateinfo`)
  }

  getInfoById(id: string): Observable <any>{
    return this._http.get(`${this.apiUrl}candidateinfo/${id}`)
  }

  getPersonalInfo(): Observable<any>{
    return this._http.get(`${this.apiUrl}personalinfo`)
  }

  deleteInfo(id: string, name: string): Observable<any>{
    return this._http.delete(`${this.apiUrl}${name}/${id}`)
  }

  addInfo(info: AddCandidateInfoModel): Observable<any>{
    return this._http.post(`${this.apiUrl}candidateinfo`, info)
  }

  updateInfo(id: string, info: AddCandidateInfoModel): Observable<any> {
    return this._http.put(`${this.apiUrl}candidateInfo/${id}`, info)
  }

}
