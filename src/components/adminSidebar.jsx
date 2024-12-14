import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Sidebar(){
    const [userInfo, setUserInfo] = useState([])
    const [loginPopup, setLoginPopup] = useState(false)
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
            <section className="product-manage grid grid-cols-1 gap-1 mb-8">
                <a href="/dashboard/produk" className="p-2 hover:bg-awashama-toolightgray rounded-xl">Produk</a>
            </section>
            <section className="checkout-manage grid grid-cols-1 gap-1 mb-8">
                <a href="/dashboard/checkout" className="p-2 hover:bg-awashama-toolightgray rounded-xl">Barang Checkout</a>
            </section>
            <section className="article-manage grid grid-cols-1 gap-1 mb-8">
                <a href="/dashboard/artikel" className="p-2 hover:bg-awashama-toolightgray rounded-xl">Artikel</a>
            </section>
        </nav>
        </>
    )
}