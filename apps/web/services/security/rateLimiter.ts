import { securityConfig } from "@/config/securityConfig";

export class RateLimiter {
  private requests: { timestamp: number; endpoint: string }[] = [];

  canMakeRequest(endpoint: string): boolean {
    const now = Date.now();
    const windowStart = now - securityConfig.rateLimitWindow;
    
    // Clean old requests outside the window
    this.requests = this.requests.filter(req => 
      req.timestamp > windowStart && req.endpoint === endpoint
    );
    
    // Check if under limit
    if (this.requests.length >= securityConfig.maxRequests) {
      return false;
    }

    // Add new request
    this.requests.push({ timestamp: now, endpoint });
    return true;
  }

  getTimeUntilNext(endpoint: string): number {
    const requests = this.requests.filter(req => req.endpoint === endpoint);
    if (requests.length < securityConfig.maxRequests) return 0;
    
    // Get time until oldest request expires
    const oldestTimestamp = Math.min(...requests.map(r => r.timestamp));
    return oldestTimestamp + securityConfig.rateLimitWindow - Date.now();
  }

  getRemainingRequests(endpoint: string): number {
    const now = Date.now();
    const windowStart = now - securityConfig.rateLimitWindow;
    
    const activeRequests = this.requests.filter(req => 
      req.timestamp > windowStart && req.endpoint === endpoint
    ).length;
    
    return Math.max(0, securityConfig.maxRequests - activeRequests);
  }

  reset(): void {
    this.requests = [];
  }
}

export const rateLimiter = new RateLimiter();
