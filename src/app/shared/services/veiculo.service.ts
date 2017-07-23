import { Injectable } from '@angular/core';
import { Headers, RequestOptions, Http, Response, URLSearchParams } from '@angular/http';
import 'rxjs/Rx';
import {AppSettings} from '../../app.settings';
import {Observable} from 'rxjs';
import {HttpClient} from './HttpClient';
import { Router } from "@angular/router";

@Injectable()
export class VeiculoService {
    
    constructor(private httpClient: HttpClient) { }

    getListVeiculos() {
        return this.httpClient.get(AppSettings.BASE_API+"/odata/Veiculo")
                              .toPromise()
                              .then((response: Response) => response.json());
    }

    getListPessoas() {
        return this.httpClient.get(AppSettings.BASE_API+"/odata/Pessoa?$select=id,nome")
                              .toPromise()
                              .then((response: Response) => response.json());
    }

    getVeiculo(id) {
        return this.httpClient.get(AppSettings.BASE_API+"/odata/Veiculo("+id+")")
                              .toPromise()
                              .then((response: Response) => response.json());
    }


    removeVeiculo(id) {
        return this.httpClient.delete(AppSettings.BASE_API+"/odata/Veiculo("+id+")")
                              .toPromise()
                              .then((response: Response) => response.status);
    }

    editVeiculo(id, data) {
        return this.httpClient.put(AppSettings.BASE_API+"/odata/Veiculo("+id+")", data)
                              .toPromise()
                              .then((response: Response) => response.status);
    }

    newVeiculo(data) {
    return this.httpClient.post(AppSettings.BASE_API+"/odata/Veiculo", data)
                          .toPromise()
                          .then((response: Response) => response.json());
    }

}