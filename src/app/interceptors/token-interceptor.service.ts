import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent} from '@angular/common/http';
import {Observable, throwError, BehaviorSubject, EMPTY, catchError, switchMap, filter, take} from 'rxjs';
import {LoginService} from '@service/login.service';
import {RequestUtils} from '@utils/request.utils';
import {Constants} from '@constants/constants';

@Injectable()
export class TokenInterceptorService {

  private static readonly REFRESH_TOKEN = 'refresh_token';

  private refreshTokenInProgress = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor (private loginService: LoginService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError((err) => {
      if (!this.loginService.isAuthenticated()) {
        return EMPTY;
      }

      if (req.url.includes(Constants.ACCESS_TOKEN_PATH)) {
        if (String(req.body).includes(TokenInterceptorService.REFRESH_TOKEN)) {
          this.loginService.logout();
        }
        return throwError(err);
      }

      if (err.status !== 401) {
        return throwError(err);
      }

      if (this.refreshTokenInProgress) {
        return this.refreshTokenSubject.pipe(
           filter(result => result !== null),
           take(1),
           switchMap(() => next.handle(RequestUtils.clone(req)))
        );
      }

      this.refreshTokenInProgress = true;
      this.refreshTokenSubject.next(null);
      return this.loginService.refreshToken().pipe(
        switchMap((data) => {
          this.refreshTokenInProgress = false;
          this.refreshTokenSubject.next(data.token);
          return next.handle(RequestUtils.clone(req));
        }),
        catchError((error) => {
          this.refreshTokenInProgress = false;
          this.loginService.logout();
          error.status = 440;
          return throwError(error);
        })
      );
    }) as any);
  }
}
