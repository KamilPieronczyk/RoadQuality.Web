import {
  HttpErrorResponse,
  HttpEvent, HttpHandler, HttpInterceptor, HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpError } from 'src/app/shared/interfaces/http-error';
import { AuthService } from '../services/auth.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((resp: any) => {
        if (resp instanceof HttpErrorResponse) {
          switch (resp.status) {
            case HttpError.InternalServerError:
            case HttpError.GatewayTimeout:
            case HttpError.BadRequest:
            case HttpError.ErrorUnknown:
            case HttpError.NotAllowed:
              this.router.navigate(['error'], { state: { force: true } });
              break;
            case HttpError.Forbidden:
              this.router.navigate(['404'], { state: { force: true } });
              break;
            case HttpError.Unauthorized:
              this.authService.logout();
              this.router.navigate(['/'], { state: { force: true } });
              break;
          }
        }
        return throwError(resp);
      })
    );
  }
}
