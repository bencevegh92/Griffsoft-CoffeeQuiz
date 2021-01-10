import { GetQuestionService } from './../service/get-questions.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
})
export class QuizComponent implements OnInit {
  /* Variables */
  question: string = '';
  serverAnswer: string = '';
  userAnswer: string = '';
  questions: any;
  isCorrect: boolean = false;
  hasAnswer: boolean = false;
  index: number = 0;
  responseData: any;
  isHelpRequred: boolean = false
  isLoading: boolean = false;
  categories = [
    { name: 'Random', id: 1 },
    { name: 'Movie Trivia', id: 24 },
    { name: 'Comedians', id: 20 },
    { name: 'Ancient Worlds', id: 14 },
    { name: 'Sports', id: 42 },
  ];

  constructor(private QuestionService: GetQuestionService) {}
  /* Get random question on "app start" */
  ngOnInit(): void {
    this.getRandomQuestion();
  }
  /* Responsible for getting data */
  /* Responsible changing the loading spinner while fetching */
  getRandomQuestion() {
    this.isLoading = true;
    this.QuestionService.getRandomQuestions().subscribe((response) => {
      this.questions = response;
      this.separateQuestion();
      this.isLoading = false
    });
  }
  /* Responsible for get the question and the answer */
  separateQuestion() {
    this.question = this.questions[this.index].question;
    this.serverAnswer = this.questions[this.index].answer;
  }
  /* Responsible for get questions from the selected category(ID) */
  /* Responsible changing the loading spinner while fetching */
  selectCategory(id: number) {
    this.isLoading = true;
    if (id > 1) {
      this.QuestionService.getQuestionByCategory(id).subscribe((response) => {
        this.responseData = response;
        this.questions = this.responseData.clues;
        this.separateQuestion();
        this.isLoading = false
      });
    } else {
      this.getRandomQuestion();
    }
  }

  /* Responsible for check the user answer */
  onSubmit() {
    /* If the input is not empty */
    if (this.userAnswer.length > 0) {
      this.hasAnswer = true;
      /* toUpperCase() -to prefix the answer validation */
      if (this.userAnswer.toUpperCase() == this.serverAnswer.toUpperCase()) {
        this.isCorrect = true;
      } else {
        this.isCorrect = false;
      }
    } else {
      alert('You must give an answer!');
    }
  }

  nextQuestion() {
    this.hasAnswer = false;
    if (this.questions.length > 1) {
      if (this.index === this.questions.length - 1) {
        this.index = 1;
      } else {
        this.index++;
      }
      this.separateQuestion();
      this.userAnswer = '';
    } else {
      this.getRandomQuestion();
      this.userAnswer = '';
    }
  }

  /* Display the answer for the user */
  showAnswer() {
    this.isHelpRequred = !this.isHelpRequred;
  }
}
