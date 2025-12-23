import express from 'express'
import { allProduct, addProduct,removeProduct,singleProduct, updateProduct } from '../controllers/productController.js'
import upload from '../middleware/multer.js'
import authAdmin from '../middleware/adminAuth.js'
import authUser from '../middleware/userAuth.js'

const productRouter = express.Router();

productRouter.get('/', allProduct)
productRouter.get('/:productId' ,singleProduct)
productRouter.post('/add' ,authUser, authAdmin,upload.fields([{name:'image1',maxCount:1},{name:'image2',maxCount:1},{name:'image3',maxCount:1},{name:'image4',maxCount:1}]) ,addProduct)
productRouter.delete('/remove',authUser, authAdmin , removeProduct)
productRouter.put('/:productId',authUser, authAdmin , updateProduct)


export default productRouter;