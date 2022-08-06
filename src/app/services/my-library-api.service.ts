import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { first, tap } from 'rxjs/operators';
import { AuthRequestModel, ValidateRequestModel } from '../models/request-models/auth';
import { AuthResponseModel, ValidateResponseModel } from '../models/response-models/auth';
import { LocalStorageService } from './local-storage.service';


@Injectable({
  providedIn: 'root'
})
export class MyLibraryApiService {

  constructor(
    private HttpClient: HttpClient, 
    private localStorage: LocalStorageService,
    private router: Router
  ) { }

  /**
   * @summary: Host section
   */
  //private readonly baseUrl = 'http://tiago-my-library-api.herokuapp.com/';
  private readonly baseUrl = 'http://localhost:8080/';

  /**
   * @summary: Header section for all requests
  **/
  private HEADER = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.localStorage.get('token').token}}`,
    'Access-Control-Allow-Origin': '*'
  });
  private REQUEST_OPTIONS = { headers: this.HEADER };

  
  listAllBooks() : any {
    return this.HttpClient
    .get( `${this.baseUrl}book`, this.REQUEST_OPTIONS )
    .pipe(
      first(),
      tap(data => console.log(data))
    );
  }


  authenticate(authModel: AuthRequestModel) : Observable<AuthResponseModel> {
    
    return this.HttpClient.post<AuthResponseModel>(`${this.baseUrl}login`, authModel  )
    .pipe(
      first(),
      tap(data => this.localStorage.set('session', { 'token' : data.token, 'user' : authModel.username } ))
    );
  }

  logout() : void {
    this.localStorage.remove('session');
    this.router.navigate(['/login']);
  }

  validate(token: ValidateRequestModel) : Observable<ValidateResponseModel> {    
    return this.HttpClient.post<ValidateResponseModel>( `${this.baseUrl}validate`, token )
    .pipe(
      first()
    );
  }
}
