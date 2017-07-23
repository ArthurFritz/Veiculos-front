import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import {PeopleService} from '../../shared/services/people.service';
import {VeiculoService} from '../../shared/services/veiculo.service';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';

@Component({
    selector: 'app-veiculo',
    templateUrl: './veiculo.component.html',
    styleUrls: ['./veiculo.component.scss'],
    animations: [routerTransition()]
})
export class VeiculoComponent implements OnInit {
    
    ngOnInit(): void {
        this.loadVeiculos();
    }

    public listVeiculos=[];
    public listPessoas=[];
    public status:String='list';
    public data:any;
    private itemEdit:any;

    public formVeiculo:FormGroup;

    constructor(private _veiculoService: VeiculoService
    ) {
        this.formVeiculo = new FormBuilder().group({
            'marca': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
            'modelo': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
            'ano': ['', Validators.compose([Validators.required, Validators.min(0)])],
            'placa': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
            'PessoaID': [0, Validators.compose([Validators.required, Validators.min(1)])],
        })
    }

    newVeiculo() {
        this.formVeiculo.reset();
        this.status="new";
        this.loadPessoas();
        this.formVeiculo.get('PessoaID').setValue(0);
    }

    private loadPessoas(){
        this._veiculoService.getListPessoas().then(suc=>{
            this.listPessoas=suc.value;
        })
    }

    private loadVeiculos(){
        this._veiculoService.getListVeiculos().then(suc=>{
            this.listVeiculos = suc.value;
        })
        this.status = 'list';
    }

    excluir(item){
        if(confirm("Deseja excluir o "+item.nome+"?")){
            this._veiculoService.removeVeiculo(item.id).then(suc=>{
                this.loadVeiculos();
            })
        }
    }

    cancelar(){
        this.status = 'list';
    }

    editar(item){
        this.loadPessoas();
        this.itemEdit = item;
        this.formVeiculo.get("marca").setValue(item.marca);
        this.formVeiculo.get("modelo").setValue(item.modelo);
        this.formVeiculo.get("ano").setValue(item.ano);
        this.formVeiculo.get("placa").setValue(item.placa);
        this.formVeiculo.get('PessoaID').setValue(item.PessoaID);
        this.status='edit';
    }

    saveAction(){
        var dataRequest = this.formVeiculo.value;
        dataRequest.ano = String(dataRequest.ano);
        if(this.status=='edit'){
            dataRequest.id = this.itemEdit.id
            this._veiculoService.editVeiculo(this.itemEdit.id,dataRequest).then(suc=>{
                this.loadVeiculos();
            })
        }else{
            this._veiculoService.newVeiculo(dataRequest).then(suc=>{
                this.loadVeiculos();
            })
        }
    }
}