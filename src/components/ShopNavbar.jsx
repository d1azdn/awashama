export function ListNavbar(props){
    return(
        <>
        <li>
            <a href={props.href}>
                <img src={props.src} alt="..." width={props.size}/>
            </a>
        </li>
        </>
    )
}

export default function ShopNavbar(){
    return(
        <>
        <nav className="flex justify-between py-4 px-20 items-center shadow-md">
            <ul>
                <ListNavbar href="/" src="./src/assets/logo.png" size={150}/>
            </ul>
            <ul className="flex gap-20 items-center">
                <li>
                    <input type="text" className="bg-neutral-200 py-2 ps-4 pe-16" placeholder="Search for..."/>
                </li>
                <ListNavbar href="/keranjang" src="./src/assets/cart.svg" size={25}/>
                <ListNavbar src="./src/assets/notifications.svg" size={20}/>
                <ListNavbar href="/profile" src="./src/assets/user.svg" size={30}/>
            </ul>
        </nav>
        </>
    )
}