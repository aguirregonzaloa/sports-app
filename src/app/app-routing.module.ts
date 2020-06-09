import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user.component';
import { CreatearticleComponent } from './articles/createarticle/createarticle.component';
import { EditarticleComponent } from './articles/editarticle/editarticle.component';


const routes: Routes = [
{path: '', component: HomeComponent},
{path: 'createarticle', component: CreatearticleComponent},
{path: 'editarticle/:id', component: EditarticleComponent},
{path: 'user', component: UserComponent},
{path: 'login', component: LoginComponent},
{path: 'register', component: RegisterComponent},
{path: ':id', component: HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
