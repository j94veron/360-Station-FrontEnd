import {HttpParams} from '@angular/common/http';
import {KeyValue, HttpOptions} from '@service/api';

export class RequestBuilder {

  public url: string;

  public uriVariables: string;

  public options: HttpOptions;

  public httpParams: HttpParams;

  constructor(url: string, options: HttpOptions) {
    this.url = url;
    this.options = options;
  }

  public setQueryParams(params: KeyValue): RequestBuilder {
    this.httpParams = new HttpParams();
    Object.keys(params).forEach((key) => {
      this.httpParams = this.httpParams.set(key, params[key]);
    });
    this.options.params = this.httpParams;

    return this;
  }

  public setUriVariables(variables: any[]): RequestBuilder {
    this.uriVariables = '';
    variables.forEach((variable) => {
      this.uriVariables += `/${variable}`;
    });

    return this;
  }

  private buildUri(): string {
    return this.url += this.uriVariables;
  }

  public toUriString(): string {
    return this.uriVariables && this.uriVariables !== '' ? this.buildUri() : this.url;
  }
}
