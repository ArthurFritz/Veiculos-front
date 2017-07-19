import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';
import { TranslateService } from "@ngx-translate/core";
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../shared/services/user.service';
import { Router } from "@angular/router";

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
    animations: [routerTransition()]
})
export class SignupComponent implements OnInit {

    formRegister:FormGroup;

    constructor(private _router:Router, private translate: TranslateService, private _user:UserService) { }

    ngOnInit() {
        localStorage.removeItem("token");
        this.formRegister = new FormBuilder().group({
            'Email': ['', Validators.compose([Validators.required, Validators.minLength(4), Validators.email])],
            'Password': ['', Validators.compose([Validators.required, Validators.minLength(6)])],
            'ConfirmPassword': ['', Validators.compose([Validators.required, Validators.minLength(6)])]
        })
    }

    registerUser(){
        if(this.formRegister.valid){
            var valueRequest = this.formRegister.value;
                this._user.createUser(this.formRegister.value).then(suc=>{
                    this._user.loginUser({username:valueRequest.Email, password: valueRequest.Password});
                }
            )
        }else{
            alert("Oia os campo infeliz");
        }

    }
}
