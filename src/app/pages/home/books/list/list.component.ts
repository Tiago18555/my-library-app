import { DataSource } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { BookModel, BookResponseDataModel } from 'src/app/models/response-models/book';
import { MyLibraryApiService } from 'src/app/services/my-library-api.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  public formFields : BookModel = {
    titulo : '',
    autor : '',
    editora : '',
    descricao : '',
    quantidade : 1,
  };

  
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
    this.service.listAllBooks().subscribe(res =>
      this.dataSource = new BooksDataSource(res.data)
    );
  }
}

class BooksDataSource extends DataSource<any> {

  constructor(private source : BookModel[] | BookResponseDataModel[]) {
    super();
  }

  connect(): Observable<BookModel[] | BookResponseDataModel[]> {
    return of(this.source);
  }

  disconnect(): void {}
}
