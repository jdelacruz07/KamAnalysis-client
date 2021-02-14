import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { strategy } from './strategy/strategy.component';

@Injectable({
  providedIn: 'root'
})
export class StrategyService {
  //strategy: string[] = [];
  strategyUrl = environment.url+"api";
  size: string = "100";

  constructor(private http: HttpClient) { }

  updateidea(idea: strategy) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.http.put<strategy>(this.strategyUrl, idea, httpOptions);
  }

  addStrategy(strategy: strategy) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.http.post<strategy>(this.strategyUrl, strategy, httpOptions)
      .pipe(catchError(async (error) => console.log("Error en el add", error)));
  }

  deleteIdea(id) {
    const url = `${this.strategyUrl}/${id}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.http.delete(url, httpOptions)
      .pipe(catchError(async (error) => console.log("Error en el add", error)));
  }

  getIdeas() {
    return this.http.get(this.strategyUrl + `?size=${this.size}`, { observe: 'response' });
  }

}

// export interface strategyResp {
//   content: strategy;
//   pageable: string;
//   sort: string;
// }
