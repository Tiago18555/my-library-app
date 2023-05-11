import { DataSource } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, of } from 'rxjs';
import { PublisherResponseDataModel } from 'src/app/models/response-models/publisher';
import { MyLibraryApiService } from 'src/app/services/my-library-api.service';

@Component({
  selector: 'app-publisher',
  templateUrl: './publisher.component.html',
  styleUrls: ['./publisher.component.scss']
})
export class PublisherComponent implements OnInit {

  public displayedColumns: string[] = ['nome', 'cnpj', 'edit']
  public dataTableSource : any
  public dataSource$ : Observable<any> = of([])
  public keyword: string = ''


  constructor(
    private service : MyLibraryApiService
  ) { }

  ngOnInit(): void {
    this.loadPublishers()
  }

  applyFilter = ($event: string) =>  {
    this.dataTableSource.filter = $event.trim().toLowerCase()
  }

  loadPublishers() : void {
    this.dataSource$ = this.service.listAllPublishers()
    this.dataSource$.subscribe(res =>
      this.dataTableSource = new MatTableDataSource<PublisherResponseDataModel>(res.data)
    );
  }
}
