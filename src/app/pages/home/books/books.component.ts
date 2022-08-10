import { DataSource } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
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

  public displayTable : boolean = true;
  public displayForm: boolean = false;

  public formFields : BookModel = {
    titulo : '',
    autor : '',
    editora : '',
    quantidade : 0,
  };
  
  public displayedColumns: string[] = ['titulo', 'autor', 'editora', 'quantidade', 'edit', 'remove']
  public books: BookModel[] = []
  public dataSource : any

  constructor(
    private service : MyLibraryApiService
  ) { }

  ngOnInit(): void {
    this.loadBooks()
  }

  loadBooks() : void {
    this.displayTable = true;
    this.displayForm = false;
    
    this.service.listAllBooks().subscribe(res => {
      
    this.dataSource = new BooksDataSource(res.data)    
    // res.data.map(book => {
    //     this.books.push({
    //       'titulo' : book.title,
    //       'autor' : book.authorName,
    //       'editora' : book.publisher.publisherName,
    //       'quantidade' : book.availableAmount,
    //     })
    //   })
    });
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