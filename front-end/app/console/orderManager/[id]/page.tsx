"use client";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
  ChipProps,
  Pagination,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { DeleteIcon } from "./DeleteIcon";
import { columns, statusOptions } from "./data";
import React from "react";


export default function ProductManager({ params }) {
  const currentId = params.id;

  //Các biến connect + get data từ API
  const baseURL = "http://26.221.156.50:5000";
  const axios = require("axios");
  const [orderDetails, setOrderDetails] = useState([]); //Tạo state tất cả Order
  //Setup các biến để pagination
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const pages = Math.ceil(orderDetails.length / rowsPerPage);
  //Setup cho search bar
  const [filterValue, setFilterValue] = useState(""); // State chứa giá trị tìm ưkiếm
  const hasSearchFilter = Boolean(filterValue);
  //Setup cho status filter
  const [statusFilter, setStatusFilter] = React.useState<Selection>("all");
  //Các biển để vào xâu hơn các page sau
  const thisPageUrl = `http://26.221.156.50:3000/console/orderManager`;
  const [productMapping, setProductMapping] = useState({});
  useEffect(() => {
    // Fetch product data from API
    axios
      .get(`${baseURL}/products`)
      .then(function (res) {
        const products = res.data.products;
        const mapping = {};
        for (const product of products) {
          mapping[product.id] = product.name;
        }
        setProductMapping(mapping);
      })
      .catch(function (err) {
        console.error(err);
      });
  }, []);
  const getProductName = (productId) => {
    return productMapping[productId] || "Unknown Product";
  };
  //Dạng như gán res vào chuỗi
  type orderData = (typeof orderDetails)[0];
  //Render từng cell của table (vì có một số cell là custom, chứ không thì table tự render ra vẫn đc)
  const renderCell = React.useCallback(
    (orderdata: orderData, columnKey: React.Key) => {
      const cellValue = orderdata[columnKey as keyof orderData];

      switch (columnKey) {
        case "name":
          const productName = getProductName(orderdata.product_id);
          return (
            <div className="flex flex-col w-[250px]">
              <p className="text-bold text-slg capitalize text-default-400 text-left">
                {productName}
              </p>
            </div>
          );
        case "quantity":
          return (
            <div className="flex flex-col w-[200px]">
              <p className="text-bold text-sm capitalize text-default-400 text-left">
                {orderdata.quantity}
              </p>
            </div>
          );
        case "price":
          return (
            <div className="flex flex-col w-[80px]">
              <p className="text-bold text-sm capitalize text-default-400 text-left">
                {orderdata.price}
              </p>
            </div>
          );
        case "actions":
          return (
            <div className="relative flex items-center gap-2">
              <Tooltip color="danger" content="Delete Order">
                <span
                  className="text-lg text-danger cursor-pointer active:opacity-50"
                  onClick={() => deleteOrder(orderdata.id)}
                >
                  <DeleteIcon />
                </span>
              </Tooltip>
            </div>
          );
        default:
          return cellValue;
      }
    },
    [productMapping]
  );
  //thực hiên GET data từ API và gán vào state setProduct
  useEffect(() => {
    axios
      .get(`${baseURL}/orderdetails/${currentId}`)
      .then(function (res) {
        console.log(res.data.orderDetails);
        setOrderDetails(res.data.orderDetails);
      })
      .catch(function (err) {
        console.log(err);
      });
  }, []);
  //Top search bar
  const filteredItems = React.useMemo(() => {
    let filteredProducts = [...orderDetails];

    if (hasSearchFilter) {
      filteredProducts = filteredProducts.filter((product) =>
        product.name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filteredProducts = filteredProducts.filter((product) =>
        Array.from(statusFilter).includes(product.status)
      );
    }
    return filteredProducts;
  }, [orderDetails, hasSearchFilter, statusFilter, filterValue]);
  //Thực hiện search
  const onSearchChange = React.useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);
  const onRowsPerPageChange = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    []
  );
  //Top của cái table chứa gì nằm đây
  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <div className="flex gap-3"></div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {orderDetails.length} orders details
          </span>
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    onSearchChange,
    statusFilter,
    orderDetails.length,
    onRowsPerPageChange,
  ]);
  //Định nghĩa lại items trong table
  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  //Render lên page
  return (
    <div className="">
      <Table
        aria-label="Example table with custom cells"
        topContent={topContent}
        bottomContent={
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="secondary"
              page={page}
              total={pages}
              onChange={(page) => setPage(page)}
            />
          </div>
        }
        checkboxesProps={{
          classNames: {
            wrapper:
              "after:bg-foreground after:text-background text-background",
          },
        }}
        classNames={{
          wrapper: "min-h-[222px]",
        }}
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
              allowsSorting={column.sortable}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={items} className="justify-center">
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
