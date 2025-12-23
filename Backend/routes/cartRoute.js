import express from 'express'
import {addTocart,getCartData,updateCart,DeleteCard} from '../controllers/cartController.js'
import authUser from '../middleware/userAuth.js'

const cartRouter = express.Router();

cartRouter.get('/', authUser, getCartData)
cartRouter.post('/add', authUser,addTocart)
cartRouter.put('/update', authUser, updateCart)
cartRouter.delete('/delete',authUser, DeleteCard)

export default cartRouter;