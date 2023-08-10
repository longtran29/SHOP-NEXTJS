import HomeCarousel from "@/components/Carousel/carousel";
import ProductCard from "@/components/Product/ProductCard";
import DataContext from "@/context/DataContext";
import CustomerLayout from "@/layouts/CustomerLayout";
import "react-alice-carousel/lib/alice-carousel.css";
import { useContext, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import SpinTip from "@/components/loading/SpinTip";
const style = {
  background: "#0092ff",
  padding: "8px 0",
};
function Home(props) {
  const { listProds, isLoading } = useContext(DataContext);

  const responsive = {
    0: { items: 1 },
    568: { items: 2},
    1024: { items: 4},
  };

  const [activeIndex, setActiveIndex] = useState(0);

  const syncActiveIndex = ({ e }) => {
    setActiveIndex(e);
  };

  const items = listProds.map((product) => (
    <ProductCard
      key={product.id}
      productDetails={product}
    />
  ));

  return (
    <div>
      <HomeCarousel />

      <div className="w-full mt-10 relative p-10">
        <h2 className="text-center mb-10 font-semibold opacity-80">Products</h2>

        <div className="p-2 bg-white flex flex-row justify-center items-center border border-2 border-gray-100">
          {!isLoading ? (
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
          ) : (
            <SpinTip />
          )}
        </div>
        {activeIndex < items.length - 4 && (
          <div className="px-1 py-2.5 bg-primary-100 text-black absolute  top-[12rem] right-6 hover:cursor-pointer">
            <KeyboardArrowRightIcon
              onClick={() => setActiveIndex(activeIndex + 1)}
            />
          </div>
        )}
        {activeIndex > 0 && (
          <div className="px-1 py-2.5 bg-primary-100 text-black absolute  top-[12rem] left-6 hover:cursor-pointer">
            <KeyboardArrowLeftIcon
              onClick={() => setActiveIndex(activeIndex - 1)}
            />
          </div>
        )}
      </div>
    </div>
  );
}

Home.getLayout = (page) => <CustomerLayout>{page}</CustomerLayout>;

export default Home;
