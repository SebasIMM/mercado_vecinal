import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
	user: process.env.PGUSER,
	host: process.env.PGHOST,
	database: process.env.PGDATABASE,
	password: process.env.PGPASSWORD,
	port: 5432,
});

// Connect to the database
pool
	.connect()
	.then(() => {
		console.log('Successful connection');
	})
	.catch((err) => {
		console.error('Connection error:', err);
	});


export default pool;
