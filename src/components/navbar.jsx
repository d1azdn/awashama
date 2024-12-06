import { useLocation } from 'react-router-dom';

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
    return(
        <>
        <nav className="flex justify-between py-5 px-16 items-center bg-awashama-lightgreen">
            <ul>
                <li>
                    <img src="./src/assets/logo-white.png" alt="..." width={150}/>
                </li>
                
            </ul>
            <ul className="flex gap-10 items-center">
                <ListNavbar text="Beranda" href="/"/>
                <ListNavbar text="Tentang" href="/tentang"/>
                <ListNavbar text="Artikel" href="/artikel"/>
                <ListNavbar text="Toko" href="/toko"/>
                
                <a href="/login" className="bg-awashama-yellow py-2 px-5 rounded-xl font-semibold"><p>Login</p></a>
            </ul>
        </nav>
        </>
    )
}