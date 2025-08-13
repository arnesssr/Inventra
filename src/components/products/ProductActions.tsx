import { Button } from "@/ui/Button"
import { Globe, Globe2 } from "lucide-react"
import { useToast } from "@/ui/use-toast"
import { Product } from "@/types/productTypes"

export function ProductActions({ product }: { product: Product }) {
  const { toast } = useToast()

  const handlePublishToggle = async () => {
    try {
      // TODO: Replace with React Query API call
      if (product.publishedToStorefront) {
        // await unpublishFromStorefront(product.id)
        toast({
          title: "Product unpublished",
          description: "Product removed from storefront"
        })
      } else {
        // await publishToStorefront(product.id)
        toast({
          title: "Product published",
          description: "Product is now live on the storefront"
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update product status",
        variant: "destructive"
      })
    }
  }

  return (
    <Button
      variant={product.publishedToStorefront ? "default" : "outline"}
      onClick={handlePublishToggle}
      disabled={product.status !== 'published'}
    >
      {product.publishedToStorefront ? (
        <>
          <Globe2Off className="w-4 h-4 mr-2" />
          Unpublish from Store
        </>
      ) : (
        <>
          <Globe className="w-4 h-4 mr-2" />
          Publish to Store
        </>
      )}
    </Button>
  )
}
