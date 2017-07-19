import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { TranslateService } from "@ngx-translate/core";
import { UserService } from '../shared/services/user.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {


    public formUser:FormGroup;

    constructor(public router: Router, private translate: TranslateService, private _user:UserService) {
    }

    ngOnInit() {
        localStorage.removeItem("token");
        this.formUser = new FormBuilder().group({
            'username': ['', Validators.compose([Validators.required, Validators.minLength(4), Validators.email])],
            'password': ['', Validators.compose([Validators.required, Validators.minLength(6)])]
        })
    }

    onLoggedin() {
        this._user.loginUser(this.formUser.value);
    }

}
