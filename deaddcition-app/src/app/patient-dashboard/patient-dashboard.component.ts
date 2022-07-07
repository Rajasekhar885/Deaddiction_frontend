import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
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

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.columns, event.previousIndex, event.currentIndex);
  } 

  constructor(private patientService:PatientService, private router:Router) {  
    
  }

  ngOnInit(): void {
    this.getAllPatients()
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
      console.log(info);
      // this.infoTransfer.emit(info)

      this.patientService.sendData(info)
    this.router.navigate(['patient-details', info.patientId]);   
  }

}
 

