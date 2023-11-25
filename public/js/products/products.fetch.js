import { insertProducts } from "./products.insert.js";

// productsService.js (módulo para obtener productos)
export const getAllProducts = async () => {
    try {
        const response = await axios('/api/products');

        if (response.status !== 200) {
            throw new Error('La solicitud no se completó con éxito');
        }

        const {result} = response.data
        insertProducts(result)
        return
    } catch (error) {
        console.error('Hubo un error en la consulta:', error);
    }
};

