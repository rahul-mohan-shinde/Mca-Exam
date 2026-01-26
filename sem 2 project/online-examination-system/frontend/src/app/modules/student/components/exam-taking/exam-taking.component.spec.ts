import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ExamTakingComponent } from './exam-taking.component';
import { StudentService } from '../../../../services/student.service';
import { ExamService } from '../../../../services/exam.service';
import { of, throwError } from 'rxjs';

describe('ExamTakingComponent', () => {
  let component: ExamTakingComponent;
  let fixture: ComponentFixture<ExamTakingComponent>;
  let studentService: jasmine.SpyObj<StudentService>;
  let examService: jasmine.SpyObj<ExamService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    studentService = jasmine.createSpyObj('StudentService', ['startExam', 'getExamQuestions', 'saveAnswer', 'submitExam']);
    examService = jasmine.createSpyObj('ExamService', ['getExamById']);
    router = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [ExamTakingComponent],
      imports: [HttpClientTestingModule],
      providers: [
        { provide: StudentService, useValue: studentService },
        { provide: ExamService, useValue: examService },
        { provide: Router, useValue: router },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { params: { examId: 'exam123' } },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ExamTakingComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should start exam on init', () => {
    // Arrange
    studentService.startExam.and.returnValue(of({ success: true, data: { _id: 'attempt123' } }));
    examService.getExamById.and.returnValue(of({ success: true, data: { duration: 60 } }));
    studentService.getExamQuestions.and.returnValue(of({ success: true, data: [] }));

    // Act
    component.ngOnInit();

    // Assert
    expect(studentService.startExam).toHaveBeenCalledWith('exam123');
  });

  it('should save answer when user selects option', () => {
    // Arrange
    component.attemptId = 'attempt123';
    const questionId = 'q123';
    const answerData = { selected_option_id: 'option123' };
    studentService.saveAnswer.and.returnValue(of({ success: true }));

    // Act
    component.saveAnswer(questionId, answerData);

    // Assert
    expect(studentService.saveAnswer).toHaveBeenCalledWith('attempt123', questionId, answerData);
  });

  it('should submit exam successfully', () => {
    // Arrange
    component.attemptId = 'attempt123';
    studentService.submitExam.and.returnValue(of({ success: true, data: { _id: 'attempt123' } }));

    // Act
    component.submitExam();

    // Assert
    expect(studentService.submitExam).toHaveBeenCalledWith('attempt123');
    expect(router.navigate).toHaveBeenCalled();
  });

  it('should handle timer countdown', (done) => {
    // Arrange
    component.timeRemaining = 60;

    // Act
    component.startTimer();

    // Wait for timer to tick
    setTimeout(() => {
      // Assert
      expect(component.timeRemaining).toBeLessThan(60);
      done();
    }, 1100);
  });

  it('should auto-submit when timer reaches zero', () => {
    // Arrange
    component.attemptId = 'attempt123';
    component.timeRemaining = 0;
    studentService.submitExam.and.returnValue(of({ success: true }));

    // Act
    component.startTimer();

    // Assert
    expect(studentService.submitExam).toHaveBeenCalled();
  });
});

