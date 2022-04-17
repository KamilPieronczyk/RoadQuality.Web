import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient,
  ) { }

  get(url: string, options = {}): Observable<any> {
    return this.http.get(`${environment.api}/${url}`, options).pipe(share());
  }

  post(url: string, payload: any, options = {}): Observable<any> {
    return this.http.post(`${environment.api}/${url}`, payload, options).pipe(share());
  }

  put(url: string, payload: any): Observable<any> {
    return this.http.put(`${environment.api}/${url}`, payload).pipe(share());
  }

  delete(url: string): Observable<any> {
    return this.http.delete(`${environment.api}/${url}`).pipe(share());
  }
}
