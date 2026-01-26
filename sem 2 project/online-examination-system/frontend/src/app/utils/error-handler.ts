import { HttpErrorResponse } from '@angular/common/http';

export class ErrorHandler {
  /**
   * Get user-friendly error message from HTTP error
   */
  static getErrorMessage(error: any): string {
    if (error instanceof HttpErrorResponse) {
      // Server error with message
      if (error.error?.message) {
        return error.error.message;
      }

      // HTTP status code based messages
      switch (error.status) {
        case 400:
          return 'Invalid request. Please check your input.';
        case 401:
          return 'Unauthorized. Please login again.';
        case 403:
          return 'Access denied. You don\'t have permission to perform this action.';
        case 404:
          return 'Resource not found.';
        case 409:
          return 'Conflict. This resource already exists.';
        case 422:
          return 'Validation error. Please check your input.';
        case 429:
          return 'Too many requests. Please try again later.';
        case 500:
          return 'Server error. Please try again later.';
        case 503:
          return 'Service unavailable. Please try again later.';
        default:
          return 'An error occurred. Please try again.';
      }
    }

    // Network error
    if (error.name === 'HttpErrorResponse' && !error.status) {
      return 'Network error. Please check your internet connection.';
    }

    // Generic error
    return error.message || 'An unexpected error occurred.';
  }

  /**
   * Check if error is network related
   */
  static isNetworkError(error: any): boolean {
    return error instanceof HttpErrorResponse && !error.status;
  }

  /**
   * Check if error is authentication related
   */
  static isAuthError(error: any): boolean {
    return error instanceof HttpErrorResponse && (error.status === 401 || error.status === 403);
  }

  /**
   * Check if error is validation related
   */
  static isValidationError(error: any): boolean {
    return error instanceof HttpErrorResponse && error.status === 422;
  }

  /**
   * Log error for debugging
   */
  static logError(error: any, context?: string): void {
    const timestamp = new Date().toISOString();
    const contextMsg = context ? `[${context}] ` : '';
    console.error(`${contextMsg}[${timestamp}]`, error);
  }
}

