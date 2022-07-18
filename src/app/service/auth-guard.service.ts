import {Injectable} from '@angular/core';
import {CanActivate, Router, ActivatedRouteSnapshot} from '@angular/router';

import {AuthorizationService} from '@service/authorization.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(
    private router: Router,
    private authorizationService: AuthorizationService) { }

  public canActivate(route: ActivatedRouteSnapshot): boolean {
    const permission = route.data.permission;
    if (this.authorizationService.isAuthorized(permission)) {
      return true;
    }
    this.router.navigate(['pages/login']);
    return false;
  }
}
