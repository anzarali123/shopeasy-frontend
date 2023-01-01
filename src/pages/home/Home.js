import { useEffect } from "react";
import { Slider } from "../../components";
import { AdminOnlyRoute, Product } from "../../components/index";

const Home = () => {
  const url = window.location.href;

  useEffect(() => {
    scrollToProducts();
  }, []);

  const scrollToProducts = () => {
    if (url.includes("#products")) {
      window.scrollTo({
        top: 700,
        behavior: "smooth",
      });
    }
    return;
  };
  return (
    <>
      <Slider />
      <Product />
    </>
  );
};

export default Home;
