import User from "../models/usermodel.js";

const addTocart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { itemId, size } = req.body;

    if (!itemId || !size) {
      return res.status(400).json({
        success: false,
        msg: "itemId and size are required",
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        msg: "user not found",
      });
    }

    let cartData = user.cartData || {};

     if (!cartData[itemId]) {
      cartData[itemId] = {};
    }

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    user.cartData = cartData;
    await user.save();

    return res.status(200).json({
      success: true,
      msg: "Added to cart successfully",
      cartData: user.cartData,
    });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({
      success: false,
      msg: "server error" + error.message,
    });
  }
};

const updateCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { itemId, size, quantity } = req.body;

    if (!itemId || !size || quantity < 0) {
      return res.status(400).json({
        success: false,
        msg: "itemId and size are required",
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        msg: "user not found",
      });
    }

    let cartData = (await user.cartData) || {};

    if (!cartData[itemId] || !cartData[itemId][size]) {
      return res.status(404).json({
        success: false,
        msg: "Item not in cart",
      });
    }

    if (quantity === 0) {
      delete cartData[itemId][size];
      if (Object.keys(cartData[itemId]).length === 0) {
        delete cartData[itemId];
      }
    } else {
      cartData[itemId][size] = quantity;
    }

    user.cartData = cartData;
    await user.save();

    return res.status(200).json({
      success: true,
      msg: "cart updated",
      cartData
    });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({
      success: false,
      msg: "server error" + error.message,
    });
  }
};

const getCartData = async (req, res) => {
  const userId = req.user.id;
  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        msg: "user not found",
      });
    }
    const cartData = await user.cartData || {}

    if (Object.keys(cartData).length === 0) {
      return res.status(200).json({
        success: true,
        msg: "no cart",
      });
    }

    return res.status(200).json({
      success: true,
      cartData,
    });
  } catch (error) {
    return res.status(500).json({
      success:false,
      msg:"server error" + error.message
    })
  }
};

const DeleteCard = async (req, res) => {
  const userId = req.user.id;
  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        msg: "user not found",
      });
    }

    user.cartData={}
    await user.save();

    return res.status(200).json({
      success: true,
      msg: "cart deleted successfully",
    });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({
      success: false,
      msg: "server error" + error.message,
    });
  }
};

export { addTocart, updateCart, getCartData, DeleteCard };
