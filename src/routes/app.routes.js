import Express, {Router} from 'express';
const router = Express.Router();
import { UpdateAProduct, createAProduct, getAllData, getAllProducts } from '../controllers/crud.controllers.js';


// router.get('/table/:table', getAllData);

router.get('/', getAllProducts);

router.post('/', createAProduct);

router.put('/:id', UpdateAProduct);

export default router;
