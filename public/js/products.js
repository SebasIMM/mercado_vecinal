import { getAllProducts } from "./fetch.products.js";

// obtener los productos y mostrarlos
document.getElementById('butonn').addEventListener('click', getAllProducts)