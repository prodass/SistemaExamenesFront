import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { SigninComponent } from './pages/signin/signin.component';
import { SignupComponent } from './pages/signup/signup.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { AdminGuard } from './services/admin.guard';
import { UserGuard } from './services/user.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch : 'full'
  },
  {
    path: 'signup',
    component: SignupComponent,
    pathMatch : 'full'
  },
  {
    path: 'signin',
    component: SigninComponent,
    pathMatch : 'full'
  },
  {
    path: 'admin',
    component: AdminDashboardComponent,
    pathMatch : 'full',
    canActivate : [AdminGuard]
  },
  {
    path: 'inicio',
    component: UserDashboardComponent,
    pathMatch : 'full',
    canActivate : [UserGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
