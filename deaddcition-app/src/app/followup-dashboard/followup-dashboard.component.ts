import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { DatePipe } from '@angular/common';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Patient } from '../models/patient';
import { PatientService } from '../services/patient.service';

@Component({
  selector: 'app-followup-dashboard',
  templateUrl: './followup-dashboard.component.html',
  styleUrls: ['./followup-dashboard.component.css']
})
export class FollowupDashboardComponent implements OnInit {

  ELEMENT_DATA!: Patient[];
  columns: string[] = [ 'patientId', 'patientName', 'age','gender','mail','contactNumber','addictiontype','nextFollowup','followupInfo'];
  dataSource = new MatTableDataSource<Patient>(this.ELEMENT_DATA);

  @Output() infoTransfer: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.columns, event.previousIndex, event.currentIndex);
  } 
  
  constructor(private patientService:PatientService,private date:DatePipe) { }

  ngOnInit(): void {
  }
  public getAllPatients(){
    let patientsList=this.patientService.getAllPatients();
    patientsList.subscribe(report=>this.dataSource.data=report.reverse() as Patient[])
    this.dataSource
    console.log(patientsList);  
  }

  public getTodayFollowups(){
// let today=Date.now()
// const filterValue = this.date.transform((new Date),'yyyy-MM-dd') as string
const filterValue = '2022-07-25'


let patientsList=this.patientService.getPatientsByFollowup(filterValue);
patientsList.subscribe(report=>this.dataSource.data=report.reverse() as Patient[])
console.log(patientsList);

}

getTomorrowFollowups(){

  const today =  new Date();
  const tomorrow =  new Date(today.setDate(today.getDate() + 1)).toString();

  let patientsList=this.patientService.getPatientsByFollowup("2022-07-26");
  patientsList.subscribe(report=>this.dataSource.data=report.reverse() as Patient[])
  console.log(patientsList);
}
}