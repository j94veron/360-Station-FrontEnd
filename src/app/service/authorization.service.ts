import {Injectable} from '@angular/core';

import { StorageUtils } from "@utils/storage.utils";
import {Constants} from '@constants/constants';

@Injectable()
export class AuthorizationService {

  constructor() { }

  public isAuthorized(permission: string): boolean {
    const user = StorageUtils.getUser();
    if (Constants.ACCESS_GENERAL === permission) {
      return true;
    }

    if (!user) {
      return false;
    } 

    if (user.role === Constants.ROLE_ADMIN) {
      return true;
    }

    if (user.role === permission) {
      return true;
    }
    return false;
  }

  public isAuthenticate(): boolean {
    const user = StorageUtils.getUser();
    if (user) {
      return true;
    } 

    return false;
  }
}
