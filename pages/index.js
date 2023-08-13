import HomeCarousel from "@/components/Carousel/carousel";
import ProductCard from "@/components/Product/ProductCard";
import DataContext from "@/context/DataContext";
import CustomerLayout from "@/layouts/CustomerLayout";
import "react-alice-carousel/lib/alice-carousel.css";
import { useContext, useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import SpinTip from "@/components/loading/SpinTip";
import { toast } from "react-toastify";
import { API_URL } from "@/config";
const style = {
  background: "#0092ff",
  padding: "8px 0",
};
function Home(props) {
  const [listProduct, setListProduct] = useState(null);

  const [loading, setLoading] = useState(false);

  const responsive = {
    0: { items: 1 },
    568: { items: 3 },
    1024: { items: 5 },
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      const response = await fetch(`${API_URL}/products/active`, {
        method: "GET",
      });

      const data = await response.json();

      console.log("Ds products  " + JSON.stringify(data));

      if (!response.ok) {
        toast.error(data.message);
      } else {
        setListProduct(data);
      }
      setLoading(false);
    })();
  }, []);

  const [activeIndex, setActiveIndex] = useState(0);

  const syncActiveIndex = ({ e }) => {
    setActiveIndex(e);
  };

  const items =
    listProduct &&
    listProduct.map((product) => (
      <ProductCard key={product.id} productDetails={product} />
    ));

  return (
    <div>
      <HomeCarousel />

      <div className="w-full mt-10 relative p-10">
        <h2 className=" text-2xl text-center mb-10 font-semibold opacity-80">
          Products
        </h2>

        {loading ? (
          <SpinTip />
        ) : (
          <div className="bg-gray-900">
            {items && (
              <div className="p-2 bg-black text-white flex flex-row justify-center items-center">
                <AliceCarousel
                  items={items}
                  responsive={responsive}
                  controlsStrategy="alternate"
                  disableButtonsControls
                  disableDotsControls
                  infinite
                  activeIndex={activeIndex}
                  onSlideChanged={syncActiveIndex}
                />
                {activeIndex < items.length - 5 && (
                  <div className="px-1 py-2.5 bg-primary-100 text-black absolute hover:bg-primary-400 hover:text-white top-[16rem] right-6 hover:cursor-pointer">
                    <KeyboardArrowRightIcon
                      onClick={() => setActiveIndex(activeIndex + 1)}
                    />
                  </div>
                )}
                {activeIndex > 0 && (
                  <div className="px-1 py-2.5 bg-primary-100 text-black absolute hover:bg-primary-400 hover:text-white top-[16rem] left-6 hover:cursor-pointer">
                    <KeyboardArrowLeftIcon
                      onClick={() => setActiveIndex(activeIndex - 1)}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

Home.getLayout = (page) => <CustomerLayout>{page}</CustomerLayout>;

export default Home;
