import { HomeWishlist, Transaction, Feed, Home } from "../../public/assets";
import { useCallback, useMemo } from "react";
import { useRouter } from "next/router";

const BottomTab = () => {
  const router = useRouter();

  const goToHome = useCallback(() => {
    return router.push("/");
  }, []);
  const goToFeed = useCallback(() => {
    return router.push("/feed");
  }, []);
  const goToWishlist = useCallback(() => {
    return router.push("/wishlist");
  }, []);
  const goTotransaction = useCallback(() => {
    return router.push("/transaction");
  }, []);

  return (
    <div
      className={`flex bg-white/30 backdrop-blur-md shadow-md fixed bottom-0 z-10 justify-center w-full items-center h-fit md:block lg:hidden border-t`}
    >
      {useMemo(() => {
        return (
          <div className="flex justify-center items-center w-full">
            <div className="md:max-w-2xl lg:max-w-7xl h-16 w-full flex  items-center justify-between shadow-sm gap-x-4 px-6 ">
              <button
                onClick={goToHome}
                className={`buttonEffect flex flex-col items-center active:scale-90 duration-300 ${
                  router.pathname === "/" ? "text-green-500" : "text-slate-700"
                }`}
              >
                <Home />
                <p className="text-[10px]">Home</p>
              </button>
              <button
                onClick={goToFeed}
                className={`buttonEffect flex flex-col items-center active:scale-90 duration-300 ${
                  router.pathname === "/feed"
                    ? "text-green-500"
                    : "text-slate-700"
                }`}
              >
                <Feed />
                <p className="text-[10px]">Feed</p>
              </button>
              <button
                onClick={goToWishlist}
                className={`buttonEffect flex flex-col items-center active:scale-90 duration-300 ${
                  router.pathname === "/wishlist"
                    ? "text-green-500"
                    : "text-slate-700"
                }`}
              >
                <HomeWishlist
                  color={
                    router.pathname === "/wishlist"
                      ? "rgb(34, 197, 94)"
                      : "rgb(55, 65, 81)"
                  }
                />
                <p className="text-[10px]">Wishlist</p>
              </button>
              <button
                onClick={goTotransaction}
                className={`buttonEffect flex flex-col items-center active:scale-90 duration-300 ${
                  router.pathname === "/transaction"
                    ? "text-green-500"
                    : "text-slate-700"
                }`}
              >
                <Transaction />
                <p className="text-[10px]">Transaction</p>
              </button>
            </div>
          </div>
        );
      }, [router])}
    </div>
  );
};

export default BottomTab;
