const express = require('express')
const connectDB = require('./config/db.config.js')
const port = 3000
const userRouter = require('./Routers/user.route.js')
const productRouter = require('./Routers/product.route.js')
const categoryRouter = require('./Routers/category.route.js')
const orderRouter = require('./Routers/order.route.js')
const cartRouter = require('./Routers/cart.route.js')
const cors = require('cors')
const app = express()
app.use(express.json())

app.use(
    cors({
        origin: ['http://localhost:4200', 'https://purefit-teal.vercel.app'],
    })
)

connectDB()

app.get('/', (req, res) => {
    res.send('<h1>The Api Is Running</h1>')
})
app.use('/user', userRouter)
app.use('/product', productRouter)
app.use('/order', orderRouter)
app.use('/category', categoryRouter)
app.use('/cart', cartRouter)
app.use('/images', express.static('images'))

app.listen(port, () => {
    console.log('The Server is Connected at Port: ' + port)
})
