import pool from '../config/db.config.js';


export const getAllProducts = async function (req, res) {
	const client = await pool.connect();

	try {
		const result = await client.query(
			'SELECT * FROM products ORDER BY name'
		);
		const data = result.rows;

		return res.status(200).json({message: 'Todos los productos', response: data});
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
	const id = req.params.id;
	const client = await pool.connect();

	try {
		const query = 'SELECT * FROM products WHERE id_product = $1';
		const result = await client.query(query, [id]);

		if (!result.rowCount) return res.status(404).send({ message: `That's not a valid ID.`});

		const data = result.rows;

		return res.status(200).json({ response: data });
	} catch (error) {
		return res.status(500).send({
			error: true,
			mensaje: `An error occurred while executing the query.
			${error}`
		})
	} finally {
		client.release()
	}	
}

export const createAProduct = async function (req, res) {
	const { name, description, price } = req.body;
	const client = await pool.connect();

	// Validate that the information is provided in the request body.
	let validation = "The following data is missing.";
	if (!name) validation += ` name`;
	if (!description) validation += ` description`;
	if (!price) validation += ` price`;

	if (!name || !description || !price) {
		return res.status(400).send({ message: "Data missing", response: validation });
	}

	// Create the product in DB
	try {
		const query =
			'INSERT INTO products (name,description,price,available) VALUES ($1,$2,$3,$4) RETURNING *';
		const values = [name, description, price, true];

		const data = await client.query(query, values);
		const newProduct = data.rows;

		return res
			.status(200)
			.json({message: 'Nuevo Producto Creado', response: newProduct});
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
	const id = req.params.id;
	const name = req.body.name || null;
	const description = req.body.description || null;
	const price = parseFloat(req.body.price) || 0;

	const client = await pool.connect();

	// Validate if the ID exists in DB
	try {
		const query = 'SELECT id_product FROM products WHERE id_product = $1';
		const result = await client.query(query, [id]);

		if (!result.rowCount) return res.status(400).send(`That's not a valid ID`);

	} catch (err) {
		return res.status(500).send('An error occurred while checking for existing ID');
	}

	// Update the product by its ID
	try {
		let values = [];
		values.push(name, description, price, id)

		const query = `UPDATE products SET name = COALESCE($1, name), description = COALESCE($2, description
			), price = COALESCE($3, price) WHERE id_product = $4 RETURNING *`;
			
		const data = await client.query(query, values);
		const updatedProduct = data.rows;

		res.status(200).send({message: 'product updated successfully!', response: updatedProduct});
	} catch (err) {
		return res.status(500).send('An error occurred while updating the product');
	} finally {
		client.release();
	}
}

export const deleteAProductById = async function (req, res) {
	let id = req.params.id;
	const client = await pool.connect();
	
	// Validate if the ID exists in DB
	try {
		const query = 'SELECT id_product FROM products WHERE id_product = $1';
		const result = await client.query(query, [id]);

		if (!result.rowCount) return res.status(400).send(`That's not a valid ID.`);
	} catch (err) {
		return res.status(500).send('An error occurred while checking for existing ID');
	}

	// Delete the product by its ID
	try {
		const query = 'DELETE FROM products WHERE id_product = $1';
		await client.query(query, [id]);

		res.status(200).send({ message: 'The product has been deleted.' });
	} catch (err) {
		return res.status(500).send('An error occurred while deleting the product');
	} finally {
		client.release();
	}
}
