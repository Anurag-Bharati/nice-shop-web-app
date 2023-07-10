"use client";

import { useState } from "react";

const AdminDashboard = () => {
    const [productData, setProductData] = useState({
        name: "",
        image: "",
        brand: "",
        category: "",
        description: "",
        price: 0,
        countInStock: 0,
    });

    const handleFormSubmit = (e) => {
        e.preventDefault();

        // Destructure the state object for the API request
        const {
            name,
            image,
            brand,
            category,
            description,
            price,
            countInStock,
        } = productData;

        const newProduct = {
            name,
            image,
            brand,
            category,
            description,
            price,
            countInStock,
        };

        console.log(newProduct);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setProductData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h2 className="text-2xl font-semibold mb-4">Add New Product</h2>
            <form onSubmit={handleFormSubmit}>
                <div className="mb-4">
                    <label htmlFor="name" className="block font-semibold">
                        Product Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        className="w-full border rounded py-2 px-3 focus:outline-none focus:ring focus:border-blue-500"
                        value={productData.name}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                {/* Other input fields for image, brand, category, etc. */}
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                >
                    Add Product
                </button>
            </form>
        </div>
    );
};

export default AdminDashboard;
