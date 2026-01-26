import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './modules/auth/components/login/login.component';
import { RegisterComponent } from './modules/auth/components/register/register.component';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';
import { AuthInterceptor } from './interceptors/auth.interceptor';

// Admin Components
import { AdminDashboardComponent } from './modules/admin/components/dashboard/dashboard.component';

// Question Bank Components
import { QuestionListComponent } from './modules/question-bank/components/question-list/question-list.component';
import { QuestionFormComponent } from './modules/question-bank/components/question-form/question-form.component';

// Student Components
import { StudentDashboardComponent } from './modules/student/components/dashboard/dashboard.component';
import { ExamTakingComponent } from './modules/student/components/exam-taking/exam-taking.component';
import { HistoryComponent } from './modules/student/components/history/history.component';

// Exam Management Components
import { ExamListComponent } from './modules/exam-management/components/exam-list/exam-list.component';
import { ExamFormComponent } from './modules/exam-management/components/exam-form/exam-form.component';

// Result Components
import { ResultViewComponent } from './modules/result/components/result-view/result-view.component';

// Notification Components
import { NotificationCenterComponent } from './modules/notification/components/notification-center/notification-center.component';

// Shared Components
import { NavbarComponent } from './components/navbar/navbar.component';

// Services
import { QuestionService } from './services/question.service';
import { ExamService } from './services/exam.service';
import { StudentService } from './services/student.service';
import { AdminService } from './services/admin.service';
import { ResultService } from './services/result.service';
import { NotificationService } from './services/notification.service';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  
  // Admin Routes
  {
    path: 'admin',
    component: AdminDashboardComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['admin', 'super_admin'] }
  },
  
  // Question Bank Routes
  {
    path: 'questions',
    component: QuestionListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'questions/create',
    component: QuestionFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'questions/edit/:id',
    component: QuestionFormComponent,
    canActivate: [AuthGuard]
  },
  
  // Exam Management Routes
  {
    path: 'exams',
    component: ExamListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'exams/create',
    component: ExamFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'exams/edit/:id',
    component: ExamFormComponent,
    canActivate: [AuthGuard]
  },
  
  // Student Routes
  {
    path: 'student',
    component: StudentDashboardComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['student'] }
  },
  {
    path: 'student/exam/:examId',
    component: ExamTakingComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['student'] }
  },
  {
    path: 'student/results/:attemptId',
    component: ResultViewComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['student'] }
  },
  {
    path: 'student/history',
    component: HistoryComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['student'] }
  },
  
  // Notifications
  {
    path: 'notifications',
    component: NotificationCenterComponent,
    canActivate: [AuthGuard]
  },
  
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    AdminDashboardComponent,
    QuestionListComponent,
    QuestionFormComponent,
    StudentDashboardComponent,
    ExamTakingComponent,
    HistoryComponent,
    ExamListComponent,
    ExamFormComponent,
    ResultViewComponent,
    NotificationCenterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    AuthService,
    QuestionService,
    ExamService,
    StudentService,
    AdminService,
    ResultService,
    NotificationService,
    AuthGuard,
    RoleGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
