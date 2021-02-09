require('dotenv').config()
const express = require('express')
const massive = require('massive')
const cntrl = require('./products_controller')

const app = express()

const { SERVER_PORT, CONNECTION_STRING } = process.env

massive({
    connectionString: CONNECTION_STRING,
    ssl: {
        rejectUnauthorized: false
    }
}).then(dbInstance => {
    app.set('db', dbInstance)
    console.log('db connection successful')
}).catch(err => console.log(err))

app.use(express.json())

app.post('/api/products', cntrl.createProduct)
app.get('/api/products', cntrl.getAllProducts)
app.get('/api/products/:id', cntrl.getSpecificProduct)
app.put('/api/products/:id', cntrl.updateProduct)
app.delete('/api/products/:id', cntrl.deleteProduct)


app.listen(SERVER_PORT, () => {
    console.log(`Server is listeneing on port ${SERVER_PORT}`)
})
