import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GenericService} from '@service/generic.service';
import {Createuser} from '@models/createuser.model';
import {AppPathConstants} from '@constants/app.path.constants';
import {map} from 'lodash';

@Injectable()
export class CreateuserService extends GenericService<Createuser> {
  constructor(httpClient: HttpClient) {
    super(httpClient, AppPathConstants.CUSTOMER_PATH);
  }

  protected toArray(objects: any[]): Createuser[] {
    return map(objects, (object) => {
        return new Createuser(object);
      }); 
  }

  protected toEntity(object: any): Createuser {
    return new Createuser(object);
  }
}
