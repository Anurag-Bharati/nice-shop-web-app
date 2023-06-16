"use client";

import { cartState } from "@/atoms/cart.atom";
import Link from "next/link";
import { useState } from "react";
import { BiCart, BiMenu, BiX } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { useRecoilState } from "recoil";

const Header = () => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const toggleCart = () => setIsCartOpen(!isCartOpen);
    const [cart, setCart] = useRecoilState(cartState);
    const [total, setTotal] = useState(0);
    const handleCheckout = () => null;
    return (
        <div>
            <nav className=" fixed w-full bg-white border-gray-200 dark:bg-white z-50 border-b ">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <Link
                        passHref={true}
                        href="/"
                        className="flex items-center h-10"
                    >
                        {/* <Image
                            src="/assets/svgs/logo/logo.svg"
                            height={40}
                            width={40}
                            className="mr-3"
                            alt="Logo of the website"
                        /> */}
                        <span className="self-center text-xl uppercase font-semibold whitespace-nowrap hidden md:inline-block">
                            NiceShop
                        </span>
                    </Link>
                    <div className="flex md:order-2 gap-4 justify-center items-center">
                        <div
                            className="relative p-2 cursor-pointer no-select"
                            onClick={toggleCart}
                        >
                            {cart.length > 0 && (
                                <span className="animate-pulse absolute px-1.5 font-bold text-sm bg-red-500  text-white right-0 top-0 rounded-full">
                                    {cart.length}
                                </span>
                            )}
                            <BiCart className="inline-block text-3xl text-black" />
                        </div>
                        <div
                            className="relative rounded-full h-8 w-8"
                            aria-label="Login/Sign-up"
                        >
                            <Link
                                passHref={true}
                                href="/auth"
                                title="SignIn/SignUp"
                                className=" w-full h-full inline-flex justify-center items-center cursor-pointer z-10  border-2 border-white rounded-full"
                            >
                                <FaUserCircle className="w-full h-full fill-gray-400 hover:fill-gray-200" />
                            </Link>
                        </div>
                        <button
                            data-collapse-toggle="navbar-cta"
                            type="button"
                            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 "
                            aria-controls="navbar-cta"
                            aria-expanded="false"
                        >
                            <span className="sr-only">Open main menu</span>
                            <BiMenu className="h-6 w-6" />
                        </button>
                    </div>
                    <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1">
                        <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border md:flex-row md:space-x-8 md:mt-0 md:border-0 text-md">
                            <li>
                                <a
                                    href="#"
                                    className="block py-2 pl-3 pr-4 text-gray-900 rounded  md:p-0 hover:text-[#94d82d]"
                                >
                                    Home
                                </a>
                            </li>

                            <li>
                                <a
                                    href="#"
                                    className="block py-2 pl-3 pr-4 text-gray-900 rounded  md:p-0 hover:text-[#94d82d]"
                                >
                                    Products
                                </a>
                            </li>

                            <li>
                                <a
                                    href="#"
                                    className="block py-2 pl-3 pr-4 text-gray-900 rounded  md:p-0 hover:text-[#94d82d]"
                                >
                                    About
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div className="pb-[78px]"></div>
            {/* Cart  */}
            <div
                className={`fixed inset-0 z-50 transition-all ${
                    isCartOpen
                        ? "opacity-100 "
                        : "opacity-0  pointer-events-none"
                }`}
            >
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div
                    className={`absolute inset-y-0  max-w-full flex ${
                        isCartOpen ? "right-0" : "-right-full"
                    } transition-all duration-300 ease-in-out`}
                >
                    <div className="relative w-screen max-w-md">
                        <div className="h-full flex flex-col py-6 bg-white shadow-xl ">
                            <div className="px-4 sm:px-6 ">
                                <div className="flex items-start justify-between">
                                    <h2 className="text-lg font-medium text-gray-900">
                                        Your cart
                                    </h2>
                                    <div className="ml-3 h-7 flex items-center">
                                        <button
                                            type="button"
                                            className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                                            onClick={toggleCart}
                                        >
                                            <span className="sr-only">
                                                Close panel
                                            </span>
                                            <BiX className="h-6 w-6" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-6 relative flex-1 px-4 sm:px-6 ">
                                {cart.length === 0 && (
                                    <div className="h-full border-2 border-dashed border-gray-200 ">
                                        <div className="flex flex-col justify-center items-center h-full">
                                            <h1 className="text-2xl font-bold text-gray-400">
                                                Your cart is empty
                                            </h1>
                                            <p className="text-gray-400">
                                                Add items to your cart to
                                                continue
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {cart.length > 0 && (
                                    <div
                                        className={`relative h-[calc(100vh-220px)] border-2  border-gray-200 flex flex-col p-4 gap-4  nice-scroll-bar overflow-x-hidden ${
                                            initiateCheckout
                                                ? "overflow-hidden"
                                                : "overflow-y-auto"
                                        }`}
                                    >
                                        <div>
                                            <div
                                                className={`absolute left-0 right-0 h-full flex flex-col justify-center  transition duration-500 delay-700 items-center ${
                                                    initiateCheckout
                                                        ? "opacity-100"
                                                        : "opacity-0"
                                                }`}
                                            >
                                                <h1 className="text-2xl font-bold text-[#94d82d] animate-bounce">
                                                    Order has been placed!
                                                </h1>
                                                <p className="text-gray-400">
                                                    Payment: Cash-On-Grab
                                                </p>
                                            </div>
                                            {cart.map((item, index) => (
                                                <div
                                                    className="flex item-center gap-4 transition-all ease-in-out duration-1000"
                                                    style={{
                                                        transform: `translateX(${
                                                            initiateCheckout
                                                                ? `${
                                                                      index %
                                                                          2 ===
                                                                      0
                                                                          ? ""
                                                                          : "-"
                                                                  }100%`
                                                                : "0"
                                                        }) scale(${
                                                            initiateCheckout
                                                                ? "0"
                                                                : "1"
                                                        })`,
                                                        opacity: `${
                                                            initiateCheckout
                                                                ? "0"
                                                                : "1"
                                                        }`,
                                                        animationDelay: `${
                                                            index * 0.2
                                                        }s`,
                                                    }}
                                                    key={index}
                                                >
                                                    <img
                                                        src={item.image}
                                                        alt={item.name}
                                                        className="w-16 h-16 rounded-md object-cover opacity-80 hidden sm:block"
                                                    />
                                                    <div
                                                        className="flex flex-col gap-1 w-full"
                                                        key={index}
                                                    >
                                                        <h4 className="whitespace-nowrap  text-[#372b22] text-xl font-medium border-b-2 border-b-[#11111188] border-dashed pb-2 w-full">
                                                            {item.name} x{" "}
                                                            {item.quantity}
                                                            <span className="text-xl italic font-black float-right">
                                                                ${item.price}
                                                            </span>
                                                        </h4>
                                                        <div className="flex justify-between  items-center gap-2">
                                                            <button
                                                                className="text-[#372b22]  rounded-full   text-xl"
                                                                onClick={
                                                                    handleRemoveFromCart
                                                                }
                                                                data-id={
                                                                    item.id
                                                                }
                                                            >
                                                                remove
                                                            </button>
                                                            <p className="text-[#372b22]  text-xl">
                                                                subtotal: $
                                                                {item.price *
                                                                    item.quantity}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                <div className="p-4 flex flex-col gap-4">
                                    <div className="flex justify-between items-center">
                                        <h4 className="text-[#372b22] text-xl font-medium">
                                            Total
                                        </h4>
                                        <h4 className="text-[#372b22] text-xl font-medium">
                                            ${total.toFixed(2)}
                                        </h4>
                                    </div>
                                    <button
                                        className="bg-[#372b22] text-white px-4 py-2 rounded-full uppercase font-bold text-xl"
                                        onClick={handleCheckout}
                                    >
                                        Checkout
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
