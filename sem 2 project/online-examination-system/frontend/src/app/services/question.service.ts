import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:3000/api/questions';

export interface Question {
  _id?: string;
  question_text: string;
  question_type: 'MCQ' | 'TRUE_FALSE' | 'SHORT_ANSWER' | 'ESSAY';
  category_id?: string;
  difficulty_level: 'EASY' | 'MEDIUM' | 'HARD';
  marks: number;
  options?: Option[];
}

export interface Option {
  _id?: string;
  option_text: string;
  is_correct: boolean;
  order_number: number;
}

export interface Category {
  _id?: string;
  category_name: string;
  description?: string;
}

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  constructor(private http: HttpClient) {}

  // Step 1: Get all questions
  getAllQuestions(filters?: any): Observable<any> {
    return this.http.get(`${API_URL}/questions`, { params: filters });
  }

  // Step 2: Get question by ID
  getQuestionById(id: string): Observable<any> {
    return this.http.get(`${API_URL}/questions/${id}`);
  }

  // Step 3: Create question
  createQuestion(question: Question): Observable<any> {
    return this.http.post(`${API_URL}/questions`, question);
  }

  // Step 4: Update question
  updateQuestion(id: string, question: Question): Observable<any> {
    return this.http.put(`${API_URL}/questions/${id}`, question);
  }

  // Step 5: Delete question
  deleteQuestion(id: string): Observable<any> {
    return this.http.delete(`${API_URL}/questions/${id}`);
  }

  // Step 6: Get all categories
  getAllCategories(): Observable<any> {
    return this.http.get(`${API_URL}/categories`);
  }

  // Step 7: Create category
  createCategory(category: Category): Observable<any> {
    return this.http.post(`${API_URL}/categories`, category);
  }
}

