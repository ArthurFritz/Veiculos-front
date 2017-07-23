import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FormsModule,ReactiveFormsModule  }   from '@angular/forms';
import { VeiculoRoutingModule } from './veiculo-routing.module';
import { VeiculoComponent } from './veiculo.component';
import { TranslateModule } from '@ngx-translate/core';
import { PageHeaderModule } from '../../shared';

@NgModule({
    imports: [
        CommonModule,
        VeiculoRoutingModule,
        PageHeaderModule,
        TranslateModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule.forRoot()
    ],
    declarations: [VeiculoComponent]
})
export class VeiculoModule { }
