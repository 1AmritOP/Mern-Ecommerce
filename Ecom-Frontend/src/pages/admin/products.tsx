import { ReactElement, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ColumnDef } from "@tanstack/react-table";
import AdminSidebar from "../../components/admin/AdminSidebar";
import TableHOC from "../../components/admin/TableHOC";

interface DataType {
  photo: ReactElement;
  name: string;
  price: number;
  stock: number;
  action: ReactElement;
}

const columns: ColumnDef<DataType>[] = [
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
];

const img =
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8&w=1000&q=804";

const img2 = "https://m.media-amazon.com/images/I/514T0SvwkHL._SL1500_.jpg";

const arr: Array<DataType> = [
  {
    photo: <img src={img} alt="Shoes" />,
    name: "Puma Shoes Air Jordan 2023",
    price: 690,
    stock: 3,
    action: <Link to="/admin/product/sajknaskd">Manage</Link>,
  },
  {
    photo: <img src={img2} alt="Shoes" />,
    name: "Macbook",
    price: 232223,
    stock: 213,
    action: <Link to="/admin/product/sdaskdnkasjdn">Manage</Link>,
  },
];

const Products = () => {
  const [rows, setRows] = useState<DataType[]>(arr);

  const Table = TableHOC<DataType>({
    columns,
    data: rows,
    containerClassname: "dashboard-product-box",
    heading: "Products",
    showPagination: rows.length > 6,
  })();

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main>{Table}</main>
      <Link to="/admin/product/new" className="create-product-btn">
        <FaPlus />
      </Link>
    </div>
  );
};

export default Products;
