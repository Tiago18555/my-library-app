import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { BookPostModel, BookUpdateModel } from 'src/app/models/request-models/book';
import { BookModel, BookResponseDataModel, BookResponseDataModelSingle } from 'src/app/models/response-models/book';
import { MyLibraryApiService } from 'src/app/services/my-library-api.service';

interface SelectOutput {
  name: string;
  id: string;
}

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  constructor(
    private service : MyLibraryApiService,
    public router : Router
  ) { }

  public title = decodeURI(this.router.routerState.snapshot.url).replace('/home/books/edit/', '')
  
  //VISUAL CONTROLS
  public disableSubmit : boolean = true;
  private readonly MINIMUM_TITLE_FIELD_SIZE : number = 3
  private readonly MAXIMUM_TITLE_FIELD_SIZE : number = 39
  private readonly MINIMUM_DESCRIPTION_FIELD_SIZE : number = 10
  private readonly MAXIMUM_DESCRIPTION_FIELD_SIZE : number = 2048
  private readonly MINIMUM_QUANTITY_SIZE : number = 1
  
  public authors$ : Observable<any> = of([])
  public publishers$ : Observable<any> = of([])
  public formFields$ : Observable<any> = of([])
  public units$ : Observable<any> = of([])

  public authorSelected : SelectOutput = { name: '', id: '' }
  public publisherSelected : SelectOutput = { name: '', id: '' }
  public bookSelected : string = '';
  public unitIsSelected : boolean = false;

  public bookId : string = '';

  ngOnInit() {
    this.editBook()
  }
  
  /**
   * @description Verifica se os campos do formulário estão preenchidos para habilitar o botão de submit.
   */
  controlSubmit(input : BookResponseDataModel) : void {
    
    if(this.fieldsAreValid(input)) {
      this.disableSubmit = false
    } else {
      this.disableSubmit = true
    }
  }
  
  public fieldsAreValid(input : BookResponseDataModel) : boolean {   

    return (
      input.title.length >= this.MINIMUM_TITLE_FIELD_SIZE &&
      input.title.length <= this.MAXIMUM_TITLE_FIELD_SIZE &&
      input.availableAmount >= this.MINIMUM_QUANTITY_SIZE &&
      (     
        input.description === '' ||
        input.description.length > this.MINIMUM_DESCRIPTION_FIELD_SIZE
      ) 
        ||
      (
        input.description === '' &&
        input.description.length > this.MAXIMUM_DESCRIPTION_FIELD_SIZE
      )
    )
  }

  applyClass(i: any) {
    
  }

  setAuthor(author : MatSelect) : void {
    this.authorSelected = author.value
    console.log(this.authorSelected);
    
  }
  setPublisher(publisher : MatSelect) : void {
    this.publisherSelected = publisher.value
    console.log(this.publisherSelected);
  }

  /**
   * @description Limpa todos os campos do formulário.
   */

  onSubmit(params: NgForm) : void {  

    let book : BookUpdateModel;

    console.log(this.bookSelected);
    

    const DO_UPDATE = ( book: BookUpdateModel ) => {
      console.table(book)
      this.service.updateBook(book).subscribe(res => {
        if (res.httpstatus === 'OK') {
          alert('Livro atualizado com sucesso!')
          this.editBook()
        }
        else if (res.httpstatus !== 'OK') {
          alert('Erro ao atualizar o livro: ' + res.httpstatus)
          
        }
      })
    }
    /**
     * @region essa sequencia de condicionais são para controlar quais campos serão enviados para a API
     */
    

    if (this.authorSelected.id !== '' && this.publisherSelected.id !== '') {
      book = {
        id: this.bookSelected,
        publisher : this.publisherSelected.id,
        availableAmount : params.form.value.formFielavailableAmount,
        description : params.form.value.descricao,
        author : this.authorSelected.id,
        title : params.form.value.title
      }
      DO_UPDATE(book)
    }
    
    if (this.authorSelected.id !== '' && this.publisherSelected.id === '') {      
      book = {
        id: this.bookSelected,
        author : this.authorSelected.id,
        availableAmount : params.form.value.formFielavailableAmount,
        description : params.form.value.descricao,
        title : params.form.value.title
      }
      DO_UPDATE(book)
    }

    if (this.publisherSelected.id !== '' && this.authorSelected.id === '') {
      book = {
        id: this.bookSelected,
        publisher : this.publisherSelected.id,
        availableAmount : params.form.value.formFielavailableAmount,
        description : params.form.value.descricao,
        title : params.form.value.title
      }
      DO_UPDATE(book)
    }

    if (this.publisherSelected.id === '' && this.authorSelected.id === '') {
      book = {
        id: this.bookSelected,
        availableAmount : params.form.value.formFielavailableAmount,
        description : params.form.value.descricao,
        title : params.form.value.title
      }
      DO_UPDATE(book)
    }

    /**
     * @endregion
     */
  }

  editBook() : void {

    this.formFields$ = this.service.getBookByTitle(this.title)
    this.authors$ = this.service.listAllAuthors()
    this.publishers$ = this.service.listAllPublishers()
    this.formFields$.subscribe(response => {
      this.authorSelected = { name: response.data.authorName, id: '' }
      this.publisherSelected = { name: response.data.publisher.publisherName, id: '' }
      this.bookSelected = response.data.id
      console.log(response);      
      this.units$ = this.service.listAllIbsnsByBook(this.bookSelected)
    })
  }

  selectUnit(e: any, ev: any) : void {


    
    if (ev.srcElement.parentElement.classList.contains("selected")) {
      ev.srcElement.parentElement.classList.add("unselected")
      ev.srcElement.parentElement.classList.remove("selected")
    } else {
      ev.srcElement.parentElement.classList.add("selected")
      ev.srcElement.parentElement.classList.remove("un0selected")
    }
    
    
    
    //console.log(e);    
    this.unitIsSelected = !this.unitIsSelected
  }

  getIndex(index: any) {
    //console.log(index);
    console.log(this.index)
    
  }

  @ViewChild('index')
  public index : any;
}
