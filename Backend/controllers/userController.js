import User from "../models/usermodel.js";
import z, { json } from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = z.object({
  username: z.string(),
  password: z.string().min(6),
  email: z
    .string().email().refine((email) => email.endsWith("@gmail.com"), {
        msg: "Email must contain @gmail.com",
    }),
});

const createToken = (user) => {
  return jwt.sign({ 
    id : user._id,
    isAdmin:user.role === "admin"
  }, process.env.JWT_SECRET);
};

const userSignup = async (req, res) => {
  const Schema = userSchema.safeParse(req.body);

  if (!Schema.success) {
    return res.json({
      msg: "enter correct inputs",
      error: Schema.error.issues,
    });
  }

  const { username, email, password } = req.body;

  try {
    const exist = await User.findOne({ email });

    if (exist) {
      return res.json({
        msg: "user is already exist with this email",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassowrd = await bcrypt.hash(password, salt);

    const user = await User.create({
      username,
      email,
      password: hashPassowrd,
    });

    const token = createToken(user);

    return res.json({
      success: true,
      token,
    });
  } catch (error) {
    console.log("error", error);
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

const userSignin = async (req,res)=>{
    try {
        const {email,password} = req.body;

        const user = await User.findOne({email})

        if(!user){
            return res.status(401).json({
                message:"Incorrect email"
            })
        }

        const matchPassword = await bcrypt.compare(password, user.password) 

        if(matchPassword){
            const token = createToken(user)
            return res.json({
                success:true,
                token
            })
        }else{
            return res.json({
                msg:"incorrect password"
            })
        }

    } catch (error) {
        console.log("error:",error)
        return res.json({
            success:false,
            message: error.message
        })
    }
}

const adminLogin= async (req,res)=>{
    try {
        const {email, password} = req.body;

        if(email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD){
          return res.status(401).json({
            success:false,
            msg:"Invalid admin credentials"
          })
        }

        const token = jwt.sign({
          id:"admin",
          email,
          isAdmin : true
        }, process.env.JWT_SECRET)

        return res.status(200).json({
          success:true,
          token
        })
    } catch (error) {
        console.log("error", error);
        return res.status(500).json({
            success:false,
            msg: error.message
        })
    }
}

const userDetail = async (req,res)=>{
  const id = req.user.id;
  if(!id){
    return res.status(404).json({
      success:false,
      message:"user not found"
    })
  }

  try {
    const user = await User.findById({_id:id})
    if(!user){
      return res.status(404)>json({
        success:false,
        message:"user not found"
      })
    }

    return res.status(200).json({
      success:true,
      user
    })
  } catch (error) {
    console.log("error", error)
    return res.status(500).json({
      success:false,
      message:"server error" + error.message
    })
  }
}
export  {
    userSignup,
    userSignin,
    adminLogin,
    userDetail
}
