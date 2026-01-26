import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:3000/api/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  constructor(private http: HttpClient) {}

  // Step 1: Start exam
  startExam(examId: string): Observable<any> {
    return this.http.post(`${API_URL}/start-exam`, { examId });
  }

  // Step 2: Get exam questions
  getExamQuestions(examId: string): Observable<any> {
    return this.http.get(`${API_URL}/exams/${examId}/questions`);
  }

  // Step 3: Save answer
  saveAnswer(attemptId: string, questionId: string, answerData: any): Observable<any> {
    return this.http.post(`${API_URL}/save-answer`, {
      attemptId,
      questionId,
      answerData
    });
  }

  // Step 4: Submit exam
  submitExam(attemptId: string): Observable<any> {
    return this.http.post(`${API_URL}/submit-exam`, { attemptId });
  }

  // Step 5: Get student attempts
  getStudentAttempts(): Observable<any> {
    return this.http.get(`${API_URL}/attempts`);
  }
}

