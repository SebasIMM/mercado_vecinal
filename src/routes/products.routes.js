import Express from 'express';
const router = Express.Router();
import products from '../controllers/products.controllers.js'


router.get('/', products.getAllProducts);

router.get('/:id', products.getProductById);

router.post('/', products.createAProduct);

router.put('/:id', products.updateAProductById);

router.delete('/:id', products.deleteAProductById);


export default router;
