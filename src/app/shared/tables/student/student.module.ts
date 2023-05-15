import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentComponent } from './student.component';



@NgModule({
  declarations: [
    StudentComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    StudentComponent
  ]
})
export class StudentModule { }
