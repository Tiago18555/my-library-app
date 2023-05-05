import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalcLoanPipe } from './calc-loan.pipe';
import { CpfPipe } from './cpf.pipe';
import { CnpjPipe } from './cnpj.pipe';



@NgModule({
  declarations: [
    CalcLoanPipe,
    CpfPipe,
    CnpjPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CalcLoanPipe,
    CpfPipe,
    CnpjPipe
  ]
})
export class PipesModule { }
