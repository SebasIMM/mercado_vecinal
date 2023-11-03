import express from 'express';
const router = express.Router();

// index page
router.get("/", function (req, res) {
    res.render('./pages/home', {title:'inicio'})
})

// products page
router.get("/products", function (req, res) {
    res.render('./pages/products', {title:'Productos'})
})

// contact page
router.get("/contact", function (req, res) {
    res.render('./pages/contact', {title:'Contacto'})
})

export default router;