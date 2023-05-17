import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { CoreModule } from 'src/app/core/core.module';
import { FormsModule } from '@angular/forms';
import { AppMaterialModule } from 'src/app/shared/app-material/app-material.module';
import { HomeRoutingModule } from './home-routing.module';
import { WelcomeComponent } from './welcome/welcome.component';
import { BooksModule } from './books/books.module';
import { BrowserModule } from '@angular/platform-browser';
import { StudentsModule } from './students/students.module';
import { HistoryModule } from './history/history.module';
import { ProfessorsModule } from './professors/professors.module';
import { ConfigsModule } from './configs/configs.module';



@NgModule({
  declarations: [
    HomeComponent,
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
    ProfessorsModule,
    HistoryModule,
    BrowserModule,
    ConfigsModule
  ],
  exports: [
    HomeComponent,
    WelcomeComponent
  ]
})
export class HomeModule { }
