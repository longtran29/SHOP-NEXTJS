import { NEXT_API } from "@/config";
import DataContext from "@/context/DataContext";
import { useFilterContext } from "@/context/FilterContext";
import AdminLayout from "@/layouts/AdminLayout";
import { ExclamationCircleFilled, LoadingOutlined } from "@ant-design/icons";
import { Image, Input, Modal, Spin, Switch, Table, Tag } from "antd";
import { useRouter } from "next/router";
import React, { Fragment, useContext, useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { RxUpdate } from "react-icons/rx";
import { toast } from "react-toastify";

function Products(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { getProducts } = useContext(DataContext);
  const { filter_products, updateFilterValue } = useFilterContext();
  const [state, setState] = useState({
    imagePreview: "",
    imageData: null,
    isLoading: false,
  });

  const [product, setProduct] = useState({
    name: null,
    primaryImage: "",
    enabled: true,
    original_price: null,
    discount_percent: null,
    description: "",
    inStock: true,
    brand: null,
    category: null,
    productQuantity: 0,
  });
  const [searchValue, setSearchValue] = ("")

  const { confirm } = Modal;

  const antIcon = <LoadingOutlined style={{ fontSize: 20 }} spin />;

  const Search = Input.Search;

  const router = useRouter();

  const searchValueHandle = (value) => {
    setSearchValue(value);
    updateFilterValue("text", value)
  }

  // update product
  const updateProduct = (productId) => {
    router.push({
      pathname: "/admin/product/update",
      query: { updateId: productId },
    });
  };

  // delete product
  const deleteProduct = (productId) => {
    confirm({
      title: "Are you sure delete this product?",
      icon: <ExclamationCircleFilled />,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        const deleteProduct = async () => {
          const resDel = await fetch(`${NEXT_API}/api/products/${productId}`, {
            method: "DELETE",
          });

          const delData = await resDel.json();

          if (!resDel.ok) {
            toast.error(delData.message);
          } else {
            getProducts();
            toast.success("Xoá thành công");
          }
        };

        deleteProduct();
      },
      onCancel() {},
    });
  };

  // update status
  const updateStatus = async (productId, status) => {
    const resPut = await fetch(`${NEXT_API}/api/products/${productId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: !status,
      }),
    });

    const data = await resPut.json();

    if (!resPut.ok) {
      toast.error(data.message);
    } else {
      getProducts();
    }
  };

  // handle cancel
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      sortOrder: "ascend",
      sorter: (a, b) => {
        return a.id - b.id > 0 ? 1 : -1;
      },
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      responsive: ["sm"],
    },
    {
      title: "Price",
      dataIndex: "original_price",
      key: "original_price",
      responsive: ["lg"],
    },

    {
      title: "Enabled",
      dataIndex: "enabled",
      key: "enabled",
      responsive: ["lg"],
      render: (_, record) => (
        <Switch
          defaultChecked
          checked={record.enabled}
          onClick={() => updateStatus(record.id, record.enabled)}
        />
      ),
    },
    {
      title: "Image",
      dataIndex: "primaryImage",
      key: "primaryImage",
      responsive: ["lg"],
      render: (imageUrl) => (
        <Image alt={imageUrl} src={imageUrl} height={40} width={40} />
      ),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      responsive: ["lg"],
      render:  (_, record) => (
        <h2>{record.category.name}</h2>
      ),
    },

    {
      title: "Action",
      responsive: ["sm"],
      render: (_, record) => (
        <div className="flex items-center">
          <RxUpdate
            onClick={() => updateProduct(record.id)}
            className="hover:cursor-pointer hover:text-primary-700"
          />

          <MdDeleteOutline
            className="text-red-400 hover:fill-primary-700 text-xl ml-6 hover:cursor-pointer"
            onClick={() => deleteProduct(record.id)}
          />
        </div>
      ),
    },
  ];

  return (
    <Fragment>
      {state.isLoading ? (
        <Spin
          indicator={antIcon}
          className="flex justify-center align-center items-center w-screen h-screen"
        />
      ) : (
        <div className="p-10">
          <div className="mb-4">
            <div className="flex justify-between items-center">
              <Search
                className="w-1/3 p-2"
                placeholder="Search product name"
                onSearch={(value) => updateFilterValue("text", value)}
                enterButton
                value={searchValue}
              />

              <button
                className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium inline-flex items-center rounded-lg text-sm px-3 py-2 text-center sm:ml-auto"
                onClick={() => router.push("/admin/product")}
              >
                <svg
                  className="-ml-1 mr-2 h-6 w-6"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"></path>
                </svg>
                Add product
              </button>
            </div>
          </div>
          <Table
            columns={columns}
            dataSource={filter_products}
            pagination={{
              pageSizeOptions: ["50", "100"],
              showSizeChanger: true,
              pageSize: 6,
            }}
            rowKey={(record) => record.id}
          />
        </div>
      )}
    </Fragment>
  );
}

Products.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;
export default Products;
