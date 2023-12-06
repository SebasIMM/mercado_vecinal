import express from 'express';
const router = express.Router();
import axios from 'axios';

// index page
router.get("/", function (req, res) {
    res.render('./pages/home', {title:'inicio'})
})

// products page
router.get("/products", async function (req, res) {
    // let data = await axios('/api/products');
    let result = await axios({
        method: 'get',
        url: 'http://localhost:3100/api/products'
    })
    let data = result.data.result
    console.log(data);
    res.render('./pages/products', {title:'Productos', data: data})
})

// contact page
router.get("/contact", function (req, res) {
    res.render('./pages/contact', {title:'Contacto'})
})

// Handling Not Found Routes (404)
router.use((req, res) => {
    res.render('./pages/error', {title:'404'})
})

export default router;