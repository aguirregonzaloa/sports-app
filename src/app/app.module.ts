import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user.component';
import { SpinnerloadingComponent } from './shared/spinnerloading/spinnerloading.component';
import { CreatearticleComponent } from './articles/createarticle/createarticle.component';
import { EditarticleComponent } from './articles/editarticle/editarticle.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
  	HomeComponent,
    NavMenuComponent,
  	RegisterComponent,
  	UserComponent,
  	SpinnerloadingComponent,
  	CreatearticleComponent,
  	EditarticleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
