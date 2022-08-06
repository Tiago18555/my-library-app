import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { LoginScreenComponent } from './login-screen.component';
import { AppMaterialModule } from 'src/app/shared/app-material/app-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    LoginScreenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppMaterialModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CommonModule,
    FormsModule//,
    //ReactiveFormsModule
  ],
  exports: [
    LoginScreenComponent
  ]
})
export class LoginScreenModule { }
