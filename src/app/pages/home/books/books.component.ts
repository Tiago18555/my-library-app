import { DataSource } from '@angular/cdk/collections';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, of, tap } from 'rxjs';
import { BookPostModel } from 'src/app/models/request-models/book';
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
export class BooksComponent {

}