import SpinTip from "@/components/loading/SpinTip";
import { NEXT_API } from "@/config";
import DataContext from "@/context/DataContext";
import { useFilterContext } from "@/context/FilterContext";
import AdminLayout from "@/layouts/AdminLayout";
import { ExclamationCircleFilled, LoadingOutlined } from "@ant-design/icons";
import { Chip } from "@mui/material";
import { Image, Input, Modal, Spin, Switch, Table, Tag } from "antd";
import { useRouter } from "next/router";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { RxUpdate } from "react-icons/rx";
import { toast } from "react-toastify";

function Products(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { allUser, setAllUser } = useContext(DataContext);
  const [isLoading, setIsLoading] = useState(false);
  const [updateUser, setUpdateUser] = useState(null);
  const [update, setUpdate] = useState(false);
  const { confirm } = Modal;

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
            src={record.imgURL}
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
              const resGet = await fetch(`${NEXT_API}/api/user?action=update_status`, {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  customerId: record.id,
                  status: record.enabled ? "disabled" : "enabled",
                }),
              });

              const dataGet = await resGet.json();

              if (!resGet.ok) {
                toast.error(dataGet.message);
              } else {
                if(record.enabled) toast.error("Deactive account !");
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
        record.roles.map((role) =>
          role.name == "ROLE_ADMIN" ? (
            <Chip label={role.name} color="success" />
          ) : (
            <Chip label={role.name} color="primary" />
          )
        ),
    },

    {
      title: "Action",
      responsive: ["sm"],
      render: (_, record) => (
        <div className="flex items-center">
          <RxUpdate
            // onClick={() => updateProduct(record.id)}
            className="hover:cursor-pointer hover:text-primary-700"
          />

          <MdDeleteOutline
            className="text-red-400 hover:fill-primary-700 text-xl ml-6 hover:cursor-pointer"
            // onClick={() => deleteProduct(record.id)}
          />
        </div>
      ),
    },
  ];

  return (
    <Fragment>
      {isLoading ? (
        <SpinTip

        // className="flex justify-center align-center items-center w-screen h-screen"
        />
      ) : (
        <div className="p-10">
          <div className="mb-4">
            <div className="flex justify-between items-center"></div>
          </div>
          <Table
            columns={columns}
            dataSource={allUser}
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
