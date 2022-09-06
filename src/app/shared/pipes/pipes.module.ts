import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalcLoanPipe } from './calc-loan.pipe';



@NgModule({
  declarations: [
    CalcLoanPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CalcLoanPipe
  ]
})
export class PipesModule { }
