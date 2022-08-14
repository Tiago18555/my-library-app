import { DataSource } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
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
  public dataSource : any

  constructor(
    private service : MyLibraryApiService
  ) { }

  ngOnInit(): void {
    this.loadPublishers()
  }

  loadPublishers() : void {
    this.service.listAllPublishers().subscribe(res =>
      this.dataSource = new PublishersDataSource(res.data)
    );
  }
}

class PublishersDataSource extends DataSource<any> {

  constructor(private source : PublisherResponseDataModel[]) {
    super();
  }

  connect(): Observable<PublisherResponseDataModel[]> {
    return of(this.source);
  }

  disconnect(): void {}
}
