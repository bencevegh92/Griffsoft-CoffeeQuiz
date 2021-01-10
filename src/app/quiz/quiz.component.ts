import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
})
export class QuizComponent implements OnInit {
  question = 'This will be the question by the API';

  categories = [
    { name: 'Random', id: 1 },
    { name: 'Movie Trivia', id: 24 },
    { name: 'Comedians', id: 20 },
    { name: 'Ancient Worlds', id: 14 },
    { name: 'Movies', id: 4 },
  ];

  constructor() {}

  ngOnInit(): void {
  }

}
