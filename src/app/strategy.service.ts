import { HttpClient } from '@angular/common/http';
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
    return this.http.post<Strategy>(this.url, strategy);
  }

  getAllStrategies() {
    let urlWithParams = `${this.url}?page=0&size=4`;
    return this.http.get<Pageable>(urlWithParams);
  }

  updateStrategy(strategy: Strategy) {
    return this.http.put<Strategy>(this.url, strategy);
  }

  deleteStrategy(id) {
    return this.http.delete<Strategy>("${this.url}/${id}");
  }

}
