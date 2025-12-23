import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
    minLength: 3,
    maxLength: 10,
  },
  password: {
    type: String,
    require: true,
    minLength: 7,
  },
  email: {
    type: String,
    require: true,
    unique: true,
    lowercase: true,
  },
  role:{
    type: String,
    enum :["user", "admin"],
    default :"user"
  },
  cartData:{
    type: Object,
    default:{}
  }
},{ timestamps: true });

const User = mongoose.models.User || mongoose.model("User",userSchema)

export default User;