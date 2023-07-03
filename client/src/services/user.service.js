import axios from "axios";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/users`;

export const registerUser = async (userData) => {
    console.log(userData);
    try {
        const response = await axios.post(API_URL, userData);
        console.log(response);
        return response.data;
    } catch (error) {
        console.error(error.message);
        return { status: error.code, message: error.message };
    }
};

export const verifyPassword = async (password) => {
    try {
        const response = await axios.post(`${API_URL}/verify-password`, {
            password,
        });
        return response.data;
    } catch (error) {
        console.error(error.message);
        return { status: error.code, message: error.message };
    }
};

export const verifyFullnameAndEmail = async (fullname, email) => {
    try {
        const response = await axios.post(
            `${API_URL}/verify-fullname-and-email`,
            {
                fullname,
                email,
            }
        );
        return response.data;
    } catch (error) {
        console.error(error.message);
        return { status: error.code, message: error.message };
    }
};

export const loginUser = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/login`, userData);
        return response.data;
    } catch (error) {
        console.error(error.message);
        return { status: error.code, message: error.message };
    }
};

export const getUserProfile = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/profile`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error(error.message);
        return { status: error.code, message: error.message };
    }
};

export const updateUserProfile = async (token, updatedData) => {
    try {
        const response = await axios.put(`${API_URL}/profile`, updatedData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error(error.message);
        return { status: error.code, message: error.message };
    }
};
