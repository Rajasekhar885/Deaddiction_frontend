import { Component, OnInit } from '@angular/core';
import { Patient } from '../models/patient';
import { PatientService } from '../services/patient.service';

@Component({
  selector: 'app-home-component',
  templateUrl: './home-component.component.html',
  styleUrls: ['./home-component.component.css']
})
export class HomeComponentComponent implements OnInit {

  PatientData!:Patient[];


  constructor(private patientService:PatientService) { }

  ngOnInit(): void {

  }

  testApi(){
    this.patientService.getAllPatients().subscribe({
      next:(data)=>{
   this.PatientData=data
      }
    })
  }
}
