import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor(private patientService:PatientService, private activatedRoute:ActivatedRoute) { }

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
    console.warn(data);
    
  }

  
}
