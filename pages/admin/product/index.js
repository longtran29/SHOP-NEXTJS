import AdminLayout from "@/layouts/AdminLayout";
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Button, Card, Col, Input, InputNumber, Row, Spin, Switch } from "antd";
import { Select } from "antd";
import dynamic from "next/dynamic";
import Image from "next/image";
import DataContext from "@/context/DataContext";
import { API_URL, NEXT_API } from "@/config";
import { toast } from "react-toastify";
import icon_upload from "../../../public/images/logo_upload.png";

const ReactQuill = dynamic(import("react-quill"), {
  ssr: false,
  loading: () => <h5>Loading ...</h5>,
});

function AddProduct(props) {
  const router = useRouter();
  const [state, setState] = useState({
    imagePreview: null,
    brandOptions: [],
    categoryOptions: [],
    defaultCate: "",
    defaultBrand: "",
    isLoading: true,
    imageData: null,
    primaryImage: null,
    primaryImagePrev: "",
  });

  const [extraImage, setExtraImage] = useState([]);
  // let extraImage = [];

  const [product, setProduct] = useState({
    name: "",
    enabled: true,
    original_price: 1.0,
    discount_percent: 0.0,
    description: "",
    inStock: true,
    brand: null,
    category: null,
    productQuantity: 1,
    details: [{ name: "", value: "" }],
  });
  const { listBrands, listCates, getProducts, listProds } =
    useContext(DataContext);
  const [images, setImages] = useState([]);

  const { defaultCate } = state;

  const { details } = product;

  // const [details, setdetails] = useState([{ name: "", value: "" }]);

  const addNewDetail = () => {
    setProduct({
      ...product,
      details: [...details, { name: "", value: "" }],
    });
  };

  const removeDetailItem = (index) => {
    let updateDetail = [...details];
    updateDetail.splice(index, 1);
    setProduct({ ...product, details: updateDetail });
  };

  const updateDetail = (i, e) => {
    let newFormValues = [...details];
    newFormValues[i][e.target.name] = e.target.value;
    setProduct({ ...product, details: newFormValues });
  };

  console.log("Dsanh sach la " + JSON.stringify(details));
  // handle fetching cates and brands from DataContext - fetch API async
  useEffect(() => {
    const brandOpts = listBrands.map((brand) => ({
      value: brand.id,
      label: brand.name,
    }));

    const cateOpts = listCates.map((cate) => ({
      value: cate.id,
      label: cate.name,
    }));

    if (listCates.length > 0 && listBrands.length > 0) {
      filterCate(brandOpts[0].value);
    }

    // let valueCate = cateOpts.length > 0 ? cateOpts[0].label : "";

    if (listBrands.length > 0 && listCates.length > 0) {
      let valueBrand = brandOpts.length > 0 ? brandOpts[0].label : "";

      setState((prevState) => ({
        ...prevState,
        brandOptions: brandOpts,
        defaultBrand: valueBrand,
        isLoading: false,
      }));
    }
  }, [listBrands, listCates]); // 2 dependency

  // upload product
  const createProduct = async () => {
    if (state.primaryImage == null) {
      toast.error("Vui lòng chọn ảnh");
      return;
    }
    setState({ ...state, isLoading: true });

    const formData = new FormData();
    formData.append("product", JSON.stringify(product));
    formData.append("primaryImage", state.primaryImage);

    for (let i = 0; i < extraImage.length; i++) {
      formData.append("extraImage", extraImage[i]);
    }

    const resPos = await fetch(`${NEXT_API}/api/products`, {
      method: "POST",
      body: formData,
    });

    const posData = await resPos.json();

    if (!resPos.ok) {
      toast.error(posData.message);
    } else {
      getProducts();
      router.push("/admin/products");
      toast.success("Thêm sản phẩm thành công");
    }

    setState({ ...state, isLoading: false });
  };

  // filter category followed by brand
  const filterCate = async (e) => {
    const response = await fetch(`${API_URL}/brands/categories/${e}`);

    const categories = await response.json();
    if (!response.ok) {
      toast.error("Lỗi lấy danh mục theo nhãn hàng");
      return;
    }
    const cateOpts = categories.map((cate) => ({
      value: cate.id,
      label: cate.name,
    }));
    let cateLabel = cateOpts.length > 0 ? cateOpts[0].label : "";

    setState((prevState) => ({
      // sử dụng cú pháp này trường hợp setState của useEffect phía trên chưa kịp cập nhật giá trị của isLoading prop
      ...prevState,
      categoryOptions: cateOpts,
      defaultCate: cateLabel,
    }));
    setProduct({ ...product, brand: e, category: cateOpts[0].value });
  };

  // upload image
  const changeImage = (e) => {
    const files = e.target.files;
    // extraImage = files;
    setExtraImage(files);

    for (let i = 0; i < files.length; i++) {
      setImages((prevImage) => [
        ...prevImage,
        {
          name: files[i].name,
          url: URL.createObjectURL(files[i]),
        },
      ]);
    }
  };

  const setPrimaryImage = (e) => {
    setState({
      ...state,
      primaryImagePrev: URL.createObjectURL(e.target.files[0]),
      primaryImage: e.target.files[0],
    });
  };

  return (
    <div className="p-10 border-2 border-solid">
      {state.isLoading ? (
        <Spin />
      ) : (
        <>
          <Row className="">
            <Col flex="400px" className="pl-4">
              <div className="info-1">
                <h2 className="font-medium  text-base">About</h2>
                <p className="text-gray-700">Basic product information</p>
              </div>
            </Col>
            <Col flex="1">
              <div className="flex flex-col">
                <label className="font-semibold text-base">
                  Tên sản phẩm *
                </label>
                <input
                  type="text"
                  className="p-1.5 border-2 border-solid required:border-red-500 focus:border-black rounded-md justify-center hover:border-purple-400 mt-2"
                  placeholder="Nhập tên sản phẩm"
                  value={product.name}
                  onChange={(e) =>
                    setProduct({ ...product, name: e.target.value })
                  }
                />
              </div>

              <div className="flex flex mt-2">
                <div className="flex flex-col ">
                  <label className="font-semibold text-base mt-3">
                    Discount
                  </label>
                  <InputNumber
                    style={{
                      width: 200,
                      marginTop: 4,
                    }}
                    defaultValue="0"
                    min="0"
                    max="1"
                    step="0.1"
                    onChange={(e) =>
                      setProduct({ ...product, discount_percent: e })
                    }
                    stringMode
                  />
                </div>

                <div className="flex flex-col ml-8 text-base">
                  <label className="font-medium mt-3">Price </label>
                  <InputNumber
                    style={{
                      width: 200,
                      marginTop: 4,
                    }}
                    defaultValue="1.0"
                    min="1.0"
                    max=""
                    step="1.0"
                    onChange={(e) =>
                      setProduct({ ...product, original_price: e })
                    }
                    stringMode
                  />
                </div>
              </div>

              <div className="flex align-center items-cente mt-2 text-base">
                <div className="flex flex-col">
                  <label className="font-medium mt-3">Quantity </label>
                  <InputNumber
                    style={{
                      width: 200,
                      marginTop: 4,
                    }}
                    defaultValue="1"
                    min="1"
                    max="1000000"
                    step="1"
                    onChange={(e) =>
                      setProduct({ ...product, productQuantity: e })
                    }
                    stringMode
                  />
                </div>

                <div className="flex flex-col mt-6 ml-8">
                  <label className="font-medium"> In Stock </label>
                  <Switch
                    className="w-4"
                    defaultChecked
                    checked={product.inStock}
                    onClick={() =>
                      setProduct({ ...product, inStock: !product.inStock })
                    }
                  />
                </div>

                <div className="flex flex-col mt-6 ml-20">
                  <label className="font-semibold"> Enabled </label>
                  <Switch
                    className="w-4"
                    // defaultChecked
                    checked={product.enabled}
                    onClick={() =>
                      setProduct({ ...product, enabled: !product.enabled })
                    }
                  />
                </div>
              </div>

              <div className="flex flex-col mt-6">
                <label className="font-semibold"> Primary Image </label>
                <div className="flex align-center items-center mt-2">
                  <Image
                    src={icon_upload}
                    width={50}
                    height={50}
                    className="rounded-full"
                  />

                  <Input
                    className="w-1/3 ml-8"
                    tabIndex={"-1"}
                    type="file"
                    accept="image/png,image/jpg,image/jpeg"
                    multiple
                    encType="multipart/form-data"
                    autoComplete="off"
                    // style={{ display: "none" }}
                    required={true}
                    onChange={(e) => setPrimaryImage(e)}
                  />
                </div>
              </div>
            </Col>
          </Row>

          {state.primaryImagePrev && (
            <Row className="mt-4">
              <div className="">
                <Card style={{ width: 300, height: 300 }}>
                  <img src={state.primaryImagePrev} />
                </Card>
              </div>
            </Row>
          )}
          <hr className="border-1 border-gray-200 mt-10" />

          <Row className="mt-10">
            <Col flex="400px" className="pl-4">
              <div className="info-1">
                <h2 className="font-medium  text-base">Brand & category</h2>
                <p className="text-gray-700">In brand and category</p>
              </div>
            </Col>
            <Col flex="1">
              <div className="flex flex-col mt-2 text-base">
                <div className="flex flex-col">
                  <label className="font-semibold  mt-3 mb-2">Brand </label>
                  <Select
                    defaultValue={state.defaultBrand}
                    style={
                      {
                        // width: 120,
                      }
                    }
                    onChange={filterCate}
                    options={state.brandOptions}
                  />
                </div>

                <div className="flex flex-col">
                  <label className="font-semibold  mt-3">Category </label>

                  <select
                    className="mt-2 border-2 border-solid p-1 px-4 py-2 rounded-lg hover:border-purple-100"
                    onChange={(e) =>
                      setProduct({ ...product, category: e.target.value })
                    }
                  >
                    {state.categoryOptions.map((category) => {
                      return (
                        <option key={category.value} value={category.value}>
                          {category.label}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>

              <div className="mt-6 ">
                <label className="font-semibold text-base mb-10">
                  {" "}
                  Description
                </label>
                <div>
                  <ReactQuill
                    theme="snow"
                    value={product.description}
                    onChange={(e) => setProduct({ ...product, description: e })}
                    style={{
                      height: 200,
                    }}
                  />
                </div>
              </div>
            </Col>
          </Row>

          <hr className="border-1 border-gray-200 mt-20" />

          <Row className="mt-10">
            <Col flex="400px" className="pl-4">
              <div className="info-1">
                <h2 className="font-medium  text-base">Extra detail</h2>
                <p className="text-gray-700">Detail information</p>
              </div>
            </Col>
            <Col flex="1">
              {console.log("Legnth is " + details.length)}
              <button
                className="bg-black text-white px-4 py-1 rounded-md mb-4 hover:bg-blue-500"
                onClick={addNewDetail}
              >
                {" "}
                Add{" "}
              </button>
              {details.map((element, index) => (
                <div className="mb-4" key={index}>
                  <label>Name </label>
                  <input
                    className="border border-1 border-solid border-black rounded-sm ml-4 text-center"
                    type="text"
                    name="name"
                    value={element.name}
                    onChange={(e) => updateDetail(index, e)}
                  />
                  <label className="ml-4">Value</label>
                  <input
                    className="border border-1 border-solid border-black rounded-sm ml-4 text-center"
                    type="text"
                    name="value"
                    value={element.value}
                    onChange={(e) => updateDetail(index, e)}
                  />

                  {index ? (
                    <button
                      type="button"
                      className="bg-red-400 ml-4 px-2.5 py-1 rounded-md hover:text-white hover:bg-red-700"
                      onClick={() => removeDetailItem(index)}
                    >
                      Remove
                    </button>
                  ) : null}
                </div>
              ))}
            </Col>
          </Row>

          <hr className="border-1 border-gray-200 mt-20" />

          <Row className="mt-10">
            <Col flex="400px" className="pl-4">
              <div className="info-1">
                <h2 className="font-medium  text-base">Extra image</h2>
                <p className="text-gray-700">Product Image</p>
              </div>
            </Col>
            <Col flex="1">
              <div className="flex align-center items-center mt-2">
                <Image
                  src={icon_upload}
                  width={100}
                  height={100}
                  className="rounded-full"
                />

                <Input
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
              </div>
            </Col>
          </Row>

          <Row className="mt-4">
            <div className="grid gap-4 grid-cols-3 place-items-center">
              {images.map((image) => (
                <div key={image.name}>
                  <Card style={{ width: 300, height: 300 }}>
                    <img src={image.url} />
                  </Card>
                </div>
              ))}
            </div>
          </Row>

          <div className="flex justify-center">
          <button
              className="bg-black text-white hover:bg-primary-700 font-semibold rounded-md px-4 py-2 mt-6 border border-1 border-solid rounded-md self-center mr-10"
              onClick={() => router.back()}
            >
              Cancel
            </button>
            <button
              className="bg-black text-white hover:bg-red-400 font-semibold rounded-md px-4 py-2 mt-6 border border-1 border-solid rounded-md self-center ml-10"
              onClick={() => createProduct()}
            >
              Submit
            </button>
          </div>
        </>
      )}
    </div>
  );
}

AddProduct.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;

export default AddProduct;
