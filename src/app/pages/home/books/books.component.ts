import { DataSource } from '@angular/cdk/collections';
import { AfterViewInit, Component, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable, of, tap } from 'rxjs';
import { BookPostModel } from 'src/app/models/request-models/book';
import { BookModel, BookResponseDataModel } from 'src/app/models/response-models/book';
import { MyLibraryApiService } from 'src/app/services/my-library-api.service';


@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {
  
  public AddIsActive : boolean = this.router.routerState.snapshot.url.startsWith('/home/books/add')
  public PublishersIsActive : boolean = this.router.routerState.snapshot.url.startsWith('/home/books/publishers')
  public AuthorsIsActive : boolean = this.router.routerState.snapshot.url.startsWith('/home/books/authors')
  public ListIsActive : boolean = this.router.routerState.snapshot.url.startsWith('/home/books/list')

  constructor(
    public router: Router,
    private service: MyLibraryApiService
  ) { }

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

}