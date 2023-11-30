const mongoose = require("mongoose");
const validator=require("validator");
const jwt =require("jsonwebtoken")
const bcrypt=require("bcryptjs");
const crypto=require("crypto")

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"name is required"],
        minLength:[3,"name cannot be less than 3 characters"],
        maxLength:[40,"name cannot be greater than 40 characters"],
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        unique:[true,"Email already Exists"],
        validate:[validator.isEmail,"enter a valid email address"],
    },
    password:{
        type:String,
        minLength:[8,"Password should be at least 8 characters"],
        required:[true,"Password is required"]
    },
    avatar:{
        // public_id:{
        //     type:String,
        //     required:true
        // },
        url:{
            type:String,
            required:true
        }
    },
    myStatus:{
        type:String,
        default:"Love is Life so Let me Love You"
    },
    // followers:[
    //     {
    //         type:mongoose.Schema.Types.ObjectId,
    //         ref:"User"
    //     }
    // ],
    // following:[
    //     {
    //         type:mongoose.Schema.Types.ObjectId,
    //         ref:"User"
    //     }
    // ],
    Votes:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Vote"
        }
    ],
    Polls:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Poll"
        }
    ],
    role:{
        type:String,
        default:"user"
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    resetPasswordToken:{
        type:String,
    },
    resetPasswordExpire:{
        type:Date
    }
});

userSchema.pre("save",async function(next){
    if(this.isModified("password")){
        this.password=await bcrypt.hash(this.password,10);
    }
    return next();
})

userSchema.methods.matchPassword= async function(password){
    return await bcrypt.compare(password,this.password);
}

userSchema.methods.generateToken=function(){
    return jwt.sign({_id:this._id},process.env.JWT_SECRET_KEY)
}

userSchema.methods.generateResetPasswordToken=function(){
    resetToken=crypto.randomBytes(32).toString("hex")

    this.resetPasswordToken=crypto.createHash("sha256").update(resetToken).digest("hex")
    this.resetPasswordExpire=Date.now() + 60*60*1000
    
    return resetToken;
}

const User = mongoose.model("User", userSchema);


module.exports = User;
