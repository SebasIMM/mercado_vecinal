import express from 'express';
import expressLayouts from'express-ejs-layouts';
import 'dotenv/config'
// todo añadir path para corregir las rutas

const app = express()
const port = process.env.PORT || 3000

// static routes
app.use(express.static('./public'));
app.use(express.static('./node_modules/bootstrap/dist'));
app.use(express.static('./node_modules/axios/dist'));

// routes
import indexRouter from './src/routes/index.routes.js' // web page routes
import productsRouter from './src/routes/products.routes.js'

// middlewares
app.disable('x-powered-by');
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(expressLayouts);

// view engine
app.set('view engine', 'ejs')
app.set('layout','layouts/main') // layout route from 'views', route like 'folfer/file'
app.set('views', './src/views/'); // views route from this point

// endpoints
app.use('/', indexRouter)
app.use('/api/products', productsRouter)


app.listen(port, () => console.log(`Server running on port ${port}`))