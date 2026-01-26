import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoginComponent } from './login.component';
import { AuthService } from '../../../../services/auth.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    authService = jasmine.createSpyObj('AuthService', ['login']);
    router = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      providers: [
        { provide: AuthService, useValue: authService },
        { provide: Router, useValue: router },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize login form', () => {
    expect(component.loginForm).toBeDefined();
    expect(component.loginForm.get('email')).toBeDefined();
    expect(component.loginForm.get('password')).toBeDefined();
  });

  it('should validate required fields', () => {
    // Arrange
    component.loginForm.patchValue({ email: '', password: '' });

    // Act
    component.onSubmit();

    // Assert
    expect(component.loginForm.valid).toBe(false);
    expect(authService.login).not.toHaveBeenCalled();
  });

  it('should call authService.login on valid form submission', () => {
    // Arrange
    const credentials = { email: 'test@example.com', password: 'Test@123' };
    component.loginForm.patchValue(credentials);
    authService.login.and.returnValue({
      subscribe: (callback: any) => {
        callback({ success: true, token: 'test-token' });
      },
    } as any);

    // Act
    component.onSubmit();

    // Assert
    expect(authService.login).toHaveBeenCalledWith(credentials);
  });

  it('should navigate on successful login', () => {
    // Arrange
    component.loginForm.patchValue({ email: 'test@example.com', password: 'Test@123' });
    authService.login.and.returnValue({
      subscribe: (callback: any) => {
        callback({ success: true, token: 'test-token' });
      },
    } as any);

    // Act
    component.onSubmit();

    // Assert
    expect(router.navigate).toHaveBeenCalled();
  });

  it('should display error message on login failure', () => {
    // Arrange
    component.loginForm.patchValue({ email: 'test@example.com', password: 'WrongPassword' });
    authService.login.and.returnValue({
      subscribe: (success: any, error: any) => {
        error({ error: { message: 'Invalid credentials' } });
      },
    } as any);

    // Act
    component.onSubmit();

    // Assert
    expect(component.errorMessage).toBeDefined();
  });
});

