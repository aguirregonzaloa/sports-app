import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user.component';
import { CreatearticleComponent } from './articles/createarticle/createarticle.component';


const routes: Routes = [
{path: '', component: HomeComponent},
{path: 'men', component: HomeComponent},
{path: 'women', component: HomeComponent},
{path: 'kids', component: HomeComponent},
{path: 'createarticle', component: CreatearticleComponent},
{path: 'user', component: UserComponent},
{path: 'login', component: LoginComponent},
{path: 'register', component: RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
