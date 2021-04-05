import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Strategy } from './strategy/strategy.component';

@Injectable({
  providedIn: 'root'
})
export class StrategyService {
  strategyUrl = environment.url + "strategy";
  size: string = "100";

  constructor(private http: HttpClient) { }

  addStrategy(strategy: Strategy) {
    const httpOptions = this.configHeader();
    return this.http.post<Strategy>(this.strategyUrl, strategy, httpOptions)
      .pipe(catchError(async (error) => console.log("Error en el add", error)));
  }

  getIdeas() {
    return this.http.get(this.strategyUrl + `?size=${this.size}`, { observe: 'response' });
  }

  updateidea(idea: Strategy) {
    const httpOptions = this.configHeader();
    return this.http.put<Strategy>(this.strategyUrl, idea, httpOptions);
  }

  deleteIdea(id) {
    const url = `${this.strategyUrl}/${id}`;
    const httpOptions = this.configHeader();
    return this.http.delete(url, httpOptions)
      .pipe(catchError(async (error) => console.log("Error en el delete", error)));
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
