import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { first, tap } from 'rxjs/operators';
import { AuthRequestModel, ValidateRequestModel } from '../models/request-models/auth';
import { BookPostModel } from '../models/request-models/book';
import { AuthResponseModel, ValidateResponseModel } from '../models/response-models/auth';
import { AuthorResponseModel } from '../models/response-models/author';
import { BookResponseModel } from '../models/response-models/book';
import { PublisherResponseModel } from '../models/response-models/publisher';
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
  private readonly BASEURL = 'http://localhost:8080/';


  /**
   * @summary: Header options 
   */
  private readonly BEARER = 'Bearer ';
  private header = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: this.BEARER + this.localStorage.getString('session'),
      'Access-Control-Allow-Origin': '*'
    }
  }

  /**
   * @param authModel 
   * @returns Observable<AuthResponseModel>
   */
  authenticate(authModel: AuthRequestModel) : Observable<AuthResponseModel> {    
    return this.HttpClient.post<AuthResponseModel>(`${this.BASEURL}login`, authModel  )
    .pipe(
      first(),
      tap(data => {
        this.localStorage.setString('session', data.token); 
      })
    );
  }
  
  /**
   * @description: Remove a session from local storage and redirect to login page
   */
  logout() : void {
    this.localStorage.remove('session');
    this.router.navigate(['/login']);
  }

  /**
   * @param token 
   * @returns Observable<ValidateResponseModel>
   */
  validate(token: ValidateRequestModel) : Observable<ValidateResponseModel> {    
    return this.HttpClient.post<ValidateResponseModel>( `${this.BASEURL}validate`, token )
    .pipe(
      first()
    );
  }
  

  /**
   * @returns Observable<BookResponseModel>
   */
  listAllBooks() : Observable<BookResponseModel> {        
    return this.HttpClient
      .get<BookResponseModel>( `${this.BASEURL}book`, this.header )
      .pipe(first())
  }

  /**
   * @returns Observable<AuthorResponseModel>
   */
  listAllAuthors() : Observable<AuthorResponseModel> {
    return this.HttpClient
      .get<AuthorResponseModel>( `${this.BASEURL}author`, this.header )
      .pipe(first());
  }

  /**
   * @returns Observable<PublisherResponseModel>
   */
  listAllPublishers() : Observable<PublisherResponseModel> {
    return this.HttpClient
      .get<PublisherResponseModel>( `${this.BASEURL}publisher`, this.header )
      .pipe(first());
  }

  /**
   * 
   * @param book 
   * @returns Observable<BookResponseModel>
   */
  addBook(book: BookPostModel) : Observable<BookResponseModel> {
    return this.HttpClient
      .post<BookResponseModel>( `${this.BASEURL}book/register`, book, this.header )
      .pipe(first());
  }
}
