import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService} from '../auth.service';
import { AppLoginData} from '../appLoginData';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  inputForm;
  userData: AppLoginData;

  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService, private messageService: MessageService) {
    this.inputForm = this.formBuilder.group({
      appUser: '',
      password: ''
    });
   }

  ngOnInit(): void {
  }

  submitLoginData(inputData){
    this.authService.authenticateUser(inputData.appUser, inputData.password).subscribe(res=>{
        this.userData= res;
        console.log(this.userData.appUser+" ist angemeldet");
        sessionStorage.setItem('appUser', this.userData.appUser);
        if(this.userData.student){
            sessionStorage.setItem('group', "student");
        }
        else{
            sessionStorage.setItem('group', 'manager');
        }
        this.router.navigate(['/timesheets']);
    }, err=>{
        this.messageService.alertMessage=err.error;
    })
  }

}
