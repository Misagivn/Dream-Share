"use client";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
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
  Paused: "warning",
  Cancel: "danger",
};

export default function TypeManager() {
  //Các biến connect + get data từ API
  const baseURL = "http://26.221.156.50:5000";
  const axios = require("axios");
  const [types, setTypes] = useState([]); //Tạo state tất cả product
  //Setup các biến để pagination
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const pages = Math.ceil(types.length / rowsPerPage);
  //Setup cho search bar
  const [filterValue, setFilterValue] = useState(""); // State chứa giá trị tìm ưkiếm
  const hasSearchFilter = Boolean(filterValue);
  //Setup cho status filter
  const [statusFilter, setStatusFilter] = React.useState<Selection>("all");
  //Các biển để vào xâu hơn các page sau
  const thisPageUrl = `http://26.221.156.50:3000/console/typeManager`;
  const goToCreatetype = `${thisPageUrl}/createType`;
  //Hàm thực hiện follow vào view/update details
  //Hàm thực hiện delete product
  const editType = (typeId: any) => {
    window.open(`${thisPageUrl}/editType/${typeId}`);
  };
  const deleteType = (typeId: any) => {
    axios
      .delete(`${baseURL}/types/${typeId}`)
      .then(function (res) {
        console.log(`Done delete type with ID: ${typeId}`);
        const isConfirmed = window.confirm(
          `Complete deleted type ID: ${typeId}`
        );
        if (isConfirmed) {
          {
            window.location.reload();
          }
        }
      })
      .catch(function (err) {
        console.log(err);
        alert("Can't delete this Type. Please inform IT Support");
      });
  };
  //Dạng như gán res vào chuỗi
  type typeData = (typeof types)[0];
  //Render từng cell của table (vì có một số cell là custom, chứ không thì table tự render ra vẫn đc)
  const renderCell = React.useCallback(
    (typedata: typeData, columnKey: React.Key) => {
      const cellValue = typedata[columnKey as keyof typeData];

      switch (columnKey) {
        case "name":
          return (
            <div className="flex flex-col w-[180px]">
              <p className="text-bold text-sm capitalize text-default-400 text-left">
                {typedata.name}
              </p>
            </div>
          );
        case "description":
          return (
            <div className="flex flex-col w-[300px]">
              <p className="text-bold text-sm capitalize text-default-400 text-left">
                {typedata.description}
              </p>
            </div>
          );
        case "status":
          return (
            <Chip
              className="capitalize"
              color={statusColorMap[typedata.status]}
              size="sm"
              variant="flat"
            >
              {cellValue}
            </Chip>
          );
        case "actions":
          return (
            <div className="relative flex items-center gap-2">
              <Tooltip content="Edit type">
                <span
                  className="text-lg text-default-400 cursor-pointer active:opacity-50"
                  onClick={() => editType(typedata.id)}
                >
                  <EditIcon />
                </span>
              </Tooltip>
              <Tooltip color="danger" content="Delete type">
                <span
                  className="text-lg text-danger cursor-pointer active:opacity-50"
                  onClick={() => deleteType(typedata.id)}
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
      .get(`${baseURL}/types`)
      .then(function (res) {
        console.log(res.data.types);
        setTypes(res.data.types);
      })
      .catch(function (err) {
        console.log(err);
      });
  }, []);
  //Top search bar
  const filteredItems = React.useMemo(() => {
    let filteredProducts = [...types];

    if (hasSearchFilter) {
      filteredProducts = filteredProducts.filter((types) =>
        types.name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filteredProducts = filteredProducts.filter((types) =>
        Array.from(statusFilter).includes(types.status)
      );
    }
    return filteredProducts;
  }, [types, hasSearchFilter, statusFilter, filterValue]);
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
              onClick={() => window.open(goToCreatetype)}
            >
              Add New
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {types.length} types
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
    types.length,
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
    //     <Route path="http://26.221.156.50:3000/console/productManager:id" element={<EditProductPage/>}/>
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
