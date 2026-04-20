import BASE_URL from './api';
import { getTokens, updateAccessToken, clearAuth, saveTokens } from './storage';

interface RequestOptions extends RequestInit {
  skipAuth?: boolean;
}

interface TokenRefreshResponse {
  access_token: string;
  refresh_token?: string;
}

class APIClient {
  private isRefreshing = false;
  private refreshSubscribers: ((token: string) => void)[] = [];

  subscribeTokenRefresh(callback: (token: string) => void) {
    this.refreshSubscribers.push(callback);
  }

  notifyTokenRefresh(token: string) {
    this.refreshSubscribers.forEach(callback => callback(token));
  }

  async refreshAccessToken(): Promise<string | null> {
    if (this.isRefreshing) {
      return new Promise(resolve => {
        this.subscribeTokenRefresh(token => resolve(token));
      });
    }

    this.isRefreshing = true;

    try {
      const tokens = await getTokens();
      if (!tokens?.refresh) {
        return null;
      }

      const response = await fetch(`${BASE_URL}/api/auth/refresh/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          refresh_token: tokens.refresh,
        }),
      });

      if (!response.ok) {
        // Token refresh failed, clear auth
        await clearAuth();
        return null;
      }

      const data: TokenRefreshResponse = await response.json();
      
      // Update tokens
      await updateAccessToken(data.access_token);
      if (data.refresh_token) {
        const currentTokens = await getTokens();
        if (currentTokens) {
          await saveTokens({
            access: data.access_token,
            refresh: data.refresh_token,
          });
        }
      }

      this.isRefreshing = false;
      this.notifyTokenRefresh(data.access_token);

      return data.access_token;
    } catch (error) {
      console.error('Error refreshing token:', error);
      this.isRefreshing = false;
      await clearAuth();
      return null;
    }
  }

  async request<T = any>(
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<T> {
    const { skipAuth = false, ...fetchOptions } = options;
    const url = `${BASE_URL}${endpoint}`;
    const headers = new Headers(fetchOptions.headers || {});

    // Agregar token si no es skip
    if (!skipAuth) {
      const tokens = await getTokens();
      console.log(`🔑 [APIClient] Tokens para ${endpoint}:`, !!tokens?.access);
      if (tokens?.access) {
        headers.set('Authorization', `Bearer ${tokens.access}`);
        console.log(`✅ [APIClient] Token agregado a request`);
      } else {
        console.warn(`⚠️ [APIClient] No hay token disponible para ${endpoint}`);
      }
    }

    headers.set('Content-Type', 'application/json');

    let response = await fetch(url, {
      ...fetchOptions,
      headers,
    });

    console.log(`📡 [APIClient] ${endpoint} - Status: ${response.status}`);

    // Si el token expiró, intentar refrescar
    if (response.status === 401 && !skipAuth) {
      console.warn(`⚠️ [APIClient] 401 Unauthorized - Intentando refrescar token`);
      const newToken = await this.refreshAccessToken();
      if (newToken) {
        console.log(`✅ [APIClient] Token refrescado, reintentando request`);
        headers.set('Authorization', `Bearer ${newToken}`);
        response = await fetch(url, {
          ...fetchOptions,
          headers,
        });
      } else {
        console.error(`❌ [APIClient] No se pudo refrescar token`);
        // Refresh failed, redirect to login is handled by context
        throw new Error('Unauthorized');
      }
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error(`❌ [APIClient] Error en ${endpoint}:`, errorData);
      throw new Error(errorData.error || `HTTP ${response.status}`);
    }

    const result = await response.json() as T;
    console.log(`✅ [APIClient] ${endpoint} - Éxito`);
    return result;
  }

  get<T = any>(endpoint: string, skipAuth?: boolean) {
    return this.request<T>(endpoint, { 
      method: 'GET',
      skipAuth 
    });
  }

  post<T = any>(endpoint: string, body?: any, skipAuth?: boolean) {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
      skipAuth,
    });
  }

  put<T = any>(endpoint: string, body?: any, skipAuth?: boolean) {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: body ? JSON.stringify(body) : undefined,
      skipAuth,
    });
  }

  delete<T = any>(endpoint: string, skipAuth?: boolean) {
    return this.request<T>(endpoint, {
      method: 'DELETE',
      skipAuth,
    });
  }
}

export default new APIClient();
