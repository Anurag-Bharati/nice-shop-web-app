import axios from "axios";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

export const getProducts = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data.products;
    } catch (error) {
        console.error(error.message);
    }
};

export const getTopProducts = async () => {
    try {
        const response = await axios.get(`${API_URL}/top`);
        return response.data;
    } catch (error) {
        console.error(error.message);
    }
};
