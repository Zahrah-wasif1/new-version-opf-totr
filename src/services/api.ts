import { API_BASE_URL, getAuthToken } from '../config/api';

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

class ApiService {
  private baseURL: string;

  constructor() {
    this.baseURL = API_BASE_URL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const token = getAuthToken();
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        ...options,
        headers,
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.error || 'An error occurred',
        };
      }

      return {
        success: true,
        data: data.data || data,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Network error',
      };
    }
  }

  // Authentication
  async signup(userData: {
    name: string;
    email: string;
    phone?: string;
    password: string;
  }): Promise<ApiResponse<any>> {
    return this.request('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async login(credentials: {
    email: string;
    password: string;
  }): Promise<ApiResponse<any>> {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  // Cars
  async getCars(filters?: {
    type?: string;
    seats?: string;
    priceRange?: string;
    search?: string;
    available?: boolean;
  }): Promise<ApiResponse<any[]>> {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          params.append(key, String(value));
        }
      });
    }
    const queryString = params.toString();
    return this.request(`/cars${queryString ? `?${queryString}` : ''}`);
  }

  async getCar(id: string): Promise<ApiResponse<any>> {
    return this.request(`/cars/${id}`);
  }

  async createCar(carData: any): Promise<ApiResponse<any>> {
    return this.request('/cars', {
      method: 'POST',
      body: JSON.stringify(carData),
    });
  }

  async updateCar(id: string, carData: any): Promise<ApiResponse<any>> {
    return this.request(`/cars/${id}`, {
      method: 'PUT',
      body: JSON.stringify(carData),
    });
  }

  async deleteCar(id: string): Promise<ApiResponse<any>> {
    return this.request(`/cars/${id}`, {
      method: 'DELETE',
    });
  }

  // Bookings
  async getBookings(status?: string): Promise<ApiResponse<any[]>> {
    const params = status ? `?status=${status}` : '';
    return this.request(`/bookings${params}`);
  }

  async getBooking(id: string): Promise<ApiResponse<any>> {
    return this.request(`/bookings/${id}`);
  }

  async createBooking(bookingData: {
    carId: string;
    startDate: string;
    endDate: string;
    phone?: string;
    email?: string;
  }): Promise<ApiResponse<any>> {
    return this.request('/bookings', {
      method: 'POST',
      body: JSON.stringify(bookingData),
    });
  }

  async updateBooking(id: string, status: string): Promise<ApiResponse<any>> {
    return this.request(`/bookings/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  }

  async deleteBooking(id: string): Promise<ApiResponse<any>> {
    return this.request(`/bookings/${id}`, {
      method: 'DELETE',
    });
  }

  // Users (Admin only)
  async getUsers(filters?: {
    role?: string;
    status?: string;
  }): Promise<ApiResponse<any[]>> {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value) {
          params.append(key, value);
        }
      });
    }
    const queryString = params.toString();
    return this.request(`/users${queryString ? `?${queryString}` : ''}`);
  }

  async getUser(id: string): Promise<ApiResponse<any>> {
    return this.request(`/users/${id}`);
  }

  async updateUser(id: string, userData: any): Promise<ApiResponse<any>> {
    return this.request(`/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  }

  async deleteUser(id: string): Promise<ApiResponse<any>> {
    return this.request(`/users/${id}`, {
      method: 'DELETE',
    });
  }

  // Contact
  async submitContact(formData: {
    name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
  }): Promise<ApiResponse<any>> {
    return this.request('/contact', {
      method: 'POST',
      body: JSON.stringify(formData),
    });
  }
}

export const apiService = new ApiService();

