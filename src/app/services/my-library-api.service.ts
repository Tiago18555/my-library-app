import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { delay, first, tap } from 'rxjs/operators';
import { AuthRequestModel, ValidateRequestModel } from '../models/request-models/auth';
import { BookPostModel, BookUpdateModel } from '../models/request-models/book';
import { AuthResponseModel, ValidateResponseModel } from '../models/response-models/auth';
import { AuthorResponseModel } from '../models/response-models/author';
import { BookResponseDataModelSingle, BookResponseModel, UnitResponseModel } from '../models/response-models/book';
import { BorrowingResponseModel } from '../models/response-models/borrowing';
import { PublisherResponseModel } from '../models/response-models/publisher';
import { StudentResponseModel } from '../models/response-models/student';
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
   * @summary: Debug
   */
  private readonly BASEDELAY = 100;

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
   * @summary: Auth endpoint
   */

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
   * @summary: Book endpoint
   */
  

  /**
   * @returns Observable<BookResponseModel>
   */
  listAllBooks() : Observable<BookResponseModel> {        
    return this.HttpClient
      .get<BookResponseModel>( `${this.BASEURL}book`, this.header )
      .pipe(delay(this.BASEDELAY), first())
  }

  /**
   * @returns Observable<AuthorResponseModel>
   */
  listAllAuthors() : Observable<AuthorResponseModel> {
    return this.HttpClient
      .get<AuthorResponseModel>( `${this.BASEURL}author`, this.header )
      .pipe(delay(this.BASEDELAY), first());
  }

  /**
   * @returns Observable<PublisherResponseModel>
   */
  listAllPublishers() : Observable<PublisherResponseModel> {
    return this.HttpClient
      .get<PublisherResponseModel>( `${this.BASEURL}publisher`, this.header )
      .pipe(delay(this.BASEDELAY), first());
  }

  /**
   * @returns Observable<UnitResponseModel>
   */
  listAllIbsnsByBook(id: String): Observable<UnitResponseModel> {
    return this.HttpClient
      .get<UnitResponseModel>( `${this.BASEURL}book/ibsn/${id}`, this.header )
      .pipe(delay(this.BASEDELAY), first());
  }

  /**
   * @param book 
   * @returns Observable<BookResponseModel>
   */
  addBook(book: BookPostModel) : Observable<BookResponseModel> {
    return this.HttpClient
      .post<BookResponseModel>( `${this.BASEURL}book/register`, book, this.header )
      .pipe(delay(this.BASEDELAY), first());
  }

  /**
   * @param title 
   * @returns Observable<BookResponseModel>
   */
  getBookByTitle(title: string) : Observable<BookResponseDataModelSingle> {
    return this.HttpClient
      .get<BookResponseDataModelSingle>( `${this.BASEURL}book/${title}`, this.header )
      .pipe(delay(this.BASEDELAY), first());
  }

  /**
   * @param book
   * @returns Observable<BookResponseModel>
  */
  updateBook(book: BookUpdateModel) : Observable<BookResponseModel> {
    return this.HttpClient
      .put<BookResponseModel>( `${this.BASEURL}book`, book, this.header )
      .pipe(delay(this.BASEDELAY), first());
  }

  /**
   * @returns Observable<StudentResponseModel>
   */
  loadStudents() : Observable<StudentResponseModel> {
    return this.HttpClient
      .get<StudentResponseModel>( `${this.BASEURL}student`, this.header )
      .pipe(delay(this.BASEDELAY), first());
  }

  /**
   * @returns Observable<>
   */
  loadNextWeekBorrows() : Observable<BorrowingResponseModel> {
    return this.HttpClient
      .get<BorrowingResponseModel>( `${this.BASEURL}borrowing?filter=nextweek`, this.header )
      .pipe(delay(this.BASEDELAY), first());
  }
}
