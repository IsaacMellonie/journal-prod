import express from 'express'
import { CategoryModel } from './db.js'
import entryRoutes from './routes/entry_routes.js'
import categoryRoutes from './routes/category_routes.js'
import cors from 'cors' 


const app = express()
// we need this import so that other ports can access the database
app.use(cors())

app.use(express.json())

app.get('/', (req, res) => res.send({ info: 'Journal API' }))

// TODO: move categories to routes folder --- DONE!
// TODO: Complete categories CRUD --- DONE!
// TODO: ADVANCED: Modify "GET /categories/:id" to embed an array of all the entries in that category

app.use('/categories', categoryRoutes)
app.use('/entries', entryRoutes)

export default app
