import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const MAX_LOGIN_ATTEMPTS = 3; // Maximum allowed consecutive failed login attempts
const LOCK_TIME = 12 * 60 * 60 * 1000; // Lock duration in milliseconds (12 hours)

const passwordValidator = (val) => /^.{8,12}$/.test(val);

const userSchema = mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        email: { type: String, required: true, unique: true, trim: true },
        password: {
            type: String,
            required: true,
            validate: {
                validator: passwordValidator,
                message: "Password must be 8 to 12 characters long.",
            },
        },
        isAdmin: { type: Boolean, required: true, default: false },
        passwordLastChanged: { type: Date, default: Date.now },
        loginAttempts: { type: Number, default: 0 },
        lockUntil: { type: Date, default: null },
    },
    { timestamps: true }
);

userSchema.methods.matchPassword = async function (password) {
    const isMatch = await bcrypt.compare(password, this.password);
    if (!isMatch) {
        this.loginAttempts += 1;

        if (this.loginAttempts >= MAX_LOGIN_ATTEMPTS) {
            this.lockedUntil = new Date(Date.now() + LOCK_TIME);
            this.loginAttempts = 0; // Reset attempts after locking
        }
        await this.save();
    }
};

userSchema.methods.generateAccessToken = async function () {
    return jwt.sign(
        { _id: this._id, username: this.email, isAdmin: this.isAdmin },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN }
    );
};

userSchema.methods.isAccountLocked = function () {
    return this.lockUntil > Date.now();
};

const User = mongoose.model("User", userSchema);

export default User;
