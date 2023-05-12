import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfessorsRoutingModule } from './professors-routing.module';
import { AddComponent } from './add/add.component';
import { DetailsComponent } from './details/details.component';
import { ListComponent } from './list/list.component';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { CoreModule } from 'src/app/core/core.module';
import { FormsModule } from '@angular/forms';
import { AppMaterialModule } from 'src/app/shared/app-material/app-material.module';
import { BrowserModule } from '@angular/platform-browser';
import { ProfessorsComponent } from './professors.component';
import { BorrowComponent } from './borrow/borrow.component';


@NgModule({
  declarations: [
    AddComponent,
    DetailsComponent,
    ListComponent,
    ProfessorsComponent,
    BorrowComponent
  ],
  imports: [
    CommonModule,
    ProfessorsRoutingModule,
    CoreModule,
    FormsModule,
    AppMaterialModule,
    BrowserModule,
    PipesModule
  ],
  exports: [
    AddComponent,
    DetailsComponent,
    ListComponent,
    ProfessorsComponent
  ]
})
export class ProfessorsModule { }
