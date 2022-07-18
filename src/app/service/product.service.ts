import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {GenericService} from '@service/generic.service';
import {Product} from '@models/product.model';
import {AppPathConstants} from '@constants/app.path.constants';
import {map} from 'lodash';

@Injectable()
export class ProductService extends GenericService<Product> {
  
  constructor(httpClient: HttpClient) {
    super(httpClient, AppPathConstants.PRODUCT_PATH);
  }

  protected toArray(objects: any[]): Product[] {
    return map(objects, (object) => {
        return new Product(object);
      }); 
  }

  protected toEntity(object: any): Product {
    return new Product(object);
  }
}
