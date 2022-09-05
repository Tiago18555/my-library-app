import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { CoreModule } from 'src/app/core/core.module';
import { StudentsComponent } from './students/students.component';
import { ProfessorsComponent } from './professors/professors.component';
import { HistoryComponent } from './history/history.component';
import { FormsModule } from '@angular/forms';
import { AppMaterialModule } from 'src/app/shared/app-material/app-material.module';
import { HomeRoutingModule } from './home-routing.module';
import { WelcomeComponent } from './welcome/welcome.component';
import { BooksModule } from './books/books.module';
import { BrowserModule } from '@angular/platform-browser';
import { DetailsComponent } from './students/details/details.component';
import { StudentsModule } from './students/students.module';
import { HistoryModule } from './history/history.module';



@NgModule({
  declarations: [
    HomeComponent,
    ProfessorsComponent,
    WelcomeComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    FormsModule,
    AppMaterialModule,
    HomeRoutingModule,
    BooksModule,
    StudentsModule,
    HistoryModule,
    BrowserModule
  ],
  exports: [
    HomeComponent,
    ProfessorsComponent,
    WelcomeComponent
  ]
})
export class HomeModule { }
