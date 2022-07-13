import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPatientComponent } from './add-patient/add-patient.component';
import { FollowupDashboardComponent } from './followup-dashboard/followup-dashboard.component';
import { HomeComponentComponent } from './home-component/home-component.component';
import { PatientDashboardComponent } from './patient-dashboard/patient-dashboard.component';
import { PatientDetailsComponent } from './patient-details/patient-details.component';
import { AuthGuard } from './utility/auth.guard';
import { RoleGuard } from './utility/role.guard';

const routes: Routes = [
  // {
  //   path:'**',
  //   component:HomeComponentComponent
  // },
  {
    path:'',
    component:HomeComponentComponent,
    canActivate:[AuthGuard, RoleGuard],
    data:{
      expectedRoles:['doctor','registrationmember','followupmember']
    }
  },
  {
    path:'patient-dashboard',
    component:PatientDashboardComponent,
    canActivate:[AuthGuard ,RoleGuard] ,
    data:{
      expectedRoles:['doctor','registrationmember','followupmember']
    }
  },
  {
    path:'patient-details/:id',
    component:PatientDetailsComponent,
    canActivate:[AuthGuard ,RoleGuard],
    data:{
      expectedRoles:['doctor']
    }
  },
  {
    path:'register-patient',
    component:AddPatientComponent,
    canActivate:[AuthGuard ,RoleGuard],
    data:{
      expectedRoles:['registrationmember']
    }

  },
  {
    path:'followup-dashboard',
    component:FollowupDashboardComponent,
    canActivate:[AuthGuard ,RoleGuard],
    data:{
      expectedRoles:['followupmember']
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
