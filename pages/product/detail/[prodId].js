import ProductTab from "@/components/Tabs/ProductTab";
import SpinTip from "@/components/loading/SpinTip";
import { API_URL, NEXT_API } from "@/config";
import { useFilterContext } from "@/context/FilterContext";
import CustomerLayout from "@/layouts/CustomerLayout";
import { CheckOutlined, MinusOutlined } from "@ant-design/icons";
import { Breadcrumb, Col, Image, Row } from "antd";
import { data } from "autoprefixer";
import { useContext, useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import dynamic from "next/dynamic";
import CartContext from "@/context/CartContext";
import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
import { toast } from "react-toastify";
import { getAllProduct, getProductDetail } from "@/context/DataContext";
import AuthContext from "@/context/AuthContext";
import { useRouter } from "next/router";
const DynamicComponent = dynamic(
  () => import("../../../components/Slider/Slide"),
  {
    ssr: false,
  }
);

const ProductDetail = () => {
  const router = useRouter();
  const { prodId } = router.query;

  const [foundedProd, setFoundedProd] = useState(null);

  console.log("Product found ", JSON.stringify(foundedProd));

  useEffect(() => {
    if (prodId) {
      (async () => {
        console.log("Da vao fetch prod detail ", prodId);
        const resGet = await fetch(
          `${NEXT_API}/api/products?action=get_detail&productId=${prodId}`,
          {
            method: "GET",
          }
        );

        const dataGet = await resGet.json();

        if (!resGet.ok) {
          toast.error("Error" + dataGet.message);
        } else {
          console.log("prod fetched ", JSON.stringify(dataGet.productDetail));
          setFoundedProd(dataGet.productDetail);
        }
      })();
    }
  }, [prodId]);

  const responsive = {
    0: { items: 1 },
    568: { items: 2 },
    1024: { items: 4 },
  };

  const images =
    foundedProd && foundedProd.images.map((image) => image.imageProduct);

  const [activeIndex, setActiveIndex] = useState(0);

  const [quantity, setQuantity] = useState(1);

  const { addItemToCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);

  const syncActiveIndex = ({ e }) => {
    setActiveIndex(e);
  };

  const items =
    foundedProd &&
    images.map((image) => {
      return (
        <Image
          src={image}
          width={100}
          height={100}
          // key={image.id}
          suppressHydrationWarning
        />
      );
    });

  const addToCart = () => {
    console.log("User is " + user);
    if (!user) {
      toast.error("Vui lòng đăng nhập để mua sản phẩm");
      return;
    }
    addItemToCart({ productId: foundedProd.id, quantity: quantity });
  };

  return (
    <div className="border-t-2 border-primary-200">
      {foundedProd ? (
        <>
          <Breadcrumb
            className="p-2 border-1 border-solid bg-gray-100"
            items={[
              { href: "/", title: "Home" },

              {
                href: "/shop",
                title: foundedProd.category.name,
              },

              {
                href: "/shop",
                title: foundedProd.name,
              },
            ]}
          />

          <Row className="mt-10 md:px-60 md:py-10 ">
            <Col
              flex={1}
              className="hover:scale-125 transition-all duration-100 cursor-pointer"
            >
              <Image src={foundedProd.primaryImage} width={300} height={300} />
            </Col>

            <DynamicComponent foundedProd={foundedProd} />
            <Col flex={3} className="ml-8">
              <div className="font-bold font-fira">
                <h2 className="text-4xl"> {foundedProd.name.toUpperCase()}</h2>
              </div>
              <div>
                <h2 className="text-blue-500 text-xl font-extralight text-md mt-2">
                  {foundedProd.category.name}
                </h2>
              </div>

              <div>
                <h2 className="font-bold font-md text-md mt-2">
                  <span className="text-red-500">
                    {(
                      foundedProd.original_price -
                      foundedProd.discount_percent * foundedProd.original_price
                    ).toFixed(2)}
                    $
                  </span>
                  <span className="ml-4 text-gray-500 line-through">
                    {foundedProd.original_price.toFixed(2)}$
                  </span>
                  <button className="ml-4 text-gray-500 bg-black text-white px-2 py-1 rounded-md">
                    -{foundedProd.discount_percent}%
                  </button>
                </h2>
              </div>
              <div className="font-extraligh text-lg mt-4 flex items-center">
                <p className="block opacity-70">Available: </p>
                <p className="text-green-600 ml-2">
                  {" "}
                  {foundedProd.inStock ? " In stock " : "Out of stock"}{" "}
                </p>
                <p className="text-green-600 ml-2">
                  {foundedProd.inStock ? <CheckOutlined /> : <MinusOutlined />}
                </p>
              </div>
              <div className="text-lg mt-4 flex items-center space-x-4 mt-2 opacity-70">
                <p>Quantity :</p>

                <button
                  onClick={() => {
                    quantity == 1
                      ? toast.error("Chọn ít nhất 1 sản phẩm ")
                      : setQuantity(quantity - 1);
                  }}
                >
                  <RemoveCircleOutline />
                </button>
                <span className="py-1 px-7 border rounded-sm">{quantity}</span>
                <button
                  onClick={() => {
                    quantity == 5
                      ? toast.error("Tối đa chọn 5 sản phẩm ")
                      : setQuantity(quantity + 1);
                  }}
                >
                  <AddCircleOutline />
                </button>
              </div>
              <div className="flex mt-6">
                <button
                  className="text-lg border-2 border-solid border-black hover:bg-black hover:text-white px-10 rounded-lg font-md  py-2"
                  onClick={addToCart}
                >
                  {" "}
                  ADD TO CART
                </button>
                <button className="text-lg ml-4 border-2 border-solid border-black hover:bg-red-500 hover:text-white px-10 rounded-lg font-md  py-2">
                  {" "}
                  BUY NOW{" "}
                </button>
              </div>
            </Col>
          </Row>

          <div className="mt-10">
            <ProductTab data={foundedProd} />
          </div>
        </>
      ) : (
        <SpinTip />
      )}
    </div>
  );
};

ProductDetail.getLayout = (page) => <CustomerLayout>{page}</CustomerLayout>;
export default ProductDetail;
