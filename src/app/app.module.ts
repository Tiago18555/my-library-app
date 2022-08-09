import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { LoginScreenModule } from './pages/login-screen/login-screen.module';
import { CommonModule } from '@angular/common';
import { AppMaterialModule } from './shared/app-material/app-material.module';
import { AuthGuard } from './guards/auth-guard';
import { HomeModule } from './pages/home/home.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    /* APP-MODULES  */
    LoginScreenModule,
    HomeModule,
    
    /* ROUTING-MODULES */
    AppRoutingModule,
    
    /* ANGULAR-MODULES */
    AppMaterialModule,
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
