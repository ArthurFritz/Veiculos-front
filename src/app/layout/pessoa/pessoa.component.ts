import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import {PeopleService} from '../../shared/services/people.service';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';

@Component({
    selector: 'app-pessoa',
    templateUrl: './pessoa.component.html',
    styleUrls: ['./pessoa.component.scss'],
    animations: [routerTransition()]
})
export class PessoaComponent implements OnInit {
    
    ngOnInit(): void {
        this.loadPeoples();
    }

    public listPeoples=[];
    public status:String='list';
    public data:any;
    private itemEdit:any;

    public formPessoa:FormGroup;

    constructor(private _peopleService: PeopleService) {
        this.formPessoa = new FormBuilder().group({
            'nome': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
            'documento': ['', Validators.compose([Validators.required, Validators.minLength(6)])],
            'dataNascimento': ['', Validators.compose([Validators.required, Validators.minLength(6)])]
        })
    }

    newPeople() {
        this.formPessoa.reset();
        this.status="new";
    }

    private loadPeoples(){
        this._peopleService.getListPeoples().then(suc=>{
            this.listPeoples = suc.value;
        })
        this.status = 'list';
    }

    excluir(item){
        if(confirm("Deseja excluir o "+item.nome+"?")){
            this._peopleService.removePeople(item.id).then(suc=>{
                this.loadPeoples();
            })
        }
    }

    cancelar(){
        this.status = 'list';
    }

    editar(item){
        this.itemEdit = item;
        var items = String(item.dataNascimento).split("T");
        var date = items[0].split("-");
        this.data =  {year: +date[0], month: +date[1], day: +date[2]};
        this.formPessoa.get("nome").setValue(item.nome);
        this.formPessoa.get("documento").setValue(item.documento);
        this.status='edit';
    }

    saveAction(){
        var dataRequest = this.formPessoa.value;
        dataRequest.dataNascimento = new Date(this.data.year+"-"+this.data.month+"-"+this.data.day);
        if(this.status=='edit'){
            dataRequest.id = this.itemEdit.id
            this._peopleService.editPeople(this.itemEdit.id,dataRequest).then(suc=>{
                this.loadPeoples();
            })
        }else{
            this._peopleService.newPeople(dataRequest).then(suc=>{
                this.loadPeoples();
            })
        }
    }
}
