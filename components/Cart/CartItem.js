import { NEXT_API } from "@/config";
import CartContext from "@/context/CartContext";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
import { Badge, Modal } from "antd";
import Link from "next/link";
import React, { useContext } from "react";
import { toast } from "react-toastify";

function CartItem({ data }) {

  const {getCart} = useContext(CartContext);

  const { confirm } = Modal;

  const showDeleteConfirm = (productId) => {
    confirm({
      title: 'Are you sure delete this cart item?',
      icon: <ExclamationCircleFilled />,
      content: 'Delete this cart item',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        const deleteCartItem = async () => {
          const resDel = await fetch(
            `${NEXT_API}/api/cart/${productId}`,
            {
              method: "DELETE",
            }
          );

          const delData = await resDel.json();

          if (!resDel.ok) {
            toast.error(delData.message);
          } else {
            getCart();
            toast.success("Xoá thành công");
          }
        };

        deleteCartItem();
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };



  const updateQuantity = async (option, productId)  => {

    const resPut = await fetch(`${NEXT_API}/api/cart`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({productId:productId, type: option })
    });
    const dataPut = await resPut.json();

    if (!resPut.ok) {
      toast.error(dataPut.message);
      
    } else {
      getCart();
      toast.success("Đã cập nhật số lượng");
    }


  }
  
  return (
    <div className="p-5 border shadow-lg rounded-md mt-2">
      <div className="flex">
        <div className="h-[5rem] w-[5rem]">
          <img
            className="object-cover w-full h-full"
            src={data.product.primaryImage}
          />
        </div>

        <div className="ml-5">
          <Link href={`/product/detail/${data.product.id}`}>
            {" "}
            <p className="font-semibold uppercase">{data.product.name}</p>
          </Link>
          <p className="opacity-70 mt-2"> {data.product.category.name}</p>

          <p className="opacity-70 mt-2">Seller : {data.product.brand.name}</p>

          <div className="flex space-x-4 text-gray-900 pt-6">
            <p className="font-semibold">
              {" "}
              {(
                data.product.original_price -
                data.product.original_price * data.product.discount_percent
              ).toFixed(2)}{" "}
              ${" "}
            </p>
            <p className="opacity-50 line-through ">
              {" "}
              {(data.product.original_price).toFixed(2)} ${" "}
            </p>

            <Badge
              className="site-badge-count-109"
              count={`${data.product.discount_percent} % discount`}
              style={{ backgroundColor: "#52c41a" }}
            />
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-4 mt-2">
        <button onClick={() => updateQuantity("decrease", data.product.id)}>
          <RemoveCircleOutline />
        </button>
        <span className="py-1 px-7 border rounded-sm">{data.quantity}</span>
        <button onClick={() => updateQuantity("increase", data.product.id)}>
          <AddCircleOutline />
        </button>

        <button className="bg-black text-white px-2.5 py-1 rounded-md ml-4 hover:bg-red-400 hover:text-black" onClick={() => showDeleteConfirm(data.product.id)} >
          Remove
        </button>
      </div>
    </div>
  );
}

export default CartItem;
