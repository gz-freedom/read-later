import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReadService {
  constructor(private http: HttpClient) { }

  addArticle(title, url, tags) {
    return this.http.post(`http://localhost:4000/add`, {
      title: title,
      url: url,
      tags: tags
    })
  }

  getArticles() {
    return this.http.get(`http://localhost:4000/get`)
  }
}
