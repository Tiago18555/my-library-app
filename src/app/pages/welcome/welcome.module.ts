import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeComponent } from './welcome.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from 'src/app/shared/app-material/app-material.module';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { BrowserModule } from '@angular/platform-browser';



@NgModule({
  declarations: [
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppMaterialModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CommonModule,
    FormsModule
  ],
  exports: [
    WelcomeComponent
  ]
})
export class WelcomeModule { }
