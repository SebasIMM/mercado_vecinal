import {validateProduct, validatePartialProduct} from '../schemas/products.schemas..js';
import {ProductModel} from '../models/product.models.js';

export const getAllProducts = async function (req, res) {
	try {
		const {type} = req.query;
		const result = await ProductModel.getAll({type});

		return res.status(200).json({result: result});
	} catch (error) {
		return res.status(500).json({
			success: false,
			error: 'An unexpected error occurred while fetching the product',
		});
	}
};

export const getProductById = async function (req, res) {
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
};

export const createAProduct = async function (req, res) {
	const validated = validateProduct(req.body);

	if (validated.error) {
		return res.status(400).json({
			error: JSON.parse(result.error.message),
		});
	}

	try {
		const result = await ProductModel.createProduct({input: validated.data});

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
};

export const updateAProductById = async function (req, res) {
	const {id} = req.params;
	const validated = validatePartialProduct(req.body);

	if (validated.error)
		return res.status(400).json({error: JSON.parse(validated.error.message)});

	try {
		const result = await ProductModel.updateProduct({id, input: validated.data});

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
};

export const deleteAProductById = async function (req, res) {
	const {id} = req.params;

	try {
		const result = await ProductModel.deleteProduct({id});

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
};