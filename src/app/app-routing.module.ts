import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user.component';


const routes: Routes = [
{path: '', component: HomeComponent},
{path: 'men', component: HomeComponent},
{path: 'women', component: HomeComponent},
{path: 'kids', component: HomeComponent},
{path: 'user', component: UserComponent},
{path: 'login', component: LoginComponent},
{path: 'register', component: RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
