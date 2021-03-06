import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
//import { StorageServiceModule} from 'angular-webstorage-service';


import { AppComponent } from './app.component';
import { TimesheetsComponent } from './timesheets/timesheets.component';
import { InputComponent } from './input/input.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { AuthComponent } from './auth/auth.component';
//import { HashLocationStrategy, LocationStrategy } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    TimesheetsComponent,
    InputComponent,
    LoginComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule,
    AppRoutingModule,
//    StorageServiceModule
  ],
  providers:  [],
  bootstrap: [AppComponent]
})
export class AppModule { }
