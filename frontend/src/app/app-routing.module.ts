import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { InputComponent } from './input/input.component';
import { TimesheetsComponent } from './timesheets/timesheets.component';
import { LoginComponent} from './login/login.component';
import { AuthComponent} from './auth/auth.component';

const routes: Routes=[
  { path:'input', component: InputComponent},
  { path: 'timesheets', component: TimesheetsComponent},
  { path: 'login', component: LoginComponent},
  { path: 'auth', component: AuthComponent},
  { path: '', redirectTo: '/auth', pathMatch: 'full' }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
