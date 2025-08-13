import { Router } from 'express';
import { ProductController } from '../controllers/ProductController';

const router = Router();
const productController = new ProductController();

// Product CRUD routes
router.get('/', productController.getProducts);
router.get('/:id', productController.getProductById);
router.post('/', productController.createProduct);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

// Additional product routes
router.get('/:id/variants', productController.getProductVariants);
router.post('/:id/variants', productController.createProductVariant);
router.get('/search', productController.searchProducts);
router.get('/category/:categoryId', productController.getProductsByCategory);

export default router;