import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HistoryRoutingModule } from './history-routing.module';
import { FinishedComponent } from './finished/finished.component';
import { UnfinishedComponent } from './unfinished/unfinished.component';
import { CoreModule } from 'src/app/core/core.module';
import { FormsModule } from '@angular/forms';
import { AppMaterialModule } from 'src/app/shared/app-material/app-material.module';
import { BrowserModule } from '@angular/platform-browser';
import { HistoryComponent } from './history.component';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';


@NgModule({
  declarations: [
    FinishedComponent,
    UnfinishedComponent,
    HistoryComponent
  ],
  imports: [
    CommonModule,
    HistoryRoutingModule,
    CoreModule,
    FormsModule,
    AppMaterialModule,
    BrowserModule,
    PipesModule
  ],
  exports: [
    FinishedComponent,
    UnfinishedComponent,
    HistoryComponent
  ]
})
export class HistoryModule { }
