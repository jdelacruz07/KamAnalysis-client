import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GapService {
  gapUrl = environment.url + "gap";

  constructor(private http: HttpClient) { }

  getGaps(page) {
    let url = `${this.gapUrl}?page=${page}`
    return this.http.get(url);
  }

  addGap(gap) {
    return this.http.post(this.gapUrl, gap);
  }

  deleteGap(id) {
    return this.http.delete(`${this.gapUrl}/${id}`);
  }

}
