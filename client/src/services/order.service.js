import axios from "@/config/axios.config";

export const getOrders = async (token) => {
    try {
        const response = await axios.get("/orders/", {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.error(error.message);
        return {
            status: error.response.status,
            message: error.response.data.message,
        };
    }
};

// getMyOrders
export const getMyOrders = async (token) => {
    try {
        const response = await axios.get("/orders/myorders", {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.error(error.message);
        return {
            status: error.response.status,
            message: error.response.data.message,
        };
    }
};
// createOrder
export const createOrder = async (order, token) => {
    try {
        const response = await axios.post("/orders/", order, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.error(error.message);
        return {
            status: error.response.status,
            message: error.response.data.message,
        };
    }
};

// updateOrderStatus

export const updateOrderStatus = async (id, status, token) => {
    try {
        const response = await axios.put(
            `/orders/${id}`,
            { status },
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        return response.data;
    } catch (error) {
        console.error(error.message);
        return {
            status: error.response.status,
            message: error.response.data.message,
        };
    }
};

// removeOrder
export const removeOrder = async (id, token) => {
    try {
        const response = await axios.delete(`/orders/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.error(error.message);
        return {
            status: error.response.status,
            message: error.response.data.message,
        };
    }
};
