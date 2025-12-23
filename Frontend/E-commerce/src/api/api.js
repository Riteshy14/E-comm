import axios from 'axios'

const backendurl = import.meta.env.VITE_BACKEND_URL

export const getProductData = async ()=>{
    try {
        const res = await axios.get(`${backendurl}/api/products`)
        return res.data.Products;
    } catch (error) {
        console.error("Failed to fetch products:", error)
        throw error;
    }
}

export const getSingleProduct = async (productId) => {
    try{
        const res = await axios.get(`${backendurl}/api/products/${productId}`);
        return res.data.product;
    } catch (error) {
        console.error("Failed to fetch products:", error)
        throw error;
    }
};

export const getUser = async(token)=>{
    try {
        const res = await axios.get(`${backendurl}/api/user`,{
            headers:{Authorization:`Bearer ${token} `}
        })
        return res.data
    } catch (error) {
        console.log("error", error)
        throw error;
    }
}
