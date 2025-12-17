export interface SignupRequest {
  name: string;
  email: string;
  phone: string;
  password: string;
  role?: 'user' | 'admin';
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: {
    _id: string;
    name: string;
    email: string;
    phone: string;
    role: string;
    createdAt: Date;
    updatedAt: Date;
  };
  token: string;
}

export interface ErrorResponse {
  error: string;
}
