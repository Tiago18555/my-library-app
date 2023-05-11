import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { BookModel } from 'src/app/models/response-models/book';
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
  public keyword: string = ''

  constructor(
    private service : MyLibraryApiService,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.loadBooks()
  }

  applyFilter = ($event: string) =>  {
    this.dataTableSource.filter = $event.trim().toLowerCase()
  }

  loadBooks() : void {
    this.dataSource$ = this.service.listAllBooks()
    this.dataSource$.subscribe(res =>
      this.dataTableSource = new MatTableDataSource<BookModel>(res.data)
    );
  }

  edit(title: string) {
    console.log(title);

    this.router.navigate(['/home/books/edit/',  title ]);
  }
}
