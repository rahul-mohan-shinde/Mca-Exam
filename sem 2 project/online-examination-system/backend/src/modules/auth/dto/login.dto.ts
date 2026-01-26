export interface LoginDTO {
  email: string;
  password: string;
}

export interface LoginResponseDTO {
  success: boolean;
  token: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
  expiresIn: number;
}

