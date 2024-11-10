import { Outlet, Link } from "react-router-dom";
import Navbar from "../components/navbar";
import ShopNavbar from "../components/ShopNavbar";
import Footer from "../components/footer";

export default function Layout(){
  return (
    <>
      <ShopNavbar />

      <Outlet />

      <Footer/>
    </>
  )
};