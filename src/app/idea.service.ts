import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Strategy } from './analysis/analysis.component';
import { Idea } from './idea/idea.component';

@Injectable({
  providedIn: 'root'
})
export class IdeaService {
  ideaUrl = environment.url + "idea";
  size: string = "100";

  constructor(private http: HttpClient) { }

  addStrategy(idea: Idea) {
    const httpOptions = this.configHeader();
    return this.http.post<Idea>(this.ideaUrl, idea, httpOptions)
      .pipe(catchError(async (error) => console.log("Error en el add", error)));
  }

  getIdeas() {
    return this.http.get(this.ideaUrl + `?size=${this.size}`, { observe: 'response' });
  }

  updateidea(idea: Idea) {
    const httpOptions = this.configHeader();
    return this.http.put<Idea>(this.ideaUrl, idea, httpOptions);
  }

  deleteIdea(id) {
    const url = `${this.ideaUrl}/${id}`;
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
