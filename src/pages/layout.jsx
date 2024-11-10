import { Outlet, Link } from "react-router-dom";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

export default function Layout(){
  return (
    <>
      <Navbar />

      <Outlet />

      <Footer/>
    </>
  )
};