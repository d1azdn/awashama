export function ListNavbar(props){
    return(
        <>
        <li>
            <a href={props.href}>{props.text}</a>
        </li>
        </>
    )
}

export default function Navbar(){
    return(
        <>
        <nav className="flex justify-between my-5 mx-20 items-center">
            <ul>
                <li>
                    <img src="./src/assets/Logo.png" alt="..." width={150}/>
                </li>
                
            </ul>
            <ul className="flex gap-10 items-center">
                <ListNavbar text="Beranda"/>
                <ListNavbar text="Tentang"/>
                <ListNavbar text="Berita"/>
                <ListNavbar text="Toko"/>
                <button className="bg-yellow-300 py-2 px-4">
                    Login
                </button>
            </ul>
        </nav>
        </>
    )
}