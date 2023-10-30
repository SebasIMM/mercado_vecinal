import pool from '../config/db.config.js';

export const getAllData = async function (req, res) {
	let {table} = req.params;
	const client = await pool.connect();

	try {
		const result = await client.query(`SELECT * FROM ${table}`);
		const data = result.rows;

		return res.status(200).json({message: `Data from table ${table}`, data: data});
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

export const getAllProducts = async function (req, res) {
	const client = await pool.connect();

	try {
		const result = await client.query(
			'SELECT name, description, price FROM products WHERE available = true ORDER BY name'
		);
		const data = result.rows;

		return res.status(200).json({message: 'Productos', productos: data});
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
	const {name, description, price} = req.body;
	const client = await pool.connect();

	try {
		const query =
			'INSERT INTO products (name,description,price,available) VALUES ($1,$2,$3,$4) RETURNING *';
		const values = [name, description, price, true];

		const data = await client.query(query, values);
		const newProduct = data.rows;

		return res
			.status(200)
			.json({message: 'Nuevo Producto Creado', name: newProduct[0].name});
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

export const UpdateAProduct = async function (re, res) {
	let id = re.params.id;
	let {name, description, price} = re.body;

	const client = await pool.connect();

	// validar que el ID exista
	const query = 'SELECT id_product FROM products WHERE id_product = $1';
	const value = [id];

	try {
		const productToUpdate = await client.query(query, value);

		if (productToUpdate.rows.length === 0) {
			return res.status(400).send(`That's not a valid ID.`);
		}
	} catch (error) {
		return res.status(500).send('An error occurred while processing the request.');
	}

	// Ejecutar la modificacion del producto
	try {
		const query = 'UPDATE products SET name=$1, description=$2, price=$3 WHERE id_product=($4) RETURNING *';
        const values = [name, description, price, id];
        
        const data = await client.query(query, values);
        const updatedProduct = data.rows;

		return res.status(200).json({message: 'product updated successfully!', newData: updatedProduct});
	} catch (err) {
		return res.status(500).send({
			error: true,
			mensaje: `An error occurred while updating the product.
            ${err}`,
		});
	} finally {
		client.release();
	}
};
