import { ReactElement, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { FaPlus } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { Skeleton } from "../../components/Loader";
import { useAllProductQuery } from "../../redux/api/productApi";
// import { RootState } from "../../redux/store";
import { CustomError } from "../../types/api-types";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { userReducerInitialState } from "../../types/reducer-types";
import { server } from "../../redux/store";

interface DataType {
  photo: ReactElement;
  name: string;
  price: number;
  stock: number;
  action: ReactElement;
}

const Products = () => {
  const { user } = useSelector((state: {userReducer : userReducerInitialState}) => state.userReducer);
  const { isLoading, isError, error, data } = useAllProductQuery(user?._id!);

  const [tableData, setTableData] = useState<DataType[]>([]);

  if (isError) {
    const err = error as CustomError;
    toast.error(err.data.message);
  }

  useEffect(() => {
    if (data) {
      setTableData(
        data.products.map((i) => ({
          photo: <img src={`${server}/${i.photo}`} alt={i.name} />,
          name: i.name,
          price: i.price,
          stock: i.stock,
          action: <Link to={`/admin/product/${i._id}`}>Manage</Link>,
        }))
      );
    }
  }, [data]);

  const columns = useMemo<ColumnDef<DataType>[]>(
    () => [
      {
        header: "Photo",
        accessorKey: "photo",
        cell: ({ row }) => row.original.photo,
      },
      {
        header: "Name",
        accessorKey: "name",
      },
      {
        header: "Price",
        accessorKey: "price",
      },
      {
        header: "Stock",
        accessorKey: "stock",
      },
      {
        header: "Action",
        accessorKey: "action",
        cell: ({ row }) => row.original.action,
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
    <div className="admin-container">
      <AdminSidebar />
      <main>
        {isLoading ? (
          <Skeleton width={"90vw"} />
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
                        {flexRender(
                          cell.column.columnDef.cell ?? cell.column.columnDef.header,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>

      <Link to="/admin/product/new" className="create-product-btn">
        <FaPlus />
      </Link>
    </div>
  );
};

export default Products;
