import "../styles/globals.css";
import "../styles/banner.css";
import type { AppProps } from "next/app";
import { TodoProvider } from "../lib/Context";
import { ChildrenInterface } from "../types/Children";
import { AnimatePresence, AnimateSharedLayout } from "framer-motion";
import { Poppins } from "@next/font/google";

const poppins = Poppins({
  weight: "400",
  subsets: ["latin"],
  preload: true,
  fallback: ["hai"],
});
export default function App({ Component, pageProps }: AppProps) {
  const Layout =
    //@ts-ignored
    Component.layout || (({ children }: ChildrenInterface) => <>{children}</>);
  return (
    <TodoProvider>
      <AnimatePresence>
        <AnimateSharedLayout>
          <main className={poppins.className}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </main>
        </AnimateSharedLayout>
      </AnimatePresence>
    </TodoProvider>
  );
}
