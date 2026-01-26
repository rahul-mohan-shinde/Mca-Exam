import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidators {
  /**
   * Password strength validator
   * Requires: uppercase, lowercase, number, special character, min 8 chars
   */
  static passwordStrength(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;

      const value = control.value;
      const hasUpper = /[A-Z]/.test(value);
      const hasLower = /[a-z]/.test(value);
      const hasNumber = /[0-9]/.test(value);
      const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value);
      const minLength = value.length >= 8;

      if (!hasUpper || !hasLower || !hasNumber || !hasSpecial || !minLength) {
        return {
          weakPassword: true,
          passwordRequirements: {
            hasUpper,
            hasLower,
            hasNumber,
            hasSpecial,
            minLength
          }
        };
      }

      return null;
    };
  }

  /**
   * Email format validator
   */
  static emailFormat(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(control.value) ? null : { invalidEmail: true };
    };
  }

  /**
   * Phone number validator
   */
  static phoneNumber(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;

      const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/;
      return phoneRegex.test(control.value) ? null : { invalidPhone: true };
    };
  }

  /**
   * Date not in past validator
   */
  static dateNotPast(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;

      const selectedDate = new Date(control.value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      return selectedDate >= today ? null : { dateInPast: true };
    };
  }

  /**
   * End date after start date validator
   */
  static endDateAfterStart(startDateControl: AbstractControl): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value || !startDateControl?.value) return null;

      const startDate = new Date(startDateControl.value);
      const endDate = new Date(control.value);

      return endDate > startDate ? null : { endDateBeforeStart: true };
    };
  }

  /**
   * Positive number validator
   */
  static positiveNumber(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;

      const value = Number(control.value);
      return value > 0 ? null : { notPositive: true };
    };
  }

  /**
   * Percentage validator (0-100)
   */
  static percentage(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;

      const value = Number(control.value);
      return value >= 0 && value <= 100 ? null : { invalidPercentage: true };
    };
  }

  /**
   * Duration validator (minimum 1 minute)
   */
  static duration(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;

      const value = Number(control.value);
      return value >= 1 ? null : { invalidDuration: true };
    };
  }

  /**
   * Marks validator (positive number, max 1000)
   */
  static marks(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;

      const value = Number(control.value);
      return value > 0 && value <= 1000 ? null : { invalidMarks: true };
    };
  }

  /**
   * At least one correct option validator (for MCQ)
   */
  static atLeastOneCorrect(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value || !Array.isArray(control.value)) return null;

      const hasCorrect = control.value.some((opt: any) => opt.is_correct === true);
      return hasCorrect ? null : { noCorrectOption: true };
    };
  }

  /**
   * Minimum options validator (for MCQ - at least 2 options)
   */
  static minimumOptions(min: number = 2): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value || !Array.isArray(control.value)) return null;

      return control.value.length >= min ? null : { insufficientOptions: { min, actual: control.value.length } };
    };
  }

  /**
   * Maximum options validator (for MCQ - max 6 options)
   */
  static maximumOptions(max: number = 6): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value || !Array.isArray(control.value)) return null;

      return control.value.length <= max ? null : { tooManyOptions: { max, actual: control.value.length } };
    };
  }

  /**
   * No duplicate options validator
   */
  static noDuplicateOptions(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value || !Array.isArray(control.value)) return null;

      const options = control.value.map((opt: any) => opt.text?.trim().toLowerCase()).filter(Boolean);
      const uniqueOptions = new Set(options);

      return uniqueOptions.size === options.length ? null : { duplicateOptions: true };
    };
  }

  /**
   * URL validator
   */
  static url(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;

      try {
        new URL(control.value);
        return null;
      } catch {
        return { invalidUrl: true };
      }
    };
  }

  /**
   * Alphanumeric with spaces validator
   */
  static alphanumericWithSpaces(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;

      const regex = /^[a-zA-Z0-9\s]+$/;
      return regex.test(control.value) ? null : { invalidFormat: true };
    };
  }

  /**
   * Trimmed value validator (no leading/trailing spaces)
   */
  static noLeadingTrailingSpaces(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;

      return control.value.trim() === control.value ? null : { hasLeadingTrailingSpaces: true };
    };
  }
}

