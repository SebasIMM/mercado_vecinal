import Express from 'express';
const router = Express.Router();
import {productController} from '../controllers/products.controllers.js'


router.get('/', productController.getAll);

router.get('/:id', productController.getById);

router.post('/', productController.create);

router.put('/:id', productController.updateById);

router.delete('/:id', productController.deleteById);


export default router;
