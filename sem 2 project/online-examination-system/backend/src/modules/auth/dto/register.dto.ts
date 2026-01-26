export interface RegisterDTO {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface RegisterResponseDTO {
  success: boolean;
  message: string;
  userId: string;
}

