import pool from '../config/db.config.js';
import {randomUUID} from 'node:crypto';
import {validateProduct, validatePartialProduct} from '../schemas/products.schemas..js';

export const getAllProducts = async function (req, res) {
	const client = await pool.connect();

	try {
		const result = await client.query('SELECT * FROM mv_products ORDER BY name');
		const data = result.rows;

		return res.status(200).json({status: 'success', data: data});
	} catch (error) {
		return res.status(500).send({
			error: true,
			mensaje: `An error occurred while executing the query.
            ${error}`,
		});
	} finally {
		client.release();
	}
};

export const getProductById = async function (req, res) {
	const client = await pool.connect();
	const id = req.params.id;

	try {
		const query = 'SELECT * FROM mv_products WHERE id_product = $1';
		const result = await client.query(query, [id]);

		if (!result.rowCount)
			return res.status(404).send({message: `That's not a valid ID.`});

		const data = result.rows;

		return res.status(200).json({status: 'success', data: data});
	} catch (error) {
		return res.status(500).send({
			error: true,
			mensaje: `An error occurred while executing the query.
			${error}`,
		});
	} finally {
		client.release();
	}
};

export const createAProduct = async function (req, res) {
	const client = await pool.connect();
	const result = validateProduct(req.body);
	const {name, description, price} = result.data;

	if (result.error) {
		return res.status(400).json({
			error: JSON.parse(result.error.message),
		});
	}

	try {
		// create an ID
		const newID = randomUUID();

		// Create the product in DB
		const query =
			'INSERT INTO mv_products (id_product, name, description, price) VALUES ($1, $2, $3, $4) RETURNING *';
		const values = [newID, name, description, price];

		const result = await client.query(query, values);
		const data = result.rows;
		console.log(result);
		return res.status(201).json({status: 'success', data: data});
	} catch (error) {
		return res.status(500).send({
			error: true,
			mensaje: `An error occurred while inserting a new row into the database.
            ${error}`,
		});
	} finally {
		client.release();
	}
};

export const updateAProductById = async function (req, res) {
	const {id} = req.params;
	const result = validatePartialProduct(req.body);
	const {name, description, price} = result.data;

	if (result.error) return res.status(400).json({error: JSON.parse(result.error.message)});
	
	const client = await pool.connect();

	// Validate if the ID exists in DB
	try {
		const query = 'SELECT id_product FROM mv_products WHERE id_product = $1';
		const result = await client.query(query, [id]);

		if (!result.rowCount) return res.status(400).send(`That's not a valid ID`);
	} catch (err) {
		return res.status(500).send('An error occurred while checking for existing ID');
	}

	// Update the product by its ID
	try {
		let values = [];
		values.push(name, description, price, id);

		const query = `UPDATE mv_products SET name = COALESCE($1, name), description = COALESCE($2, description
			), price = COALESCE($3, price) WHERE id_product = $4 RETURNING *`;

		const result = await client.query(query, values);
		const data = result.rows;

		res.status(200).send({status: 'success', data: data});
	} catch (err) {
		return res.status(500).send('An error occurred while updating the product');
	} finally {
		client.release();
	}
};

export const deleteAProductById = async function (req, res) {
	const client = await pool.connect();

	// Validate if the ID exists in DB
	try {
		let id = req.params.id;

		const query = 'SELECT id_product FROM mv_products WHERE id_product = $1';
		const result = await client.query(query, [id]);

		if (!result.rowCount) return res.status(400).send(`That's not a valid ID.`);
	} catch (err) {
		return res.status(500).send('An error occurred while checking for existing ID');
	}

	// Delete the product by its ID
	try {
		const query = 'DELETE FROM products WHERE id_product = $1';
		await client.query(query, [id]);

		res.status(200).send({message: 'The product has been deleted.'});
	} catch (err) {
		return res.status(500).send('An error occurred while deleting the product');
	} finally {
		client.release();
	}
};

// todo revisar si el formato es correcto
// * se requiere exportar todo en un solo nombre
// export default products;
