import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfigsRoutingModule } from './configs-routing.module';
import { RulesComponent } from './rules/rules.component';
import { AboutComponent } from './about/about.component';
import { AuthComponent } from './auth/auth.component';


@NgModule({
  declarations: [
    RulesComponent,
    AboutComponent,
    AuthComponent
  ],
  imports: [
    CommonModule,
    ConfigsRoutingModule
  ]
})
export class ConfigsModule { }
