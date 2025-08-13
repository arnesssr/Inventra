import type { Product, StockMovement } from "@/types/productTypes"

export const calculateTrend = (current: number, previous: number): number => {
  if (previous === 0) return 0
  return Number(((current - previous) / previous * 100).toFixed(1))
}

export const calculateMetrics = (products: Product[], movements: StockMovement[]) => {
  const now = new Date()
  const thirtyDaysAgo = new Date(now.getTime() - (30 * 24 * 60 * 60 * 1000))
  const sixtyDaysAgo = new Date(now.getTime() - (60 * 24 * 60 * 60 * 1000))

  // Current metrics with null checks
  const currentProducts = products.length
  const currentValue = products.reduce((acc, curr) => 
    acc + ((curr.price ?? 0) * (curr.stock ?? 0)), 0)
  const currentMovements = movements.filter(m => 
    new Date(m.date) >= thirtyDaysAgo).length

  // Previous metrics (using historical data)
  const previousMovements = movements.filter(m => {
    const date = new Date(m.date)
    return date >= sixtyDaysAgo && date < thirtyDaysAgo
  }).length

  // Calculate real trends
  const previousProducts = products.filter(p => 
    new Date(p.createdAt) >= sixtyDaysAgo && 
    new Date(p.createdAt) < thirtyDaysAgo
  ).length
  
  const previousValue = products
    .filter(p => new Date(p.createdAt) >= sixtyDaysAgo && 
                 new Date(p.createdAt) < thirtyDaysAgo)
    .reduce((acc, curr) => acc + ((curr.price ?? 0) * (curr.stock ?? 0)), 0)

  return {
    products: {
      current: currentProducts,
      trend: calculateTrend(currentProducts, previousProducts)
    },
    value: {
      current: currentValue,
      trend: calculateTrend(currentValue, previousValue)
    },
    activity: {
      current: currentMovements,
      trend: calculateTrend(currentMovements, previousMovements)
    }
  }
}
