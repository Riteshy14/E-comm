import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    name:{
        type: String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    price:{
        type:Number,
        require:true
    },
    category:{
        type:String,
        require:true
    },
    subCategory:{
        type:String,
        require:true
    },
    images:{
        type : [String],
        require:true
    },
    countInStock:{
        type:Number,
        require: true,
        default:0
    },
    bestSeller:{
        type:Boolean,
    },
    size:{
        type:Array,
        require:true
    },
    date:{
        type:Number,
        require: true
    }
},{timestamps:true})

const Product = mongoose.models.Product || mongoose.model("Product",productSchema)

export default Product;
