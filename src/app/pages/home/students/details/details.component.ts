import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StudentResponseDataModel, StudentResponseModelSingle, StudentResponseModel } from 'src/app/models/response-models/student';
import { MyLibraryApiService } from 'src/app/services/my-library-api.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  public cpf = this.router.routerState.snapshot.url.replace('/home/students/details/', '')
  public response : StudentResponseModelSingle = {
    data : {
      id: '',
      name: ''
    },
    httpstatus : ''
  };

  constructor(
    private router: Router,
    private service: MyLibraryApiService
  ) { }

  ngOnInit(): void {
    this.loadStudent();
  }

  loadStudent() : void {
    this.service.getStudentByCpf(this.cpf).subscribe(res => {
      this.response = res;
      console.log(res.data);      
    })
  }

}
