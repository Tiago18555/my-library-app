import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MyLibraryApiService } from 'src/app/services/my-library-api.service';
import { Observable, of } from 'rxjs';
import { DataSource } from '@angular/cdk/collections';

interface Professor {
  id: string;
  cpf: string;
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  public displayedColumns: string[] = ['nome', 'cpf']
  public dataTableSource : any
  public dataSource$ : Observable<any> = of([])

  constructor(
    private service : MyLibraryApiService,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.loadProfessors()
  }

  addProfessor(){
    this.router.navigate(['home/professors/add']);
  }

  loadProfessors() : void {
    this.dataSource$ = this.service.loadProfessors()
    this.dataSource$.subscribe(res =>
      this.dataTableSource = new ProfessorsDataSource(res.data)
    );
  }

  viewDetails(row: Professor) : void {
    this.router.navigate(['home/professors/details/' + row.cpf]);
  }

}

class ProfessorsDataSource extends DataSource<any> {

  constructor(private source : Professor[]) {
    super();
  }

  connect(): Observable<Professor[]> {
    return of(this.source);
  }

  disconnect(): void {}
}
