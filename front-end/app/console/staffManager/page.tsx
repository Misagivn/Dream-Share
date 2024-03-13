"use client";
import { title } from "@/components/primitives";
import {
  Accordion,
  AccordionItem,
  Card,
  Spacer,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  User,
  Chip,
  Tooltip,
  ChipProps,
  Pagination,
  Spinner,
  Input,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  Button,
  DropdownItem,
} from "@nextui-org/react";
import { Axios } from "axios";
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
import { useNavigate } from "react-router-dom";
import Head from "next/head";

const statusColorMap: Record<string, ChipProps["color"]> = {
  Active: "success",
  Paused: "warning",
  Cancel: "danger",
};

export default function StaffManager() {
  //Các biến connect + get data từ API
  const baseURL = "http://localhost:5000";
  const axios = require("axios");
  const [staff, setStaff] = useState([]); //Tạo state tất cả staff
  //Setup các biến để pagination
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const pages = Math.ceil(staff.length / rowsPerPage);
  //Setup cho search bar
  const [filteredStaffs, setFilteredStaffs] = useState([]); // State chứa danh sách sản phẩm đã lọc
  const [filterValue, setFilterValue] = useState(""); // State chứa giá trị tìm ưkiếm
  const hasSearchFilter = Boolean(filterValue);
  //Setup cho status filter
  const [statusFilter, setStatusFilter] = React.useState<Selection>("all");
  //Các biển để vào xâu hơn các page sau
  const thisPageUrl = `http://localhost:3000/console/staffManager`;
  const goToCreateStaff = `${thisPageUrl}/createStaff`;
  //Hàm thực hiện delete staff
  const deleteStaff = (staffId: any) => {
    axios
      .delete(`${baseURL}/staffs/${staffId}`)
      .then(function (res: any) {
        console.log(`Done delete staff with ID: ${staffId}`);
        const isConfirmed = window.confirm(
          `Complete deleted staff ID: ${staffId}`
        );
        if (isConfirmed) {
          {
            window.location.reload();
          }
        }
      })
      .catch(function (err: any) {
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
            <User
              avatarProps={{
                radius: "lg",
                src: "https://loremflickr.com/320/240/dog",
              }}
              description={staffdata.staffId}
              name={cellValue}
            >
              {staffdata.name}
            </User>
          );
        case "description":
          return (
            <div className="flex flex-col w-[300px]">
              <p className="text-bold text-sm capitalize text-default-400 text-left">
                {staffdata.description}
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
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <EyeIcon />
                </span>
              </Tooltip>
              <Tooltip content="Edit Staff">
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <EditIcon />
                </span>
              </Tooltip>
              <Tooltip color="danger" content="Delete Staff">
                <span
                  className="text-lg text-danger cursor-pointer active:opacity-50"
                  onClick={() => deleteStaff(staffdata.staffId)}
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
  //thực hiên GET data từ API và gán vào state setStaff
  useEffect(() => {
    axios
      .get(`${baseURL}/staffs`)
      .then(function (res: any) {
        console.log(res.data.staffs);
        setStaff(res.data.staffs);
      })
      .catch(function (err: any) {
        console.log(err);
      });
  }, []);
  //Top search bar
  const filteredItems = React.useMemo(() => {
    let filteredStaffs = [...staff];

    if (hasSearchFilter) {
      filteredStaffs = filteredStaffs.filter((staff) =>
        staff.name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filteredStaffs = filteredStaffs.filter((staff) =>
        Array.from(statusFilter).includes(staff.status)
      );
    }
    return filteredStaffs;
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
