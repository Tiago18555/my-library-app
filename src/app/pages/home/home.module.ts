import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { CoreModule } from 'src/app/core/core.module';
import { StudentsComponent } from './students/students.component';
import { ProfessorsComponent } from './professors/professors.component';
import { HistoryComponent } from './history/history.component';
import { BooksComponent } from './books/books.component';
import { FormsModule } from '@angular/forms';
import { AppMaterialModule } from 'src/app/shared/app-material/app-material.module';
import { HomeRoutingModule } from './home-routing.module';
import { WelcomeComponent } from './welcome/welcome.component';



@NgModule({
  declarations: [
    HomeComponent,
    StudentsComponent,
    ProfessorsComponent,
    HistoryComponent,
    BooksComponent,
    WelcomeComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    FormsModule,
    AppMaterialModule,
    HomeRoutingModule
  ],
  exports: [
    HomeComponent,
    StudentsComponent,
    ProfessorsComponent,
    HistoryComponent,
    BooksComponent,
    WelcomeComponent
  ]
})
export class HomeModule { }
