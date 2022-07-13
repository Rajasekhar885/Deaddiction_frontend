import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { Patient } from '../models/patient';
import { PatientService } from '../services/patient.service';

@Component({
  selector: 'app-home-component',
  templateUrl: './home-component.component.html',
  styleUrls: ['./home-component.component.css']
})
export class HomeComponentComponent implements OnInit {

  PatientData!:Patient[];
  user=''

  constructor(private patientService:PatientService, private keyCloakService:KeycloakService) { }

  ngOnInit(): void {
    this.initializeUserOptions()
  }

  testApi(){
    this.patientService.getAllPatients().subscribe({
      next:(data)=>{
   this.PatientData=data
      }
    })
  }

  private initializeUserOptions():void{
this.user=this.keyCloakService.getUsername();
  }
  logout():void{
    this.keyCloakService.logout()
  }
}
