import HomeCarousel from "@/components/Carousel/carousel";
import ProductCard from "@/components/Product/ProductCard";
import DataContext from "@/context/DataContext";
import CustomerLayout from "@/layouts/CustomerLayout";
import "react-alice-carousel/lib/alice-carousel.css";
import { useContext, useEffect, useState } from "react";
import SpinTip from "@/components/loading/SpinTip";
import { toast } from "react-toastify";
import { API_URL } from "@/config";
import Slider from "react-slick";

const style = {
  background: "#0092ff",
  padding: "8px 0",
};
function Home(props) {
  const [bestSeller, setBestSeller] = useState(null);

  const { listProds } = useContext(DataContext);

  const [loading, setLoading] = useState(false);

  const responsive = {
    0: { items: 1 },
    568: { items: 3 },
    1024: { items: 5 },
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      const response = await fetch(`${API_URL}/products/best-seller`, {
        method: "GET",
      });

      const data = await response.json();

      console.log("Ds products seller  " + JSON.stringify(data));

      if (!response.ok) {
        toast.error(data.message);
      } else {
        setBestSeller(data);
      }
      setLoading(false);
    })();
  }, []);

  const [activeIndex, setActiveIndex] = useState(0);

  const syncActiveIndex = ({ e }) => {
    setActiveIndex(e);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
  };

  return (
    <div>
      <HomeCarousel />

      <div className="w-full relative p-10">
        <h2 className=" text-2xl mb-10 font-semibold opacity-80">Products</h2>

        {loading ? (
          <SpinTip />
        ) : (
          <div className="">
            {listProds && (
              <div className="bg-primary-200 p-8">
                <Slider {...settings}>
                  {listProds.map((product) => (
                    <ProductCard key={product.id} productDetails={product} />
                  ))}
                </Slider>
              </div>
            )}
          </div>
        )}
        <h2 className=" text-2xl mb-10 font-semibold opacity-80 mt-12">
          Best seller
        </h2>

        <div className="bg-primary-200 p-8">
          <Slider {...settings}>
            {loading ? (
              <SpinTip />
            ) : bestSeller ? (
              bestSeller.map((product) => (
                <ProductCard key={product.id} productDetails={product} />
              ))
            ) : (
              ""
            )}
          </Slider>
        </div>
      </div>
    </div>
  );
}

Home.getLayout = (page) => <CustomerLayout>{page}</CustomerLayout>;

export default Home;
