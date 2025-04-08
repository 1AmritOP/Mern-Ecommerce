import { ReactElement, useState } from "react";
import { Link } from "react-router-dom";
import { ColumnDef } from "@tanstack/react-table";
import AdminSidebar from "../../components/admin/AdminSidebar";
import TableHOC from "../../components/admin/TableHOC";

interface DataType {
  user: string;
  amount: number;
  discount: number;
  quantity: number;
  status: ReactElement;
  action: ReactElement;
}

const arr: Array<DataType> = [
  {
    user: "Charas",
    amount: 4500,
    discount: 400,
    status: <span className="red">Processing</span>,
    quantity: 3,
    action: <Link to="/admin/transaction/sajknaskd">Manage</Link>,
  },
  {
    user: "Xavirors",
    amount: 6999,
    discount: 400,
    status: <span className="green">Shipped</span>,
    quantity: 6,
    action: <Link to="/admin/transaction/sajknaskd">Manage</Link>,
  },
  {
    user: "Xavirors",
    amount: 6999,
    discount: 400,
    status: <span className="purple">Delivered</span>,
    quantity: 6,
    action: <Link to="/admin/transaction/sajknaskd">Manage</Link>,
  },
];

const columns: ColumnDef<DataType>[] = [
  {
    header: "User",
    accessorKey: "user",
  },
  {
    header: "Amount",
    accessorKey: "amount",
  },
  {
    header: "Discount",
    accessorKey: "discount",
  },
  {
    header: "Quantity",
    accessorKey: "quantity",
  },
  {
    header: "Status",
    accessorKey: "status",
    cell: ({ row }) => row.original.status,
  },
  {
    header: "Action",
    accessorKey: "action",
    cell: ({ row }) => row.original.action,
  },
];

const Transaction = () => {
  const [rows, setRows] = useState<DataType[]>(arr);

  const Table = TableHOC<DataType>({
    columns,
    data: rows,
    containerClassname: "dashboard-product-box",
    heading: "Transactions",
    showPagination: rows.length > 6,
  })();

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main>{Table}</main>
    </div>
  );
};

export default Transaction;