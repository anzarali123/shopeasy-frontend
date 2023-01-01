import { useEffect } from "react";
import { Slider } from "../../components";
import { Product } from "../../components/index";

const Home = () => {
  const url = window.location.href;

  useEffect(() => {
    const scrollToProducts = () => {
      if (url.includes("#products")) {
        window.scrollTo({
          top: 700,
          behavior: "smooth",
        });
      }
      return;
    };
    scrollToProducts();
  }, [url]);

  return (
    <>
      <Slider />
      <Product />
    </>
  );
};

export default Home;
