import Express from 'express';
const router = Express.Router();
import { createAProduct, deleteAProductById, getAllProducts, getProductById, updateAProductById } from '../controllers/products.controllers.js'


router.get('/', getAllProducts);

router.get('/:id', getProductById);

router.post('/', createAProduct);

router.put('/:id', updateAProductById);

router.delete('/:id', deleteAProductById);


export default router;
