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
import { PlusIcon } from "./PlusIcon";
import { SearchIcon } from "./SearchIcon";
import { EyeIcon } from "./EyeIcon";
import { EditIcon } from "./EditIcon";
import { DeleteIcon } from "./DeleteIcon";
import { ChevronDownIcon } from "./ChevronDownIcon";
import { columns, statusOptions } from "./data";
import { capitalize } from "./utils";
import React from "react";

const statusColorMap: Record<string, ChipProps["color"]> = {
  Active: "success",
  Pending: "warning",
  Cancel: "danger",
};

export default function ProductManager() {
  //Các biến connect + get data từ API
  const baseURL = "http://localhost:5000";
  const axios = require("axios");
  const [staff, setStaff] = useState([]); //Tạo state tất cả Order
  //Setup các biến để pagination
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const pages = Math.ceil(staff.length / rowsPerPage);
  //Setup cho search bar
  const [filteredProducts, setFilteredProducts] = useState([]); // State chứa danh sách sản phẩm đã lọc
  const [filterValue, setFilterValue] = useState(""); // State chứa giá trị tìm ưkiếm
  const hasSearchFilter = Boolean(filterValue);
  //Setup cho status filter
  const [statusFilter, setStatusFilter] = React.useState<Selection>("all");
  //Các biển để vào xâu hơn các page sau
  const thisPageUrl = `http://localhost:3000/console/staffManager`;
  const goToCreateStaff = `${thisPageUrl}/createStaff`;
  //Hàm thực hiện follow vào view/update details
  //Hàm thực hiện delete product
  const editStaff = (staffId: any) => {
    window.open(`${thisPageUrl}/editStaff/${staffId}`);
  };
  const viewDetails = (staffId: any) => {
    window.open(`${thisPageUrl}/viewStaff/${staffId}`);
  };
  const deleteStaff = (staffId: any) => {
    axios
      .delete(`${baseURL}/staffs/${staffId}`)
      .then(function (res) {
        console.log(`Done delete order with ID: ${staffId}`);
        const isConfirmed = window.confirm(
          `Complete deleted order ID: ${staffId}`
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
  type staffData = (typeof staff)[0];
  //Render từng cell của table (vì có một số cell là custom, chứ không thì table tự render ra vẫn đc)
  const renderCell = React.useCallback(
    (staffdata: staffData, columnKey: React.Key) => {
      const cellValue = staffdata[columnKey as keyof staffData];

      switch (columnKey) {
        case "name":
          return (
            <div className="flex flex-col w-[100px]">
              <p className="text-bold text-sm capitalize text-default-400 text-left">
                {staffdata.name}
              </p>
            </div>
          );
        case "email":
          return (
            <div className="flex flex-col w-[200px]">
              <p className="text-bold text-sm capitalize text-default-400 text-left">
                {staffdata.email}
              </p>
            </div>
          );
        case "phone":
          return (
            <div className="flex flex-col w-[80px]">
              <p className="text-bold text-sm capitalize text-default-400 text-left">
                {staffdata.phonenumber}
              </p>
            </div>
          );
        case "address":
          return (
            <div className="flex flex-col w-[200px]">
              <p className="text-bold text-sm capitalize text-default-400 text-left">
                {staffdata.address}
              </p>
            </div>
          );
        case "status":
          return (
            <Chip
              className="capitalize"
              color={statusColorMap[staffdata.status]}
              size="sm"
              variant="flat"
            >
              {cellValue}
            </Chip>
          );
        case "actions":
          return (
            <div className="relative flex items-center gap-2">
              <Tooltip content="Details">
                <span
                  className="text-lg text-default-400 cursor-pointer active:opacity-50"
                  onClick={() => viewDetails(staffdata.id)}
                >
                  <EyeIcon />
                </span>
              </Tooltip>
              <Tooltip content="Edit Staff">
                <span
                  className="text-lg text-default-400 cursor-pointer active:opacity-50"
                  onClick={() => editStaff(staffdata.id)}
                >
                  <EditIcon />
                </span>
              </Tooltip>
              <Tooltip color="danger" content="Delete Staff">
                <span
                  className="text-lg text-danger cursor-pointer active:opacity-50"
                  onClick={() => deleteStaff(staffdata.id)}
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
      .get(`${baseURL}/staffs`)
      .then(function (res) {
        console.log(res.data.staffs);
        setStaff(res.data.staffs);
      })
      .catch(function (err) {
        console.log(err);
      });
  }, []);
  //Top search bar
  const filteredItems = React.useMemo(() => {
    let filteredProducts = [...staff];

    if (hasSearchFilter) {
      filteredProducts = filteredProducts.filter((staff) =>
        staff.name.toLowerCase().includes(filterValue.toLowerCase())
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
  }, [staff, hasSearchFilter, statusFilter, filterValue]);
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
            <Button
              className="bg-foreground text-background"
              endContent={<PlusIcon width={undefined} height={undefined} />}
              size="sm"
              onClick={() => window.open(goToCreateStaff)}
            >
              Add New
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {staff.length} staffs
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
    staff.length,
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
