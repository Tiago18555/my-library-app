import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfessorPostModel } from 'src/app/models/request-models/professor';
import { Professor } from 'src/app/models/response-models/professor';
import { MyLibraryApiService } from 'src/app/services/my-library-api.service';
import { ValidationService } from 'src/app/services/validation.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  private readonly MINIMUM_NAME_SIZE = 3;
  private readonly MAXIMUM_NAME_SIZE = 40;

  constructor(
    private srv: ValidationService,
    private router : Router,
    private service: MyLibraryApiService
  ) { }

  public disableSubmit : boolean = true;

  ngOnInit(): void {
  }

  public formFields : Professor = {
    name : '',
    cpf : ''
};

controlSubmit(): void {
  this.disableSubmit = this.fieldsAreInvalid();
}

private fieldsAreInvalid(): boolean {
  return! (
    this.formFields.name.length > this.MINIMUM_NAME_SIZE &&
    this.formFields.name.length < this.MAXIMUM_NAME_SIZE &&
    this.srv.isValidCPF(this.formFields.cpf)
  )
}

/**
* @description Limpa todos os campos do formulário.
*/
private clearAll() : void {
  this.formFields = {
    name : '',
    cpf : ''
  }
}

onSubmit() : void {
  const PROFESSOR : ProfessorPostModel = {
    cpf : this.srv.cleanCpf(this.formFields.cpf),
    name : this.formFields.name
  }

  console.log(PROFESSOR);



  this.service.addStudent(PROFESSOR).subscribe({
    next : res => {
    if (res.httpstatus === 'CREATED') {
      alert('Professor cadastrado com sucesso!')
      this.addProfessor()
    }
    else if (res.httpstatus !== 'CREATED') {
      alert('Erro ao cadastrar o professor: ' + res.httpstatus)
    }
  }, error : err => {
    alert(`Erro: ${err.error.data}`)
  }
})
}

addProfessor() : void {
  this.clearAll();
}

onCancel(): void {
  this.router.navigate(['home/professors']);
}

}
