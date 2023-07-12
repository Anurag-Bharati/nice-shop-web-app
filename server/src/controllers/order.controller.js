import asyncHandler from "express-async-handler";
import Order from "../models/order.model.js";

const createOrder = asyncHandler(async (req, res) => {
    const { orderItems } = req.body;
    const user = req.user._id;
    if (!user) {
        res.status(400);
        throw new Error("No user");
    }
    if (orderItems && orderItems.length === 0) {
        res.status(400);
        throw new Error("No order items");
    }

    const order = new Order({ user, orderItems });
    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
});

const updateOrderStatus = asyncHandler(async (req, res) => {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);
    if (order) {
        order.status = status;
        const updatedOrder = await order.save();
        res.json(updatedOrder);
    } else {
        res.status(404);
        throw new Error("Order not found");
    }
});

const getOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({})
        .populate("user", "id name")
        .populate("orderItems", "id name");
    res.json(orders);
});

const getMyOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.json(orders);
});

export { createOrder, updateOrderStatus, getOrders, getMyOrders };
