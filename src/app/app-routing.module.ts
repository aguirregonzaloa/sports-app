import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user.component';
import { CreatearticleComponent } from './articles/createarticle/createarticle.component';
import { EditarticleComponent } from './articles/editarticle/editarticle.component';
import { AuthGuard } from './services/authguard/authguard.service';


const routes: Routes = [
{path: '', component: HomeComponent },
{path: 'category/:id', component: HomeComponent},
{path: 'createarticle', component: CreatearticleComponent, canActivate:[AuthGuard]},
{path: 'editarticle/:id', component: EditarticleComponent},
{path: 'user', component: UserComponent, canActivate:[AuthGuard]},
{path: 'login', component: LoginComponent},
{path: 'register', component: RegisterComponent},
{path:'**', redirectTo: '/'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
