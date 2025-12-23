import express from 'express'
import userRouter from './routes/userRouter.js';
import productRouter from './routes/productRouter.js';
import orderRouter from './routes/orderRouter.js';
import cartRouter from './routes/cartRoute.js';
import connectDb from './config/db.js';
import connectCloudinary from './config/cloudinary.js';
import cors from 'cors'

const app = express();

connectDb();
connectCloudinary();

app.use(express.json());
app.use(cors())

app.use('/api/user', userRouter)
app.use('/api/products', productRouter)
app.use('/api/order', orderRouter)
app.use('/api/cart', cartRouter)


const PORT = process.env.PORT || 5000

app.get('/', (req,res)=>{
    res.json({
        msg: "Server is running"
    })
})

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
})