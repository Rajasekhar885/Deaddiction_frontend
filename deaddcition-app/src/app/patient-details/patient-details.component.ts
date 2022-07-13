import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientService } from '../services/patient.service';

@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.css']
})
export class PatientDetailsComponent implements OnInit {

  patientId!:number
  patient:any
  // myDatePicker:any
  myTimePicker:any

  constructor(private patientService:PatientService, private activatedRoute:ActivatedRoute,private http:HttpClient,private date:DatePipe ,private router:Router) { }

  ngOnInit(): void {
  this.activatedRoute.paramMap.subscribe(map=>{
    let id= map.get("id");
      console.log(id);
      if(id) 
        this.patientId=parseInt(id);
      this.patientService.getPatientById(this.patientId).subscribe(data=>this.patient=data)
  })
  }

  onSubmit(data:any){
    data.checkOut=this.date.transform((new Date),'yyyy-MM-dd h:mm:ss')

    let date1: Date = new Date();
    date1.setDate(date1.getDate() + 15);
    console.log(date1,'shortDate');
    let latest_date =this.date.transform(date1, 'yyyy-MM-dd');
    data.nextFollowup=latest_date;
    

    console.warn(data);
     this.http.put('http://localhost:8080/patient-api/update/patient',data)
    .subscribe((result)=>{
      console.log("result",result);
      
    })
    this.router.navigate(['patient-dashboard']);         
  }

  
}
