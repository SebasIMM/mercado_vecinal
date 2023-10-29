import Express from "express";
import 'dotenv/config'

const app = Express()
const port = (process.env.PORT || 3000)

// routes
import asd from './src/routes/app.routes.js'

// middlewares
app.use(Express.json()) // for parsing application/json
app.use(Express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// endpoints
app.use('/', asd)


app.listen(port, () => console.log(`Server running on port ${port}`))