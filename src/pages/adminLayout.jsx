import { Outlet, Link } from "react-router-dom";
import Sidebar from "../components/adminSidebar";
import Navbar from "../components/navbar";

export default function AdminLayout(){
  return (
    <>

    <Navbar/>
    <section className="grid grid-cols-5">
        <div className="col-span-1">
            <Sidebar />
        </div>
        <div className="col-span-4">
            <Outlet />
        </div>
    </section>
    </>
  )
};