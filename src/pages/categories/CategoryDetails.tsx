import { useParams, useNavigate } from "react-router-dom"
import { Button } from "../../components/ui/Button"
import { Plus } from "lucide-react"
import { useProductStore } from "../../store/productStore"
import { useCategoryStore } from "../../store/categoryStore"
import { Table, TableHeader, TableRow, TableCell, TableBody } from "../../components/ui/Table"

export function CategoryDetails() {
  const { categoryId } = useParams()
  const navigate = useNavigate()
  const products = useProductStore(state => 
    state.products.filter(p => p.category === categoryId && p.status === 'published')
  )
  const category = useCategoryStore(state => 
    state.categories.find(c => c.id === categoryId)
  )

  if (!categoryId || !category) return null

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{category.name}</h2>
        <Button onClick={() => navigate(`/products/new/${categoryId}`)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Product
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Stock</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>KES {product.price.toLocaleString()}</TableCell>
              <TableCell>{product.stock}</TableCell>
              <TableCell>{product.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
