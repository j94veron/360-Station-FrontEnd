import {HttpHeaders, HttpParams} from '@angular/common/http';

export interface HttpOptions {
  headers?: HttpHeaders;
  params?: HttpParams;
  observe?: 'body';
}

export interface KeyValue {
  [index: string]: any;
}
