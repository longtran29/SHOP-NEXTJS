import { Fragment, useContext, useState } from "react";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";
import CustomerLayout from "@/layouts/CustomerLayout";
import { useFilterContext } from "@/context/FilterContext";
import { Button, Col, Input, Pagination, Row } from "antd";
import DataContext from "@/context/DataContext";
import Product from "@/components/Product/Product";
import FilterSection from "@/components/FilterSection";
import Image from "next/image";
import { Grid } from "@mui/material";
import SpinTip from "@/components/loading/SpinTip";

const sortOptions = [
  { name: "Most Popular", href: "#", current: true },
  { name: "Best Rating", href: "#", current: false },
  { name: "Newest", href: "#", current: false },
  { name: "Price: Low to High", href: "#", current: false },
  { name: "Price: High to Low", href: "#", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Shop() {
  const { filter_products } = useFilterContext();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const { listCates, listProds, listBrands, isLoading } =
    useContext(DataContext);

  const [selectedOption, setSelectedOption] = useState(null);

  const [selectedBrand, setSelectedBrand] = useState(null);

  const [searchProductName, setSearchProductName] = useState("");

  const [currentPage, setCurrentPage] = useState(1);


  let filteredItems =
    listProds &&
    listProds.filter(
      (product) =>
        product.name.toLowerCase().indexOf(searchProductName.toLowerCase()) !==
        -1
    );

  const filteredData = (listProds, selectedOption, searchProductName) => {
    let filteredProducts = listProds;

    if (searchProductName) {
      filteredProducts = filteredItems;
    }

    if (selectedBrand) {
      filteredProducts = filteredProducts.filter(
        (product) => product.brand.name == selectedBrand
      );
    }

    if (selectedOption) {
      filteredProducts = filteredProducts.filter(
        (product) =>
          product.original_price === selectedOption ||
          product.category.name == selectedOption
      );
    }
    return filteredProducts;
  };

  const result = filteredData(
    listProds,
    selectedOption,
    searchProductName,
    selectedBrand
  );

  console.log("Dnh sach ket qua product", JSON.stringify(result));

  console.log("Value filterprods", JSON.stringify(result));

  const handleChange = (event) => {
    console.log("Value selected is ", event.target.value);
    setSelectedOption(event.target.value);
  };

  console.log("Value cate ", JSON.stringify(listCates));

  const { Search } = Input;
  return (
    <div className="bg-white">
      <div>
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-2">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              New Arrivals
            </h1>

            <Search
              placeholder="find your target product"
              enterButton="Search"
              size="large"
              className="w-1/3 font-extralight"
              value={searchProductName}
              onChange={(e) => setSearchProductName(e.target.value)}
            />

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort
                    <ChevronDownIcon
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <Menu.Item key={option.name}>
                          {({ active }) => (
                            <a
                              href={option.href}
                              className={classNames(
                                option.current
                                  ? "font-medium text-gray-900"
                                  : "text-gray-500",
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm"
                              )}
                            >
                              {option.name}
                            </a>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>

              <button
                type="button"
                className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
              >
                <span className="sr-only">View grid</span>
                <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters */}

              <form className="hidden lg:block">
                <h3 className="sr-only">Price</h3>

                <Disclosure as="div" className="border-b border-gray-200 py-6">
                  {({ open }) => (
                    <>
                      <h3 className="-my-3 flow-root">
                        <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                          <span className="font-medium text-gray-900">
                            Price
                          </span>
                          <span className="ml-6 flex items-center">
                            {open ? (
                              <MinusIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            ) : (
                              <PlusIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            )}
                          </span>
                        </Disclosure.Button>
                      </h3>
                      <Disclosure.Panel className="pt-6">
                        <div className="space-y-4">
                          {
                            [18, 20, 20, 120.15].map(price => (
                              <div
                              key={price}
                              className="flex items-center"
                            >
                              <input
                                name="original_price"
                                type="radio"
                                value={price}
                                onChange={(e) => handleChange(e)}
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                              />
                              <label className="ml-2 min-w-0 flex-1 text-gray-500">
                                  {price} $
                                </label>
                            </div>
                            ))
                          }
                        </div>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>

                <h3 className="sr-only">Categories</h3>

                <Disclosure as="div" className="border-b border-gray-200 py-6">
                  {({ open }) => (
                    <>
                      <h3 className="-my-3 flow-root">
                        <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                          <span className="font-medium text-gray-900">
                            Categories
                          </span>
                          <span className="ml-6 flex items-center">
                            {open ? (
                              <MinusIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            ) : (
                              <PlusIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            )}
                          </span>
                        </Disclosure.Button>
                      </h3>
                      <Disclosure.Panel className="pt-6">
                        <div className="space-y-4">
                          {listCates && (
                            <div className="space-y-6">
                              <div className="flex items-center">
                                <input
                                  name="category"
                                  value=""
                                  type="radio"
                                  onChange={(e) => handleChange(e)}
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label className="ml-2 min-w-0 flex-1 text-gray-500">
                                  All
                                </label>
                              </div>
                              {listCates.map((option, index) => (
                                <div
                                  key={option.id}
                                  className="flex items-center"
                                >
                                  <input
                                    name="category"
                                    type="radio"
                                    value={option.name}
                                    onChange={(e) => handleChange(e)}
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                  />
                                  <div className="flex ml-4">
                                    <Image
                                      src={option.imageUrl}
                                      width={20}
                                      height={20}
                                      className="rounded-full"
                                    />
                                    <label className="ml-2 min-w-0 flex-1 text-gray-500">
                                      {option.name}
                                    </label>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              </form>

              {/* Product grid */}
              <div className="lg:col-span-3">
                <div className="flex ml-16">
                  <button
                    className={`ml-4 px-4 py-1.5 ${
                      selectedBrand == "All" ? "bg-primary-400" : ""
                    }`}
                    value=""
                    onClick={(e) => {
                      console.log("selected brand", e.target.value);
                      setSelectedBrand(e.target.value);
                    }}
                  >
                    All
                  </button>
                  {listBrands &&
                    listBrands.map((brand) => (
                      <button
                        className={`ml-4 px-4 py-1.5 ${
                          selectedBrand == brand.name ? "bg-primary-200" : ""
                        }`}
                        value={brand.name}
                        onClick={(e) => {
                          console.log("selected brand", e.target.value);
                          setSelectedBrand(e.target.value);
                        }}
                      >
                        {brand.name}
                      </button>
                    ))}
                </div>
                <div className="w-full flex justify-center mt-10">
                  {result && (
                    <Row className="p-4">
                      <Col flex="1">
                        <div className="grid grid-cols-4 gap-4 h-full">
                          <Product data={result} dataLimit={4} currentPage= {currentPage} />
                        </div>
                      </Col>
                      <div className="w-full flex justify-center">
                        {isLoading ? (
                          <SpinTip />
                        ) : (
                          result.length > 0 && (
                            <Pagination
                              // className="w-2/3"
                              onChange={(page, pageSize) =>
                                setCurrentPage(page)
                              }
                              current={currentPage}
                              pageSize={4}
                              total={result.length}
                            />
                          )
                        )}
                      </div>
                    </Row>
                  )}
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
Shop.getLayout = (page) => <CustomerLayout>{page}</CustomerLayout>;
