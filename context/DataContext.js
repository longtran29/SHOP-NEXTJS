import { NEXT_API } from "@/config";
import { createContext, useEffect, useState } from "react";

const DataContext = createContext();

export function DataProvider({ children }) {
  const [state, setState] = useState({
    listCates: [],
    listBrands: [],
    listProds: []
  });
  const [error, setError] = useState("");

  console.log("Value in context cate " + JSON.stringify(state.listCates));
  console.log("Value in context brand " + JSON.stringify(state.listBrands));
  console.log("Value in context prods " + JSON.stringify(state.listProds));

  useEffect(() => {
    getBrands();
  }, []);

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(()=> {
    getProducts();
  }, []
  )


  const getProducts = async() => {
    console.log("context products");
    const response = await fetch(`${NEXT_API}/api/products`, {
      method: "GET",
    });

    const data = await response.json();

    if (!response.ok) {
      console.log("Looi " + JSON.stringify(data));
      setError(data.message);
    } else {
      console.log("ds prods context " + JSON.stringify(data));
      updateProducts(data.products);    // default return object json with categories prop
    }
  
   
  };

  const getBrands = async () => {
    console.log("context brand");
    const response = await fetch(`${NEXT_API}/api/brands`, {
      method: "GET",
    });

    const data = await response.json();

    if (!response.ok) {
      console.log("Looi " + JSON.stringify(data));
      setError(data.message);
    } else {
      updateBrands(data.brands);
    }
  
  };

  const updateBrands = (updatedBrands) => {
    setState((prevState) => ({ ...prevState, listBrands: updatedBrands })); //  updating the state based on the most recent state values - function-based
  };

  const updateCategories = (updatedCates) => {
    setState((prevState) => ({ ...prevState, listCates: updatedCates })); //  updating the state based on the most recent state values - function-based
  };

  const updateProducts = (updatedProds) => {
    setState((prevState) => ({...prevState, listProds: updatedProds}))   
  }

  const getCategories = async () => {
    const response = await fetch(`${NEXT_API}/api/categories`, {
      method: "GET",
    });

    const data = await response.json();

    if (!response.ok) {
      return data.message;
    } else {
      updateCategories(data.categories);
    }
  };

  const value = {
    listCates: state.listCates,
    updateCategories,
    listBrands: state.listBrands,
    updateBrands,
    error: error,
    listProds: state.listProds,
    updateProducts
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export default DataContext;
