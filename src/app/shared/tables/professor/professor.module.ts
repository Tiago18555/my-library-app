import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfessorComponent } from './professor.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppMaterialModule } from '../../app-material/app-material.module';



@NgModule({
  declarations: [
    ProfessorComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AppMaterialModule,
    BrowserModule
  ],
  exports: [
    ProfessorComponent
  ]
})
export class ProfessorModule { }
