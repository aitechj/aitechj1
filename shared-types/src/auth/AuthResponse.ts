import { User } from './User.js';

export interface AuthResponse {
  token: string;
  user: User;
}
