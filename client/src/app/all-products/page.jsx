"use client";
import React, { useState } from "react";
import AllProducts from "@/components/product/AllProducts";
import { BiSearch, BiX } from "react-icons/bi";

const Page = () => {
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };
    const handleClearSearch = () => {
        setSearchQuery("");
    };
    return (
        <>
            <section className="mb-10 lg:mb-16">
                <div className="mt-[20px] md:mt-10 px-8 mx-auto max-w-7xl">
                    <div className="flex justify-between items-center gap-4">
                        <p className="whitespace-nowrap sm:flex-none px-4 py-2 sm:px-6 sm:py-3 rounded-lg bg-[#ec6705] text-white">
                            All Courses
                        </p>
                        <form className="flex-2 sm:flex-none z-10">
                            <div className="relative">
                                <input
                                    className="block w-full px-3 py-2 pr-6 border border-gray-300 rounded-lg"
                                    placeholder="Course Name Here"
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                    required
                                />
                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 ">
                                    {searchQuery !== "" ? (
                                        <BiX
                                            className="text-xl text-zinc-400 cursor-pointer z10"
                                            onClick={handleClearSearch}
                                        />
                                    ) : (
                                        <BiSearch className="text-xl text-zinc-400" />
                                    )}
                                </div>
                            </div>
                        </form>
                    </div>
                    <AllProducts
                        popularOnly={false}
                        searchQuery={searchQuery}
                    />
                    {searchQuery !== "" && (
                        <div className="flex justify-center mt-10">
                            <p>No courses found.</p>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
};

export default Page;
