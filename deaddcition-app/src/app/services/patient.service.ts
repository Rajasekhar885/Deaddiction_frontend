import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Patient } from '../models/patient';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private baseurl:string="http://localhost:8080/patient-api/patients"
  constructor(private _http:HttpClient) { }

  // getAllPatients=():Observable<Patient[]>=>{
  //   return this.http.get<Patient[]>(
  //     this.baseurl+'/patient-api/patients'
  //   )
  // }

  getAllPatients(){
    return this._http.get<Patient[]>(this.baseurl);
  }
}
