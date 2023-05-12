import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { BookModel } from 'src/app/models/response-models/book';
import { MyLibraryApiService } from 'src/app/services/my-library-api.service';

@Component({
  selector: 'app-borrow',
  templateUrl: './borrow.component.html',
  styleUrls: ['./borrow.component.scss']
})
export class BorrowComponent implements OnInit {

  public id = this.router.routerState.snapshot.url.replace('/home/students/borrow/', '')

  public displayedColumns: string[] = ['titulo', 'autor', 'editora', 'quantidade', 'borrow']
  public dataTableSource : any
  public dataSource$ : Observable<any> = of([])
  public keyword: string = ''


  constructor(private router: Router, private service : MyLibraryApiService) { }

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

  borrow(title: string) {
    console.log(title);

    const DO_BORROW = (id: string, title: string) => {

      this.service.DoBorrow(id, { title: title }).subscribe({
        next: res => {
          if(res.httpstatus == 'CREATED')
            alert(`empréstimo realizado com sucesso. \nIBSN : ${res.data.ibsn}`)
        },
        error: err => {
            console.log(err);
        }
      })
    }

    DO_BORROW(this.id, title);

    this.loadBooks();
  }

}
