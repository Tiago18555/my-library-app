import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthRequestModel } from 'src/app/models/request-models/auth';
import { MyLibraryApiService } from 'src/app/services/my-library-api.service';

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.scss']
})
export class LoginScreenComponent implements OnInit {

  public user : AuthRequestModel = { 
    username: 'user1', 
    password: '33643975' 
  };

  constructor(
    private service : MyLibraryApiService,
    private router : Router
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.service.authenticate(this.user).subscribe(data => {      
      this.router.navigate(['/welcome']);        
    });
  }
}
