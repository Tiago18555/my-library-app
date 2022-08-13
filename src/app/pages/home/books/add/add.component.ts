import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { BookPostModel } from 'src/app/models/request-models/book';
import { BookModel } from 'src/app/models/response-models/book';
import { MyLibraryApiService } from 'src/app/services/my-library-api.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  public formFields : BookModel = {
    titulo : '',
    autor : '',
    editora : '',
    descricao : '',
    quantidade : 1,
  };
  
  //VISUAL CONTROLS
  public disableSubmit : boolean = true;
  private readonly MINIMUM_TITLE_FIELD_SIZE : number = 3
  private readonly MAXIMUM_TITLE_FIELD_SIZE : number = 39
  private readonly MINIMUM_DESCRIPTION_FIELD_SIZE : number = 10
  private readonly MAXIMUM_DESCRIPTION_FIELD_SIZE : number = 2048
  private readonly MINIMUM_QUANTITY_SIZE : number = 1
  
  public authors$ : Observable<any> = of([])
  public publishers$ : Observable<any> = of([])
  
  constructor(
    private service : MyLibraryApiService
  ) { }

  ngOnInit() {
    this.addBook()
  }
  
  /**
   * @description Verifica se os campos do formulário estão preenchidos para habilitar o botão de submit.
   */
  controlSubmit() : void {    
    this.disableSubmit = this.fieldsAreInvalid()
  }
  
  private fieldsAreInvalid() : boolean {      

    return (      
      this.formFields.titulo.length < this.MINIMUM_TITLE_FIELD_SIZE ||
      this.formFields.titulo.length > this.MAXIMUM_TITLE_FIELD_SIZE ||
      this.formFields.quantidade < this.MINIMUM_QUANTITY_SIZE ||     
      this.formFields.autor === '' || 
      this.formFields.editora === '' ||
      (     
        this.formFields.descricao !== '' &&
        this.formFields.descricao.length < this.MINIMUM_DESCRIPTION_FIELD_SIZE
      ) 
        ||
      (
        this.formFields.descricao !== '' &&
        this.formFields.descricao.length > this.MAXIMUM_DESCRIPTION_FIELD_SIZE
      )
    );
  }

  /**
   * @description Limpa todos os campos do formulário.
   */
  private clearAll() : void {
    this.formFields = {
      titulo : '',
      autor : '',
      editora : '',
      descricao : '',
      quantidade : 1,
    }
  }

  onSubmit() : void {    
    const BOOK : BookPostModel = {
      author : this.formFields.autor,
      availableAmount : this.formFields.quantidade,
      description : this.formFields.descricao,
      publisher : this.formFields.editora,
      title : this.formFields.titulo
    }
    console.log(BOOK);
    
    this.service.addBook(BOOK).subscribe(res => {
      if (res.httpstatus === 'CREATED') {
        alert('Livro cadastrado com sucesso!')
        this.addBook()
      }
      else if (res.httpstatus !== 'CREATED') {
        alert('Erro ao cadastrar livro: ' + res.httpstatus)
      }
    })
  }

  addBook() : void {
    this.authors$ = this.service.listAllAuthors()
    this.publishers$ = this.service.listAllPublishers()

    this.clearAll();
  }

}
