import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:3000/api/exams';

export interface Exam {
  _id?: string;
  exam_name: string;
  description?: string;
  duration: number;
  total_marks: number;
  passing_score: number;
  start_time: Date;
  end_time: Date;
  status: 'DRAFT' | 'SCHEDULED' | 'ACTIVE' | 'COMPLETED' | 'CANCELLED';
}

@Injectable({
  providedIn: 'root'
})
export class ExamService {
  constructor(private http: HttpClient) {}

  // Step 1: Get all exams
  getAllExams(filters?: any): Observable<any> {
    return this.http.get(`${API_URL}/exams`, { params: filters });
  }

  // Step 2: Get exam by ID
  getExamById(id: string): Observable<any> {
    return this.http.get(`${API_URL}/exams/${id}`);
  }

  // Step 3: Create exam
  createExam(exam: Exam): Observable<any> {
    return this.http.post(`${API_URL}/exams`, exam);
  }

  // Step 4: Update exam
  updateExam(id: string, exam: Exam): Observable<any> {
    return this.http.put(`${API_URL}/exams/${id}`, exam);
  }

  // Step 5: Delete exam
  deleteExam(id: string): Observable<any> {
    return this.http.delete(`${API_URL}/exams/${id}`);
  }

  // Step 6: Generate question paper
  generateQuestionPaper(data: {
    examId: string;
    questionPool: string[];
    difficultyRatio?: { easy: number; medium: number; hard: number };
  }): Observable<any> {
    return this.http.post(`${API_URL}/exams/generate-paper`, data);
  }

  // Step 7: Get exam questions
  getExamQuestions(examId: string): Observable<any> {
    return this.http.get(`${API_URL}/exams/${examId}/questions`);
  }
}
