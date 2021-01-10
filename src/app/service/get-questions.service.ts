import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class GetQuestionService {
  constructor(private http: HttpClient) {}

  getRandomQuestions() {
    return this.http.get('http://jservice.io/api/random');
  }

  getQuestionByCategory(id: number) {
    return this.http.get(`http://jservice.io/api/category?id=${id}`);
  }
}
