import { insertProducts } from "./products.insert.js";
// import axios from 'axios';

// productsService.js (módulo para obtener productos)
export const getAllProducts = async () => {
    try {
        const response = await axios.get('/api/products');

        if (response.status !== 200) {
            throw new Error('La solicitud no se completó con éxito');
        }

        let data = response.data.result
        insertProducts(data)
        return
    } catch (error) {
        console.error('Hubo un error en la consulta:', error);
    }
};

