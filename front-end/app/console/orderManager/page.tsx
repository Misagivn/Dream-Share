"use client";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
  Tooltip,
  ChipProps,
  Pagination,
  Input,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  Button,
  DropdownItem,
} from "@nextui-org/react";
import { useEffect, useMemo, useState } from "react";
import { SearchIcon } from "./SearchIcon";
import { EyeIcon } from "./EyeIcon";
import { FaCheck } from "react-icons/fa";
import { GiCancel } from "react-icons/gi";
import { DeleteIcon } from "./DeleteIcon";
import { ChevronDownIcon } from "./ChevronDownIcon";
import { columns, statusOptions } from "./data";
import { capitalize } from "./utils";
import React from "react";

const statusColorMap: Record<string, ChipProps["color"]> = {
  Complete: "success",
  Pending: "warning",
  Cancel: "danger",
};

export default function ProductManager() {
  //Các biến connect + get data từ API
  const baseURL = "http://26.221.156.50:5000";
  const axios = require("axios");
  const [order, setOrder] = useState([]); //Tạo state tất cả Order
  //Setup các biến để pagination
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const pages = Math.ceil(order.length / rowsPerPage);
  //Setup cho search bar
  const [filterValue, setFilterValue] = useState(""); // State chứa giá trị tìm ưkiếm
  const hasSearchFilter = Boolean(filterValue);
  //Setup cho status filter
  const [statusFilter, setStatusFilter] = React.useState<Selection>("all");
  //Các biển để vào xâu hơn các page sau
  const thisPageUrl = `http://26.221.156.50:3000/console/orderManager`;
  //Hàm thực hiện follow vào view/update details
  //Hàm thực hiện delete product
  const completeOrder = (orderId: any) => {
    axios
      .put(`${baseURL}/orders/complete/${orderId}`)
      .then(function (res) {
        console.log(`Complete order with ID: ${orderId}`);
        const isConfirmed = window.confirm(
          `Complete order ID: ${orderId}`
        );
        if (isConfirmed) {
          {
            window.location.reload();
          }
        }
      })
  };
  const cancelOrder = (orderId: any) => {
    axios
      .put(`${baseURL}/orders/cancel/${orderId}`)
      .then(function (res) {
        console.log(`Cancel order with ID: ${orderId}`);
        const isConfirmed = window.confirm(
          `Cancel order ID: ${orderId}`
        );
        if (isConfirmed) {
          {
            window.location.reload();
          }
        }
      })
  };
  const viewDetails = (orderId: any) => {
    window.open(`${thisPageUrl}/${orderId}`);
  };
  const deleteOrder = (orderId: any) => {
    axios
      .delete(`${baseURL}/orders/${orderId}`)
      .then(function (res) {
        console.log(`Done delete order with ID: ${orderId}`);
        const isConfirmed = window.confirm(
          `Complete deleted order ID: ${orderId}`
        );
        if (isConfirmed) {
          {
            window.location.reload();
          }
        }
      })
      .catch(function (err) {
        console.log(err);
      });
  };
  //Dạng như gán res vào chuỗi
  type orderData = (typeof order)[0];
  //Render từng cell của table (vì có một số cell là custom, chứ không thì table tự render ra vẫn đc)
  const renderCell = React.useCallback(
    (orderdata: orderData, columnKey: React.Key) => {
      const cellValue = orderdata[columnKey as keyof orderData];

      switch (columnKey) {
        case "name":
          return (
            <div className="flex flex-col w-[100px]">
              <p className="text-bold text-sm capitalize text-default-400 text-left">
                {orderdata.account_name}
              </p>
            </div>
          );
        case "email":
          return (
            <div className="flex flex-col w-[200px]">
              <p className="text-bold text-sm capitalize text-default-400 text-left">
                {orderdata.account_email}
              </p>
            </div>
          );
        case "phone":
          return (
            <div className="flex flex-col w-[80px]">
              <p className="text-bold text-sm capitalize text-default-400 text-left">
                {orderdata.account_phone}
              </p>
            </div>
          );
        case "address":
          return (
            <div className="flex flex-col w-[200px]">
              <p className="text-bold text-sm capitalize text-default-400 text-left">
                {orderdata.shipping_address}
              </p>
            </div>
          );
        case "status":
          return (
            <Chip
              className="capitalize"
              color={statusColorMap[orderdata.status]}
              size="sm"
              variant="flat"
            >
              {cellValue}
            </Chip>
          );
        case "actions":
          return (
            <div className="relative flex items-center gap-2">
              <Tooltip content="Cancel Order">
                <span
                  className="text-lg text-default-400 cursor-pointer active:opacity-50"
                  onClick={() => cancelOrder(orderdata.id) }
                >
                  <GiCancel />
                </span>
              </Tooltip>
              <Tooltip content="Complete Order">
                <span
                  className="text-lg text-default-400 cursor-pointer active:opacity-50"
                  onClick={() => completeOrder(orderdata.id) }
                >
                  <FaCheck />
                </span>
              </Tooltip>
              <Tooltip content="Details">
                <span
                  className="text-lg text-default-400 cursor-pointer active:opacity-50"
                  onClick={() => viewDetails(orderdata.id) }
                >
                  <EyeIcon />
                </span>
              </Tooltip>
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
    []
  );
  //thực hiên GET data từ API và gán vào state setProduct
  useEffect(() => {
    axios
      .get(`${baseURL}/orders`)
      .then(function (res) {
        console.log(res.data.orders);
        setOrder(res.data.orders);
      })
      .catch(function (err) {
        console.log(err);
      });
  }, []);
  //Top search bar
  const filteredItems = React.useMemo(() => {
    let filteredProducts = [...order];

    if (hasSearchFilter) {
      filteredProducts = filteredProducts.filter((order) =>
        order.account_name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== statusOptions.length  
    ) {
      filteredProducts = filteredProducts.filter((order) =>
        Array.from(statusFilter).includes(order.status)
      );
    }
    return filteredProducts;
  }, [order, hasSearchFilter, statusFilter, filterValue]);
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
          <Input
            isClearable
            classNames={{
              base: "w-full sm:max-w-[44%]",
              inputWrapper: "border-1",
            }}
            placeholder="Search by name..."
            size="sm"
            startContent={<SearchIcon className="text-default-300" />}
            value={filterValue}
            variant="bordered"
            onClear={() => setFilterValue("")}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  size="sm"
                  variant="flat"
                >
                  Status
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={statusFilter}
                selectionMode="multiple"
                onSelectionChange={setStatusFilter}
              >
                {statusOptions.map((status) => (
                  <DropdownItem key={status.uid} className="capitalize">
                    {capitalize(status.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {order.length} orders
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
    order.length,
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
    // <Router>
    //   <Routes>
    //     <Route path="http://localhost:3000/console/productManager:id" element={<EditProductPage/>}/>
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
    //   </Routes>
    // </Router>
  );
}
