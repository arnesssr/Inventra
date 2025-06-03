import { beforeAll, afterEach, beforeEach, vi } from 'vitest'
import { useProductStore } from '../../store/productStore'

// Mock productService
vi.mock('../../services/productService', () => ({
  productService: {
    testConnection: vi.fn().mockResolvedValue({ status: 'ok' }),
    createProduct: vi.fn().mockImplementation((data) =>
      Promise.resolve({ ...data, id: 'test-id' })),
    updateProduct: vi.fn(),
    publishProduct: vi.fn()
  }
}))

// Reset all mocks and stores between tests
beforeEach(() => {
  useProductStore.setState({ products: [] })
  vi.clearAllMocks()
})

afterEach(() => {
  vi.resetAllMocks()
})
