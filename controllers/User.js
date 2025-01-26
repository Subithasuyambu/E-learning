import { User } from "../models/User.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import sendeMail, { sendForgotMail } from "../middleware/sendMail.js";
import TryCatch from "../middleware/TryCatch.js";

export const register = TryCatch(async (req, res) => {
    const { email, name, password } = req.body;
        let user = await User.findOne({ email });

        if (user) 
            return res.status(400).json({
                message: "User Already Exists",
            })
            const hashpassword=await bcrypt.hash(password,10)

            user={
                name,
                email,
                password: hashpassword
        }
        
        const otp = Math.floor(Math.random() * 1000000)
        
        const activation = jwt.sign({
            user,
            otp,

        }, process.env.Activation_Secret,
        {
            expiresIn:'5m'
        });
        const data = {
            name,otp
        }
        await sendeMail(
            email,
            "E-learning",
            data
        )
        res.status(200).json({
            message: "Otp send to your mail",
            activation,
        })
     }
   
)
export const verifyUser = TryCatch(async (req, res) => {
    const { otp, activation } = req.body;

    const verify = jwt.verify(activation, process.env.Activation_Secret);
    if (!verify) {
        return res.status(400).json({
            message:"Otp Experied"
        })
    }
    if (verify.otp != otp) {
        return res.status(400).json({
            message:"Invalid Otp"
        }) 
    }
    await User.create({
        name: verify.user.name,
        email: verify.user.email,
        password:verify.user.password
    })
    return res.status(200).json({
        message:"User Registered Successfully"
    }) 
    
})

export const login = TryCatch(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });  
    if (!user) 
        res.status(400).json({message:"No user with this mail"})
    const passwordmatch = await bcrypt.compare(password, user.password);
    if (!passwordmatch) { 
        res.status(400).json({message:"Invalid password"})
    }
    const token = await jwt.sign({ _id: user._id }, process.env.Jwt_sec, {
        expiresIn:'15d',
    })
    res.json({
        message: `Welcome back ${user.name}`,
        token,
        user
         })
})  

export const myprofile = TryCatch(async (req, res) => {
    const user = await User.findById(req.user._id);
    res.json({
        user
    })  
})   

export const forgotPassword = TryCatch(async(req, res) =>{
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user)
        return res.status(404).json({
            message: "No User with this email"
        })
    
    const token = jwt.sign({ email }, process.env.Forgot_secret);

    const data = { email, token };

    await sendForgotMail("E-learning", data);

    user.resetPasswordExpire = Date.now() + 5 + 60 + 1000;


    await user.save();

    res.json({
        message:"Reset Password Link is send to your mail"
    })
    
})


export const resetPassword = TryCatch(async (req, res) => {
    const decodedData = jwt.verify(req.query.token, process.env.Forgot_Secret);
  
    const user = await User.findOne({ email: decodedData.email });
  
    if (!user)
      return res.status(404).json({
        message: "No user with this email",
      });
  
    // if (user.resetPasswordExpire === null)
    //   return res.status(400).json({
    //     message: "Token Expired",
    //   });
  
    // if (user.resetPasswordExpire < Date.now()) {
    //   return res.status(400).json({
    //     message: "Token Expired",
    //   });
    // }
  
    const password = await bcrypt.hash(req.body.password, 10);
  
    user.password = password;
  
    user.resetPasswordExpire = null;
  
    await user.save();
  
    res.json({ message: "Password Reset" });
});
  









