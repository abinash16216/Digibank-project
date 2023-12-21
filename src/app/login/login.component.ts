import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public loginform!: FormGroup;
  public invalidCredentials = false; // Flag to track invalid credentials

  constructor(private formbuilder: FormBuilder, private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.loginform = this.formbuilder.group({
      username: [''],
      password: ['']
    });
  }

  login(): void { //ngOnInit is a life cycle hook called by Angular to indicate that the Angular is done creating the component.
    this.http.get<any>("http://localhost:3000/authentication")
      .subscribe(res => {
        const user = res.find((a: any) => {
          return a.username === this.loginform.value.username && a.password === this.loginform.value.password;
        });
        if (user) {
          this.router.navigate(['/account-summary']);
        } else {
          this.invalidCredentials = true;
        }
      },
      err => {
        alert('Something went wrong !!');
      });
  }
}
