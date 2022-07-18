import {HttpClient, HttpResponse, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {map, delay, catchError} from 'rxjs/operators';
import {RequestUtils} from '@app/utils/request.utils';
import {RequestBuilder} from '@app/utils/request.builder';
import {KeyValue} from '@service/api';

export abstract class GenericService <T> {

  constructor(
    protected httpClient: HttpClient,
    protected path: string) { }

  public findAll(): Observable<T[]> {
    const reqBuilder = new RequestBuilder(this.getEndpoint(`/${this.path}`), RequestUtils.getJsonOptions());
    return this.httpClient.get<T[]>(reqBuilder.toUriString(), reqBuilder.options).pipe(
      map((data: any) => this.toArray(data) as T[]),
      catchError(this.handleError),
      delay(600)
    );
  }

  public findOne(...params: any[]): Observable<T> {
    const reqBuilder = new RequestBuilder(this.getEndpoint(`/${this.path}`), RequestUtils.getJsonOptions());
    reqBuilder.setUriVariables(params);
    return this.httpClient.get<T>(reqBuilder.toUriString(), reqBuilder.options).pipe(
      map((data: any) => this.toEntity(data) as T),
      catchError(this.handleError),
      delay(600)
    );
  }

  public save(obj: T): Observable<any> {
    const reqBuilder = new RequestBuilder(this.getEndpoint(`/${this.path}`), RequestUtils.getJsonOptions());
    return this.httpClient.post<T>(reqBuilder.toUriString(), obj, reqBuilder.options).pipe(
      map((data: any) => this.toEntity(data) as T),
      catchError(this.handleError),
      delay(600)
    );
  }

  public update(obj: T): Observable<void> {
    const reqBuilder = new RequestBuilder(this.getEndpoint(`/${this.path}`), RequestUtils.getJsonOptions());
    return this.httpClient.put<T>(reqBuilder.toUriString(), obj, reqBuilder.options).pipe(
      map(() => null),
      catchError(this.handleError),
      delay(600)
    );
  }

  public delete(...params: any[]): Observable<void> {
    const reqBuilder = new RequestBuilder(this.getEndpoint(`/${this.path}`), RequestUtils.getJsonOptions());
    reqBuilder.setUriVariables(params);
    return this.httpClient.delete<void>(reqBuilder.toUriString(), reqBuilder.options).pipe(
      map(() => null),
      catchError(this.handleError),
      delay(600)
    );
  }

  public upload(params: KeyValue, obj: any): Observable<void> {
    const reqBuilder = new RequestBuilder(this.getEndpoint(`/${this.path}/upload`), RequestUtils.getOptions());
    reqBuilder.setQueryParams(params);
    return this.httpClient.post<any>(reqBuilder.toUriString(), obj, reqBuilder.options).pipe(
      map(() => null),
      delay(600)
    );
  }

  public download(params: KeyValue): Observable<Blob> {
    const reqBuilder = new RequestBuilder(this.getEndpoint(`/${this.path}/download`), RequestUtils.geOctetStreamOptions());
    reqBuilder.setQueryParams(params);
    const httpOptions  = reqBuilder.options;
    return this.httpClient.get(reqBuilder.toUriString(), {headers: httpOptions.headers, responseType: 'blob', params: httpOptions.params}).pipe(
      map((data: any) => {
        return new Blob([data], {type: 'application/pdf'});
      }),
      catchError(this.handleError),
      delay(600)
    );
  }

  protected getEndpoint(path: string): string {
    return RequestUtils.getApiUrl(path);
  }

  protected handleError(error: HttpErrorResponse): Observable<any> {
    console.error(error);
    return throwError(() => new Error(error.message));
  }

  protected abstract toEntity(obj: any): T;

  protected abstract toArray(obj: any[]): T[];
  
}