import { DataSource } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, catchError, empty, of } from 'rxjs';
import { StudentUpdateModel } from 'src/app/models/request-models/student';
import { BorrowingResponseDataModel } from 'src/app/models/response-models/borrowing';
import { StudentResponseDataModel, StudentResponseModelSingle } from 'src/app/models/response-models/student';
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

  public cpf = this.router.routerState.snapshot.url.replace('/home/students/details/', '')
  public response : StudentResponseModelSingle = {
    data : {
      id: '',
      name: '',
      cpf: ''
    },
    httpstatus : ''
  };

  public student$ : Observable<any> = of();
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
    this.loadStudent();
  }

  loadStudent() : void {
    this.student$ = this.service.getStudentByCpf(this.cpf)
    this.student$.subscribe({
      next: res => {
        this.response = res;
        console.log(res)
        this.loadBorrowings(res.data.id)
      },
      error: err => {
        console.log(err);
      }
    })
  }

  loadBorrowings(id: String) : void {
    this.dataSource$ = this.service.VerifyBorrowsFromClient(id)
    this.dataSource$.subscribe({
      next: res => {
        this.dataTableSource = new BorrowingsDataSource(res.data.borrowings)
        this.showAddNewBorrow = !res.data.loan && res.data.loan > 0
      },
      error: err => {
        console.log(err);
        this.showAddNewBorrow = true;
      }
    })
  }

  toggleEditNameButtonDisabled() : void {
    this.enableNameEdit = !this.enableNameEdit
  }

  toggleShowForm() : void {
    this.showForm = !this.showForm
  }

  controlEditButton = (params : StudentResponseDataModel) => {
    this.disableEdit = !this.fieldsAreCorrectToUpdate(params);
  }

  fieldsAreCorrectToUpdate = ({ name } : StudentResponseDataModel) => {
    return (
      this.response.data.name != name &&
      this.response.data.name.length <= this.MAXIMUM_NAME_SIZE &&
      this.response.data.name.length >= this.MINIMUM_NAME_SIZE
    )
  }

  devolution = () : void => console.log("devolution")

  onSubmit = (params: NgForm) : void => {

    const DO_UPDATE = ( student: StudentUpdateModel ) => {
      console.table(student)
      this.service.updateStudent(student).subscribe({
        next: res => {
          if (res.httpstatus === 'OK') {
            alert('Dados atualizados com sucesso!')
            this.loadStudent()
          }
          if (res.httpstatus !== 'OK') {
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
