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
// const localStorage = require('serviceworker-localstorage')

const statusColorMap: Record<string, ChipProps["color"]> = {
  Active: "success",
  Paused: "warning",
  Cancel: "danger",
};

export default function ProductManager() {
  //Các biến connect + get data từ API
  const baseURL = "http://26.221.156.50:5000";
  const axios = require("axios");
  const [product, setProduct] = useState([]); //Tạo state tất cả product
  //Setup các biến để pagination
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const pages = Math.ceil(product.length / rowsPerPage);
  //Setup cho search bar
  const [filteredProducts, setFilteredProducts] = useState([]); // State chứa danh sách sản phẩm đã lọc
  const [filterValue, setFilterValue] = useState(""); // State chứa giá trị tìm ưkiếm
  const hasSearchFilter = Boolean(filterValue);
  //Setup cho status filter
  const [statusFilter, setStatusFilter] = React.useState<Selection>("all");
  //Các biển để vào xâu hơn các page sau
  const thisPageUrl = `http://26.221.156.50:3000/console/productManager`;
  const [token, setToken] = useState("");
  useEffect(() => {
    const savedToken = window.localStorage.getItem("accessToken");
    if (savedToken === null) {
      console.log("No token found");
      alert("You must Login to access these function");
    } else {
      setToken(savedToken);
    }
  }, []);

  const goToCreateProduct = () => {
    window.open(`${thisPageUrl}/createProduct`);
  }

  const viewProduct = (productId: any) => {
    window.open(`${thisPageUrl}/viewProduct/${productId}`);
  };
  const editProduct = (productId: any) => {
    window.open(`${thisPageUrl}/editProduct/${productId}`);
  };
  const deleteProduct = (productId: any, tokenLogin: any) => {
    axios
      .delete(`${baseURL}/products/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(function (res) {
        console.log(`Done delete product with ID: ${productId}`);
        const isConfirmed = window.confirm(
          `Complete deleted product ID: ${productId}`
        );
        if (isConfirmed) {
          {
            window.location.reload();
          }
        }
      })
      .catch(function (err) {
        console.log(token);
        alert("Can't delete this Product. Please inform IT Support");
        console.log(err);
      });
  };
  //Dạng như gán res vào chuỗi
  type productData = (typeof product)[0];
  //Render từng cell của table (vì có một số cell là custom, chứ không thì table tự render ra vẫn đc)
  const renderCell = React.useCallback(
    (productdata: productData, columnKey: React.Key) => {
      const cellValue = productdata[columnKey as keyof productData];

      switch (columnKey) {
        case "name":
          return (
            <User
              avatarProps={{
                radius: "md",
                src: productdata.image || "https://loremflickr.com/320/240/dog",
              }}
              className="flex w-[170px] place-item-start justify-item-start"
              description={productdata.code}
              name={cellValue}
            >
              {productdata.name}
            </User>
          );
        case "description":
          return (
            <div className="flex flex-col w-[300px]">
              <p className="text-bold text-sm capitalize text-default-400 text-left">
                {productdata.description}
              </p>
            </div>
          );
        case "status":
          return (
            <Chip
              className="capitalize"
              color={statusColorMap[productdata.status]}
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
                  onClick={() => viewProduct(productdata.id)}
                >
                  <EyeIcon />
                </span>
              </Tooltip>
              <Tooltip content="Edit Product">
                <span
                  className="text-lg text-default-400 cursor-pointer active:opacity-50"
                  onClick={() => editProduct(productdata.id)}
                >
                  <EditIcon />
                </span>
              </Tooltip>
              <Tooltip color="danger" content="Delete Product">
                <span
                  className="text-lg text-danger cursor-pointer active:opacity-50"
                  onClick={() => deleteProduct(productdata.id, token)}
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
    [token]
  );
  //thực hiên GET data từ API và gán vào state setProduct

  useEffect(() => {
    axios
      .get(`${baseURL}/products`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(function (res) {
        console.log(res.data.products);
        setProduct(res.data.products);
      })
      .catch(function (err) {
        console.log(err);
      });
  }, [token]);
  //Top search bar
  const filteredItems = React.useMemo(() => {
    let filteredProducts = [...product];

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
  }, [product, hasSearchFilter, statusFilter, filterValue]);
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
              onClick={goToCreateProduct}
            >
              Add New
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {product.length} products
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
    product.length,
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
