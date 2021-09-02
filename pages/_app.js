// import App from 'next/app'
import Router from "next/router";
import NProgress from "nprogress";
import { wrapper } from "../store/store";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/global.css";
import "../styles/nprogress.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCallback, useEffect } from "react";
import { verifyUser } from "../store/actions/userActions";
import { useDispatch, useSelector } from "react-redux";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(verifyUser());
    setInterval(() => {
      dispatch(verifyUser());
    }, 5 * 60 * 1000);
  }, []);

  return (
    <>
      <Component {...pageProps} />
      <ToastContainer />
    </>
  );
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

export default wrapper.withRedux(MyApp);
