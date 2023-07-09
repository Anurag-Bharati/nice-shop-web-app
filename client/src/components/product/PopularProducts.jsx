"use client";
import AllProducts from "./AllProducts";
import Link from "next/link";
import { BsArrowDownCircleFill } from "react-icons/bs";
import React, { useState } from "react";

const PopularProducts = () => {
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <section className="mb-10 lg:mb-16">
            <div className="mt-6 md:mt-10 px-8 mx-auto max-w-7xl">
                <div className="md:block flex justify-center items-center">
                    <p className="inline whitespace-nowrap sm:flex-none px-4 py-2  m:px-6 sm:py-3 rounded-lg bg-[#ec6705] text-white">
                        Popular Courses
                    </p>
                </div>
                <AllProducts popularOnly={true} searchQuery={searchQuery} />
                <Link href="/all-courses">
                    <div className="cursor-pointer flex justify-center items-center mt-2 md:mt-10">
                        <h1 className="px-6 uppercase py-3 text-sm lg:text-base rounded-lg bg-[#122c91] text-white flex items-center">
                            View All Courses
                            <BsArrowDownCircleFill className="ml-1" />
                        </h1>
                    </div>
                </Link>
            </div>
        </section>
    );
};

export default PopularProducts;
