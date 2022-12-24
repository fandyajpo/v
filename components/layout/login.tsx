import NextJS from "../../public/next.svg";
import Image from "next/image";
import { useCallback, useContext } from "react";
import { GlobalContext } from "../../lib/Context";
const Login = () => {
  const { dispatch } = useContext(GlobalContext);

  const loginSetter = useCallback(() => {
    //@ts-ignored
    dispatch({ type: "ISLOGIN", payload: true });
  }, []);

  return (
    <div className="bg-white w-full h-screen absolute z-50 flex flex-col items-center justify-center p-2">
      <div className="flex flex-col gap-y-4">
        <p className="text-xl font-bold">
          Fanvercel love NEXTJS!, no <span className="text-blue-500">php</span>{" "}
          needed!
        </p>
        <Image alt="nextjs" src={NextJS} />
        <div className="flex flex-col gap-y-4 items-center">
          <input
            className="p-3 w-full border border-gray-300 rounded-xl"
            placeholder="Just punch the login button..."
          />
          <input
            className="p-3 w-full border border-gray-300 rounded-xl"
            placeholder="Just punch the login button..."
          />
          <button
            onClick={loginSetter}
            className="w-full bg-black p-3 text-white rounded-xl font-bold"
          >
            Login to NEXTJS
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
