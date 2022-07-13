import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponentComponent } from './home-component/home-component.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MaterialModule } from './material/material.module';
import { PatientDashboardComponent } from './patient-dashboard/patient-dashboard.component';
import { AddPatientComponent } from './add-patient/add-patient.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PatientDetailsComponent } from './patient-details/patient-details.component';
import { DatePipe } from '@angular/common';
import { FollowupDashboardComponent } from './followup-dashboard/followup-dashboard.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './services/auth.service';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakAngularModule } from 'keycloak-angular';
import { initializeKeycloak } from './utility/app.init';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponentComponent,
    PatientDashboardComponent,
    AddPatientComponent,
    PatientDetailsComponent,
    FollowupDashboardComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MaterialModule,
    HttpClientModule,
    AppRoutingModule,
    KeycloakAngularModule


  ],
  providers: [
    DatePipe,
    {
    provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
