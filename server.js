import 'dotenv/config';
import express from 'express';
import expressLayouts from 'express-ejs-layouts';
import {fileURLToPath} from 'url';
import {dirname, join} from 'path';

// routes
import indexRouter from './src/routes/index.routes.js'; // webpage routes
import productsRouter from './src/routes/products.routes.js';
import {corsMiddleware} from './src/middlewares/cors.js';

const app = express();
const port = process.env.PORT || 3000;

//Get the current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// static routes
app.use(express.static(join(__dirname, 'public')));
app.use(express.static(join(__dirname, 'node_modules', 'bootstrap', 'dist')));
app.use(express.static(join(__dirname, 'node_modules', 'axios', 'dist')));

// middlewares
app.disable('x-powered-by');
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(expressLayouts);
app.use(corsMiddleware());

// view engine
app.set('view engine', 'ejs');
app.set('layout', join(__dirname, 'src', 'views', 'layouts', 'main')); // layout default route
app.set('views', join(__dirname, 'src', 'views')); // all views route

// endpoints
app.use('/api/products', productsRouter);
app.use('/', indexRouter);

app.listen(port, () => console.log(`Server running on port ${port}`));