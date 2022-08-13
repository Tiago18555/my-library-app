import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BooksRoutingModule } from './books-routing.module';
import { ListComponent } from './list/list.component';
import { PublisherComponent } from './publisher/publisher.component';
import { AuthorComponent } from './author/author.component';
import { AddComponent } from './add/add.component';
import { BooksComponent } from './books.component';
import { CoreModule } from 'src/app/core/core.module';
import { FormsModule } from '@angular/forms';
import { AppMaterialModule } from 'src/app/shared/app-material/app-material.module';
import { EditComponent } from './edit/edit.component';
import { BrowserModule } from '@angular/platform-browser';
import { HomeRoutingModule } from '../home-routing.module';


@NgModule({
  declarations: [
    ListComponent,
    PublisherComponent,
    AuthorComponent,
    AddComponent,
    BooksComponent,
    EditComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    FormsModule,
    AppMaterialModule,
    BooksRoutingModule,
    BrowserModule
  ],
  exports: [
    ListComponent,
    PublisherComponent,
    AuthorComponent,
    AddComponent,
    BooksComponent,
    EditComponent
  ]
})
export class BooksModule { }

