export function FooterList(props){
    return(
        <>
        <li className="mb-3 cursor-pointer">
            <a href={props.href} className="text-neutral-200">{props.text}</a>
        </li>
        </>
    )
}

export default function Footer(){
    return(
        <>
        <footer className="bg-lime-600 p-20 flex justify-between">
            <div className="logo">
                <img src="./src/assets/logo_black.svg" alt="..." width={200} className="mb-4"/>
                <p className="text-neutral-200 mb-2">Copyright 2024. AwasHama |</p>
                <p className="text-neutral-200">All right reserved.</p>
            </div>
            <div className="contains grid grid-cols-4 gap-20">
                <div className="product">
                    <h1 className="font-semibold mb-4 text-lg">Product</h1>
                    <div className="product-list">
                        <ul>
                            <FooterList text="Berita"/>
                            <FooterList text="Komunitas"/>
                            <FooterList text="Toko"/>
                            <FooterList text="Tentang"/>
                            <FooterList text="Beranda"/>
                        </ul>
                    </div>
                </div>
                <div className="company">
                    <h1 className="font-semibold mb-4 text-lg">Company</h1>
                    <div className="product-list">
                        <ul>
                            <FooterList text="About"/>
                            <FooterList text="Contact Us"/>
                        </ul>
                    </div>
                </div>
                <div className="support">
                    <h1 className="font-semibold mb-4 text-lg">Support</h1>
                    <div className="product-list">
                        <ul>
                            <FooterList text="Getting Started"/>
                            <FooterList text="Help Center"/>
                            <FooterList text="Server Status"/>
                            <FooterList text="Report a bug"/>
                            <FooterList text="Chat Support"/>
                        </ul>
                    </div>
                </div>
                <div className="follow">
                    <h1 className="font-semibold mb-4 text-lg">Follow Us</h1>
                    <div className="product-list">
                        <ul>
                            <FooterList text="Facebook"/>
                            <FooterList text="Twitter"/>
                            <FooterList text="Instagram"/>
                            <FooterList text="Linkedin"/>
                            <FooterList text="Youtube"/>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>  
        </>
    )
}