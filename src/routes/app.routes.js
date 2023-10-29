import Express, {Router} from 'express';
const router = Express.Router();
import {alldatafromddbb} from '../controllers/crud.controllers.js';

// obtener data
// router.get('/:data', alldata)
router.get('/:tablename', alldatafromddbb);



export default router;
