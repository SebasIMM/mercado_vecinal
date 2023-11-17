import pool from '../config/db.config.js';
import {randomUUID} from 'node:crypto';

export class ProductModel {
	static async getAll({type}) {
		const client = await pool.connect();

		try {
			let query;

			if (type) {
				query = 'SELECT * FROM mv_products WHERE name = $1 ORDER BY name';
			} else {
				query = 'SELECT * FROM mv_products ORDER BY name';
			}

			const result = await client.query(query, type ? [type] : []);

			return {success: true, data: result.rows};
		} catch (err) {
			throw new Error(`Error updating product: ${err.message}`);
		} finally {
			client.release();
		}
	}

	static async getById({id}) {
		const client = await pool.connect();

		try {
			const query = 'SELECT * FROM mv_products WHERE id_product = $1';
			const result = await client.query(query, [id]);

			if (!result.rowCount) {
				return {success: false, message: `That's not a valid ID.`};
			}

			return {success: true, data: result.rows};
		} catch (err) {
			throw new Error(`Error updating product: ${err.message}`);
		} finally {
			client.release();
		}
	}

	static async createProduct({input}) {
		const client = await pool.connect();

		try {
			// create an ID
			const id = randomUUID();

			const query =
				'INSERT INTO mv_products (id_product, name, description, price) VALUES ($1, $2, $3, $4) RETURNING *';
			const values = [id, input.name, input.description, input.price];

			const result = await client.query(query, values);

			return {success: true, data: result.rows};
		} catch (err) {
			throw new Error(`Error updating product: ${err.message}`);
		} finally {
			client.release();
		}
	}

	static async updateProduct({id, input}) {
		const client = await pool.connect();

		// Validate if the ID exists in DB
		try {
			const query = 'SELECT id_product FROM mv_products WHERE id_product = $1';
			const result = await client.query(query, [id]);

			if (!result.rowCount) return {success: false, message: `That's not a valid ID`};
		} catch (err) {
			throw new Error(`Error checking for existing ID: ${err.message}`);
		}

		// Update the product by its ID
		try {
			const query = `UPDATE mv_products SET name = COALESCE($1, name), description = COALESCE($2, description
			), price = COALESCE($3, price) WHERE id_product = $4 RETURNING *`;
			const values = [input.name, input.description, input.price, id];

			const result = await client.query(query, values);

			return {success: true, data: result.rows};
		} catch (err) {
			throw new Error(`Error updating product: ${err.message}`);
		} finally {
			client.release();
		}
	}

	static async deleteProduct({id}) {
		const client = await pool.connect();
		// Validate if the ID exists in DB
		try {
			const query = 'SELECT id_product FROM mv_products WHERE id_product = $1';
			const result = await client.query(query, [id]);

			if (!result.rowCount) return {success: false, message: `That's not a valid ID`};
		} catch (err) {
			throw new Error(`Error checking for existing ID: ${err.message}`);
		}

		// Delete the product by its ID
		try {
			const query = 'DELETE FROM mv_products WHERE id_product = $1';
			await client.query(query, [id]);

			return {success: true, message: 'The product has been deleted.'};
		} catch (err) {
			throw new Error(`Error deleting product: ${err.message}`);
		} finally {
			client.release();
		}
	}
}
