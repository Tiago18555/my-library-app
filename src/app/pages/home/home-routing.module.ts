import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../guards/auth-guard';
import { BooksComponent } from './books/books.component';
import { HistoryComponent } from './history/history.component';
import { HomeComponent } from './home.component';
import { ProfessorsComponent } from './professors/professors.component';
import { DetailsComponent } from './students/details/details.component';
import { ListComponent } from './students/list/list.component';
import { StudentsComponent } from './students/students.component';
import { WelcomeComponent } from './welcome/welcome.component';

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
  ] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
