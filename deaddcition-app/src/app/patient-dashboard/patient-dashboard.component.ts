import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Patient } from '../models/patient';
import { PatientService } from '../services/patient.service';


@Component({
  selector: 'app-patient-dashboard',
  templateUrl: './patient-dashboard.component.html',
  styleUrls: ['./patient-dashboard.component.css']
})
export class PatientDashboardComponent implements OnInit {

  
  ELEMENT_DATA!: Patient[];
  columns: string[] = [ 'uniqueId', 'patientName', 'age','gender','mail','contactNumber','addictiontype','checkIn','checkOut','medication','sessionDescription','nextFollowup','followupInfo'];
  dataSource = new MatTableDataSource<Patient>(this.ELEMENT_DATA);

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.columns, event.previousIndex, event.currentIndex);
  } 

  constructor(private patientService:PatientService) {  
    
  }

  ngOnInit(): void {
    this.getAllPatients()
  }

  public getAllPatients(){
    let patientsList=this.patientService.getAllPatients();
    patientsList.subscribe(report=>this.dataSource.data=report as Patient[])
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
 
