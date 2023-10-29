import pool from '../config/db.config.js';

export const alldatafromddbb = async function (req, res) {
    let { tablename } = req.params

	try {
		const result = await pool.query(`SELECT * FROM ${tablename}`);
        const data = result.rows

        return res.status(200).json({message: `Data from ${tablename}`, data: data});
	} catch (error) {
		console.log('Error en la consulta');
		return res.status(500).send({
			error: true,
			mensaje: `Ocurrió un error al realizar la consulta
        ${error}`,
		});
	}
};
