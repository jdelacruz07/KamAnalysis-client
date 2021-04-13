import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticate: boolean = false;
  router: any;

  constructor(private http: HttpClient) { }

  authenticated() {
    return this.isAuthenticate;
  }

  login(credentials: Credentials) {
    const headers = new HttpHeaders(credentials ? {
      authorization: 'Basic ' + btoa(credentials.user + ':' + credentials.password)
    } : {});
    return this.http.get('user', { headers: headers });
  }

  logout() {
    // const CSRF_TOKEN = document.cookie.match(new RegExp(`XSRF-TOKEN=([^;]+)`))[1];
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/json',
    //     'X-XSRF-TOKEN': CSRF_TOKEN 
    //   })
    // };
    return this.http.post('logout', {}).subscribe(() => {
      this.isAuthenticate = false;
    });
  }
}


export interface Credentials {
  user: string;
  password: string;
}
