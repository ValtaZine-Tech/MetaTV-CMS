import { BaseApiService } from "../utils/BaseApiService";
import { BASE_URL } from "../constants/Constants";
import { UserSessionUtils } from "../utils/UserSessionUtils";

export interface User {
  _id: string;
  firstName: string;
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

export interface BackendUser {
  _id: string;
  firstName: string;
  lastName: string;
  name: string;
  email: string;
  role: string;
  phone?: string;
  status: "active" | "inactive" | "pending";
  createdAt: string;
  avatar?: string;
  username: string;
  joined: string;
}

export interface LoginResponse {
  user: User;
  token: string;
}

export class UserService {
  private baseService: BaseApiService;

  constructor() {
    // Set base path here
    this.baseService = new BaseApiService(`${BASE_URL}/users`);
  }

  async createUser(userData: FormData): Promise<User> {
    const response = await this.baseService.postMultipart<User>("/register", userData);
    if (!response.data) {
      throw new Error("Failed to create user");
    }
    return response.data;
  }

  async getAllUsers(): Promise<BackendUser[]> {
    const response = await this.baseService.getRequest<{ users: BackendUser[] }>("/");
    
    if (!response.data?.users) {
      throw new Error('Invalid response format from server');
    }
  
    const users = Array.isArray(response.data.users) 
      ? response.data.users 
      : [response.data.users];
  
    return users.map(user => ({
      _id: user._id || '',
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      name: user.name || '',
      email: user.email || '',
      role: user.role || '',
      phone: user.phone || undefined,
      status: user.status || 'pending',
      createdAt: user.createdAt || '',
      avatar: user.avatar || undefined,
      username: user.username || '',
      joined: user.joined || ''
    }));
  }

  async deleteUser(userId: string): Promise<void> {
    const response = await this.baseService.deleteRequest<void>(`/${userId}`);
    if (response.error) {
      throw new Error(response.error);
    }
  }

  async login(credentials: { email: string; password: string }): Promise<LoginResponse> {
    const response = await this.baseService.postRequest<LoginResponse>("/login", credentials);
    if (!response.data) {
      throw new Error(response.error || "Invalid email or password");
    }
    return response.data;
  }

  async getAuthenticatedUser(): Promise<User> {
    try {
      const response = await this.baseService.getRequest<{ user: BackendUser }>("/profile");
      if (!response.data?.user) {
        throw new Error('User not authenticated');
      }
      return this.formatUser(response.data.user);
    } catch (error) {
      UserSessionUtils.logout();
      throw error;
    }
  }
  
  private formatUser(backendUser: BackendUser): User {
    return {
      _id: backendUser._id,
      firstName: backendUser.firstName,
      lastName: backendUser.lastName,
      email: backendUser.email,
      username: backendUser.username,
      role: backendUser.role,
      status: backendUser.status,
      createdAt: backendUser.createdAt,
      avatar: backendUser.avatar,
      name: `${backendUser.firstName} ${backendUser.lastName}`,
      joined: new Date(backendUser.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    };
  }

}