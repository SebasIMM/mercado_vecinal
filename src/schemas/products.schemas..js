import {z} from 'zod';

const productSchema = z.object({
    name: z.string({
        invalid_type_error: 'Product name must be a string',
        required_error: 'Product name is required',

    }).trim().toLowerCase(),
	description: z.string({
        invalid_type_error: 'Description must be a string',
        required_error: 'Description is required',
    }).trim().toLowerCase(),
    price: z.number({
        required_error: "Price is required",
        invalid_type_error: "Price must be a number"
    }).nonnegative()
});

export const validateProduct = (product) => {
        return productSchema.safeParse(product);
};
    
export const validatePartialProduct = (product) => {
    return productSchema.partial().safeParse(product)
}