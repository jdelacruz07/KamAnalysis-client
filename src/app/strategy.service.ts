import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Strategy } from './analysis/analysis.component';
import { Pageable } from './statistics/statistics.component';

@Injectable({
  providedIn: 'root'
})
export class StrategyService {

  url = environment.url + "strategy";

  constructor(private http: HttpClient) { }

  addStrategy(strategy: Strategy) {
    const CSRF_TOKEN = document.cookie.match(new RegExp(`XSRF-TOKEN=([^;]+)`))[1];
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-XSRF-TOKEN': CSRF_TOKEN
      })
    }
    return this.http.post<Strategy>(this.url, strategy, httpOptions);
  }

  getAllStrategies() {
    let urlWithParams = `${this.url}?page=0&size=4&sort=id,desc`;
    return this.http.get<Pageable>(urlWithParams);
  }

  updateStrategy(strategy: Strategy) {
    return this.http.put<Strategy>(this.url, strategy);
  }

  deleteStrategy(id) {
    return this.http.delete<Strategy>("${this.url}/${id}");
  }

}
