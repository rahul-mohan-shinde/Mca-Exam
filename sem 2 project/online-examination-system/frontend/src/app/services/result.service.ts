import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:3000/api/results';

@Injectable({
  providedIn: 'root'
})
export class ResultService {
  constructor(private http: HttpClient) {}

  // Step 1: Calculate result
  calculateResult(attemptId: string): Observable<any> {
    return this.http.post(`${API_URL}/calculate`, { attemptId });
  }

  // Step 2: Get result
  getResult(attemptId: string): Observable<any> {
    return this.http.get(`${API_URL}/${attemptId}`);
  }

  // Step 3: Get analytics
  getAnalytics(examId?: string): Observable<any> {
    const params = examId ? { examId } : {};
    return this.http.get(`${API_URL}/analytics`, { params });
  }
}

