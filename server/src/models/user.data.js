import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const MAX_LOGIN_ATTEMPTS = 3; // Maximum allowed consecutive failed login attempts
const LOCK_TIME = 24 * 60 * 60 * 1000; // Lock duration in milliseconds (24 hours)
const PASSWORD_EXPIRATION = 90; // Password expiration in days

const passwordValidator = (val) => /^.{8,12}$/.test(val);

const userSchema = mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        email: { type: String, required: true, unique: true, trim: true },
        password: {
            type: String,
            required: true,
            required: [true, "Please enter a password."],
            minlength: [6, "Password must be at least 8 characters."],
            validate: {
                validator: passwordValidator,
                message: "Password must be 8 characters long.",
            },
        },
        isAdmin: { type: Boolean, required: true, default: false },
        passwordLastChanged: { type: Date, default: Date.now },
        loginAttempts: { type: Number, default: 0 },
        lockUntil: { type: Date, default: null },
    },
    { timestamps: true }
);

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    this.passwordLastChanged = Date.now();
});

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
    return isMatch;
};

userSchema.methods.passwordExpired = async function () {
    const now = Date.now();
    const passwordLastChanged = this.passwordLastChanged.getTime();
    const passwordAge = now - passwordLastChanged;
    const passwordAgeInDays = Math.floor(passwordAge / (1000 * 60 * 60 * 24));
    return passwordAgeInDays >= PASSWORD_EXPIRATION;
};

userSchema.methods.generateSessionToken = async function () {
    const token = jwt.sign(
        { _id: this._id, username: this.email, isAdmin: this.isAdmin },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN }
    );
    const decodedData = jwt.decode(token);
    const sessionToken = await UserSession.create({
        token: token,
        user: this._id,
        issuedAt: decodedData.iat,
        expiresAt: decodedData.exp,
    });

    return sessionToken;
};

userSchema.methods.isAccountLocked = function () {
    return this.lockUntil > Date.now();
};

const User = mongoose.model("User", userSchema);

export default User;
