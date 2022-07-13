import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { PatientService } from '../services/patient.service';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.css']
})
export class AddPatientComponent implements OnInit {


  @ViewChild('patientRegisterForm', { static: false })
  patientRegisterForm!: NgForm;

  constructor(private patientService:PatientService,private http:HttpClient,private router :Router) { }

  ngOnInit(): void {
  }

  onSubmit(data:any){
    this.patientService.registerPatient(data).subscribe((result)=>{})
    this.patientRegisterForm.reset()
    this.router.navigate(['patient-dashboard']);   
  }
}
