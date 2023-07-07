import { API_URL, NEXT_API } from "@/config";
import AdminLayout from "@/layouts/AdminLayout";
import { Input, Modal, Switch, Table } from "antd";
import Image from "next/image";
import React, { useContext, useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import DataContext from "@/context/DataContext";
import { MdDeleteOutline } from "react-icons/md";
import { RxUpdate } from "react-icons/rx";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { toast } from "react-toastify";

function Categories(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [state, setState] = useState({
    categoryName: "",
    imageUrl: "",
    imageData: null,
    imagePreview: null,
    isLoading: false,
    isUpdating: false,
    status: false,
    categoryId: null,
  });

  const { listCates, updateCategories } = useContext(DataContext);

  const { confirm } = Modal;

  const antIcon = <LoadingOutlined style={{ fontSize: 20 }} spin />;

  // upload image handler
  const changeImage = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
      setState({
        ...state,
        imageData: e.target.files[0],
        imagePreview: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  // update category
  const updateCategory = (categoryId) => {
    const updateCate = listCates.find((cate) => cate.id == categoryId);
    setIsModalOpen(true);
    setState({
      ...state,
      categoryName: updateCate.name,
      imagePreview: updateCate.imageUrl,
      isUpdating: true,
      status: updateCate.enabled,
      categoryId: categoryId,
    });
  };

  // update status
  const updateStatus = async (categoryId, status) => {
    const resPut = await fetch(`${NEXT_API}/api/categories/${categoryId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: status,
      }),
    });

    const data = await resPut.json();

    if (!resPut.ok) {
      toast.error(data.message);
    } else {
      updateCategories(data.categories);
    }
  };

  // handle delete
  const deleteCategory = (categoryId) => {
    confirm({
      title: "Are you sure delete this category?",
      icon: <ExclamationCircleFilled />,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        const deleteCate = async () => {
          const resDel = await fetch(
            `${NEXT_API}/api/categories/${categoryId}`,
            {
              method: "DELETE",
            }
          );

          const delData = await resDel.json();

          if (!resDel.ok) {
            toast.error(delData.message);
          } else {
            updateCategories(delData.categories);
            toast.success("Xoá thành công");
          }
        };

        deleteCate();
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  // handle submut
  const handleOk = async () => {
    if (state.categoryName === "") {
      toast.error("Vui lòng nhập tên danh mục");
      return;
    }
    if (!state.isUpdating) {
      // dang them
      if (state.imageData == null) {
        toast.error("Vui lòng chọn ảnh mẫu");
        return;
      }
      const formData = new FormData();
      formData.append("file", state.imageData);
      let tempImageUrl = "";
      setState({ ...state, isLoading: true });
      const resPos1 = await fetch(`${API_URL}/upload/image`, {
        method: "POST",
        body: formData,
      });

      const postData1 = await resPos1.text();
      console.log("Value is " + postData1);
      if (!resPos1.ok) {
        toast.error("Lỗi upload ảnh");
      } else {
        tempImageUrl = postData1;
        setState({ ...state, imageUrl: tempImageUrl });
      }

      const resPos2 = await fetch(`${NEXT_API}/api/categories`, {
        method: "POST",
        headers: {
          // this request carries JSON
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: state.categoryName,
          enabled: true,
          imageUrl: tempImageUrl,
        }),
      });


      const resData = await resPos2.json();


      if (!resPos2.ok) {
        toast.error(resData.message);
        
      } else {
        updateCategories(resData.categories);
      }
    } else {
      // cap nhat danh muc

      let tempImageUrl = "";
      setState({ ...state, isLoading: true });

      if (state.imageData) {
        const formData = new FormData();
        formData.append("file", state.imageData);
        const resPos2 = await fetch(`${API_URL}/upload/image`, {
          method: "POST",
          body: formData,
        });
        const resPostData2 = await resPos2.text(); // use text() instead of .json() - return image url not object
        if (!resPos2.ok) {
          toast.error("Lỗi upload ảnh ");
        } else {
          tempImageUrl = resPostData2;
          setState((prevState) => ({ ...prevState, imageUrl: tempImageUrl }));
        }
      }

      const categoryId = state.categoryId;

      const resPut = await fetch(`${NEXT_API}/api/categories/${categoryId}`, {
        method: "PUT",
        headers: {
          // this request carries JSON
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: state.categoryName,
          imageUrl: tempImageUrl,
          enabled: state.status,
        }),
      });

      const resPutData = await resPut.json();

      if (!resPut.ok) {
        toast.error(resPutData.message);
      } else {
        updateCategories(resPutData.categories);
      }
    }

    setIsModalOpen(false);
    setState({
      categoryName: "",
      imageUrl: "",
      imageData: null,
      imagePreview: null,
      isLoading: false,
      isUpdating: false,
      status: false,
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
      title: "Name",
      dataIndex: "name",
      key: "name",
      responsive: ["sm"],
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
      dataIndex: "imageUrl",
      key: "imageUrl",
      responsive: ["lg"],
      render: (imageUrl) => (
        <Image alt={imageUrl} src={imageUrl} height={40} width={40} />
      ),
    },

    {
      title: "Action",
      responsive: ["sm"],
      render: (_, record) => (
        <div className="flex items-center">
          <RxUpdate
            onClick={() => updateCategory(record.id)}
            className="hover:cursor-pointer hover:text-primary-700"
          />

          <MdDeleteOutline
            className="text-red-400 hover:fill-primary-700 text-xl ml-6 hover:cursor-pointer"
            onClick={() => deleteCategory(record.id)}
          />
        </div>
      ),
    },
  ];

  return (
    <>
      {state.isLoading ? (
        <Spin
          indicator={antIcon}
          className="flex justify-center align-center items-center w-screen h-screen"
        />
      ) : (
        <div className="p-10">
          <div className="mb-4">
            <button
              className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium inline-flex items-center rounded-lg text-sm px-3 py-2 text-center sm:ml-auto"
              onClick={() => setIsModalOpen(true)}
            >
              <svg
                className="-ml-1 mr-2 h-6 w-6"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"></path>
              </svg>
              Add category
            </button>
          </div>
          <Table
            columns={columns}
            dataSource={listCates}
            pagination={{
              pageSizeOptions: ["50", "100"],
              showSizeChanger: true,
              pageSize: 6,
            }}
            rowKey={(record) => record.id}
          />
          <div>
            <Modal
              className="p-4 mt-20"
              title={state.isUpdating ? "Cập nhật danh mục" : "Thêm danh mục"}
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
              maskClosable={false}
            >
              <label className="block text-md mt-6"> Tên danh mục </label>
              <input
                placeholder="Category name"
                className="border-2 border-solid rounded-lg p-1 focus:outline-none w-2/3"
                type="text"
                value={state.categoryName}
                onChange={(e) =>
                  setState({ ...state, categoryName: e.target.value })
                }
              />
              <div className="flex justify-between items-center align-center ">
                <div className="flex flex-col mt-4">
                  <label className="block"> Ảnh </label>

                  <Input
                    type="file"
                    accept="image/*"
                    required={true}
                    onChange={(e) => changeImage(e)}
                  />
                </div>

                {state.imagePreview && (
                  <div className="">
                    <Image
                      width={60}
                      height={60}
                      id="imagePreview"
                      src={state.imagePreview}
                      // alt={state.imageData.name}
                      alt="image_preview"
                    />
                  </div>
                )}
              </div>
            </Modal>
          </div>
        </div>
      )}
    </>
  );
}

Categories.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;

export default Categories;
