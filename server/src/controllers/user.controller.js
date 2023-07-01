import asyncHandler from "express-async-handler";
import User from "../models/user.data.js";

const loginHandler = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        res.status(400);
        throw new Error("Invalid email or password");
    }
    if (user.isAccountLocked()) {
        res.status(403); // Forbidden
        throw new Error("Account is locked");
    }

    if (user.isPasswordExpired()) {
        res.status(403); // Forbidden
        throw new Error("Password is expired");
    }

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: user.generateSession(),
        });
    } else {
        res.status(401);
        throw new Error("Invalid email or password");
    }
});

const registerHandler = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error("User already exists");
    }

    const user = await User.create({
        name,
        email,
        password,
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error("Invalid user data");
    }
});

const verifyPass = asyncHandler(async (req, res) => {
    const { password } = req.body;
    console.log(password);

    const errors = [];
    errors.push({
        check: "at least 8 characters",
        status: password?.length < 8,
    });
    errors.push({
        check: "at least one uppercase letter",
        status: !/[A-Z]/.test(password),
    });
    errors.push({
        check: "at least one lowercase letter",
        status: !/[a-z]/.test(password),
    });
    errors.push({
        check: " at least one number",
        status: !/[0-9]/.test(password),
    });
    errors.push({
        check: " at least one special character",
        status: !/[!@#$%^&*]/.test(password),
    });
    res.json(errors);
});

const verifyUsernameAndEmail = asyncHandler(async (req, res) => {
    const { fullname, email } = req.body;
    const emailErrors = [];
    const nameErrors = [];

    nameErrors.push({
        check: "be at least 6 characters",
        status: fullname.length < 6,
    });
    nameErrors.push({
        check: "have  first and last name",
        status: !/^[a-zA-Z]+\s[a-zA-Z]+$/.test(fullname),
    });

    emailErrors.push({
        check: "a valid email",
        status: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
    });

    res.json({ nameErrors, emailErrors });
});

const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    } else {
        res.status(404);
        throw new Error("User not found");
    }
});

const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if (req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser._id),
        });
    } else {
        res.status(404);
        throw new Error("User not found");
    }
});

const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({});
    res.json(users);
});

const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
        await user.remove();
        res.json({ message: "User removed" });
    } else {
        res.status(404);
        throw new Error("User not found");
    }
});

const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select("-password");

    if (user) {
        res.json(user);
    } else {
        res.status(404);
        throw new Error("User not found");
    }
});

const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.isAdmin = req.body.isAdmin;

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
        });
    } else {
        res.status(404);
        throw new Error("User not found");
    }
});

export {
    loginHandler,
    registerHandler,
    verifyUsernameAndEmail,
    verifyPass,
    getUserProfile,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserById,
    updateUser,
};
