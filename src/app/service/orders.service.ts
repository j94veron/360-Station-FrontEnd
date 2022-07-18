import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs'; 


import {GenericService} from '@service/generic.service';
import {AppPathConstants} from '@constants/app.path.constants';
import {Orders} from '@app/models/orders.model';
import {map, delay, catchError} from 'rxjs/operators';
import {RequestUtils} from '@app/utils/request.utils';
import {RequestBuilder} from '@app/utils/request.builder';
import {map as map_lodash} from 'lodash';




@Injectable()
export class OrdersService extends GenericService<Orders> {
  
  constructor(httpClient: HttpClient) {
    super(httpClient, AppPathConstants.ORDERS_PATH);
  }

  public findByUsername(username: string): Observable<Orders[]> {
    const reqBuilder = new RequestBuilder(this.getEndpoint(`/${this.path}/findByUsername`), RequestUtils.getJsonOptions());
    reqBuilder.setUriVariables([username]);
    return this.httpClient.get<Orders[]>(reqBuilder.toUriString(), reqBuilder.options).pipe(
      map((data: any) => this.toArray(data) as Orders[]),
      catchError(this.handleError),
      delay(600)
    );
  }

  protected toArray(objects: any[]): Orders[] {
    return map_lodash(objects, (object) => {
        return new Orders(object);
      }); 
  }

  protected toEntity(object: any): Orders {
    return new Orders(object);
  }
}