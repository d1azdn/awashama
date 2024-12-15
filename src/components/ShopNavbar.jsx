import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export function ListNavbar(props){
    return(
        <>
        <li>
            <a href={props.href} 
            className={`text-awashama-white tracking-wide duration-200 ${pathIsTrue ? 'font-bold' : 'hover:text-awashama-lightgray'}`}>{props.text}</a>
        </li>
        </>
    )
}

export default function ShopNavbar(){
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
                setUserInfo(await response.json())
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
            setUserInfo({role:'guest'})
            navigate("/")
        }
    return(
        <>
        <nav className="flex justify-between py-3 px-16 items-center shadow-md">
            <ul>
                <li>
                    <a href="/">
                    <img src="/src/assets/logo.png" className='fill-awashama-darkgreen' alt="..." width={150}/>
                    </a>
                </li>
                
            </ul>
            <ul className="flex gap-20 items-center">

            <li className="hover:scale-125 duration-200">
                <a href="/keranjang">
                    <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312"/>
                    </svg>
                </a>
            </li>

            <li className="hover:scale-125 duration-200">
            <a href="/keranjang/proses">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M7 8H12V10H7V8Z" fill="black"/><path d="M7 12H17V14H7V12Z" fill="black"/><path fillRule="evenodd" clipRule="evenodd" d="M9 1V2H11V1H13V2H15V1H17V2H21V23H3V2H7V1H9ZM7 4H5V21H19V4H17V5H15V4H13V5H11V4H9V5H7V4Z" fill="black"/></svg>
            </a>
            </li>

            <li className="hover:scale-105 duration-200 flex gap-2 items-center justify-end hover:cursor-pointer">
                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeWidth="2" d="M7 17v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3Zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
            </svg>
            { userInfo.role == "admin" ? 
            (<>
                <p onClick={()=>setLoginPopup(!loginPopup)}>Halo, {userInfo.username}!</p>
                <div className={`mt-32 border border-solid fixed flex flex-col shadow-md ${loginPopup?'':'hidden'}`}>
                    <button className="bg-awashama-white hover:bg-awashama-lightgray ps-14 pe-6 py-3" onClick={()=>navigate("/dashboard/produk")}>Dashboard</button>
                    <button className="bg-awashama-white hover:bg-awashama-lightgray ps-14 pe-6 py-3" onClick={()=>handleLogout()}>Logout</button>
                </div>
            </>)       
            : 
            userInfo.role == "user" ? 
            (<>
                <p onClick={()=>setLoginPopup(!loginPopup)}>Halo, {userInfo.username}!</p>
                <div className={`mt-20 border border-solid fixed flex flex-col shadow-md ${loginPopup?'':'hidden'}`}>
                    <button className="bg-awashama-white hover:bg-awashama-lightgray ps-14 pe-6 py-3" onClick={()=>handleLogout()}>Logout</button>
                </div>
            </>) 
            : 
            (
                <p onClick={()=>navigate('/login')}>Login</p>
            )}    
            </li>

            </ul>
        </nav>
        
        </>
    )
}