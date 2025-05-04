import axios from "axios";
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { LOCALE_STORAGE_KEY } from "../localization/i18n";

export const ACCESS_TOKEN_STORAGE_KEY = "a0b1c2d3e4f50607";
export const REFRESH_TOKEN_STORAGE_KEY = "deadbeefcafebabe";

/**
 * HttpService class to handle all API requests in the application.
 * Uses Axios by default but designed to be easily replaceable with another HTTP client.
 */
class HttpService {
  private client: AxiosInstance;
  private static instance: HttpService;

  /**
   * Private constructor to enforce singleton pattern
   * @param baseURL - Base URL for all requests
   * @param timeout - Request timeout in milliseconds
   * @param headers - Default headers for all requests
   */
  private constructor(
    baseURL: string = import.meta.env.VITE_API_URL || "",
    timeout: number = 30000,
    headers: Record<string, string> = {
      "Content-Type": "application/json",
      Accept: "application/json",
    }
  ) {
    this.client = axios.create({
      baseURL,
      timeout,
      headers,
    });

    this.setupInterceptors();
  }

  /**
   * Get singleton instance of HttpService
   */
  public static getInstance(): HttpService {
    if (!HttpService.instance) {
      HttpService.instance = new HttpService();
    }
    return HttpService.instance;
  }

  /**
   * Setup request and response interceptors
   */
  private setupInterceptors(): void {
    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        // Get token from storage if available
        const token = localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY);
        // const locale = localStorage.getItem(LOCALE_STORAGE_KEY) || "fr";

        // config.headers.locale = locale;
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        // Handle common errors (401, 403, 500, etc.)
        if (error.response) {
          switch (error.response.status) {
            case 401:
              // Handle unauthorized access
              console.error("Unauthorized access");
              this.clearTokens();
              window.location.href = "/";
              break;
            case 403:
              console.error("Forbidden resource");
              break;
            case 404:
              console.error("Resource not found");
              break;
            case 500:
              console.error("Internal server error");
              break;
            default:
              console.error(`HTTP error: ${error.response.status}`);
          }
        } else if (error.request) {
          // Request was made but no response received
          console.error("No response received from server");
        } else {
          // Something happened in setting up the request
          console.error("Error setting up request:", error.message);
        }

        return Promise.reject(error);
      }
    );
  }

  /**
   * Set auth token for requests
   * @param token - The authentication token
   */
  public setAuthToken(token: string): void {
    localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, token);
  }

  /**
   * Clear auth token
   */
  public clearTokens(): void {
    localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
    localStorage.removeItem(REFRESH_TOKEN_STORAGE_KEY);
  }

  /**
   * Make a GET request
   * @param url - The URL to request
   * @param config - Optional request configuration
   * @returns Promise with the response
   */
  public get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.client.get(url, config).then(this.handleResponse);
  }

  /**
   * Make a POST request
   * @param url - The URL to request
   * @param data - The data to send
   * @param config - Optional request configuration
   * @returns Promise with the response
   */
  public post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.client.post(url, data, config).then(this.handleResponse);
  }

  /**
   * Make a PUT request
   * @param url - The URL to request
   * @param data - The data to send
   * @param config - Optional request configuration
   * @returns Promise with the response
   */
  public put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.client.put(url, data, config).then(this.handleResponse);
  }

  /**
   * Make a PATCH request
   * @param url - The URL to request
   * @param data - The data to send
   * @param config - Optional request configuration
   * @returns Promise with the response
   */
  public patch<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.client.patch(url, data, config).then(this.handleResponse);
  }

  /**
   * Make a DELETE request
   * @param url - The URL to request
   * @param config - Optional request configuration
   * @returns Promise with the response
   */
  public delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.client.delete(url, config).then(this.handleResponse);
  }

  /**
   * Process response and extract data
   * @param response - The HTTP response
   * @returns The response data
   */
  private handleResponse<T>(response: AxiosResponse<T>): T {
    return response.data;
  }

  /**
   * Update client configuration
   * @param config - New configuration to apply
   */
  public updateConfig(config: Partial<AxiosRequestConfig>): void {
    // Update specific configuration properties safely
    if (config.baseURL) {
      this.client.defaults.baseURL = config.baseURL;
    }

    if (config.timeout) {
      this.client.defaults.timeout = config.timeout;
    }

    // Handle headers separately to avoid type errors
    if (config.headers) {
      // Update common headers
      Object.entries(config.headers).forEach(([key, value]) => {
        if (value !== undefined) {
          this.client.defaults.headers.common[key] = value;
        }
      });
    }

    // For other properties that might need updating
    if (config.responseType) {
      this.client.defaults.responseType = config.responseType;
    }

    if (config.withCredentials !== undefined) {
      this.client.defaults.withCredentials = config.withCredentials;
    }

    // Add other specific configurations as needed
  }
}

export default HttpService;
