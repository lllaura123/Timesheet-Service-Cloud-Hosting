import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse} from '@angular/common/http';
import {AppLoginData} from './appLoginData';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url: string= 'https://'+window.location.hostname+':8080/auth/';

  constructor(private http: HttpClient) { }

    authenticateUser(userName, password){
        const params:HttpParams= new HttpParams().set('appUser', userName).set('password', password);
        return this.http.get<AppLoginData>(this.url, {params: params});
    }
}
