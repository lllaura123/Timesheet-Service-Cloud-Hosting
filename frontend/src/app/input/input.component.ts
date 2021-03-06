import { Component, OnInit } from '@angular/core';
import { TimesheetService } from '../timesheet.service';
import { MessageService } from '../message.service';
import {LoginData} from '../loginData';

import { HttpHeaders} from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {
  inputForm;
  loginData: LoginData;
  errorMessage: string= null;

  constructor(private timesheetService: TimesheetService, private formBuilder: FormBuilder, private router: Router, private messageService: MessageService) {
    this.inputForm = this.formBuilder.group({
      firstName: '',
      lastName: '',
      userName: '',
      studentPassword: '',
      isStudent: ''
    });
    this.loginData= this.timesheetService.loginData;
  }

  ngOnInit(): void {
      if (sessionStorage.getItem('appUser')==null){
          this.router.navigate(['/auth']);
      }
  }

  async submitStudentData(studentData){
    if (sessionStorage.getItem('loginUserName')==null||sessionStorage.getItem('password')==null){
      this.messageService.observeLoginData().subscribe(exists=>{
      if(exists){
          this.timesheetService.postNewStudent(studentData)
          .subscribe(res=> {this.messageService.message= res;
          this.router.navigate(['/timesheets']);
          },err=>{
            if (err.status==0) this.messageService.alertMessage=$localize`:@@connectionRefused:Verbindung wurde abgelehnt`;
            else if(err.status==500) this.messageService.alertMessage=$localize`:@@serverError:500: Internal Servererror. Es könnte ein Problem mit der Proxy Konfiguration sein.`;
            else if(err.status>=400) this.messageService.alertMessage=err.error;
            this.inputForm.reset();
          });
      }});
      this.router.navigate(['/login']);
    } else{
        await this.timesheetService.postNewStudent(studentData)
          .subscribe(res=> {this.messageService.message= res;
          this.router.navigate(['/timesheets']);
          },err=>{
            if (err.status==0) this.messageService.alertMessage=$localize`:@@connectionRefused:Verbindung wurde abgelehnt`;
            else if(err.status==500) this.messageService.alertMessage=$localize`:@@serverError:500: Internal Servererror. Es könnte ein Problem mit der Proxy Konfiguration sein.`;
            else if(err.status>=400) this.messageService.alertMessage=err.error;
        });
      this.errorMessage==null;
      this.inputForm.reset();
    }
  }

  cancel(){
    this.router.navigate(['/timesheets']);
  }

  close(){
    document.getElementById("alert").style.display= "none";
  }

}
