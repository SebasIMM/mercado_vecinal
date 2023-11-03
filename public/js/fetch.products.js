// productsService.js (módulo para obtener productos)
export const getAllProducts = async () => {
    try {
        const response = await fetch('/api/products');
        
        if (!response.ok) {
            throw new Error('La solicitud no se completó con éxito');
        }
        
        const data = await response.json();
        let products = data.response;
        console.log(products);
    } catch (error) {
        console.error('Hubo un error en la consulta:', error);
        throw error;
    }
};

