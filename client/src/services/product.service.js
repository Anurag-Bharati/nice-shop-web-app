import axios from "@/config/axios.config";

export const getProducts = async () => {
    try {
        const response = await axios.get("/products/");
        return response.data.products;
    } catch (error) {
        console.error(error.message);
        return {
            status: error.response.status,
            message: error.response.data.message,
        };
    }
};

export const getTopProducts = async () => {
    try {
        const response = await axios.get("/products/top");
        return response.data;
    } catch (error) {
        console.error(error.message);
        return {
            status: error.response.status,
            message: error.response.data.message,
        };
    }
};

export const getProductByID = async (id) => {
    try {
        const response = await axios.get(`/products/${id}`);
        return response.data;
    } catch (error) {
        console.error(error.message);
        return {
            status: error.response.status,
            message: error.response.data.message,
        };
    }
};
