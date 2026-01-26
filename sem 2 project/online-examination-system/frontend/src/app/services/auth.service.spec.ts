import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        { provide: Router, useValue: routerSpy },
      ],
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  describe('login', () => {
    it('should login user successfully', (done) => {
      // Arrange
      const credentials = { email: 'test@example.com', password: 'Test@123' };
      const mockResponse = {
        success: true,
        token: 'test-token',
        refreshToken: 'refresh-token',
        user: { id: '123', email: 'test@example.com', name: 'Test User', role: 'student' },
        expiresIn: 3600,
      };

      // Act
      service.login(credentials).subscribe((response) => {
        // Assert
        expect(response.success).toBe(true);
        expect(response.token).toBe('test-token');
        expect(localStorage.getItem('token')).toBe('test-token');
        expect(localStorage.getItem('user')).toBeDefined();
        done();
      });

      const req = httpMock.expectOne('http://localhost:3000/api/auth/login');
      expect(req.request.method).toBe('POST');
      req.flush(mockResponse);
    });

    it('should handle login error', (done) => {
      // Arrange
      const credentials = { email: 'test@example.com', password: 'WrongPassword' };

      // Act
      service.login(credentials).subscribe({
        next: () => fail('should have failed'),
        error: (error) => {
          // Assert
          expect(error).toBeDefined();
          done();
        },
      });

      const req = httpMock.expectOne('http://localhost:3000/api/auth/login');
      req.error(new ErrorEvent('Unauthorized'), { status: 401 });
    });
  });

  describe('register', () => {
    it('should register user successfully', (done) => {
      // Arrange
      const registerData = {
        name: 'New User',
        email: 'new@example.com',
        password: 'Test@123',
        confirmPassword: 'Test@123',
      };
      const mockResponse = { success: true, message: 'User registered successfully' };

      // Act
      service.register(registerData).subscribe((response) => {
        // Assert
        expect(response.success).toBe(true);
        done();
      });

      const req = httpMock.expectOne('http://localhost:3000/api/auth/register');
      expect(req.request.method).toBe('POST');
      req.flush(mockResponse);
    });
  });

  describe('logout', () => {
    it('should logout user and clear storage', () => {
      // Arrange
      localStorage.setItem('token', 'test-token');
      localStorage.setItem('user', '{"id":"123"}');

      // Act
      service.logout();

      // Assert
      expect(localStorage.getItem('token')).toBeNull();
      expect(localStorage.getItem('user')).toBeNull();
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
    });
  });

  describe('isAuthenticated', () => {
    it('should return true if token exists and not expired', () => {
      // Arrange
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjMiLCJleHAiOjk5OTk5OTk5OTl9.test';
      localStorage.setItem('token', token);

      // Act
      const result = service.isAuthenticated();

      // Assert
      expect(result).toBe(true);
    });

    it('should return false if token does not exist', () => {
      // Arrange
      localStorage.removeItem('token');

      // Act
      const result = service.isAuthenticated();

      // Assert
      expect(result).toBe(false);
    });
  });

  describe('getCurrentUser', () => {
    it('should return current user from storage', () => {
      // Arrange
      const user = { id: '123', email: 'test@example.com', name: 'Test User', role: 'student' };
      localStorage.setItem('user', JSON.stringify(user));

      // Act
      const result = service.getCurrentUser();

      // Assert
      expect(result).toEqual(user);
    });
  });
});

