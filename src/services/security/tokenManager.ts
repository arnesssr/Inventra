import { securityConfig } from '../../config/securityConfig';

export class TokenManager {
  private token: string | null = null;
  private expiresAt: number = 0;

  setToken(token: string, expiresIn: number) {
    this.token = token;
    this.expiresAt = Date.now() + (expiresIn * 1000);
  }

  getToken(): string | null {
    return this.token;
  }

  needsRefresh(): boolean {
    if (!this.token) return true;
    
    const threshold = this.expiresAt - (securityConfig.tokenRefreshThreshold * 1000);
    return Date.now() >= threshold;
  }

  clear() {
    this.token = null;
    this.expiresAt = 0;
  }
}

export const tokenManager = new TokenManager();
