import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth-guard';
import { BooksComponent } from '../books/books.component';
import { HomeComponent } from '../home.component';
import { ProfessorsComponent } from '../professors/professors.component';
import { StudentsComponent } from '../students/students.component';
import { WelcomeComponent } from '../welcome/welcome.component';
import { FinishedComponent } from './finished/finished.component';
import { HistoryComponent } from './history.component';
import { UnfinishedComponent } from './unfinished/unfinished.component';

const routes: Routes = [
  { 
    path: 'home', 
    component: HomeComponent, 
    canActivate: [AuthGuard], 
    children: [
      { 
        path: '', 
        redirectTo: 'welcome', 
        pathMatch: 'full' 
      },
      { 
        path: 'welcome', 
        component: WelcomeComponent
      },
      { 
        path: 'students', 
        component: StudentsComponent
      },
      { 
        path: 'professors', 
        component: ProfessorsComponent
      },
      { 
        path: 'history', 
        component: HistoryComponent,
        children: [
          {
            path: '',
            redirectTo: 'unfinished',
            pathMatch: 'full'
          },
          {
            path: 'unfinished',
            component: UnfinishedComponent
          },
          {
            path: 'finished',
            component: FinishedComponent
          },
        ]
      },
      { 
        path: 'books', 
        component: BooksComponent
      }
    ] 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HistoryRoutingModule { }
