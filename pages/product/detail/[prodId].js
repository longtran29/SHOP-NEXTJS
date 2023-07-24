import ProductTab from "@/components/Tabs/ProductTab";
import SpinTip from "@/components/loading/SpinTip";
import { API_URL, NEXT_API } from "@/config";
import { useFilterContext } from "@/context/FilterContext";
import CustomerLayout from "@/layouts/CustomerLayout";
import { CheckOutlined, MinusOutlined } from "@ant-design/icons";
import { Breadcrumb, Col, Image, Row } from "antd";
import { useEffect, useState } from "react";

const ProductDetail = ({ foundedProd, listCates }) => {
  const { filter_cate, setFilterCate, dispatch } = useFilterContext();
  const [cateSelected, setCateSelected] = useState("");

  useEffect(() => {
    const foundedCate = listCates.find(
      (cate) => cate.id == foundedProd.category
    );
    setCateSelected(foundedCate.name);

    console.log("Val detail " + foundedCate.name + " " + foundedCate.id);

    dispatch({ type: "CATEGORY_FILTER", payload: foundedCate.id });
  }, []);

  return (
    <div className="border-t-2 border-primary-200">
      {!cateSelected ? (
        <SpinTip />
      ) : (
        <>
          <Breadcrumb
            className="p-2 border-1 border-solid bg-gray-100"
            items={[
              { href: "/", title: "Home" },

              {
                href: "/shop",
                title: cateSelected,
              },

              {
                href: "/shop",
                title: foundedProd.name,
              },
            ]}
          />
          <Row className="mt-10">
            <Col
              flex={1}
              className="hover:scale-125 transition-all duration-100 cursor-pointer"
            >
              <Image src={foundedProd.primaryImage} width={300} height={300} />
            </Col>
            <Col flex={3}>
              <div className="font-bold font-fira">
                <h2 className="text-4xl"> {foundedProd.name.toUpperCase()}</h2>
              </div>
              <div>
                <h2 className="text-blue-500 text-xl font-extralight text-md mt-2">
                  {cateSelected}
                </h2>
              </div>

              <div>
                <h2 className="font-bold font-md text-md mt-2">
                  <span className="text-red-500">
                    {foundedProd.original_price -
                      foundedProd.discount_percent * foundedProd.original_price}
                    $
                  </span>
                  <span className="ml-4 text-gray-500 line-through">
                    {foundedProd.original_price}$
                  </span>
                  <button className="ml-4 text-gray-500 bg-black text-white px-2 py-1 rounded-md">
                    -{foundedProd.discount_percent}%
                  </button>
                </h2>
              </div>
              <div className="font-extraligh text-lg mt-4 flex items-center">
                <p className="block">Available: </p>
                <p className="text-green-600 ml-2">
                  {" "}
                  {foundedProd.inStock ? " In stock " : "Out of stock"}{" "}
                </p>
                <p className="text-green-600 ml-2">
                  {foundedProd.inStock ? <CheckOutlined /> : <MinusOutlined />}
                </p>
              </div>
              <div className="text-lg mt-4">
                <p>Quantity :</p>
              </div>
              <div className="flex mt-4">
                <button className="text-lg border-2 border-solid border-black hover:bg-black hover:text-white px-10 rounded-lg font-md  py-2">
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
      )}
    </div>
  );
};

export async function getStaticPaths() {
  const response = await fetch(`${NEXT_API}/api/products`, {
    method: "GET",
  });

  const listProds = await response.json();

  const paths = listProds.products.map((prod) => {
    return {
      params: { prodId: prod.id.toString() },
    };
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  // extract params - parameter for this method is context

  const prodId = params.prodId;

  const foundedProd = await fetch(`${API_URL}/products/${prodId}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => data);

  const listCates = await fetch(`${NEXT_API}/api/categories`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => data);

  return {
    props: {
      foundedProd,
      listCates: listCates.categories,
    },
  };
}

ProductDetail.getLayout = (page) => <CustomerLayout>{page}</CustomerLayout>;
export default ProductDetail;
