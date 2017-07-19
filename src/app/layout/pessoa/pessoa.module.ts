import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FormsModule,ReactiveFormsModule  }   from '@angular/forms';
import { PessoaRoutingModule } from './pessoa-routing.module';
import { PessoaComponent } from './pessoa.component';
import { TranslateModule } from '@ngx-translate/core';
import { PageHeaderModule } from '../../shared';

@NgModule({
    imports: [
        CommonModule,
        PessoaRoutingModule,
        PageHeaderModule,
        TranslateModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule.forRoot()
    ],
    declarations: [PessoaComponent]
})
export class PessoaModule { }
