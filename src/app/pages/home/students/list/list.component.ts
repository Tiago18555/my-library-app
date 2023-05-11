import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { MyLibraryApiService } from 'src/app/services/my-library-api.service';

interface Student {
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
  public dataTableSource : MatTableDataSource<Student> = new MatTableDataSource()
  public dataSource$ : Observable<any> = of([])
  public keyword: string = '';

  constructor(
    private service : MyLibraryApiService,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.loadStudents()
  }

  applyFilter = ($event: string) =>  {
    this.dataTableSource.filter = $event.trim().toLowerCase()
  }

  addStudent(){
    this.router.navigate(['home/students/add']);
  }

  loadStudents() : void {
    this.dataSource$ = this.service.loadStudents()
    this.dataSource$.subscribe(res =>
      this.dataTableSource = new MatTableDataSource<Student>(res.data)
    );
  }

  viewDetails(row: Student) : void {
    this.router.navigate(['home/students/details/' + row.cpf]);
  }
}

