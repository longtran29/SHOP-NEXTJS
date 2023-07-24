import AdminLayout from "@/layouts/AdminLayout";
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Input, InputNumber, Spin, Switch } from "antd";
import { Select } from "antd";
import dynamic from "next/dynamic";
import Image from "next/image";
import DataContext from "@/context/DataContext";
import { API_URL, NEXT_API } from "@/config";
import { toast } from "react-toastify";
import router from "next/router";

const ReactQuill = dynamic(import("react-quill"), {
  ssr: false,
  loading: () => <h5>Loading ...</h5>,
});

function UpdateProduct(props) {
  const router = useRouter();
  const [state, setState] = useState({
    imagePreview: null,
    brandOptions: [],
    categoryOptions: [],
    defaultCate: "",
    defaultBrand: "",
    isLoading: true,
    imageData: null,
  });

  const [product, setProduct] = useState({
    name: "",
    primaryImage: "",
    enabled: true,
    original_price: 1.0,
    discount_percent: 0.0,
    description: "",
    inStock: true,
    brand: null,
    category: null,
    productQuantity: 1,
  });
  const { listBrands, listCates, updateProducts, listProds } =
    useContext(DataContext);

  const { defaultCate } = state;

  const updateProdId = router.query.updateId;

  

  // 
  // 

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



    

    if (
      listBrands.length > 0 &&
      listCates.length > 0 &&
      listProds.length > 0 &&
      router.query.updateId != null
    ) {
      
      

      let existedProduct = listProds.find(
        (prod) => prod.id == router.query.updateId
      ); // based on productId
      
      setProduct(existedProduct);

      

      let valueBrand = listBrands.find(
        (brand) => brand.id == existedProduct.brand
      ).name;
      let valueCate = listCates.find(
        (cate) => cate.id == existedProduct.category
      ).name;

      filterCate(existedProduct.brand);

    

      setState((prevState) => ({
        ...prevState,
        brandOptions: brandOpts,
        // categoryOptions: cateOpts,
        defaultBrand: valueBrand,
        defaultCate: valueCate,
        imagePreview: existedProduct.primaryImage,
        isLoading: false,
      }));
    }
  }, [listBrands, listCates, listProds, router.query.updateId]); // 2 dependency

  // 

  // upload product
  const updateProduct = async () => {
    let tempImageUrl = "";
    let payload = {};

    setState({ ...state, isLoading: true });
    if (state.imageData) {
      const formData = new FormData();
      formData.append("file", state.imageData);
      const resPos1 = await fetch(`${API_URL}/upload/image`, {
        method: "POST",
        body: formData,
      });

      const postData1 = await resPos1.text();
      if (!resPos1.ok) {
        toast.error("Lỗi upload ảnh");
      } else {
        payload = { ...product, primaryImage: postData1 }; // temp solution : clone object and create new prop
        setProduct({ ...product, primaryImage: postData1 }); // setProduct is async
      }
    } else {
      payload = {...product}
    }

    
    
    const productId = router.query.updateId;
    const resPos = await fetch(`${NEXT_API}/api/products/${productId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify(payload),      
    });

    const posData = await resPos.json();

    if (!resPos.ok) {
      toast.error(posData.message);
    } else {
      updateProducts(posData.products);
      router.push("/admin/products");
      toast.success("Cập nhật  sản phẩm thành công");
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

    setState((prevState) => ({
      // sử dụng cú pháp này trường hợp setState của useEffect phía trên chưa kịp cập nhật giá trị của isLoading prop
      ...prevState,
      categoryOptions: cateOpts
    }));
    // setProduct({ ...product, brand: e});
  };

  // upload image
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

  return (
    <div className="p-10 border-2 border-solid">
      {state.isLoading ? (
        <Spin />
      ) : (
        <form>
          <div className="flex flex ">
            <div className="w-2/3">
              <div className="flex flex-col w-1/3">
                <label className="font-medium italic">Tên sản phẩm </label>
                <input
                  type="text"
                  className="p-1 border-2 border-solid focus:outline-none rounded-xl  justify-center mt-2"
                  placeholder="Nhập tên sản phẩm"
                  value={product.name}
                  onChange={(e) =>
                    setProduct({ ...product, name: e.target.value })
                  }
                />
              </div>

              <div className="flex flex-col mt-4">
                <label className="font-medium italic"> Enabled </label>
                <Switch
                  className="w-4"
                  // defaultChecked
                  checked={product.enabled}
                  onClick={() =>
                    setProduct({ ...product, enabled: !product.enabled })
                  }
                />
              </div>

              <div className="flex mt-6 mb-2">
                <div className="flex flex-col ">
                  <label className="font-medium italic mt-3">Discount</label>
                  <InputNumber
                    style={{
                      width: 200,
                      marginTop: 4,
                    }}
                    defaultValue="0"
                    value={product.discount_percent}
                    min="0"
                    max="1"
                    step="0.1"
                    onChange={(e) =>
                      setProduct({ ...product, discount_percent: e })
                    }
                    stringMode
                  />
                </div>
                <div className="flex flex-col ml-3">
                  <label className="font-medium italic mt-3">Price </label>
                  <InputNumber
                    style={{
                      width: 200,
                      marginTop: 4,
                    }}
                    defaultValue="1.0"
                    value={product.original_price}
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

              <div className="flex align-center items-center">
                <div className="flex flex-col">
                  <label className="font-medium italic mt-3">Quantity </label>
                  <InputNumber
                    style={{
                      width: 200,
                      marginTop: 4,
                    }}
                    value={product.productQuantity}
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
                  <label className="font-medium italic"> In Stock </label>
                  <Switch
                    className="w-4"
                    defaultChecked
                    checked={product.inStock}
                    onClick={() =>
                      setProduct({ ...product, inStock: !product.inStock })
                    }
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <label className="font-medium italic mt-3">Brand </label>
                <Select
                  defaultValue={state.defaultBrand}
                  style={{
                    width: 120,
                  }}
                  onChange={filterCate}
                  options={state.brandOptions}
                  disabled
                />
              </div>

              <div className="flex flex-col">
              
                <label className="font-medium italic mt-3">Category </label>

           
                <Select
                  defaultValue={state.defaultCate}
                  style={{
                    width: 120,
                  }}
                  onChange={(e) => setProduct({ ...product, category: e })}
                  options={state.categoryOptions}
                />
              </div>

              <div className="mt-6">
                <label className="font-medium italic mb-6"> Description</label>
                <div>
                  <ReactQuill
                    theme="snow"
                    value={product.description}
                    onChange={(e) => setProduct({ ...product, description: e })}
                  />

                  <div
                    className="mt-10 text-black"
                    dangerouslySetInnerHTML={{ __html: product.description }}
                  ></div>
                </div>
              </div>

              <div className="flex justify-center">
                <button
                  className="bg-primary-700 hover:bg-primary-900 text-white p-4 rounded-md px-6 py-2.5 mt-6 self-center"
                  onClick={() => updateProduct()}
                >
                  Submit
                </button>
              </div>
            </div>

            <div className="flex flex-col">
              <div>
                <label>Upload image</label>
                <Input
                  type="file"
                  accept="image/*"
                  required={true}
                  onChange={(e) => changeImage(e)}
                />
              </div>

              <div>
                {state.imagePreview && (
                  <div className="mt-20">
                    <Image
                      width={200}
                      height={200}
                      id="imagePreview"
                      src={state.imagePreview}
                      alt="image_preview"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}

UpdateProduct.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;

export default UpdateProduct;
