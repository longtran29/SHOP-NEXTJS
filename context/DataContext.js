import { NEXT_API } from "@/config";
import { createContext, useEffect, useState } from "react";

const DataContext = createContext();

export function DataProvider({ children }) {
  const [data, setData] = useState({
    listCates: [],
  });

  useEffect(() => {
    console.log("Trong effect data context");
    getCategories();
  }, []);

  const updateCategories = (updatedCates) => {
    // create own method to update state => change for other componets (alternative: dispatch)
    console.log("Da vao update Cates");
    setData({ ...data, listCates: updatedCates });
  };

  const getCategories = async () => {
    await fetch(`${NEXT_API}/api/categories`, {
      method: "GET",
    })
      .then((res) => {
        if (!res.ok) throw res;
        else return res.json();
      })
      .then((data) =>{
        console.log("Data cates " + JSON.stringify(data) );
        setData({ ...data, listCates: data.categories })
      })
      .catch((err) => {
        throw new Error("Lỗi lấy danh sách danh mục");
      });
  };

  const value = {
    listCates: data.listCates,
    updateCategories: updateCategories,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export default DataContext;
