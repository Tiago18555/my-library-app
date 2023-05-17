import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfigsRoutingModule } from './configs-routing.module';
import { RulesComponent } from './rules/rules.component';
import { AboutComponent } from './about/about.component';
import { AuthComponent } from './auth/auth.component';
import { AppMaterialModule } from 'src/app/shared/app-material/app-material.module';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CoreModule } from 'src/app/core/core.module';
import { ConfigsComponent } from './configs.component';


@NgModule({
  declarations: [
    RulesComponent,
    AboutComponent,
    AuthComponent,
    ConfigsComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    ConfigsRoutingModule,
    AppMaterialModule,
    FormsModule,
    BrowserModule
  ],
  exports: [
    RulesComponent,
    AboutComponent,
    AuthComponent,
    ConfigsComponent
  ]
})
export class ConfigsModule { }
