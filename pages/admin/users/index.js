import SpinTip from "@/components/loading/SpinTip";
import { NEXT_API } from "@/config";
import DataContext from "@/context/DataContext";
import AdminLayout from "@/layouts/AdminLayout";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { Chip } from "@mui/material";
import { Image, Input, Modal, Switch, Table, Tag } from "antd";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { BiSolidEdit } from "react-icons/bi";
import { toast } from "react-toastify";

function Products(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { allUser, setAllUser } = useContext(DataContext);
  const [isLoading, setIsLoading] = useState(false);
  const [updateUser, setUpdateUser] = useState(null);
  const [update, setUpdate] = useState(false);

  const [searchValue, setSearchValue] = useState("");

  const [showUsers, setShowUsers] = useState(allUser);

  const { Search } = Input;

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

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const resGet = await fetch(`${NEXT_API}/api/user?action=get_users`);
      const dataGet = await resGet.json();

      if (!resGet.ok) {
        toast.error("Get user fail");
      } else {
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

              <button className="text-white bg-primary-500 hover:bg-pimary-600 focus:ring-4 focus:ring-cyan-200 font-medium inline-flex items-center rounded-lg text-sm px-3 py-2 text-center sm:ml-auto">
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
    </Fragment>
  );
}

Products.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;
export default Products;
