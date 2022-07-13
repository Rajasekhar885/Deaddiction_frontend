import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { KeycloakProfile } from 'keycloak-js';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLoggedIn = true;
  public loggedIn: boolean = false;
  public userProfile: KeycloakProfile = {};
  userName: string | undefined;

  logout() {
    this.auth.logout();
  }

  constructor(private auth: AuthService) {}

  async ngOnInit(): Promise<void> {
    this.loggedIn = await this.auth.isLoggedIn();
    if (this.loggedIn) {
      this.userProfile = await this.auth.loadUserProfile();
      console.log(this.userProfile);
      // this.firstName = this.userProfile.firstName;
    } else {
      this.auth.login();
    }
  }

}
