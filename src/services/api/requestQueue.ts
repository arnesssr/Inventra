import { API_CONFIG } from '../../config/apiConfig';

export class RequestQueue {
  private queue: Array<() => Promise<any>> = [];
  private processing = false;
  private activeRequests = 0;

  async add<T>(request: () => Promise<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      this.queue.push(async () => {
        try {
          const result = await request();
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });
      this.processQueue();
    });
  }

  private async processQueue() {
    if (this.processing || this.activeRequests >= API_CONFIG.queueConcurrency) {
      return;
    }

    this.processing = true;
    while (this.queue.length && this.activeRequests < API_CONFIG.queueConcurrency) {
      const request = this.queue.shift();
      if (request) {
        this.activeRequests++;
        try {
          await request();
        } finally {
          this.activeRequests--;
        }
      }
    }
    this.processing = false;

    if (this.queue.length) {
      this.processQueue();
    }
  }
}

export const requestQueue = new RequestQueue();
