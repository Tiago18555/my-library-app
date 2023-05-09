import { DataSource } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { BorrowingResponseDataModel } from 'src/app/models/response-models/borrowing';
import { MyLibraryApiService } from 'src/app/services/my-library-api.service';

@Component({
  selector: 'app-finished',
  templateUrl: './finished.component.html',
  styleUrls: ['./finished.component.scss']
})
export class FinishedComponent implements OnInit {

  public displayedColumns: string[] = ['aluno', 'titulo', 'emprestimo', 'devolucao', 'multa']
  public dataTableSource : any
  public dataSource$ : Observable<any> = of([])

  constructor(
    private service : MyLibraryApiService,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.loadLoans();
  }

  loadLoans() : void {
    this.dataSource$ = this.service.loadFinishedBorrows()
    this.dataSource$.subscribe(res => {
      this.dataTableSource = new BorrowingsDataSource(res.data)
    });
  }

  goToStudentDetails(params: string) : void {
    console.log(params);

    this.router.navigate(['/home/students/details/', params]);
  }

  goToBookDetails(params: string) : void {
    console.log(params);

    this.router.navigate(['/home/books/edit/', params]);
  }
}

class BorrowingsDataSource extends DataSource<any> {

  constructor(private source : BorrowingResponseDataModel[]) {
    super();
  }

  connect(): Observable<BorrowingResponseDataModel[]> {
    return of(this.source);
  }

  disconnect(): void {}
}
