export interface User {
  _id: string;
  firstName: string; // Ensure this is not optional
  lastName: string;
  email: string;
  username: string;
  name: string;
  role: string;
  phone?: string;
  status: "active" | "inactive" | "pending";
  createdAt: string;
  joined: string;
  avatar?: string;
}
  
  export interface Country {
    id: string;
    name: string;
  }
  
  export interface Language {
    id: string;
    name: string;
  }
  
  export interface FullSession {
    [key: string]: unknown;
  }
  
  export type UserSettings = Record<string, unknown>;