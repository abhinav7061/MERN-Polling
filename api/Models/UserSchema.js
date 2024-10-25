const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const { type } = require("os");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "name is required"],
        minLength: [3, "name cannot be less than 3 characters"],
        maxLength: [40, "name cannot be greater than 40 characters"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: [true, "Email already Exists"],
        validate: [validator.isEmail, "enter a valid email address"],
    },
    password: {
        type: String,
        minLength: [8, "Password should be at least 8 characters"],
        required: [true, "Password is required"]
    },
    avatar: {
        public_id: {
            type: String,
        },
        url: {
            type: String,
            default: "https://res.cloudinary.com/djyzgjojr/image/upload/c_auto,f_auto,g_auto,h_500,q_auto,w_500/v1/polling/profile_images/defaultUser_kyako5"
        }
    },
    myStatus: {
        type: String,
        default: "Love is Life so Let me Love You"
    },
    role: {
        type: String,
        enum: ["demo", "user", "admin"],
        default: "user"
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    resetPasswordToken: {
        type: String,
    },
    resetPasswordExpire: {
        type: Date
    },
    otp: String,
    otpExpires: Date,
});

userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    return next();
})

userSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateToken = function () {
    return jwt.sign({ _id: this._id }, process.env.JWT_SECRET_KEY)
}

userSchema.methods.generateResetPasswordToken = function () {
    resetToken = crypto.randomBytes(32).toString("hex")

    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex")
    this.resetPasswordExpire = Date.now() + 60 * 60 * 1000

    return resetToken;
}

userSchema.methods.generateOTP = function () {
    const otp = crypto.randomInt(0, 1000000).toString().padStart(6, '0');
    this.otp = otp;
    expiryTime = Date.now() + (process.env.OTP_VALID_TIME || 5) * 60 * 1000
    if (!isNaN(expiryTime)) {
        this.otpExpires = expiryTime;
    } else {
        this.otpExpires = Date.now() + 5 * 60 * 1000;
    }
    return otp;
};

const User = mongoose.model("User", userSchema);


module.exports = User;
