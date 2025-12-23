import Product from "../models/productmodel.js"
import {v2 as cloudinary} from 'cloudinary'

const addProduct = async (req,res)=>{
    try {
        const {name, description,price,category,subCategory,size,bestSeller,date} = req.body;

        const image1 = req.files.image1 && req.files.image1[0];
        const image2 = req.files.image2 && req.files.image2[0];
        const image3 = req.files.image3 && req.files.image3[0];
        const image4 = req.files.image4 && req.files.image4[0];

        const images = [image1,image2,image3,image4].filter((item)=> item !== undefined)

        let imagesUrl = await Promise.all(
            images.map(async (item)=>{
                let result = await cloudinary.uploader.upload(item.path,{resource_type:'image'});
                return result.secure_url
            })
        )
        const product = {
            name,
            description,
            price: Number(price),
            category,
            subCategory,
            bestSeller: bestSeller === "true" ? true : false,
            images: imagesUrl,
            size:size ? JSON.parse(size):[],
            date : Date.now()
        }

        const createProduct = new Product(product);
        await createProduct.save();

        return res.status(201).json({
            success:true,
            msg:"product crated",
            createProduct
        })
    } catch (error) {
        console.log("error", error);
        return res.status(500).json({
            success:false,
            msg: "server error" + error.message
        })
    }

}

const removeProduct = async (req,res)=>{
    try {
        const id = req.body.id
        console.log("id os ",id);
        const removeProduct = await Product.findByIdAndDelete(id)

        if(!removeProduct){
            return res.status(404).json({
                success:false,
                msg:"product not found"
            })
        }

        return res.status(200).json({
            success:true,
            msg: "product deleted successfully"
        })
    } catch (error) {
        console.log("error:", error);
        return res.status(500).json({
            success:false,
            msg:"server error" + error.message
        })
    }
}

const allProduct = async (req,res)=>{
    try {
        const Products = await Product.find({})

        return res.status(200).json({
            success:true,
            Products
        }) 
    } catch (error) {
        console.log("error:", error);
        return res.status(500).json({
            success:false,
            msg:"server error: " + error.message
        })
    }
}

const singleProduct = async (req,res)=>{
    const {productId} = req.params
    try {
        const product = await Product.findById(productId)

        if(!product){
            return res.status(404).json({
                success : false,
                msg:"product not found"
            })
        }
        return res.status(200).json({
            success:true,
            product
        })
    } catch (error) {
        console.log("error", error);
        return res.status(500).json({
                success : false,
                msg:"server error: " + error.message
        })
    }
}

const updateProduct = async (req,res)=>{
    const {productId} = req.params;
    const {name,description,price,category,brand,images,size} = req.body;
    try {
        const updatedProduct = await Product.findByIdAndUpdate(productId,{
            name,
            description,
            price,
            category,
            brand,
            images,
            size,
        },{new:true})

        if(!updatedProduct){
            return res.status(404).json({
                success:false,
                msg:"product not found"
            })
        }

        return res.status(200).json({
            success:true,
            msg:"product updated successfully",
            updatedProduct
        })
    } catch (error) {
        console.log("error", error);
        return res.status(500).json({
            success:false,
            msg:"server error" + error.message
        })
    }

}

export {
    addProduct,
    removeProduct,
    allProduct,
    singleProduct,
    updateProduct
}