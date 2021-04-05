import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GapService {
  gapUrl = environment.url + "gap";

  constructor(private http: HttpClient) { }

  addGap(gap) {
    const httpOptions = this.configHeader();
    return this.http.post(this.gapUrl, gap, httpOptions);
  }

  getGaps(page) {
    let url = `${this.gapUrl}?page=${page}`
    return this.http.get(url);
  }

  deleteGap(id) {
    const httpOptions = this.configHeader();
    return this.http.delete(`${this.gapUrl}/${id}`, httpOptions);
  }

  configHeader() {
    const CSRF_TOKEN = document.cookie.match(new RegExp(`XSRF-TOKEN=([^;]+)`))[1];
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-XSRF-TOKEN': CSRF_TOKEN
      })
    }
    return httpOptions;
  }

}
