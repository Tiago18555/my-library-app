import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginScreenComponent } from './login-screen.component';
import { FormsModule } from '@angular/forms';
import { AppMaterialModule } from 'src/app/shared/app-material/app-material.module';



@NgModule({
  declarations: [
    LoginScreenComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AppMaterialModule
  ],
  exports: [
    LoginScreenComponent
  ]
})
export class LoginScreenModule { }
