import order from "../models/orderModel.js";
import User from "../models/usermodel.js";
// import Razorpay from 'razorpay'
// import crypto from "crypto";

// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
// });

const allOrders = async (req,res)=>{
    try {
        const orderlist = await order.find({});
        if(orderlist.length===0){
            return res.status(200).json({
                success: false,
                msg:"no order found"
            })
        }

        return res.status(200).json({
            success:true,
            orderlist
        })
    } catch (error) {
        console.log("error", error);
        return res.status(500).json({
            success:false,
            msg:"server error" + error.message
        })
    }
}

const orderStatus = async (req, res) => {
  try {
    
    const {id, status} = req.body;

    const orders = await order.findByIdAndUpdate(id,{status})
    res.json({success:true,message:'Status Updated'})
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const userOrder = async (req,res)=>{
    try {
        const userId = req.user.id;
        console.log(userId)

        const orders = await order.find({userID:userId})
        .populate({path:"items.productId",select:"images"})
        .sort({createdAt: -1})

        console.log("bjkncd" + JSON.stringify(orders, null, 2));
        
        return res.status(200).json({
            success:true,
            count: orders.length,
            orders
        })
    } catch (error) {
        console.log("error", error);
        return res.status(500).json({
            success:false,
            msg:error.message
        })
    }
}

const placeOrder = async (req,res)=>{
    try {
        const userId = req.user.id
        console.log("body",req.body)
        const { items, amount, address } = req.body.orderData;

        console.log("item",items);

        if(!items || items.length ===0){
            return res.status(400).json({ msg: "Order items required" });
        }

        if(!amount || !address){
            return res.status(400).json({ msg: "Missing order details" });
        }

        const orderData = new order({
            userID: userId,
              items: items.map(item => ({
    productId: item._id,   // ✅ THIS WAS MISSING
    name: item.name,
    quantity: item.quantity,
    price: item.price
  })),
            amount,
            address,
            paymentMethod:"COD",
            payment:false,
            status:"order placed",
            date: Date.now()
        })

        const saveOrder = await orderData.save()

        await User.findByIdAndUpdate(userId,{cartData:{}})

        return res.status(200).json({
            success:true,
            msg:"order places successfully",
            saveOrder
        })
        
    } catch (error) {
        console.log("error", error);
        return res.status(500).json({
            success:false,
            msg:"server error" + error.message
        })
    }
}

const deleteOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const { orderId } = req.params;

    // check ownership
    const orderData = await order.findOne({
      _id: orderId,
      userID: userId
    });

    if (!orderData) {
      return res.status(404).json({
        success: false,
        msg: "Order not found or not authorized"
      });
    }

    await order.deleteOne({ _id: orderId });

    return res.status(200).json({
      success: true,
      msg: "Order deleted successfully"
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      msg: error.message
    });
  }
};

// const RazorpayOrder = async (req,res)=>{
//     try {
//         const userId = req.user.id;
//         const {orderId} = req.body;

//         if (!orderId) {
//       return res.status(400).json({ 
//         msg: "Order ID required" 
//         });
//     }

//     const Order = await order.findById(userId)

//     if (!order) {
//       return res.status(404).json({ msg: "Order not found" });
//     }

//     if (order.userID.toString() !== userId) {
//       return res.status(403).json({ msg: "Not authorized" });
//     }

//     const options = {
//       amount: order.amount * 100, // Razorpay uses paise
//       currency: "INR",
//       receipt: order._id.toString(),
//     };

//     const razorpayOrder = await razorpay.orders.create(options);

//     res.status(200).json({
//       success: true,
//       razorpayOrder,
//       key: process.env.RAZORPAY_KEY_ID,
//     });
//     } catch (error) {
//         console.log("Razorpay order error:", error);
//         return res.status(500).json({ msg: error.message });
//     }
// }

// const verifyRazorpay = async (req,res)=>{
//     try {
//         const {
//       razorpay_order_id,
//       razorpay_payment_id,
//       razorpay_signature,
//       orderId,
//     } = req.body;

//     if (
//       !razorpay_order_id ||
//       !razorpay_payment_id ||
//       !razorpay_signature
//     ) {
//       return res.status(400).json({ msg: "Payment details missing" });
//     }

//     const body = razorpay_order_id + "|" + razorpay_payment_id;

//     const expectedSignature = crypto
//       .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
//       .update(body)
//       .digest("hex");

//     if (expectedSignature !== razorpay_signature) {
//       return res.status(400).json({ msg: "Payment verification failed" });
//     }

//     // payment verified → update order
//     const order = await Order.findById(orderId);

//     if (!order) {
//       return res.status(404).json({ msg: "Order not found" });
//     }

//     order.payment = true;
//     order.status = "paid";
//     order.paymentInfo = {
//       razorpay_order_id,
//       razorpay_payment_id,
//     };

//     await order.save();

//     res.status(200).json({
//       success: true,
//       msg: "Payment verified successfully",
//     });

//     } catch (error) {
//         console.log("Verify Razorpay error:", error);
//         return res.status(500).json({ msg: error.message });
//     }
// }

export {
    allOrders,
    orderStatus,
    userOrder,
    placeOrder,
    deleteOrder
    // RazorpayOrder,
    // verifyRazorpay
}