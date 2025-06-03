import { http, HttpResponse } from 'msw'

export const handlers = [
  // Health check endpoint
  http.get('*/health', () => {
    return HttpResponse.json({ status: 'ok' })
  }),

  // Products endpoints
  http.post('/api/products', async () => {
    return HttpResponse.json({
      id: 'test-id',
      name: 'Test Product',
      status: 'draft',
      // ...other required fields
    })
  })
]
