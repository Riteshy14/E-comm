import express from "express"
import { adminLogin, userDetail, userSignin, userSignup } from "../controllers/userController.js";
import authUser from '../middleware/userAuth.js'

const userRouter = express.Router();

userRouter.post('/signup', userSignup)
userRouter.post('/signin', userSignin)
userRouter.get('/',authUser, userDetail)
userRouter.post('/admin',adminLogin)


export default userRouter; 