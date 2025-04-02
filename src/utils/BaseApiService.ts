// import { BASE_URL } from "../constants/Constants";
import { INTERNAL_SERVER_ERROR } from "../constants/ErrorMessages";
import { UserSessionUtils } from "./UserSessionUtils";

interface ApiResponse<T> {
  data?: T;
  error?: string;
}

interface ErrorResponse {
  message: string;
  statusCode: number;
}

interface RequestOptions {
  headers?: Record<string, string>;
  params?: Record<string, string | number | boolean>;
  body?: unknown;
  endpoint?: string;
}

export class BaseApiService {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private get authToken(): string {
    try {
      return UserSessionUtils.getBearerToken() || '';
    } catch (error) {
      console.error('Error retrieving auth token:', error);
      return '';
    }
  }

  private async handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
    if (response.ok) {
      const data = (await response.json()) as T;
      return { data };
    }

    if (response.status === 401) {
      UserSessionUtils.clearLocalStorageAndLogout();
      throw new Error('Session expired. Please login again.');
    }

    const errorData: ErrorResponse = await response.json().catch(() => ({
      message: INTERNAL_SERVER_ERROR,
      statusCode: 500,
    }));

    throw new Error(errorData.message || INTERNAL_SERVER_ERROR);
  }

  private async request<T>(
    method: string,
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<ApiResponse<T>> {
    const headers = new Headers({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authToken}`,
      ...options.headers,
    });

    const queryParams = options.params
      ? `?${new URLSearchParams(
          Object.entries(options.params).reduce((acc, [key, value]) => {
            acc[key] = String(value);
            return acc;
          }, {} as Record<string, string>)
        ).toString()}`
      : '';

    const body = options.body ? JSON.stringify(options.body) : undefined;

    const fullUrl = `${this.baseUrl}${endpoint}${queryParams}`;

    const response = await fetch(fullUrl, {
      method,
      headers,
      body,
    });

    return this.handleResponse<T>(response);
  }

  async getRequest<T>(
    endpoint: string,
    params?: Record<string, string | number | boolean>
  ): Promise<ApiResponse<T>> {
    return this.request<T>('GET', endpoint, { params });
  }

  async postRequest<T>(
    endpoint: string,
    body: unknown
  ): Promise<ApiResponse<T>> {
    return this.request<T>('POST', endpoint, { body });
  }

  async putRequest<T>(
    endpoint: string,
    body: unknown
  ): Promise<ApiResponse<T>> {
    return this.request<T>('PUT', endpoint, { body });
  }

  async deleteRequest<T>(
    endpoint: string,
    body?: unknown
  ): Promise<ApiResponse<T>> {
    return this.request<T>('DELETE', endpoint, { body });
  }

  async postMultipart<T>(
    endpoint: string,
    formData: FormData
  ): Promise<ApiResponse<T>> {
    const headers = new Headers({
      Authorization: `Bearer ${this.authToken}`,
    });

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'POST',
      headers,
      body: formData,
    });

    return this.handleResponse<T>(response);
  }

  async refreshToken(): Promise<ApiResponse<{ accessToken: string; refreshToken: string }>> {
    const response = await fetch(`${this.baseUrl}/refresh-token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: UserSessionUtils.getRefreshToken() }),
    });

    const data = await this.handleResponse<{
      accessToken: string;
      refreshToken: string;
    }>(response);

    UserSessionUtils.setUserAuthToken(data.data?.accessToken || '');
    return data;
  }
}