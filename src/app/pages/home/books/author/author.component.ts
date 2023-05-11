import { DataSource } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, of } from 'rxjs';
import { AuthorResponseDataModel } from 'src/app/models/response-models/author';
import { MyLibraryApiService } from 'src/app/services/my-library-api.service';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.scss']
})
export class AuthorComponent implements OnInit {

  public displayedColumns: string[] = ['nome', 'edit']
  public dataTableSource : any
  public dataSource$ : Observable<any> = of([])
  public keyword: string = ''

  constructor(
    private service : MyLibraryApiService
  ) { }

  ngOnInit(): void {
    this.loadAuthors()
  }

  applyFilter = ($event: string) =>  {
    this.dataTableSource.filter = $event.trim().toLowerCase()
  }

  loadAuthors() : void {
    this.dataSource$ = this.service.listAllAuthors()
    this.dataSource$.subscribe(res =>
      this.dataTableSource = new MatTableDataSource<AuthorResponseDataModel>(res.data)
    );
  }
}
