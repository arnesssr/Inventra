import { securityConfig } from '../../config/securityConfig';

export class RateLimiter {
  private requests: number[] = [];

  canMakeRequest(): boolean {
    const now = Date.now();
    const windowStart = now - 60000; // 1 minute window
    
    // Remove old requests
    this.requests = this.requests.filter(time => time > windowStart);
    
    if (this.requests.length >= securityConfig.maxRequestsPerMinute) {
      return false;
    }

    this.requests.push(now);
    return true;
  }

  getTimeUntilNextRequest(): number {
    if (this.canMakeRequest()) return 0;
    
    const oldestRequest = this.requests[0];
    return oldestRequest + 60000 - Date.now();
  }
}

export const rateLimiter = new RateLimiter();
