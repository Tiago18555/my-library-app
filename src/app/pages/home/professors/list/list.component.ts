import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MyLibraryApiService } from 'src/app/services/my-library-api.service';
import { Observable, of } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';

interface Professor {
  id: string;
  name: string;
  cpf: string;
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  public displayedColumns: string[] = ['nome', 'cpf']
  public dataTableSource: MatTableDataSource<Professor> = new MatTableDataSource()
  public dataSource$ : Observable<any> = of([])
  public keyword: string = '';

  constructor(
    private service : MyLibraryApiService,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.loadProfessors()
  }

  applyFilter = ($event: string) =>  {
    this.dataTableSource.filter = $event.trim().toLowerCase()
  }

  addProfessor(){
    this.router.navigate(['home/professors/add']);
  }

  loadProfessors() : void {
    this.dataSource$ = this.service.loadProfessors()
    this.dataSource$.subscribe(res =>
      this.dataTableSource = new MatTableDataSource<Professor>(res.data))
  }

  viewDetails(row: Professor) : void {
    this.router.navigate(['home/professors/details/' + row.cpf]);
  }
}
