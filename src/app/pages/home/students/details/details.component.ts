import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { StudentResponseDataModel, StudentResponseModelSingle, StudentResponseModel } from 'src/app/models/response-models/student';
import { MyLibraryApiService } from 'src/app/services/my-library-api.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  public cpf = this.router.routerState.snapshot.url.replace('/home/students/details/', '')
  public response : StudentResponseModelSingle = {
    data : {
      id: '',
      name: ''
    },
    httpstatus : ''
  };
  public student$ : Observable<any> = of();
  public showForm : boolean = false;
  public showAddNewBorrow : boolean = false;

  public enableNameEdit : boolean = false;
  public enableCpfEdit : boolean = false;

  constructor(
    private router: Router,
    private service: MyLibraryApiService
  ) { }

  ngOnInit(): void {
    this.loadStudent();
  }

  loadStudent() : void {
    this.student$ = this.service.getStudentByCpf(this.cpf)
    this.student$.subscribe(res => {
      this.response = res;     
      this.loadBorrowings(res.data.id)
    })
  }

  loadBorrowings(id: String) : void {
    this.service.VerifyBorrowsFromClient(id).subscribe(res => {
      
      if(res.data.loan && res.data.loan > 0) {
        this.showAddNewBorrow = false;

        ///TODO: trocar esse alert
        alert('OPA AI NÃO AMIGO');
      }
    },
    err => {   
      alert('OPA AI SIM AMIGO');
      this.showAddNewBorrow = true;  
      console.log(err);      
    })
  }

  toggleEditNameButtonDisabled() : void {
    this.enableNameEdit = !this.enableNameEdit
  }

  toggleEditCpfButtonDisabled() : void {
    this.enableCpfEdit = !this.enableCpfEdit
  }

  toggleShowForm() : void {
    this.showForm = !this.showForm
  }
}
