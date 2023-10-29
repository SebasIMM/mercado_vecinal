import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
	user: process.env.USER,
	host: 'localhost',
	database: process.env.PGDATABASE,
	password: process.env.PGPASSWORD,
	port: 5432,
});

// Connect to the database
pool
	.connect()
	.then(() => {
		console.log('Conexión exitosa');
	})
	.catch((err) => {
		console.error('Error en la conexión:', err);
	});

    
export default pool;
