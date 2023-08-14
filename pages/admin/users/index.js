import SpinTip from "@/components/loading/SpinTip";
import { NEXT_API } from "@/config";
import DataContext from "@/context/DataContext";
import AdminLayout from "@/layouts/AdminLayout";
import { ExclamationCircleFilled, UserOutlined } from "@ant-design/icons";
import { Chip, Grid } from "@mui/material";
import { Image, Input, Modal, Select, Switch, Table, Tag } from "antd";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { AiOutlineMail } from "react-icons/ai";
import { BiSolidEdit } from "react-icons/bi";
import { BsTelephone } from "react-icons/bs";
import { MdWifiPassword } from "react-icons/md";
import { toast } from "react-toastify";
import icon_upload from "../../../public/images/logo_upload.png";

const options = [
  {
    value: "ROLE_USER",
    label: "USER",
  },

  {
    value: "ROLE_ADMIN",
    label: "ADMIN",
  },
];

function Products(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { allUser, setAllUser } = useContext(DataContext);
  const [isLoading, setIsLoading] = useState(false);
  const [updateUser, setUpdateUser] = useState(null);
  const [update, setUpdate] = useState(false);

  const { confirm } = Modal;

  const [searchValue, setSearchValue] = useState("");

  const [showUsers, setShowUsers] = useState(allUser);

  const { Search } = Input;

  const [imagePreview, setImagePreview] = useState();

  const [size, setSize] = useState("middle");
  const handleSizeChange = (e) => {
    setSize(e.target.value);
  };

  const [newUser, setNewUser] = useState({
    username: "",
    password: "",
    email: "",
    name: "",
    phoneNumber: "",
    enabled: true,
    roles: null,
    imgURL: null,
  });

  useEffect(() => {
    if (searchValue) {
      setShowUsers(
        allUser.filter(
          (cate) =>
            cate.email.toLowerCase().includes(searchValue) ||
            cate.name.toLowerCase().includes(searchValue) ||
            cate.phoneNumber.toLowerCase().includes(searchValue)
        )
      );
    } else setShowUsers(allUser);
  }, [searchValue, allUser]);

  const showConfirm = () => {
    confirm({
      title: "Do you Want to deactive this account?",
      icon: <ExclamationCircleFilled />,
      content: "",
      onOk() {
        console.log("OK");
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const changeImage = (event) => {
    const selectedImage = event.target.files[0];
    setNewUser({ ...newUser, imgURL: selectedImage });
    setImagePreview(URL.createObjectURL(event.target.files[0]));
  };

  // handle confirm form add user
  const handleOk = async () => {
    // const formDataToSend = new FormData();
    // formDataToSend.append("username", newUser.username);
    // formDataToSend.append("password", newUser.password);
    // formDataToSend.append("email", newUser.email);
    // formDataToSend.append("name", newUser.name);
    // formDataToSend.append("phoneNumber", newUser.phoneNumber);
    // formDataToSend.append("enabled", newUser.enabled);
    // formDataToSend.append("imgURL", newUser.imgURL); // Append the image

    const resPut = await fetch(`${NEXT_API}/api/user?action=create_user`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
    },

      body: newUser,
    });

    const putData = await resPut.json();

    if (!resPut.ok) {
      toast.error(putData.message);
    } else {
      toast.success("Successfull");
    }
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setNewUser({
      username: "",
      password: "",
      email: "",
      name: "",
      phoneNumber: "",
      enabled: true,
      roles: null,
      imgURL: null,
    });
  };

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const resGet = await fetch(`${NEXT_API}/api/user?action=get_users`);
      const dataGet = await resGet.json();

      if (!resGet.ok) {
        
        toast.error("Get user fail");
      } else {
        console.log("List use returned ", JSON.stringify(dataGet.users));
        setAllUser(dataGet.users);
      }
      setIsLoading(false);
    })();
  }, [update]);

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
      title: "Full name",
      dataIndex: "",
      key: "name",
      responsive: ["lg"],
      render: (_, record) => (
        <div className="flex items-center ">
          <Image
            className="rounded-full border border-white border-solid"
            alt="avatar"
            src={
              record.imgURL
                ? record.imgURL
                : "https://th.bing.com/th/id/OIP.srdjU7JjdeYDjK46AQVGKwHaHa?pid=ImgDet&w=200&h=200&c=7&dpr=1.3"
            }
            height={40}
            width={40}
          />

          <h2 className="ml-2">{record.name}</h2>
        </div>
      ),
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      responsive: ["lg"],
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      responsive: ["lg"],
    },
    {
      title: "Phone number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
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
          onClick={() => {
            // showConfirm;
            // setUpdateUser(record)

            (async () => {
              const resGet = await fetch(
                `${NEXT_API}/api/user?action=update_status`,
                {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    customerId: record.id,
                    status: record.enabled ? "disabled" : "enabled",
                  }),
                }
              );

              const dataGet = await resGet.json();

              if (!resGet.ok) {
                toast.error(dataGet.message);
              } else {
                if (record.enabled) toast.error("Deactive account !");
                else toast.success("Active account!");
                setUpdate(!update);
              }
            })();
          }}
        />
      ),
    },

    {
      title: "Role",
      dataIndex: "",
      key: "role",
      responsive: ["lg"],
      render: (_, record) =>
        record.roles.map((role, index) =>
          role.name == "ROLE_ADMIN" ? (
            <Chip label={role.name} color="success" key={index} />
          ) : (
            <Chip label={role.name} color="primary" key={index} />
          )
        ),
    },

    {
      title: "Action",
      responsive: ["sm"],
      render: (_, record) => (
        <div className="flex items-center">
          <BiSolidEdit
            // onClick={() => updateCategory(record.id)}
            className="hover:cursor-pointer text-xl hover:text-primary-700"
          />
        </div>
      ),
    },
  ];

  return (
    <Fragment>
      {isLoading ? (
        <SpinTip />
      ) : (
        <div className="p-10">
          <div className="mb-4">
            <div className="flex justify-between items-center">
              <Search
                placeholder="search email / phone number / name"
                enterButton="Search"
                size="large"
                className="w-1/3"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />

              <button
                className="text-white bg-primary-500 hover:bg-pimary-600 focus:ring-4 focus:ring-cyan-200 font-medium inline-flex items-center rounded-lg text-sm px-3 py-2 text-center sm:ml-auto"
                onClick={() => setIsModalOpen(true)}
              >
                <svg
                  className="-ml-1 mr-2 h-6 w-6 text-white"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"></path>
                </svg>
                Add user
              </button>
            </div>
          </div>

          {showUsers ? (
            <Table
              columns={columns}
              dataSource={showUsers}
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

      <div>
        <Modal
          className="p-4"
          // title={state.isUpdating ? "Cập nhật danh mục" : "Thêm danh mục"}
          title="Add new user"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          maskClosable={false}
          width={700}
        >
          <Grid container spacing={4}>
            <Grid item xs={6}>
              <label className="block text-md "> Username </label>

              <Input
                size="large"
                placeholder="Enter the username"
                prefix={<UserOutlined />}
                value={newUser.username}
                onChange={(e) =>
                  setNewUser({ ...newUser, username: e.target.value })
                }
              />
            </Grid>

            <Grid item xs={6}>
              <label className="block text-md "> Password </label>

              <Input
                size="large"
                placeholder="Provide the password"
                value={newUser.password}
                onChange={(e) =>
                  setNewUser({ ...newUser, password: e.target.value })
                }
                prefix={<MdWifiPassword />}
              />
            </Grid>

            <Grid item xs={6}>
              <label className="block text-md "> Email </label>

              <Input
                // type="email"
                size="large"
                placeholder="Enter the email"
                value={newUser.email}
                onChange={(e) =>
                  setNewUser({ ...newUser, email: e.target.value })
                }
                prefix={<AiOutlineMail />}
              />
            </Grid>

            <Grid item xs={6}>
              <label className="block text-md "> Name </label>

              <Input
                size="large"
                placeholder="name of the user"
                value={newUser.name}
                onChange={(e) =>
                  setNewUser({ ...newUser, name: e.target.value })
                }
                prefix={<UserOutlined />}
              />
            </Grid>

            <Grid item xs={6}>
              <label className="block text-md "> Phone number </label>

              <Input
                size="large"
                placeholder="Provide the phone number"
                value={newUser.phoneNumber}
                onChange={(e) =>
                  setNewUser({ ...newUser, phoneNumber: e.target.value })
                }
                prefix={<BsTelephone />}
              />
            </Grid>

            <Grid item xs={6}>
              <label className="block text-md "> Enabled </label>

              <Switch
                defaultChecked
                checked={newUser.enabled}
                // onClick={() => updateStatus(record.id, record.enabled)}
              />
            </Grid>

            <Grid item xs={6}>
              <label className="block text-md "> Role </label>
              <Select
                mode="multiple"
                size={size}
                placeholder="Please select"
                // onChange={handleChange}
                style={{
                  width: "100%",
                }}
                options={options}
              />
            </Grid>

            <Grid item xs={6}>
              <div className="flex align-center items-center mt-2">
                <label className="border px-4 text-white py-2 bg-primary-500 font-semibold rounded-md hover:bg-primary-600">
                  Upload image
                  <Input
                    hidden
                    className="w-1/3 ml-8"
                    tabIndex={"-1"}
                    type="file"
                    accept="image/png,image/jpg,image/jpeg"
                    encType="multipart/form-data"
                    multiple
                    autoComplete="off"
                    // style={{ display: "none" }}
                    required={true}
                    onChange={(e) => changeImage(e)}
                  />
                </label>
              </div>
            </Grid>

            <Grid item xs={6}>
              {imagePreview ? (
                <div className="">
                  <Image
                    width={60}
                    height={60}
                    id="imagePreview"
                    src={imagePreview}
                    alt="image_preview"
                  />
                </div>
              ) : (
                ""
              )}
            </Grid>
          </Grid>
        </Modal>
      </div>
    </Fragment>
  );
}

Products.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;
export default Products;
