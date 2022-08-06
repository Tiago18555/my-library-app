import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth-guard';
import { LoginScreenComponent } from './pages/login-screen/login-screen.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'welcome', component: WelcomeComponent, canActivate: [ AuthGuard ] },
  { path: 'login', component: LoginScreenComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
