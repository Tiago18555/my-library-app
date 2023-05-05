import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentsRoutingModule } from './students-routing.module';
import { DetailsComponent } from './details/details.component';
import { ListComponent } from './list/list.component';
import { CoreModule } from 'src/app/core/core.module';
import { FormsModule } from '@angular/forms';
import { AppMaterialModule } from 'src/app/shared/app-material/app-material.module';
import { BrowserModule } from '@angular/platform-browser';
import { StudentsComponent } from './students.component';
import { AddComponent } from './add/add.component';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';


@NgModule({
  declarations: [
    DetailsComponent,
    ListComponent,
    StudentsComponent,
    AddComponent,
  ],
  imports: [
    CommonModule,
    StudentsRoutingModule,
    CoreModule,
    FormsModule,
    AppMaterialModule,
    BrowserModule,
    PipesModule
  ],
  exports: [
    DetailsComponent,
    ListComponent,
    StudentsComponent,
    AddComponent
  ]
})
export class StudentsModule { }
