import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export function ListNavbar(props){
    const location = useLocation()
    const pathIsTrue = location.pathname == props.href
    return(
        <>
        <li>
            <a href={props.href} 
            className={`text-awashama-white tracking-wide duration-200 ${pathIsTrue ? 'font-bold' : 'hover:text-awashama-lightgray'}`}>{props.text}</a>
        </li>
        </>
    )
}

export default function Navbar(){

    const [role, setRole] = useState("")
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
            setRole(await response.text())
        }

        cekLogin()
    },[])

    const handleLogout = async (e)=>{
        const response = await fetch(import.meta.env.VITE_API_URL + '/logout', {
            method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                },
            credentials : "include"
        })
        setLoginPopup(!loginPopup)
        setRole('guest')
        navigate("/")
    }
    return(
        <>
        <nav className="flex justify-between py-5 px-16 items-center bg-awashama-lightgreen">
            <ul>
                <li>
                    <a href="/">
                    <img src="/src/assets/logo-white.png" alt="..." width={150}/>
                    </a>
                </li>
                
            </ul>
            <ul className="flex gap-10 items-center justify-end">
                <ListNavbar text="Beranda" href="/"/>
                <ListNavbar text="Tentang" href="/tentang"/>
                <ListNavbar text="Artikel" href="/artikel"/>
                <ListNavbar text="Toko" href="/toko"/>
                
                { role == "admin" ? 
                (
                <>
                <button className="bg-awashama-yellow py-2 px-5 rounded-md font-semibold hover:scale-105 duration-200" onClick={()=>setLoginPopup(!loginPopup)}>Halo user</button>
                <div className={`mt-28 fixed flex flex-col shadow-md ${loginPopup?'':'hidden'}`}>
                    <button className="bg-awashama-white hover:bg-awashama-lightgray ps-14 pe-6 py-3" onClick={()=>navigate("/dashboard/produk")}>Dashboard</button>
                    <button className="bg-awashama-white hover:bg-awashama-lightgray ps-14 pe-6 py-3" onClick={()=>handleLogout()}>Logout</button>
                </div>
                
                </>
                )
                : role == "user" ?
                <>
                <button className="bg-awashama-yellow py-2 px-5 rounded-md font-semibold hover:scale-105 duration-200" onClick={()=>setLoginPopup(!loginPopup)}>Halo user</button>
                <div className={`mt-16 fixed flex flex-col shadow-md ${loginPopup?'':'hidden'}`}>
                <button className={`bg-awashama-white ps-14 pe-6 py-2 hover:bg-awashama-lightgray ${loginPopup?'':'hidden'}`} onClick={()=>handleLogout()}>Logout</button>
                </div>
                </>
                : 
                (
                <>
                <button className="bg-awashama-yellow py-2 px-5 rounded-md font-semibold hover:scale-105 duration-200" onClick={()=>navigate("/login")}>Login</button>
                </>
                )
                }

            </ul>
        </nav>
        </>
    )
}