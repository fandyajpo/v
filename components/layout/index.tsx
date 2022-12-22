import Navbar from "./navbar";
import Header from "./header";
import { ChildrenInterface } from "../../types/Children";
import BottomTab from "../m/bottomTab";
import { useRouter } from "next/router";
import { useMemo } from "react";
import ProductTab from "../m/productTab";
import { useContext, useEffect } from "react";
import { GlobalContext } from "../../lib/Context";
import Footer from "./footer";
const Layout = ({ children }: ChildrenInterface) => {
  const { state, dispatch } = useContext(GlobalContext);

  useEffect(() => {
    async function Getter() {
      console.log("fetch again");
      const fetcher = await fetch("/api/hello");
      const data = await fetcher.json();
      return dispatch({
        type: "SET_PRODUCT",
        //@ts-ignored
        payload: { product: data.shoes },
      });
    }
    if (state?.product.length < 1) {
      Getter();
    }
  }, []);

  const router = useRouter();

  const RouterManager = useMemo(() => {
    if (router.pathname.includes("/detail")) return <ProductTab />;
    if (
      router.pathname === "/" ||
      router.pathname === "/feed" ||
      router.pathname === "/wishlist" ||
      router.pathname === "/transaction"
    ) {
      return <BottomTab />;
    }
    return null;
  }, [router]);

  return (
    <>
      <Navbar />
      <div className="flex justify-center bg-white w-full h-full">
        {children}
      </div>
      <Footer />
      {RouterManager}
    </>
  );
};

export default Layout;
