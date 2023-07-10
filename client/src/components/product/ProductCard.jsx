import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BiStar } from "react-icons/bi";
import { FaStar } from "react-icons/fa";

const ProductCard = ({ data }) => {
    return (
        <div className=" w-full max-w-sm bg-white overflow-hidden ">
            <Link href={`/product/${data._id}`} className="h-48 w-full ">
                <Image
                    height={200}
                    width={200}
                    src="/images/offer-banner-right.jpg"
                    alt="product image"
                    className="h-48 w-full object-cover hover:scale-105 transition-all duration-300 ease-in-out"
                />
            </Link>
            <div className="pt-4 pb-5 px-1">
                <a href="#">
                    <h5 className="text-xl  tracking-tight text-black h-14 line-clamp-2">
                        {data?.name}
                    </h5>
                </a>
                <div className="flex items-center mt-2.5 mb-5 w-full px-1">
                    <div className="flex text-xl text-yellow-400 ">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <FaStar
                                key={star}
                                className={`cursor-pointer  ${
                                    star <= data?.rating ?? 0
                                        ? "fill-current"
                                        : "fill-current text-gray-300"
                                }`}
                            />
                        ))}
                    </div>
                    <span className="text-xs font-semibold mr-2 px-2.5 py-0.5 rounded  ml-3">
                        {data?.numReviews ?? 0}
                    </span>
                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800  ml-auto">
                        {data?.countInStock ?? 0} left
                    </span>
                </div>
                <div className="flex items-center justify-between px-1">
                    <span className="text-xl  text-black ">${data?.price}</span>
                    <a
                        href="#"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Add to cart
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
