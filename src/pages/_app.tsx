import '@/styles/globals.css'
import type {AppProps} from 'next/app'
import Layout from "@/components/Layout";
import LoginModal from "@/components/modals/LoginModal";
import RegisterModal from "@/components/modals/RegisterModal";
import {SessionProvider} from "next-auth/react";
import {Toaster} from "react-hot-toast";

const App = ({Component, pageProps}: AppProps) => (
    <SessionProvider session={pageProps.session}>
      <Toaster/>
      <RegisterModal/>
      <LoginModal/>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
);

export default App;

