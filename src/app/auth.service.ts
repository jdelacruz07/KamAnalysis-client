import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

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
    return this.http.post('logout', {});
  }
}


export interface Credentials {
  user: string;
  password: string;
}
