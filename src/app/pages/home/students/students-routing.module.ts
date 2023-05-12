import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth-guard';
import { BooksComponent } from '../books/books.component';
import { HistoryComponent } from '../history/history.component';
import { HomeComponent } from '../home.component';
import { ProfessorsComponent } from '../professors/professors.component';
import { WelcomeComponent } from '../welcome/welcome.component';
import { DetailsComponent } from './details/details.component';
import { ListComponent } from './list/list.component';
import { StudentsComponent } from './students.component';
import { AddComponent } from './add/add.component';
import { BorrowComponent } from './borrow/borrow.component';

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
        component: StudentsComponent,
        children: [
          {
            path: '',
            redirectTo: 'list',
            pathMatch: 'full'
          },
          {
            path: 'list',
            component: ListComponent
          },
          {
            path: 'details/:id',
            component: DetailsComponent
          },
          {
            path: 'add',
            component: AddComponent
          },
          {
            path: 'borrow/:id',
            component: BorrowComponent
          }
        ]
      },
      {
        path: 'professors',
        component: ProfessorsComponent
      },
      {
        path: 'history',
        component: HistoryComponent
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
export class StudentsRoutingModule { }
