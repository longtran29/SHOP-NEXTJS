import { API_URL, NEXT_API } from "@/config";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const DataContext = createContext();

export function DataProvider({ children }) {
  const [state, setState] = useState({
    listCates: null,
    listBrands: null,
    listProds: [],
    productAdmin: [],
    isLoading: false,
  });
  const [error, setError] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  const [allUser, setAllUser] = useState([]);
  const [productDetail, setProductDetail] = useState(null);

  const [searchOrderValue, setSearchOrderValue] = useState("");

  console.log("Value search order " , searchOrderValue);

  useEffect(() => {
    console.log("Da goi trong useEffect get brand");
    getBrands();
  }, []);

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    getProducts();
  }, []);

  const getProductDetail = async (prodId) => {
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
      // setFoundedProd(dataGet.productDetail);
      setProductDetail(dataGet.productDetail);
    }
  };

  const getProducts = async () => {
    setState((prevState) => ({ ...prevState, isLoading: true }));
    const response = await fetch(`${NEXT_API}/api/products`, {
      method: "GET",
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.message);
    } else {
      updateProducts(data.products); // default return object json with categories prop
      return data.products;
    }
    setState((prevState) => ({ ...prevState, isLoading: false }));
  };

  const getProductAdmin = async () => {
    setState((prevState) => ({ ...prevState, isLoading: true }));
    const response = await fetch(`${NEXT_API}/api/products?action=get_product_admin`, {
      method: "GET",
    });

    const data = await response.json();

    if (!response.ok) {
      // setError(data.message);
      toast.error("Lỗi lấy danh sách sản phẩm admin");
    } else {
      // updateProducts(data.products); // default return object json with categories prop
      // return data.products;
      setState((prevState) => ({ ...prevState, isLoading: false, productAdmin: data.products }));
    }
  };

  const getBrands = async () => {
    setState((prevState) => ({ ...prevState, isLoading: true }));
    const response = await fetch(`${NEXT_API}/api/brands`, {
      method: "GET",
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.message);
    } else {
      console.log("Brand context ", JSON.stringify(data.brands));
      updateBrands(data.brands);
    }
    setState((prevState) => ({ ...prevState, isLoading: false }));
  };

  const updateBrands = (updatedBrands) => {
    setState((prevState) => ({ ...prevState, listBrands: updatedBrands })); //  updating the state based on the most recent state values - function-based
  };

  const updateCategories = (updatedCates) => {
    setState((prevState) => ({ ...prevState, listCates: updatedCates })); //  updating the state based on the most recent state values - function-based
  };

  const updateProducts = (updatedProds) => {
    setState((prevState) => ({ ...prevState, listProds: updatedProds }));
  };

  const getCategories = async () => {
    setState((prevState) => ({ ...prevState, isLoading: true }));
    const response = await fetch(`${NEXT_API}/api/categories`, {
      method: "GET",
    });

    const data = await response.json();

    if (!response.ok) {
      return data.message;
    } else {
      updateCategories(data.categories);
    }
    setState((prevState) => ({ ...prevState, isLoading: false }));
  };

  const getUserInformation = async () => {
    setState({ ...state, isLoading: true });
    const response = await fetch(`${NEXT_API}/api/user`, {
      method: "GET",
    });

    const data = await response.json();

    if (!response.ok) {
      return data.message;
    } else {
      console.log("User order are", JSON.stringify(data.user));
      setUserInfo(data.user);
    }
    setState((prevState) => ({ ...prevState, isLoading: false }));
  };

  const addNewAddress = async (payload) => {
    setState({ ...state, isLoading: true });
    const response = await fetch(`${NEXT_API}/api/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      return data.message;
    } else {
      console.log("User info is " + JSON.stringify(data));
      setUserInfo(data.user);
    }
    setState((prevState) => ({ ...prevState, isLoading: false }));
  };

  const value = {
    listCates: state.listCates,
    updateCategories,
    listBrands: state.listBrands,
    updateBrands,
    error: error,
    listProds: state.listProds,
    updateProducts,
    isLoading: state.isLoading,
    getCategories,
    getBrands,
    getProducts,
    addNewAddress,
    userInfo: userInfo,
    getUserInformation,
    
    allUser: allUser,
    setAllUser,
    productDetail,
    getProductDetail,
    adminProducts: state.productAdmin,
    getProductAdmin,
    setSearchOrderValue,
    searchOrderValue : searchOrderValue,


  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export default DataContext;
