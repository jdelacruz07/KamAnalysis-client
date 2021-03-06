import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService, Credentials } from '../auth.service';
import { Router } from '@angular/router';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    trigger('login', [
      state('continue', style({
        opacity: 1,
        color: '#daf13e',
      })),
      state('error', style({
        opacity: 1,
        color: 'red',
      })),
      transition('* => error', [
        animate('700ms ease-in', keyframes([
          style({ transform: 'translateX(-10px)', offset: 0 }),
          style({ transform: 'translateX(10px)', offset: .1 }),
          style({ transform: 'translateX(-10px)', offset: .2 }),
          style({ transform: 'translateX(10px)', offset: .3 }),
          style({ transform: 'translateX(-10px)', offset: .4 }),
          style({ transform: 'translateX(10px)', offset: .5 }),
          style({ transform: 'translateX(-10px)', offset: .6 }),
          style({ transform: 'translateX(10px)', offset: .7 }),
          style({ transform: 'translateX(-10px)', offset: .8 }),
          style({ transform: 'translateX(10px)', offset: .9 }),
          style({ transform: 'translateX(-10px)', offset: 1 }),
          style({ color: "red", offset: 1 }),
        ]))
      ]),
    ]),

  ]
})
export class LoginComponent implements OnInit {

  password: string;
  user: string;
  sesionError = "continue";

  constructor(private http: HttpClient, private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.verifyUser();
  }

  verifyUser() {
    if (this.auth.authenticated()) {
      this.router.navigate(['']);
    }
  }

  onSubmit() {
    this.sesionError = "continue";
    let credentials: Credentials = { user: this.user, password: this.password }
    this.auth.login(credentials).subscribe(() => {
      this.auth.isAuthenticate = true;
      this.router.navigate([''])
    }, error => {
      this.sesionError = "error";
      console.log("El error es ", error)
    });
  }

  logout() {
    this.auth.logout();
  }

}
