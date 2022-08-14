import { DataSource } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
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
  public dataSource : any

  constructor(
    private service : MyLibraryApiService
  ) { }

  ngOnInit(): void {
    this.loadAuthors()
  }

  loadAuthors() : void {
    this.service.listAllAuthors().subscribe(res =>
      this.dataSource = new AuthorsDataSource(res.data)
    );
  }
}

class AuthorsDataSource extends DataSource<any> {

  constructor(private source : AuthorResponseDataModel[]) {
    super();
  }

  connect(): Observable<AuthorResponseDataModel[]> {
    return of(this.source);
  }

  disconnect(): void {}
}
