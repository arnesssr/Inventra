import { beforeEach, vi } from 'vitest'
import { useProductStore } from '../store/productStore'
import { productService } from '../services/productService'

// Direct mock implementation
vi.mock('../services/productService', () => ({
  productService: {
    testConnection: vi.fn().mockResolvedValue({ status: 'ok' }),
    createProduct: vi.fn().mockImplementation((data) => 
      Promise.resolve({
        id: 'test-id',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        ...data
      })
    )
  }
}))

// Reset store state before each test
beforeEach(() => {
  useProductStore.setState({ products: [] })
  vi.clearAllMocks()
})
