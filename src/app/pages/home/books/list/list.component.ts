import { DataSource } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { BookModel, BookResponseDataModel } from 'src/app/models/response-models/book';
import { MyLibraryApiService } from 'src/app/services/my-library-api.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  public displayedColumns: string[] = ['titulo', 'autor', 'editora', 'quantidade', 'edit']
  public dataTableSource : any
  public dataSource$ : Observable<any> = of([])

  constructor(
    private service : MyLibraryApiService,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.loadBooks()
  }

  loadBooks() : void {  
    this.dataSource$ = this.service.listAllBooks()
    this.dataSource$.subscribe(res =>
      this.dataTableSource = new BooksDataSource(res.data)
    );
  }

  edit(title: string) {
    console.log(title);
    
    this.router.navigate(['/home/books/edit/',  title ]);
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
