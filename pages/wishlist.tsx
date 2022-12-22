import Layout from "../components/layout";
import Screen from "../components/arch/screen";
import { useContext, useEffect, useMemo, useCallback } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { GlobalContext } from "../lib/Context";
const Search = () => {
  const { state, dispatch } = useContext(GlobalContext);

  const router = useRouter();

  const { wishlist } = useMemo(() => state, [state.wishlist]);

  const remove = useCallback(
    (a: any) => () => {
      //@ts-ignored
      const filteredArray = wishlist.filter((item) => item.id !== a);

      dispatch({
        type: "SET_WISHLIST",
        payload: {
          //@ts-ignored
          wishlist: filteredArray,
        },
      });
    },
    [wishlist]
  );

  return (
    <div className={`flex flex-col justify-center py-24 bg-white h-max`}>
      <Screen>
        <div className="md:max-w-2xl lg:max-w-7xl w-full h-auto flex flex-col md:flex-row grow flex-shrink-0 gap-4 bg-white">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 grid-flow-row gap-4 w-full p-2 md:p-0">
            {wishlist?.length > 0 ? (
              wishlist?.map((d: any) => {
                return (
                  <div className="p-2 border border-r-4 rounded-xl w-full ">
                    <Link
                      href={{
                        pathname: "/detail",
                        query: {
                          id: d.id,
                        },
                      }}
                      className="group full rounded-xl w-36 h-64 md:h-72"
                    >
                      <Image
                        src={d.image}
                        alt="any"
                        width={100}
                        height={100}
                        className="h-36 w-36 group-hover:scale-95 duration-300 border rounded-xl border-gray-300 active:scale-100"
                      />
                      <div className="p-2">
                        <p>{d?.name}</p>
                      </div>
                    </Link>
                    <div className="flex items-center w-full justify-between mt-2">
                      <p className="text-md font-bold">$ {d?.price}</p>
                      <button
                        onClick={remove(d?.id)}
                        className=" text-xs text-red-500 py-2"
                      >
                        Remove wishlist
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="flex justify-center items-center w-full">
                <p className="text-3xl font-bold">
                  You dont have any wishlist item
                </p>
              </div>
            )}
          </div>
        </div>
      </Screen>
    </div>
  );
};

Search.layout = Layout;
export default Search;
