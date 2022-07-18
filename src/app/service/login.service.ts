import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError, of} from 'rxjs';
import {map, delay, catchError} from 'rxjs/operators';
import {Router} from '@angular/router';

import {StorageUtils} from '@utils/storage.utils';
import {RequestUtils} from '@utils/request.utils';
import {RequestBuilder} from '@utils/request.builder';
import {CredentialData} from '@models/credential.data.model';
import {User} from '@models/user.model';
import {Constants} from '@constants/constants';

@Injectable()
export class LoginService {

  constructor(
    private httpClient: HttpClient,
    private router: Router) { }

  public login(cred: CredentialData): Observable<User> {
    const reqBuilder = new RequestBuilder(this.getEndpoint(`/${Constants.LOGIN_PATH}`), RequestUtils.getJsonOptions());
    return this.httpClient.post<User>(reqBuilder.toUriString(), cred, reqBuilder.options).pipe(
      map((data: any) => {
        return StorageUtils.setUser(data);
      }), 
      catchError(this.handleError),
      delay(600)
     );
  }

  public refreshToken(): Observable<User> {
    const reqBuilder = new RequestBuilder(this.getEndpoint(`/${Constants.REFRESH_TOKEN_PATH}`), RequestUtils.getJsonOptions());
    return this.httpClient.get<User>(reqBuilder.toUriString(), reqBuilder.options).pipe(
      map((data: any) => {
        return StorageUtils.setUser(data);
      }),
      catchError(this.handleError),
      delay(600)
     );
  }

  public logout(): void {
    StorageUtils.removeUser();
  //  this.router.navigate(['/']);
  }

 public onHome(): void{
    this.router.navigate(['/']);
 }

  public getEndpoint(path: string): string {
    return RequestUtils.getApiUrl(path);
  }

  public getUser(): User {
    return StorageUtils.getUser();
  }

  public isAuthenticated(): boolean {
    const user = StorageUtils.getUser();
    if (!user) {
      return false;
    }
    return true;
  }


  public handleError(err: HttpErrorResponse): Observable<any> {
    console.error(err);
    return throwError(()=> new Error(err.message))
  }
}
