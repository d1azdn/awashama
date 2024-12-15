import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function SidebarList(props){
    const location = useLocation()
    const pathIsTrue = location.pathname == props.href
    
    return(
        <>
        <section className="product-manage grid grid-cols-1 mb-4">
            <a href={props.href} className={`p-4 rounded-xl duration-200 ${pathIsTrue?'bg-awashama-lightgray':'hover:bg-awashama-toolightgray hover:shadow-md'}`}>{props.text}</a>
        </section>
        </>
    )

}

export default function Sidebar(){
    const [userInfo, setUserInfo] = useState([])
    const navigate = useNavigate();

    useEffect(()=>{
        const cekLogin = async () =>{
            const response = await fetch(import.meta.env.VITE_API_URL + '/cekrole',{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials : "include"
            })
            const checkAdmin = await response.json()
            if (checkAdmin?.role != 'admin'){
                navigate('/')
                return
            }
            setUserInfo(checkAdmin)
        }

        cekLogin()
    },[])

    return(
        <>
        <nav className="p-8 grid grid-cols-1">
            <section className="admin-info">
                <h1 className="font-semibold text-xl">Admin</h1>
                <h1 className="text-xl">Saldo Rp.3000</h1>
            </section>
            <div className="splitter border border-solid my-6"></div>
            <SidebarList href="/dashboard/produk" text="Produk"/>
            <SidebarList href="/dashboard/checkout" text="Checkout"/>
            <SidebarList href="/dashboard/artikel" text="Artikel"/>
        </nav>
        </>
    )
}