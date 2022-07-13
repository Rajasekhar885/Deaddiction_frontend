import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Patient } from '../models/patient';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  info:any

  private baseurl:string="http://localhost:8080/patient-api/patient"
  constructor(private _http:HttpClient) { }

  // getAllPatients=():Observable<Patient[]>=>{
  //   return this.http.get<Patient[]>(
  //     this.baseurl+'/patient-api/patients'
  //   )
  // }

  getAllPatients(){
    return this._http.get<Patient[]>(this.baseurl+'s');
  }

  registerPatient(data:any){
    return this._http.post(this.baseurl,data)
  }

  getPatientsByFollowup(followupDate:string){
    return this._http.get<Patient[]>(this.baseurl+'s/followup/'+followupDate)
  }

  getPatientById(patientId:any){
    return this._http.get<Patient>(`${this.baseurl}/id/${patientId}`)
  }

  sendData(requestinfo: any) {
    this.info=requestinfo
    }
    sendDatum():Observable<any>{
      return new Observable(observer =>{
        observer.next(this.info)
    })
  }

   

}
