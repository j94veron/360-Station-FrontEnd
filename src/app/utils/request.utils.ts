import {HttpHeaders} from '@angular/common/http';
import {StorageUtils} from '@app/utils/storage.utils';
import {environment} from '@envs/environment';
import {HttpOptions} from '@service/api';
import {HttpRequest} from '@angular/common/http';

export class RequestUtils {

  private static readonly HEADER_AUTHORIZATION = 'Authorization';

  private constructor() {}

  public static getApiUrl(url: string): string {
    return environment.apiUrl + url;
  }


  public static getJsonOptions(refreshToken?: boolean, customHeaders?: any): HttpOptions {
    return RequestUtils.getOptions({
      ...customHeaders,
      'Content-Type': 'application/json',
    }, refreshToken);
  }

  public static geOctetStreamOptions(customHeaders?: any): HttpOptions {
    return RequestUtils.getOptions({
      ...customHeaders,
      'Content-Type': 'application/octet-stream',
    });
  }

  public static getOptions(customHeaders?: any, refreshToken?: any): HttpOptions {
    const headers: any = {...customHeaders};
    const user = StorageUtils.getUser();
    if (user) {
      if (user.token) {
        headers[RequestUtils.HEADER_AUTHORIZATION] = refreshToken ? user.refreshToken : user.token;
      }
    }
    return {headers: new HttpHeaders(headers)};
  }

  public static clone(request: HttpRequest<any>): any {
    const user = StorageUtils.getUser();
    if (!user.token) {
      return request;
    }
    return request.clone({
      setHeaders: {
        Authorization: user.token,
      },
    });
  }
}
