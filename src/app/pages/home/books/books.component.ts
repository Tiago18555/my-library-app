import { DataSource } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { BookPostModel } from 'src/app/models/request-models/book';
import { BookModel, BookResponseDataModel } from 'src/app/models/response-models/book';
import { MyLibraryApiService } from 'src/app/services/my-library-api.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}


@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {

  public formFields : BookModel = {
    titulo : '',
    autor : '',
    editora : '',
    descricao : '',
    quantidade : 1,
  };

  //VISUAL CONTROLS
  public displayTable : boolean = true;
  public displayForm: boolean = false;
  public disableSubmit : boolean = true;

  
  public displayedColumns: string[] = ['titulo', 'autor', 'editora', 'quantidade', 'edit', 'remove']
  public books: BookModel[] = []
  public dataSource : any
  public authors$ : Observable<any> = of([])
  public publishers$ : Observable<any> = of([])

  constructor(
    private service : MyLibraryApiService
  ) { }

  ngOnInit(): void {
    this.loadBooks()
  }

  loadBooks() : void {
    this.displayTable = true;
    this.displayForm = false;

    
    this.service.listAllBooks().subscribe(res =>
      this.dataSource = new BooksDataSource(res.data)
    );
  }

  loadAuthors() : void {
    this.displayTable = true;
    this.displayForm = false;

    
  }
  
  loadPublishers() : void {
    this.displayTable = true;
    this.displayForm = false;
  }
  
  addBook() : void {
    this.displayTable = false;
    this.displayForm = true;
    this.controlSubmit();
    this.clearAll();
    
    this.authors$ = this.service.listAllAuthors()
    this.publishers$ = this.service.listAllPublishers()
  }
  
  /**
   * @description Verifica se os campos do formulário estão preenchidos para habilitar o botão de submit.
   */
  controlSubmit() : void {    
    this.disableSubmit = this.fieldsAreEmpty()
  }
  
  private fieldsAreEmpty() : boolean {
    return (
      this.formFields.titulo == '' || 
      this.formFields.autor == '' || 
      this.formFields.editora == ''
    )
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
}

export class BooksDataSource extends DataSource<any> {

  constructor(private source : BookModel[] | BookResponseDataModel[]) {
    super();
  }

  connect(): Observable<BookModel[] | BookResponseDataModel[]> {
    return of(this.source);
  }

  disconnect(): void {}
}