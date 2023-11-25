import {validateProduct, validatePartialProduct} from '../schemas/products.schemas..js';
import {ProductModel} from '../models/product.models.js';

export class productController {
	static async getAll(req, res) {
		try {
			const {type} = req.query;
			const result = await ProductModel.getAll({type});
			
			return res.status(200).json({result: result.data});
		} catch (error) {
			return res.status(500).json({
				success: false,
				error: 'An unexpected error occurred while fetching the product',
			});
		}
	}

	static async getById(req, res) {
		const {id} = req.params;

		try {
			const result = await ProductModel.getById({id});

			if (result.success) {
				return res.status(200).json({result: result});
			} else {
				return res.status(404).json({result: result});
			}
		} catch (error) {
			return res.status(500).json({
				success: false,
				error: 'An unexpected error occurred while fetching the product',
			});
		}
	}

	static async create(req, res) {
		const validated = validateProduct(req.body);

		if (validated.error) {
			return res.status(400).json({
				error: JSON.parse(result.error.message),
			});
		}

		try {
			const result = await ProductModel.create({input: validated.data});

			if (result.success) {
				return res.status(201).json({result: result});
			} else {
				return res.status(400).json({result: result});
			}
		} catch (error) {
			return res.status(500).json({
				success: false,
				error: 'An unexpected error occurred while creating the product',
			});
		}
	}

	static async updateById(req, res) {
		const {id} = req.params;
		const validated = validatePartialProduct(req.body);

		if (validated.error)
			return res.status(400).json({error: JSON.parse(validated.error.message)});

		try {
			const result = await ProductModel.updateById({id, input: validated.data});

			if (result.success) {
				return res.status(201).json({result: result});
			} else {
				return res.status(400).json({result: result});
			}
		} catch (error) {
			return res.status(500).json({
				success: false,
				error: 'An unexpected error occurred while updating the product',
			});
		}
	}

	static async deleteById(req, res) {
		const {id} = req.params;

		try {
			const result = await ProductModel.deleteById({id});

			if (result.success) {
				return res.status(201).json({result: result});
			} else {
				return res.status(400).json({result: result});
			}
		} catch (err) {
			return res.status(500).json({
				success: false,
				error: 'An unexpected error occurred while deleting the product',
			});
		}
	}
}
