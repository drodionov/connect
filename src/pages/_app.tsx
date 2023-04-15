import '@/styles/globals.css'
import type {AppProps} from 'next/app'
import Layout from "@/components/Layout";
import LoginModal from "@/components/modals/LoginModal";
import RegisterModal from "@/components/modals/RegisterModal";

const App = ({Component, pageProps}: AppProps) => (
    <>
      <RegisterModal/>
      <LoginModal/>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
);

export default App;

