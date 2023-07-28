import { API_URL, NEXT_API } from "@/config";
import { createContext, useEffect, useState } from "react";

const DataContext = createContext();

export function DataProvider({ children }) {
  const [state, setState] = useState({
    listCates: [],
    listBrands: [],
    listProds: [],
    isLoading: false,
  });
  const [error, setError] = useState("");

  useEffect(() => {
    getBrands();
  }, []);

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    console.log("Da vao get products");
    setState((prevState) => ({ ...prevState, isLoading: true }));
    const response = await fetch(`${NEXT_API}/api/products`, {
      method: "GET",
    });

    const data = await response.json();

    console.log("Ds products  " + JSON.stringify(data));

    if (!response.ok) {
      setError(data.message);
    } else {
      updateProducts(data.products); // default return object json with categories prop
      return data.products;
    }
    setState((prevState) => ({ ...prevState, isLoading: false }));
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
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export const getProductDetail = async () => {
  const postRes = await fetch(`http://192.168.1.113:3000/products/5`, {
    method: "GET",
  });

  const resDel = await postRes.json();

  if (!postRes.ok) {
    res.status(500).json({ message: resDel.message });
  } else {
    return resDel;
  }
};
export const getAllProduct = async () => {
  const resGet = await fetch(`${API_URL}/products`, {
    method: "GET",
  });

  const dataPos = await resGet.json();

  if (!resGet.ok) {
    console.log("Loi la ", JSON.stringify(dataPos));
  } else {
    return dataPos;
  }
};

export default DataContext;
