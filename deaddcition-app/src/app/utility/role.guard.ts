import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.isAuthorised(route);
  }

  constructor(private keyCloakService: KeycloakService){

  }

  private isAuthorised(route:ActivatedRouteSnapshot):boolean{
    let roles=[]
    roles=this.keyCloakService.getUserRoles();
    const expectedRoles=route.data['expectedRoles'];
    const roleMatches=roles.findIndex(role=>expectedRoles.indexOf(role) !==-1)
    return  roleMatches <0? false:true;
  }

  


  
}
