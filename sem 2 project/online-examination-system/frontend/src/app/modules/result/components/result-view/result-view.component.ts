import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResultService } from '../../../../services/result.service';

@Component({
  selector: 'app-result-view',
  templateUrl: './result-view.component.html',
  styleUrls: ['./result-view.component.scss']
})
export class ResultViewComponent implements OnInit {
  attemptId: string = '';
  result: any = null;
  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private resultService: ResultService
  ) {}

  ngOnInit(): void {
    this.attemptId = this.route.snapshot.params['attemptId'];
    this.loadResult();
  }

  // Step 1: Load result
  loadResult(): void {
    this.isLoading = true;
    this.resultService.getResult(this.attemptId).subscribe({
      next: (response) => {
        if (response.success) {
          this.result = response.data;
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading result:', error);
        this.isLoading = false;
      }
    });
  }

  // Step 2: Get grade color
  getGradeColor(grade: string): string {
    const colors: any = {
      'A+': '#28a745',
      'A': '#28a745',
      'B': '#17a2b8',
      'C': '#ffc107',
      'D': '#fd7e14',
      'F': '#dc3545'
    };
    return colors[grade] || '#666';
  }
}

