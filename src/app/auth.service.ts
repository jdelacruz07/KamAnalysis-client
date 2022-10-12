import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url = environment.url;
  isAuthenticate: boolean = false;
  router: any;

  constructor(private http: HttpClient) {}

  authenticated() {
    return this.isAuthenticate;
  }

  login(credentials: Credentials) {
    // ******************* Para Java +++++++++++++++++++++++++++++
    const httpOptions = {
      headers: new HttpHeaders(
        credentials
          ? {
              authorization:
                'Basic ' + btoa(credentials.user + ':' + credentials.password),
            }
          : {}
      ),
    };

    return this.http.get(`${this.url}user`, httpOptions);

    // ******************* Para Flask +++++++++++++++++++++++++++++
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/json',
    //     // }),
    //   }), withCredentials: true,
    // };

    // return this.http.post(`${this.url}/auth/login`, credentials, httpOptions);
  }

  logout() {
    const CSRF_TOKEN = document.cookie.match(
      new RegExp(`XSRF-TOKEN=([^;]+)`)
    )[1];
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-XSRF-TOKEN': CSRF_TOKEN,
      }),
    };
    return this.http.post(`${this.url}logout`, {}).subscribe(() => {
      this.isAuthenticate = false;
    });
  }
}

export interface Credentials {
  user: string;
  password: string;
}

function HttpResponse<T>(
  arg0: string,
  arg1: { username: string; password: string }
) {
  throw new Error('Function not implemented.');
}
