"use client";

import { userState } from "@/atoms/user.atom";
import { getOrders } from "@/services/order.service";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import OrderDataTable from "./OrderDataTable";

const AdminDashboard = () => {
    const user = useRecoilValue(userState);
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        if (!user?.isAdmin) return;
        const fetchOrders = async () => {
            const res = await getOrders(user.token);
            setOrders(res);
        };
        fetchOrders();
    }, [user?.isAdmin]);
    return (
        <div className="py-6 px-4 max-w-6xl mx-auto flex gap-20">
            <OrderDataTable data={orders} />
        </div>
    );
};

export default AdminDashboard;
