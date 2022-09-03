import { DataSource } from '@angular/cdk/collections';
import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { MyLibraryApiService, Student } from 'src/app/services/my-library-api.service';


@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {

  public displayedColumns: string[] = ['cpf', 'nome']
  public dataTableSource : any
  public dataSource$ : Observable<any> = of([])

  constructor(
    private service : MyLibraryApiService,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.loadStudents()
  }

  loadStudents() : void {
    this.dataSource$ = this.service.loadStudents()
    this.dataSource$.subscribe(res =>
      this.dataTableSource = new StudentsDataSource(res.data)
    );
  }

  viewDetails(row: Student) : void {
    console.log(row);  
    ///TODO: implementar rota para detalhes do aluno  
    ///this.router.navigate(['/students/' + row.id]);
  }
}

class StudentsDataSource extends DataSource<any> {

  constructor(private source : Student[]) {
    super();
  }

  connect(): Observable<Student[]> {
    return of(this.source);
  }

  disconnect(): void {}
}
