import SpinTip from "@/components/loading/SpinTip";
import { API_URL, NEXT_API } from "@/config";
import DataContext from "@/context/DataContext";
import { useFilterContext } from "@/context/FilterContext";
import AdminLayout from "@/layouts/AdminLayout";
import { ExclamationCircleFilled, LoadingOutlined } from "@ant-design/icons";
import { Chip } from "@mui/material";
import {
  Breadcrumb,
  Image,
  Input,
  Modal,
  Spin,
  Switch,
  Table,
  Tag,
} from "antd";
import { useRouter } from "next/router";
import React, { Fragment, useContext, useState, useEffect } from "react";
import { BiSolidEdit } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
function Products(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { getProductAdmin, adminProducts } = useContext(DataContext);
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

  const MySwal = withReactContent(Swal);

  const { confirm } = Modal;

  const antIcon = <LoadingOutlined style={{ fontSize: 20 }} spin />;

  const Search = Input.Search;

  const [showProduct, setShowProduct] = useState(adminProducts);

  const [searchValue, setSearchValue] = useState("");

  const router = useRouter();

  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/account/login");
    },
  });
  const token = session?.accessToken;

  useEffect(() => {
    if (searchValue) {
      setShowProduct(
        adminProducts.filter(
          (cate) =>
            cate.name.toLowerCase().includes(searchValue) ||
            cate.category.name.toLowerCase().includes(searchValue) ||
            cate.brand.name.toLowerCase().includes(searchValue) ||
            cate.original_price == searchValue
        )
      );
    } else setShowProduct(adminProducts);
  }, [searchValue, adminProducts]);

  useEffect(() => {
    getProductAdmin();
  }, []);

  // update product
  const updateProduct = (productId) => {
    router.push({
      pathname: "/admin/product-manage/update",
      query: { productId: productId },
    });
  };

  const exportToExcelFile = () => {
    const url = `${API_URL}/products/download`;

    window.location = url;
  };
  const onSubmitDelete = async (productId) => {
    const resDelete = await fetch(`${API_URL}/products/${productId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return resDelete;
  };

  // delete product
  const deleteProduct = (productId) => {
    MySwal.fire({
      title: "Are you sure?",
      text: "You want to delete this product?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        onSubmitDelete(productId)
          .then((res) => {
            if (!res.ok) {
              throw res;
            }
            return res.json();
          })
          .then((data) => {
            MySwal.fire("Thành công", "Đã xoá sản phẩm thành công", "success");

            getProductAdmin();
          })
          .catch((error) => {
            //Here is still promise
            if (typeof error.json === "function") {
              error.json().then((body) => {
                console.log("Body is " + body);
                //Here is already the payload from API
                console.log("body " + JSON.stringify(body));
                MySwal.fire("Failure!", body.message, "error");
              });
            } else {
              MySwal.fire("Failure!", error, "error");
            }
          });
      }
    });
  };

  // update status
  const updateStatus = async (productId, status) => {
    const handleUpdate = async () => {
      return await fetch(`${API_URL}/products/status/${productId}/${status}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    };

    MySwal.fire({
      title: "Are you sure?",
      text:
        "You want to " + status == "disabled"
          ? "ngừng kinh doanh"
          : "mở lại kinh doanh " + "sản phẩm này",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!",
    }).then((result) => {
      if (result.isConfirmed) {
        handleUpdate()
          .then((res) => {
            if (!res.ok) {
              throw res;
            }
            return res.json();
          })
          .then((data) => {
            MySwal.fire(
              "Thành công",
              "Đã" + status == "disabled"
                ? "deactive !"
                : "activate  !" + " sản phẩm thành công",
              "success"
            );

            getProductAdmin();
          })
          .catch((error) => {
            //Here is still promise
            if (typeof error.json === "function") {
              error.json().then((body) => {
                console.log("Body is " + body);
                //Here is already the payload from API
                console.log("body " + JSON.stringify(body));
                MySwal.fire("Failure!", body.message, "error");
              });
            } else {
              MySwal.fire("Failure!", body, "error");
            }
          });
      }
    });
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
      title: "Image",
      dataIndex: "primaryImage",
      key: "primaryImage",
      responsive: ["lg"],
      render: (imageUrl) => (
        <Image alt={imageUrl} src={imageUrl} height={40} width={40} />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      responsive: ["sm"],
    },

    {
      title: "Category | Brand",
      dataIndex: "category",
      key: "category",
      responsive: ["lg"],
      render: (_, record) => (
        <div className="flex flex-col justify-center items-center">
          <p>{record.category.name}</p>
          <p className="font-semibold">{record.brand.name}</p>
        </div>
      ),
    },
    {
      title: "Price",
      dataIndex: "original_price",
      key: "original_price",
      responsive: ["lg"],
      render: (_, record) => <p>{record.original_price} $</p>,
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
          onClick={() =>
            updateStatus(record.id, record.enabled ? "disabled" : "enabled")
          }
        />
      ),
    },

    {
      title: "Stock",
      dataIndex: "instock",
      key: "instock",
      responsive: ["lg"],
      render: (_, record) =>
        record.inStock ? (
          <span class="rounded-full bg-green-200 px-3 py-1 text-xs font-semibold text-red-900">
            In stock
          </span>
        ) : (
          <span class="rounded-full bg-red-200 px-3 py-1 text-xs font-semibold text-red-900">
            Sold out
          </span>
        ),
    },

    {
      title: "Action",
      responsive: ["sm"],
      render: (_, record) => (
        <div className="flex items-center">
          <BiSolidEdit
            onClick={() => updateProduct(record.id)}
            className="hover:cursor-pointer text-xl hover:text-red-700"
          />

          <MdDeleteOutline
            className="text-red-400 hover:text-blue-700 text-xl ml-6 hover:cursor-pointer"
            onClick={() => deleteProduct(record.id)}
          />
        </div>
      ),
    },
  ];

  if (status === "loading") {
    return <SpinTip />;
  } else
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
              <Breadcrumb
                className="mb-8"
                items={[
                  {
                    title: <a href="/admin/dashboard">Admin</a>,
                  },
                  {
                    title: <a href="/admin/users">Products</a>,
                  },
                ]}
              />
              <div className="flex justify-between items-center">
                <Search
                  placeholder="find your product based name/ category name"
                  enterButton="Search"
                  size="large"
                  className="w-2/3"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />

                <div className="flex">
                  <button
                    className="text-white bg-primary-500 hover:bg-pimary-600 focus:ring-4 focus:ring-cyan-200 font-medium inline-flex items-center rounded-lg text-sm px-3 py-2 text-center sm:ml-auto mr-4"
                    onClick={() => exportToExcelFile()}
                  >
                    Export to excel
                  </button>

                  <button
                    className="text-white bg-primary-500 hover:bg-pimary-600 focus:ring-4 focus:ring-cyan-200 font-medium inline-flex items-center rounded-lg text-sm px-3 py-2 text-center sm:ml-auto"
                    onClick={() => router.push("/admin/product-manage/add")}
                  >
                    <svg
                      className="-ml-1 mr-2 h-6 w-6 text-white"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"></path>
                    </svg>
                    Add product
                  </button>
                </div>
              </div>
            </div>
            {showProduct ? (
              <Table
                columns={columns}
                dataSource={showProduct}
                pagination={{
                  pageSizeOptions: ["50", "100"],
                  showSizeChanger: true,
                  pageSize: 6,
                }}
                rowKey={(record) => record.id}
              />
            ) : (
              <SpinTip />
            )}
          </div>
        )}
      </Fragment>
    );
}

Products.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;
export default Products;
