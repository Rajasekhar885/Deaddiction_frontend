import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPatientComponent } from './add-patient/add-patient.component';
import { HomeComponentComponent } from './home-component/home-component.component';
import { PatientDashboardComponent } from './patient-dashboard/patient-dashboard.component';
import { PatientDetailsComponent } from './patient-details/patient-details.component';

const routes: Routes = [
  // {
  //   path:'**',
  //   component:HomeComponentComponent
  // },
  {
    path:'',
    component:HomeComponentComponent
  },
  {
    path:'patient-dashboard',
    component:PatientDashboardComponent
  },
  {
    path:'patient-details/:id',
    component:PatientDetailsComponent
  },
  {
    path:'register-patient',
    component:AddPatientComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
