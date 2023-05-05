import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StudentPostModel } from 'src/app/models/request-models/student';
import { Student } from 'src/app/models/response-models/student';
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

  public formFields : Student = {
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
    const STUDENT : StudentPostModel = {
      cpf : this.formFields.cpf.replace('-', '').replace('/', '').replace('.', '').replace('.', ''),
      name : this.formFields.name
    }

    console.log(STUDENT);



    this.service.addStudent(STUDENT).subscribe({
      next : res => {
      if (res.httpstatus === 'CREATED') {
        alert('Aluno cadastrado com sucesso!')
        this.addStudent()
      }
      else if (res.httpstatus !== 'CREATED') {
        alert('Erro ao cadastrar o aluno: ' + res.httpstatus)
      }
    }, error : err => {
      alert(`Erro: ${err.error.data}`)
    }
  })
  }

  addStudent() : void {
    this.clearAll();
  }

  onCancel(): void {
    this.router.navigate(['home/students']);
  }
}
