// apiService.ts

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

interface RequestOptions {
  method: HttpMethod;
  headers?: Record<string, string>;
  body?: any;
}

interface ApiServiceConfig {
  baseUrl: string;
  defaultHeaders?: Record<string, string>;
}

class ApiService {
  private baseUrl: string;
  private defaultHeaders: Record<string, string>;

  constructor(config: ApiServiceConfig) {
    this.baseUrl = config.baseUrl;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      ...config.defaultHeaders,
    };
  }

  private async request<T>(endpoint: string, options: RequestOptions): Promise<T | void> {
    const url = `${this.baseUrl}${endpoint}`;
    const headers = { ...this.defaultHeaders, ...options.headers };

    const config: RequestInit = {
      method: options.method,
      headers,
      body: options.body ? JSON.stringify(options.body) : undefined,
    };

    const response = await fetch(url, config);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    if (response.status == 200) return response.json();
  }

  public async get<T>(endpoint: string, headers?: Record<string, string>): Promise<T | void> {
    return this.request<T>(endpoint, { method: 'GET', headers });
  }

  public async post<T>(endpoint: string, body: any, headers?: Record<string, string>): Promise<T | void> {
    return this.request<T>(endpoint, { method: 'POST', body, headers });
  }

  public async put<T>(endpoint: string, body: any, headers?: Record<string, string>): Promise<T | void> {
    return this.request<T>(endpoint, { method: 'PUT', body, headers });
  }

  public async delete<T>(endpoint: string, headers?: Record<string, string>): Promise<void> {
    await this.request<T>(endpoint, { method: 'DELETE', headers });
  }

  public async patch<T>(endpoint: string, body?: any, headers?: Record<string, string>): Promise<T | void> {
    return this.request<T>(endpoint, { method: 'PATCH', body, headers });
  }
}

export default ApiService;
