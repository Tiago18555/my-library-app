import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { LoginScreenModule } from './pages/login-screen/login-screen.module';
import { CommonModule } from '@angular/common';
import { AppMaterialModule } from './shared/app-material/app-material.module';
import { CoreModule } from './core/core.module';
import { AuthGuard } from './guards/auth-guard';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    /* APP-MODULES  */
    CoreModule,
    LoginScreenModule,
    
    /* ANGULAR-MODULES */
    AppMaterialModule,
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
