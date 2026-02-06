export type UserStatus = "active" | "blocked" | "unverified";

export interface User {
  id: number;
  name: string;
  email: string;
  lastLogin: string | null;
  status: UserStatus;
  createdAt?: string;
}
