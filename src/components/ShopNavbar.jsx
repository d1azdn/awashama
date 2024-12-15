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
                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5.365V3m0 2.365a5.338 5.338 0 0 1 5.133 5.368v1.8c0 2.386 1.867 2.982 1.867 4.175 0 .593 0 1.292-.538 1.292H5.538C5 18 5 17.301 5 16.708c0-1.193 1.867-1.789 1.867-4.175v-1.8A5.338 5.338 0 0 1 12 5.365ZM8.733 18c.094.852.306 1.54.944 2.112a3.48 3.48 0 0 0 4.646 0c.638-.572 1.236-1.26 1.33-2.112h-6.92Z"/>
                </svg>
            </li>

            <li className="hover:scale-125 duration-200">
                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeWidth="2" d="M7 17v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3Zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
            </svg>

            </li>

            </ul>
        </nav>
        
        </>
    )
}