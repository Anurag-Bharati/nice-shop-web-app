"use client";

import { useEffect, useState } from "react";
import CreateProductForm from "./CreateProductForm";
import AllProducts from "../product/AllProducts";
import { getProducts } from "@/services/product.service";

const Products = () => {
    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        const data = await getProducts();
        setProducts(data);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const [productData, setProductData] = useState({
        name: "",
        image: "",
        brand: "",
        category: "",
        description: "",
        price: 0,
        countInStock: 0,
    });

    const handleFormSubmit = () => {
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
        <div className="py-6 max-w-6xl mx-auto flex gap-20">
            <div className="flex-1 ">
                <AllProducts data={products} compact={true} />
            </div>
            <div className="flex flex-col gap-2 w-1/3">
                <div className="sticky top-[90px] ">
                    <h2 className="text-2xl font-semibold mb-4">
                        Add New Product
                    </h2>
                    <CreateProductForm handleSubmit={handleFormSubmit} />
                </div>
            </div>
        </div>
    );
};

export default Products;
