const { Schema, model } = require("mongoose");

const userSessionSchema = new Schema(
    {
        token: { type: String, required: true },
        user: { type: Schema.Types.ObjectId, ref: "User", required: true },
        issuedAt: { type: Number, required: true },
        expiresAt: { type: Number, required: true },
    },
    { timestamps: true }
);

const UserSession = model("UserSession", userSessionSchema);

module.exports = UserSession;
