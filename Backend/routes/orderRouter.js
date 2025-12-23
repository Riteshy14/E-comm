import express from 'express'
import {allOrders,deleteOrder,orderStatus,placeOrder,userOrder} from '../controllers/orderController.js'
import authAdmin from '../middleware/adminAuth.js'
import authUser from '../middleware/userAuth.js'

const orderRouter = express.Router();

// admin
orderRouter.get('/orders',authUser,authAdmin,allOrders)
orderRouter.put('/status',authUser,authAdmin,orderStatus)

// user
orderRouter.get('/myOrder',authUser,userOrder)
orderRouter.post('/', authUser,placeOrder)
orderRouter.delete('/:orderId', authUser,deleteOrder)

// payment
// orderRouter.post('/Razorpay', authUser,RazorpayOrder)
// orderRouter.post('/verifyRazorpay', authUser,verifyRazorpay)

export default orderRouter;