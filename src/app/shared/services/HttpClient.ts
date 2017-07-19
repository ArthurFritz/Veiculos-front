import {Injectable} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class HttpClient {
  constructor(private http: Http) {}
  createAuthorizationHeader(headers: Headers) {
    headers.append('Content-Type', 'application/json'); 
    headers.append('Authorization', 'Bearer ' + localStorage.getItem("token")); 
  }

  get(url) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.get(url, {
      headers: headers
    });
  }
  
  post(url, data) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.post(url, data, {
      headers: headers
    });
  }

  put(url, data) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.put(url, data, {
      headers: headers
    });
  }

 delete(url) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.delete(url, {
      headers: headers
    });
  }

  uploadFile(url,data): Observable<Response>{
    let headers = new Headers();
    headers.append('Authorization', 'Bearer ' + localStorage.getItem("token")); 
    return this.http.post(url,data, {headers:headers});
  }

}
