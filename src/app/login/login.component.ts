import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
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
  message: string;

  constructor(private http: HttpClient, private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    let session: any = [];
    session = document.cookie
    console.log("Estas son las sesiones ", session)
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
    this.auth.login(credentials).subscribe((reply: HttpResponse<any>) => {
      console.log("Respuesta del back ", reply)
      this.auth.isAuthenticate = true;
      this.router.navigate([''])
    }, (error: Response) => {
      if (error.status == 401) {
        this.message = "Usuario no existe"
        this.sesionError = 'error'
        console.log("El error en login  ", this.message)
      }
      if (error.status == 403) {
        this.message = "Password incorrecta"
        this.sesionError = 'error'
        console.log("El error en login  ", this.message)
      }
    });
  }

  logout() {
    this.auth.logout();
  }

}
