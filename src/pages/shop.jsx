import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export function ListProduct(props){

    const navigate = useNavigate()
    return(
        <>
        <div className="product bg-awashama-toolightgreen rounded-xl p-6 border-2 border-awashama-white hover:border-awashama-lightgreen border-solid duration-200 hover:cursor-pointer" onClick={()=>navigate('/produk/'+props.id)}>
            <img src={props.src} alt="..." className="mb-4 h-32 w-full object-cover " />
            <p className="mb-2 font-semibold">{props.product.slice(0,20)}...</p>
            <div className="flex items-center">
                <h1 className="text-2xl font-semibold mb-2">Rp. {props.price}</h1>
                <h1 className=''>/{props.berat}</h1>
            </div>
            <p className="rounded-lg p-3 w-full duration-200 text-end bg-awashama-lightgreen font-bold">Lihat Produk</p>
        </div>
        </>
    )
}

export default function Shop(){

    const [product, setProduct] = useState([]);
    const [fixedProduct, setFixedProduct] = useState([]);
    const navigate = useNavigate();

    const getData = async () =>{
        const response = await fetch(import.meta.env.VITE_API_URL + '/produk',{
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials : "include"
        })
        const data = await response.json()
        setProduct(data)
        setFixedProduct(data)
    }

    useEffect(() => {
        getData()
      }, []);

      function checkCategory(url){
        navigate(url)
        if (url=='/toko'){
            setProduct(fixedProduct)
            return
        }
        const query = new URLSearchParams(url.split('?')[1]);
        const kategori = query.get('kategori')

        setProduct(fixedProduct.filter(item => item.kategori == kategori));
      }

    return(
        <>
        <div className="beranda mx-32 mt-5 bg-awashama-toolightgray shadow-md w-48 rounded-xl hover:bg-awashama-lightgray duration-200 hover:cursor-pointer">
            <p className='p-3 font-semibold' onClick={()=>{navigate("/")}}>Kembali ke beranda</p>
        </div>

        <section className="image-big bg-cover flex mx-32 mt-5 rounded-xl animate-fade-up" style={{backgroundImage : `url('./src/assets/home/gambarhome.jpg')`}}>
            <h1 className="text-4xl font-semibold text-center justify-center w-full my-24 text-awashama-white">Beli kebutuhan anda.</h1>
        </section>

        <section className="content mx-32 my-14">
            <ul className="gap-20 flex justify-center mb-8">
                <li>
                    <button onClick={()=>{checkCategory('/toko')}} className="text-awashama-darkgray font-semibold text-2xl hover:text-neutral-900 duration-200">SEMUA</button>
                </li>
                <li>
                    <button onClick={()=>{checkCategory('/toko?kategori=pupuk')}} className="text-awashama-darkgray font-semibold text-2xl hover:text-neutral-900 duration-200">PUPUK</button>
                </li>
                <li>
                    <button onClick={()=>{checkCategory('/toko?kategori=antihama')}} className="text-awashama-darkgray font-semibold text-2xl hover:text-neutral-900 duration-200">ANTI HAMA</button>
                </li>
            </ul>

            <div className="list-product grid grid-cols-4 gap-5 mt-8">
                {
                    product.map((item,index)=>(
                        <ListProduct src={item.foto} product={item.nama_produk} price={item.harga} id={item.id} berat={item.berat} key={index}/>
                    ))
                }
            </div>
        </section>
        </>
    )
}