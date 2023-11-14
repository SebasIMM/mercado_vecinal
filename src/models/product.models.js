//todo random uuid para crear id
import { randomUUID } from 'node:crypto'
// Usa randomUUID
// const myUUID = randomUUID();
// console.log(myUUID);


export const getProducts = async (params) => {
	try {
		const client = await pool.connect();

		const result = await client.query('SELECT * FROM products ORDER BY name');
		const data = result.rows;

		return res.status(200).json({ status: 'success', data: data });
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
