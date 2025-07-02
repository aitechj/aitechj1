export interface LoginRequest {
  email: string;
  password: string;
  [key: string]: unknown;
}
