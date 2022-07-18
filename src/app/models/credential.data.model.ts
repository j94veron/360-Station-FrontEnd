import {HttpParams} from '@angular/common/http';

import {KeyValue} from '@service/api';

export class CredentialData {

  public username: string;
  public password: string;

  constructor(data?: any) {
    if (data) {
      this.username = data.username;
      this.password = data.password;
    }
  }
}