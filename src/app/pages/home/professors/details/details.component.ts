import { DataSource } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ProfessorUpdateModel } from 'src/app/models/request-models/professor';
import { BorrowingResponseDataModel } from 'src/app/models/response-models/borrowing';
import { ProfessorResponseDataModel, ProfessorResponseModelSingle } from 'src/app/models/response-models/professor';
import { MyLibraryApiService } from 'src/app/services/my-library-api.service';
import { ValidationService } from 'src/app/services/validation.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  private readonly MINIMUM_NAME_SIZE : number = 3;
  private readonly MAXIMUM_NAME_SIZE : number = 40;

  public cpf = this.router.routerState.snapshot.url.replace('/home/professors/details/', '')
  public response : ProfessorResponseModelSingle = {
    data : {
      id: '',
      name: '',
      cpf: ''
    },
    httpstatus : ''
  };
  public professor$ : Observable<any> = of();
  public dataSource$ : Observable<any> = of();
  public dataTableSource : any;
  public showForm : boolean = false;
  public showAddNewBorrow : boolean = false;

  public enableNameEdit : boolean = false;
  public disableEdit : boolean = true;

  public displayedColumns: string[] = ['titulo', 'autor', 'data', 'devolver']

  constructor(
    private router: Router,
    private service: MyLibraryApiService,
    private validate: ValidationService
  ) { }

  ngOnInit(): void {
    this.loadProfessor();
  }

  loadProfessor() : void {
    this.professor$ = this.service.getProfessorByCpf(this.cpf)
    this.professor$.subscribe({
      next : res => {
        this.response = res;
        this.loadBorrowings(res.data.id)
    },
      error: err => console.log(err)
    })
  }

  loadBorrowings(id: String) : void {
    this.dataSource$ = this.service.VerifyBorrowLimitFromClient(id)
    this.dataSource$.subscribe({
      next: res => {
        this.dataTableSource = new BorrowingsDataSource(res.data.borrowings)
        this.showAddNewBorrow = res.data.first?.startsWith('The limit of simultaneous borrowings is')
        //PADRONIZAR A RESPONSE DA API PARA TRATAMENTO MELHOR NESSE TRECHO
      },
      error: err => {
        this.showAddNewBorrow = false;
        console.log(err);
      }
    })

  }

  toggleEditNameButtonDisabled() : void {
    this.enableNameEdit = !this.enableNameEdit
  }

  toggleShowForm() : void {
    this.showForm = !this.showForm
  }

  controlEditButton = (params : ProfessorResponseDataModel) => {
    this.disableEdit = !this.fieldsAreCorrectToUpdate(params);
  }

  fieldsAreCorrectToUpdate = ({ name, cpf } : ProfessorResponseDataModel) => {
    return (
      this.response.data.name != name &&
      this.response.data.name.length < this.MAXIMUM_NAME_SIZE &&
      this.response.data.name.length > this.MINIMUM_NAME_SIZE
    )
  }

  enableDevolution = (params: any) => {
    return params.endsAt !== null;
  }

  borrow = () => {
    this.router.navigate(['home/professors/borrow/' + this.response.data.cpf]);
  }

  devolution = ({unit}: any) : void => {

    //Just to keep this project pattern...
    const DO_DEVOLUTION = ( ibsn: string, id: string ) => {
      this.service.DoDevolution(id, { ibsn: ibsn }).subscribe({
        next: res => {
          if (res.httpstatus === 'CREATED') {
            alert('Devolução realizada com sucesso!')
          }
          if (res.httpstatus !== 'CREATED') {
            alert('Erro na operação: ' + res.httpstatus)
          }
        },
        error: err => console.log(err)
      })
    }

    DO_DEVOLUTION(unit.ibsn, this.response.data.id);

    this.loadProfessor();
  }

  onSubmit = (params: NgForm) : void => {

    const DO_UPDATE = ( professor: ProfessorUpdateModel ) => {
      console.table(professor)
      this.service.updateProfessor(professor).subscribe({
        next: res => {
          if (res.httpstatus === 'OK') {
            alert('Dados atualizados com sucesso!')
            this.loadProfessor()
          }
          else if (res.httpstatus !== 'OK') {
            alert('Erro ao atualizar os dados: ' + res.httpstatus)
          }
        },
        error: err => console.log(err)
      })
    }

    let Name = params.form.value.name
    let { name, cpf } = this.response.data

    if (name !== Name) {
      DO_UPDATE({
        name : Name,
        cpf : this.validate.cleanCpf(cpf)
      })
    } else {
      alert("O novo nome deve ser diferente do anterior.")
    }
  }

  viewBookDetails = (params: string) => this.router.navigate(['/home/books/edit/', params])

}

class BorrowingsDataSource extends DataSource<any> {

  constructor(private source : BorrowingResponseDataModel[]) {
    super();
  }

  connect(): Observable<BorrowingResponseDataModel[]> {
    return of(this.source);
  }

  disconnect(): void {}
}
