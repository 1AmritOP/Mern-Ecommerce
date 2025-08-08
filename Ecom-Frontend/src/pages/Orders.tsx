import { ReactElement, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
// import { useSelector } from "react-redux";
// import { useMyOrdersQuery } from "../redux/api/orderAPI";
// import { RootState } from "../redux/store";
// import { CustomError } from "../types/api-types";
// import { Skeleton } from "../components/loader";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useSelector } from "react-redux";

type DataType = {
  _id: string;
  amount: number;
  quantity: number;
  discount: number;
  status: ReactElement;
};

const Orders = () => {
//   const { user } = useSelector((state: RootState) => state.userReducer);
//   const { isLoading, data, isError, error } = useMyOrdersQuery(user?._id!);

  const [tableData, setTableData] = useState<DataType[]>([]);

//   if (isError) {
//     const err = error as CustomError;
//     toast.error(err.data.message);
//   }

//   useEffect(() => {
//     if (data) {
//       setTableData(
//         data.orders.map((i) => ({
//           _id: i._id,
//           amount: i.total,
//           discount: i.discount,
//           quantity: i.orderItems.length,
//           status: (
//             <span
//               className={
//                 i.status === "Processing"
//                   ? "red"
//                   : i.status === "Shipped"
//                   ? "green"
//                   : "purple"
//               }
//             >
//               {i.status}
//             </span>
//           ),
//         }))
//       );
//     }
//   }, [data]);

  const columns = useMemo<ColumnDef<DataType>[]>(
    () => [
      {
        header: "ID",
        accessorKey: "_id",
      },
      {
        header: "Quantity",
        accessorKey: "quantity",
      },
      {
        header: "Discount",
        accessorKey: "discount",
      },
      {
        header: "Amount",
        accessorKey: "amount",
      },
      {
        header: "Status",
        accessorKey: "status",
        cell: ({ row }) => row.original.status,
      },
    ],
    []
  );

  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="container">
      <h1>My Orders</h1>
      {isLoading ? (
        <Skeleton length={20} />
      ) : (
        <div className="dashboard-product-box">
          <table>
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th key={header.id}>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id}>
                      {/* {flexRender(
                        cell.column.columnDef.cell ?? cell.column.columnDef.header,
                        cell.getContext()
                      )} */}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Orders;
