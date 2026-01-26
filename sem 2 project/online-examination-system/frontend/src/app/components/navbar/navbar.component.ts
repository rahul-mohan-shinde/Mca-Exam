import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  currentUser: any = null;
  isAuthenticated = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
      this.isAuthenticated = this.authService.isAuthenticated();
    });
  }

  // Step 1: Logout
  logout(): void {
    this.authService.logout();
  }

  // Step 2: Check if route is active
  isActiveRoute(route: string): boolean {
    return this.router.url.includes(route);
  }

  // Step 3: Get user role
  getUserRole(): string {
    return this.currentUser?.role || '';
  }

  // Step 4: Check if admin
  isAdmin(): boolean {
    const role = this.getUserRole();
    return role === 'admin' || role === 'super_admin';
  }

  // Step 5: Check if student
  isStudent(): boolean {
    return this.getUserRole() === 'student';
  }
}

