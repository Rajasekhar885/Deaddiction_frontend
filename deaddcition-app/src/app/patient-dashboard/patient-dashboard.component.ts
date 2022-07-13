import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Output, EventEmitter, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Patient } from '../models/patient';
import { PatientService } from '../services/patient.service';


@Component({
  selector: 'app-patient-dashboard',
  templateUrl: './patient-dashboard.component.html',
  styleUrls: ['./patient-dashboard.component.css']
})
export class PatientDashboardComponent implements OnInit {

  
  ELEMENT_DATA!: Patient[];
  columns: string[] = [ 'patientId', 'patientName', 'age','gender','mail','contactNumber','addictiontype','checkIn','checkOut','medication','sessionDescription','nextFollowup','followupInfo'];
  dataSource = new MatTableDataSource<Patient>(this.ELEMENT_DATA);

  @Output() infoTransfer: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  today: object = new Date();

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.columns, event.previousIndex, event.currentIndex);
  } 

  constructor(private patientService:PatientService, private router:Router,private date:DatePipe,private http:HttpClient) {  
    
  }

  ngOnInit(): void {
    this.getAllPatients()
    this.columns.push('Actions');
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public getAllPatients(){
    let patientsList=this.patientService.getAllPatients();
    patientsList.subscribe(report=>this.dataSource.data=report.reverse() as Patient[])
    this.dataSource
    console.log(patientsList);
    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  
  
  patientInfo=(info:any,event:any)=>{

    info.checkIn=this.date.transform((new Date),'yyyy-MM-dd h:mm:ss')
      console.log("one",info);
      this.http.put('http://localhost:8080/patient-api/update/patient',info )
    .subscribe((result)=>{
      console.log("result",result);
    })
      this.patientService.sendData(info)
    this.router.navigate(['patient-details', info.patientId]);   
  }

}
 

