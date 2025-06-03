import { describe, it, expect, beforeEach } from 'vitest'
import { productService } from '../../services/productService'
import { useProductStore } from '../../store/productStore'

describe('Product Integration Tests', () => {
  beforeEach(() => {
    useProductStore.setState({ products: [] })
  })

  it('should successfully connect to API', async () => {
    const response = await productService.testConnection()
    expect(response.status).toBe('ok')
  })

  it('should create product and update store', async () => {
    const testProduct = {
      name: 'Test Product',
      description: 'Test Description',
      price: 100,
      category: 'test-category',
      status: 'draft' as const,
      stock: 10,
      imageUrls: [],
      images: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    const store = useProductStore.getState()
    const created = await store.createProduct(testProduct)

    // Verify the mock was called
    expect(productService.createProduct).toHaveBeenCalledWith(testProduct)

    // Verify the response
    expect(created.id).toBe('test-id')
    expect(created.name).toBe(testProduct.name)

    // Verify store update
    const storeProducts = useProductStore.getState().products
    expect(storeProducts).toHaveLength(1)
    expect(storeProducts[0]).toMatchObject(testProduct)
  })
})
