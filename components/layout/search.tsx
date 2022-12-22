import { Transition } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import {
  useDeferredValue,
  SetStateAction,
  useRef,
  useMemo,
  useCallback,
  useState,
  useEffect,
  useContext,
} from "react";
import { useRouter } from "next/router";
import { BackButton } from "../../public/assets";
import { GlobalContext } from "../../lib/Context";

interface Props {
  search: boolean;
  setSearch: SetStateAction<any>;
}

const Modal = (props: Props) => {
  const router = useRouter();
  const inputRef = useRef<any>();
  const { state, dispatch } = useContext(GlobalContext);

  const { searchHistory } = useMemo(() => state, [state.searchHistory]);
  const { search, setSearch } = useMemo(() => props, [props]);
  const [qData, setQData] = useState<any>([]);
  const getSearch = useCallback(() => {
    setSearch(false);
  }, [search]);

  const onAnimationEnd = useCallback(() => inputRef.current.focus(), []);

  // &q=${value}
  const queryMaster = useCallback(
    async (e: any) => {
      const getter = await fetch(`/api/query?q=${e.target.value || null}`);
      const data = await getter.json();
      return setQData(data?.data);
    },
    [router.query]
  );

  const onSubmit = useCallback(
    async (event: any) => {
      console.log(searchHistory);
      event.preventDefault();

      if (searchHistory.length < 1) {
        return dispatch({
          type: "SET_HISTORY",
          //@ts-ignored
          payload: { searchHistory: [`${inputRef?.current?.value}`] },
        });
      } else {
        const updateState = searchHistory.concat(
          //@ts-ignored
          `${inputRef?.current?.value}`
        );

        Promise.all([
          dispatch({
            type: "SET_HISTORY",
            //@ts-ignored
            payload: { searchHistory: updateState },
          }),
          getSearch(),
          router.push({
            pathname: "search",
            query: `q=${inputRef.current.value}`,
          }),
        ]);
      }
    },
    [inputRef, searchHistory]
  );

  const RemoveRecent = useCallback(
    (indexes: any) => () => {
      const value = searchHistory;

      delete value[indexes];

      dispatch({
        type: "SET_HISTORY",
        //@ts-ignored
        payload: {
          searchHistory: value,
        },
      });
    },
    [searchHistory]
  );

  useEffect(() => {
    if (search === true) {
      setTimeout(() => {
        inputRef.current.focus();
      }, 100);
    }
  }, [search]);

  return (
    <Transition
      className={`fixed bg-white z-40 inset-0`}
      show={search}
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
      enter="transition duration-100"
      enterFrom="transform opacity-0"
      enterTo="transform opacity-100"
      leave="transition duration-200"
      leaveFrom="transform opacity-100"
      leaveTo="transform opacity-0"
    >
      <div className="flex bg-white z-30 md:bg-transparent justify-center">
        <button
          onClick={getSearch}
          className="buttonEffect hidden md:block bg-black/40  w-screen h-screen fixed cursor-default"
        />
        <Transition
          className="relative inline-block align-bottom rounded-lg text-left overflow-hidden transform transition-all p-3 md:px-0 md:py-4 sm:align-middle w-full md:max-w-2xl lg:max-w-7xl"
          show={search}
          role="dialog"
          aria-modal="true"
          enter="transition ease-out"
          enterFrom="transform opacity-0 scale-50"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-100"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <div className="bg-transparent w-full md:h-auto h-screen">
            <div className="flex flex-row items-center w-full relative">
              <button
                onClick={getSearch}
                className="buttonEffect h-6 w-6 md:hidden"
              >
                <BackButton />
              </button>

              <form
                className="md:h-12 pr-3 outline-none w-11/12 md:w-full flex"
                onSubmit={onSubmit}
              >
                <input
                  onChange={queryMaster}
                  onAnimationEnd={onAnimationEnd}
                  ref={inputRef}
                  className="rounded-2xl h-10 md:h-12 pr-4 outline-none bg-white w-11/12 md:w-full mx-2 border-green-500 border-2 px-4 text-xs"
                  placeholder="Cari di Fanvercel"
                />
                <input
                  type={"submit"}
                  value={"Search"}
                  className="bg-green-500 px-4 rounded-xl text-white "
                />
              </form>
            </div>
            <div className="bg-white mt-2 rounded-xl md:mx-2 p-2">
              {qData.length > 0 ? (
                <div className="py-2">Search Result</div>
              ) : null}
              <div className="gap-y-2 flex flex-col">
                {qData.length > 0 &&
                  qData?.map((s: any, i: any) => (
                    <Link
                      key={i}
                      onClick={getSearch}
                      href={{
                        pathname: "/detail",
                        query: {
                          id: s?.id,
                        },
                      }}
                      className="flex flex-row items-center gap-x-4 border rounded-xl overflow-hidden border-gray-500 duration-300 hover:bg-gray-200"
                    >
                      <Image
                        alt="Image"
                        src={s?.image}
                        width={100}
                        height={100}
                        className="w-14 h-14"
                      />
                      <p>{s.name}</p>
                    </Link>
                  ))}
              </div>
              <div className="py-2">Recently search</div>
              {searchHistory.length > 0 &&
                searchHistory.map((a, l) => {
                  return (
                    <div
                      key={l}
                      className="flex items-center justify-between px-4 border-b mb-2"
                    >
                      <p className="py-1">{a}</p>
                      <button
                        className="text-gray-400"
                        onClick={RemoveRecent(l)}
                      >
                        clear
                      </button>
                    </div>
                  );
                })}
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  );
};

export default Modal;
