import { removeOrder, updateOrderStatus } from "@/services/order.service";
import DataTable from "react-data-table-component";
import { getTokenFromStorage } from "@/utils/utils";

const customStyles = {
    rows: {
        style: {
            minHeight: "72px",
            fontSize: "14px",
            padding: "8px",
        },
    },
    pagination: {
        style: {
            borderTop: "none",
        },
    },
    headCells: {
        style: {
            fontWeight: "bold",
            fontSize: "16px",
        },
    },
};

const columns = [
    {
        name: "SN",
        selector: "sn",
        sortable: true,
        width: "80px",
    },

    {
        name: "Orders",
        cell: (row) => (
            <div className="flex flex-wrap gap-1  items-center">
                {row.orders.map((order) => (
                    <div
                        key={order.id}
                        className="bg-gray-200 rounded-md px-1 py-0.5"
                    >
                        {order.quantity} x {order.name}
                    </div>
                ))}
            </div>
        ),
        width: "400px",
    },
    {
        name: "User",
        selector: "user",
        sortable: true,
    },
    {
        name: "Date of Order",
        selector: "createdAt",
        sortable: true,
    },
    {
        name: "Status",
        selector: "status",
        sortable: true,
        width: "100px",
    },
    {
        name: "Mark Order As",
        width: "220px",
        cell: (row) => (
            <div className=" flex gap-2">
                {row.status === "pending" && (
                    <button
                        onClick={() =>
                            updateOrderStatus(
                                row.id,
                                "processing",
                                getTokenFromStorage()
                            )
                        }
                        className=" bg-cyan-500 text-white px-2 py-1 rounded-md"
                    >
                        Processing
                    </button>
                )}
                {row.status === "processing" && (
                    <button
                        onClick={() =>
                            updateOrderStatus(
                                row.id,
                                "completed",
                                getTokenFromStorage()
                            )
                        }
                        className=" bg-green-500 text-white px-2 py-1 rounded-md"
                    >
                        Completed
                    </button>
                )}
                {row.status === "pending" && (
                    <button
                        onClick={() =>
                            removeOrder(row.id, getTokenFromStorage())
                        }
                        className=" bg-red-500 text-white px-2 py-1 rounded-md"
                    >
                        Rejected
                    </button>
                )}
            </div>
        ),
    },
];

const OrderDataTable = ({ data }) => {
    const managedData = data
        .map((o) => ({ ...o.data(), id: o.id }))
        .map((order, index) => ({
            ...order,
            user: order.user.name,
            uid: order.user.id,
            sn: index + 1,
            createdAt: order.createdAt.toDate().toLocaleString(),
        }));
    console.log(managedData);
    return (
        <div className="flex flex-col gap-4">
            <p className="text-2xl font-semibold text-gray-700">
                Pending Orders
            </p>
            <div>
                <DataTable
                    columns={columns}
                    data={managedData.filter(
                        (o) =>
                            o.status === "pending" || o.status === "processing"
                    )}
                    customStyles={customStyles}
                    pagination
                    paginationPerPage={8} // Adjust the number of rows per page
                    paginationRowsPerPageOptions={[8, 16, 32, 64]}
                />
            </div>
            <p className="text-2xl font-semibold text-gray-700">
                Resolved Orders
            </p>
            <div>
                <DataTable
                    columns={[...columns].slice(0, -1)}
                    data={managedData.filter(
                        (o) =>
                            o.status === "completed" || o.status === "rejected"
                    )}
                    customStyles={customStyles}
                    pagination
                    paginationPerPage={8} // Adjust the number of rows per page
                    paginationRowsPerPageOptions={[8, 16, 32, 64]}
                />
            </div>
        </div>
    );
};

export default OrderDataTable;
