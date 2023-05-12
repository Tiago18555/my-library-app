import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, delay, first, tap } from 'rxjs/operators';
import { AuthRequestModel, ValidateRequestModel } from '../models/request-models/auth';
import { BookPostModel, BookUpdateModel } from '../models/request-models/book';
import { AuthResponseModel, ValidateResponseModel } from '../models/response-models/auth';
import { AuthorResponseModel } from '../models/response-models/author';
import { BookResponseDataModelSingle, BookResponseModel, UnitResponseModel } from '../models/response-models/book';
import { BorrowingResponseModel } from '../models/response-models/borrowing';
import { PublisherResponseModel } from '../models/response-models/publisher';
import { StudentResponseModel, StudentResponseModelSingle } from '../models/response-models/student';
import { LocalStorageService } from './local-storage.service';
import { StudentPostModel, StudentUpdateModel } from '../models/request-models/student';
import { ProfessorPostModel, ProfessorUpdateModel } from '../models/request-models/professor';
import { ProfessorResponseModel, ProfessorResponseModelSingle } from '../models/response-models/professor';
import { ConfigPostModel } from '../models/request-models/config';
import { ConfigResponseModel, ConfigResponseModelHistory } from '../models/response-models/config';
import { BorrowingPatchModel } from '../models/request-models/borrowing';

interface NoDataResponse {
  httpstatus: string;
  data?: any;
	token?: string;
}


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
  //private readonly BASEURL = 'http://localhost:8080/';
  private readonly BASEURL = 'https://mylibrary-production.up.railway.app/';


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

  getStudentByCpf(cpf: string) : Observable<StudentResponseModelSingle> {
    return this.HttpClient
      .get<StudentResponseModelSingle>( `${this.BASEURL}student/${cpf}`, this.header )
      .pipe(delay(this.BASEDELAY), first());
  }

  addStudent(student: StudentPostModel): Observable<StudentResponseModelSingle> {
    return this.HttpClient
      .post<StudentResponseModelSingle>( `${this.BASEURL}student/register`, student, this.header )
      .pipe(delay(this.BASEDELAY), first());
  }

  updateStudent(student: StudentUpdateModel): Observable<StudentResponseModelSingle> {
    return this.HttpClient
      .put<StudentResponseModelSingle>( `${this.BASEURL}student`, student, this.header )
      .pipe(delay(this.BASEDELAY), first());
  }

  /**
   * @returns Observable<ProfessorResponseModel>
   */

  loadProfessors() : Observable<ProfessorResponseModel> {
    return this.HttpClient
      .get<ProfessorResponseModel>( `${this.BASEURL}professor`, this.header )
      .pipe(delay(this.BASEDELAY), first());
  }

  getProfessorByCpf(cpf: string) : Observable<ProfessorResponseModelSingle> {
    return this.HttpClient
      .get<ProfessorResponseModelSingle>( `${this.BASEURL}professor/${cpf}`, this.header )
      .pipe(delay(this.BASEDELAY), first());
  }

  addProfessor(student: ProfessorPostModel): Observable<ProfessorResponseModelSingle> {
    return this.HttpClient
      .post<ProfessorResponseModelSingle>( `${this.BASEURL}professor/register`, student, this.header )
      .pipe(delay(this.BASEDELAY), first());
  }

  updateProfessor(professor: ProfessorUpdateModel): Observable<ProfessorResponseModelSingle> {
    return this.HttpClient
      .put<ProfessorResponseModelSingle>( `${this.BASEURL}professor`, professor, this.header )
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

  /**
   * @returns Observable<BorrowingResponseModel>
   */
  loadFinishedBorrows() : Observable<BorrowingResponseModel> {
    return this.HttpClient
      .get<BorrowingResponseModel>( `${this.BASEURL}borrowing?filter=finished`, this.header )
      .pipe(delay(this.BASEDELAY), first());
  }

  /**
   * @returns Observable<BorrowingResponseModel>
   */
  loadUnfinishedBorrows() : Observable<BorrowingResponseModel> {
    return this.HttpClient
      .get<BorrowingResponseModel>( `${this.BASEURL}borrowing?filter=unfinished`, this.header )
      .pipe(delay(this.BASEDELAY), first());
  }

  /**
   * @returns Observable<BorrowingResponseModel>
   */
  VerifyBorrowsFromClient(id: String) : Observable<StudentResponseModelSingle> {
    return this.HttpClient
      .get<StudentResponseModelSingle>( `${this.BASEURL}borrowing/${id}`, this.header )
      .pipe(delay(this.BASEDELAY), first());
  }

  VerifyBorrowLimitFromClient(id: String) : Observable<ProfessorResponseModelSingle> {
    return this.HttpClient
      .get<ProfessorResponseModelSingle>( `${this.BASEURL}borrowing/professor/${id}`, this.header )
      .pipe(
        delay(this.BASEDELAY),
        first());
  }

  DoDevolution(clientId: string, ibsn: BorrowingPatchModel) : Observable<NoDataResponse> {
    return this.HttpClient
      .patch<NoDataResponse>( `${this.BASEURL}borrowing/${clientId}`, ibsn, this.header )
      .pipe(delay(this.BASEDELAY), first());
  }

  DoBorrow(clientId: string, ibsn: BorrowingPatchModel) : Observable<NoDataResponse> {
    return this.HttpClient
      .post<NoDataResponse>( `${this.BASEURL}borrowing/${clientId}`, ibsn, this.header )
      .pipe(delay(this.BASEDELAY), first());
  }

  /**
   * @returns Observable<ConfigResponseModel>
   */
  changeConfiguration(config: ConfigPostModel) : Observable<ConfigResponseModel> {
    return this.HttpClient
      .post<ConfigResponseModel>( `${this.BASEURL}configuration`, config, this.header )
      .pipe(delay(this.BASEDELAY), first());
  }

  getLatestConfiguration() : Observable<ConfigResponseModel> {
    return this.HttpClient
      .get<ConfigResponseModel>( `${this.BASEURL}configuration/latest`, this.header )
      .pipe(delay(this.BASEDELAY), first());
  }

  getConfigurationById(id: string) : Observable<ConfigResponseModel> {
    return this.HttpClient
      .get<ConfigResponseModel>( `${this.BASEURL}configuration/${id}`, this.header )
      .pipe(delay(this.BASEDELAY), first());
  }

  getAllConfigurations() : Observable<ConfigResponseModelHistory> {
    return this.HttpClient
      .get<ConfigResponseModelHistory>( `${this.BASEURL}configuration`, this.header )
      .pipe(delay(this.BASEDELAY), first());
  }
}
