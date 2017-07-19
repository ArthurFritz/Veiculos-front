import { Injectable } from '@angular/core';
import { Headers, RequestOptions, Http, Response, URLSearchParams } from '@angular/http';
import 'rxjs/Rx';
import {AppSettings} from '../../app.settings';
import {Observable} from 'rxjs';
import {HttpClient} from './HttpClient';
import { Router } from "@angular/router";

@Injectable()
export class UserService {
    
    constructor(private http: Http, private httpClient: HttpClient, private _router:Router) { }

    loginUser(user: any) {
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const body = new URLSearchParams();
    body.set('username', user.username);
    body.set('password', user.password);
    body.set('grant_type', 'password');
    let options = new RequestOptions({ headers: headers });
    return this.http.post(AppSettings.BASE_API+"/token",  body.toString() , options)
                    .toPromise()
                    .then((response: Response) => {
                        var data = response.json();
                        localStorage.setItem("token", data.access_token);
                        localStorage.setItem("name", data.userName);
                        this._router.navigate(["/dashboard"]);
                    })
                    .catch(error=>{
                        alert("Ocorreu um erro no login");
                        this._router.navigate(["/login"]);
                    });
    }

    createUser(user: any) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(AppSettings.BASE_API+"/api/Account/Register", user, options)
                    .toPromise()
                    .then((response: Response) => response.status);
    }
    
    getUser() {
    return this.httpClient.get(AppSettings.BASE_API+"/api/Account/UserInfo")
                    .toPromise()
                    .then((response: Response) => response.json())
                    .catch((error: Response) => Observable.throw(error.status));
    }

    alterarSenha(data) {
    return this.httpClient.post(AppSettings.BASE_API+"/api/Account/ChangePassword", data)
                    .toPromise()
                    .then((response: Response) => response.json());
    }

}