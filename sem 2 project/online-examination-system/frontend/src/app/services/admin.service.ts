import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:3000/api/admin';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  constructor(private http: HttpClient) {}

  // Step 1: Get dashboard data
  getDashboard(): Observable<any> {
    return this.http.get(`${API_URL}/dashboard`);
  }
}

