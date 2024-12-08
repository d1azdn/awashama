import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect, useState } from 'react';

export function ListProduct(props){
    return(
        <>
        <a href={`/produk/${props.id}`}>
        <div className="product bg-awashama-toolightgreen rounded-xl p-6 border-2 border-awashama-white hover:border-awashama-lightgreen border-solid duration-200 hover:cursor-pointer">
            <img src={props.src} alt="..." width={200} className="mb-4" />
            <p className="mb-2 font-semibold">{props.product}</p>
            <h1 className="text-2xl font-semibold mb-2">Rp. {props.price}</h1>
            <p className="rounded-lg text-center p-3 w-full duration-200">Detail Produk</p>
        </div>
        </a>
        </>
    )
}

export default function Shop(){

    const [product, setProduct] = useState([]);

    useEffect(() => {
        fetch("/productTest.json")
          .then((response) => response.json())
          .then((data) => setProduct(data))
          .catch((error) => console.error("Error fetching articles:", error));
      }, []);

    return(
        <>
        
        <section className="image-big bg-cover flex mx-32 mt-10 rounded-xl animate-fade-up" style={{backgroundImage : `url('./src/assets/home/gambarhome.jpg')`}}>
            <h1 className="text-4xl font-semibold text-center justify-center w-full my-24 text-awashama-white">Beli kebutuhan anda.</h1>
        </section>

        <section className="content mx-32 my-14">
            <ul className="gap-20 flex justify-center mb-8">
                <li>
                    <a href="" className="text-awashama-darkgray font-semibold text-2xl hover:text-neutral-900 duration-200">SEMUA</a>
                </li>
                <li>
                    <a href="" className="text-awashama-darkgray font-semibold text-2xl hover:text-neutral-900 duration-200">PUPUK</a>
                </li>
                <li>
                    <a href="" className="text-awashama-darkgray font-semibold text-2xl hover:text-neutral-900 duration-200">ANTI HAMA</a>
                </li>
            </ul>

            <div className="list-product grid grid-cols-4 gap-5 mt-8">
                {
                    product.map((item,index)=>(
                        <ListProduct src={item.imageUrl} product={item.namaproduk} price={item.harga} id={item.id} key={index}/>
                    ))
                }
            </div>
        </section>
        </>
    )
}