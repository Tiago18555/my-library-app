import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth-guard';
import { HistoryComponent } from '../history/history.component';
import { HomeComponent } from '../home.component';
import { ProfessorsComponent } from '../professors/professors.component';
import { StudentsComponent } from '../students/students.component';
import { WelcomeComponent } from '../welcome/welcome.component';
import { AddComponent } from './add/add.component';
import { AuthorComponent } from './author/author.component';
import { BooksComponent } from './books.component';
import { EditComponent } from './edit/edit.component';
import { ListComponent } from './list/list.component';
import { PublisherComponent } from './publisher/publisher.component';
import { ConfigsComponent } from '../configs/configs.component';
import { RulesComponent } from '../configs/rules/rules.component';


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
      },
      {
        path: 'books',
        component: BooksComponent,
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
            path: 'add',
            component: AddComponent
          },
          {
            path: 'authors',
            component: AuthorComponent
          },
          {
            path: 'publishers',
            component: PublisherComponent
          },
          {
            path: 'edit/:title',
            component: EditComponent
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
export class BooksRoutingModule { }
