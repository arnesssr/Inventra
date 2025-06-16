import { ApiError } from '../../types/apiTypes';

export class ApiErrorHandler {
  static handleError(error: any): ApiError {
    if (error.response) {
      // Server responded with error
      return {
        code: error.response.data?.code || 'SERVER_ERROR',
        message: error.response.data?.message || 'Server error occurred',
        status: error.response.status,
        details: error.response.data?.details
      };
    }

    if (error.request) {
      // Request made but no response
      return {
        code: 'NETWORK_ERROR',
        message: 'Network error - no response received',
        status: 0
      };
    }

    // Request setup error
    return {
      code: 'REQUEST_ERROR',
      message: error.message || 'Error setting up request',
      status: 0
    };
  }

  static isRetryable(error: ApiError): boolean {
    const retryableCodes = ['NETWORK_ERROR', 'TIMEOUT', 'SERVER_ERROR'];
    const retryableStatuses = [408, 500, 502, 503, 504];
    
    return retryableCodes.includes(error.code || '') || 
           retryableStatuses.includes(error.status);
  }
}
