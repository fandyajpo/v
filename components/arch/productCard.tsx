import Link from "next/link";
import ProductImage from "./image";
import { useCallback, useContext, useMemo } from "react";
import { Wishlist, NotWishlist } from "../../public/assets";
import { GlobalContext } from "../../lib/Context";

interface Props {
  product: any;
}

const ProductCard = (props: Props) => {
  const { product } = useMemo(() => props, [props]);

  const { state, dispatch } = useContext(GlobalContext);
  const { wishlist } = useMemo(() => state, [state.wishlist]);

  const storeWishlish = useCallback(
    (a: any) => () => {
      const concating = wishlist.concat(a);
      dispatch({
        type: "SET_WISHLIST",
        payload: {
          //@ts-ignored
          wishlist: concating,
        },
      });
    },
    [wishlist]
  );

  const itemChecker = useCallback(
    (a: any) => {
      //@ts-ignored
      return wishlist.find((item) => item?.id === a);
    },
    [wishlist]
  );

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
    <div className="border border-r-4 p-2 rounded-xl border-gray-300 md:hover:scale-95 active:scale-95 duration-200  z-10 bg-white w-36 md:w-44 h-64 md:h-72 relative  flex-none">
      <Link
        href={{
          pathname: "/detail",
          query: {
            id: product.id,
          },
        }}
        className="buttonEffect group  rounded-xl overflow-hidden   group-hover:border-black"
      >
        <ProductImage image={product?.image} />
        <div className="p-2">
          <p>{product?.name}</p>
          <p className="text-md font-bold">$ {product?.price}</p>
        </div>
      </Link>
      {itemChecker(product?.id) ? (
        <button
          onClick={remove(product.id)}
          className="absolute right-2 bottom-2"
        >
          <Wishlist />
        </button>
      ) : (
        <button
          onClick={storeWishlish(product)}
          className="absolute right-2 bottom-2"
        >
          <NotWishlist />
        </button>
      )}
    </div>
  );
};

export default ProductCard;
