import { Injectable, Logger } from '@nestjs/common';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { AppException } from 'src/shared/exceptions/app-exception';

@Injectable()
export class HttpService {
  private client: AxiosInstance;
  private isRefreshing = false;
  private refreshQueue: Array<() => void> = [];
  private accessToken = '';
  private refreshToken = '';
  private refreshTokenUri = '';
  private readonly logger = new Logger(HttpService.name);

  /**
   * Khởi tạo client
   * @param configParam
   */
  init(configParam?: AxiosRequestConfig) {
    const config = {
      timeout: 10000,
      headers: { 'Content-Type': 'application/json' },
      ...configParam,
    };

    if (!config.baseURL) {
      throw new AppException('Chưa cấu hình base URL');
    }

    this.client = axios.create(config);
    this.setupInterceptors();
  }

  setTokens(tokens: { accessToken: string; refreshToken: string }) {
    this.accessToken = tokens.accessToken;
    this.refreshToken = tokens.refreshToken;
  }

  setRefreshTokenUri(uri: string) {
    this.refreshTokenUri = uri;
  }

  private setupInterceptors() {
    this.client.interceptors.request.use(config => {
      if (this.accessToken) {
        config.headers['Authorization'] = `Bearer ${this.accessToken}`;
      }
      return config;
    });

    this.client.interceptors.response.use(
      res => res,
      async error => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
          if (this.isRefreshing) {
            return new Promise(resolve => {
              this.refreshQueue.push(() => resolve(this.client(originalRequest)));
            });
          }

          originalRequest._retry = true;
          this.isRefreshing = true;

          try {
            const res = await this.client.post(this.refreshTokenUri, {
              refreshToken: this.refreshToken,
            });

            this.accessToken = res.data.accessToken;
            this.refreshToken = res.data.refreshToken;

            // Gắn token mới cho các requests sau
            this.client.defaults.headers.common['Authorization'] = `Bearer ${this.accessToken}`;

            this.refreshQueue.forEach(cb => cb());
            this.refreshQueue = [];

            return this.client(originalRequest);
          } catch (refreshError) {
            this.logger.error('Refresh token failed', refreshError.message);
            throw refreshError;
          } finally {
            this.isRefreshing = false;
          }
        }

        return Promise.reject(error);
      },
    );
  }

  async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.client.get<T>(url, config);
  }

  async post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.client.post<T>(url, data, config);
  }

  async put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.client.put<T>(url, data, config);
  }

  async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.client.delete<T>(url, config);
  }
}
