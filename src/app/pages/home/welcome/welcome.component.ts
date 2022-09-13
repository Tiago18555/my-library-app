import { DataSource } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { BorrowingResponseDataModel } from 'src/app/models/response-models/borrowing';
import { MyLibraryApiService } from 'src/app/services/my-library-api.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  public displayedColumns: string[] = ['nome', 'livro', 'prazo']
  public dataTableSource : any
  public dataSource$ : Observable<any> = of([])

  constructor(
    private service : MyLibraryApiService,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.loadBorrowings();
  }

  loadBorrowings() : void {
    this.dataSource$ = this.service.loadNextWeekBorrows()
    this.dataSource$.subscribe(res => {
      this.dataTableSource = new BorrowingsDataSource(res.data),
      console.log(res);
    });
  }

  viewDetails(row: any) : void {     
    ///TODO: implementar rota para detalhes do aluno  
    this.router.navigate(['home/students/details/' + row.client.cpf]);
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
