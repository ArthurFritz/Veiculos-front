import { Injectable } from '@angular/core';
import { Headers, RequestOptions, Http, Response, URLSearchParams } from '@angular/http';
import 'rxjs/Rx';
import {AppSettings} from '../../app.settings';
import {Observable} from 'rxjs';
import {HttpClient} from './HttpClient';
import { Router } from "@angular/router";

@Injectable()
export class PeopleService {
    
    constructor(private httpClient: HttpClient) { }

    getListPeoples() {
        return this.httpClient.get(AppSettings.BASE_API+"/odata/Pessoa")
                              .toPromise()
                              .then((response: Response) => response.json());
    }

    getPeople(id) {
        return this.httpClient.get(AppSettings.BASE_API+"/odata/Pessoa("+id+")")
                              .toPromise()
                              .then((response: Response) => response.json());
    }


    removePeople(id) {
        return this.httpClient.delete(AppSettings.BASE_API+"/odata/Pessoa("+id+")")
                              .toPromise()
                              .then((response: Response) => response.status);
    }

    editPeople(id, data) {
        return this.httpClient.put(AppSettings.BASE_API+"/odata/Pessoa("+id+")", data)
                              .toPromise()
                              .then((response: Response) => response.status);
    }

    newPeople(data) {
    return this.httpClient.post(AppSettings.BASE_API+"/odata/Pessoa", data)
                          .toPromise()
                          .then((response: Response) => response.json());
    }

}