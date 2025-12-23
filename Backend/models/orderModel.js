import mongoose  from "mongoose";
import { number } from "zod";

const orderSchema= mongoose.Schema({
    userID:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "user" ,
        require:true
    },
    items:[
        {
            productId:{
                type : mongoose.Schema.Types.ObjectId,
                ref:"Product",
            },
            name:String,
            quantity: Number,
            price : Number
        }
    ],
    amount:{
        type:Number,
        require:true
    },
    address:{
        type:Array,
        require:true
    },
    paymentMethod:{
        type:String,
        require: true
    },
    payment:{
        type:Boolean,
        require:true,
        default:false
    },
    status:{
        type:String,
        require:true,
        default:"order placed"
    },
    date:{
        type: Number,
        require:true
    },
},{timestamps:true})

const order = mongoose.models.order || mongoose.model("order",orderSchema)

export default order;