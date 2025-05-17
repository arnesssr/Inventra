import { config, getCurrentConfig } from '../config/environment'

interface PublishProductData {
  id: string
  name: string
  price: number
  description: string
  imageUrls: string[]
  category: string
  stock: number
}

class StorefrontService {
  private baseUrl: string
  private apiKey: string

  constructor() {
    const currentConfig = getCurrentConfig();
    this.baseUrl = currentConfig.storefrontUrl;
    this.apiKey = currentConfig.apiKey;
    console.log(`StorefrontService initialized with URL: ${this.baseUrl}`);
  }

  async publishProduct(data: PublishProductData) {
    try {
      const url = new URL('/api/products', this.baseUrl).toString();
      console.log(`Publishing to storefront at: ${url}`);
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error(`Failed to publish product: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error publishing to storefront:', error);
      throw error;
    }
  }

  async unpublishProduct(productId: string) {
    try {
      const response = await fetch(`${this.baseUrl}/api/products/${productId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`
        }
      })

      if (!response.ok) {
        throw new Error('Failed to unpublish product')
      }
    } catch (error) {
      console.error('Error unpublishing product:', error)
      throw error
    }
  }
}

export const storefrontService = new StorefrontService()
