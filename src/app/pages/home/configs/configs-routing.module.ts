import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../home.component';
import { AuthGuard } from 'src/app/guards/auth-guard';
import { WelcomeComponent } from '../welcome/welcome.component';
import { StudentsComponent } from '../students/students.component';
import { ProfessorsComponent } from '../professors/professors.component';
import { HistoryComponent } from '../history/history.component';
import { BooksComponent } from '../books/books.component';
import { ConfigsComponent } from './configs.component';
import { RulesComponent } from './rules/rules.component';

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
        component: HistoryComponent
      },
      {
        path: 'books',
        component: BooksComponent,
      },
      {
        path: 'configs',
        component: ConfigsComponent,
        children: [
          {
            path: '',
            redirectTo: 'rules',
            pathMatch: 'full'
          },
          {
            path: 'rules',
            component: RulesComponent
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigsRoutingModule { }
