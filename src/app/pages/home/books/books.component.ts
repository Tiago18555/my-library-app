import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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