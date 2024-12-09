import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export function ListProduct(props){
    return(
        <>
        <div className="product bg-awashama-toolightgreen rounded-xl p-6 border-2 border-awashama-white hover:border-awashama-lightgreen border-solid duration-200 hover:cursor-pointer">
            <img src="..." alt="..." width={200} className="mb-4" />
            <p className="mb-2">{props.product}</p>
            <h1 className="text-2xl font-semibold mb-2">Rp. {props.price}</h1>
        </div>
        </>
    )
}

export default function Product(){
    const [product, setProduct] = useState([]);
    const [relatedProduct, setRelatedProduct] = useState([]);

    const [jumlah, setJumlah] = useState(1);
    const { id } = useParams();

    useEffect(()=>{
        if (jumlah<1){
            setJumlah(1)
        } else if (jumlah>product.stok){
            setJumlah(product.stok)
        }
    },[jumlah])

    useEffect(() => {
        fetch("/productTest.json")
          .then((response) => response.json())
          .then((data) => {
            const dataFind = data.find((item) => item.id === parseInt(id));
            setProduct(dataFind)

            setRelatedProduct(data)
        })
          .catch((error) => console.error("Error fetching product:", error));
      }, []);
    return(
        <>
        <form method="POST" action="" id='myForm'>
            <input type="hidden" name="idUser"  value={''}/>
            <input type="hidden" name="idProduk"  value={product.id}/>
        <section className="product mx-32 my-16">
            <div className="main-content flex flex-row gap-4">
                <div className="images w-1/3 mb-4">
                    <img src={product.imageUrl} alt="..." className="w-full" />
                </div>
                <div className="content w-2/3">
                    <h1 className="text-4xl font-semibold">{product.namaproduk}</h1>
                    <p className="text-2xl mb-4">Rp. {product.harga}</p>
                    <div className="information bg-awashama-toolightgreen rounded-lg p-4 w-full mb-4">
                        <p>Berat : {product.berat}</p>
                        <p>Stok : {product.stok}</p>
                    </div>
                    <div className="tambahbarang mb-2 flex flex-row gap-2">
                        <p className='font-semibold text-xl py-3 px-5 bg-awashama-lightgreen rounded-lg hover:cursor-pointer' onClick={()=>{setJumlah(jumlah-1)}}>-</p>
                        <input type="text" name="jumlah" id="jumlah" className='bg-awashama-lightgray p-3 text-xl w-24 rounded-lg' value={jumlah} />
                        <p className='font-semibold text-xl py-3 px-5 bg-awashama-lightgreen rounded-lg hover:cursor-pointer' onClick={()=>{setJumlah(jumlah+1)}}>+</p>
                    </div>
                    <div className="tambahkeranjang w-1/3 bg-awashama-lightgreen font-semibold rounded-lg mb-4">
                    <input type="submit" value="Masukkan keranjang" className="p-4 cursor-pointer" form='myForm' />
                    </div>
                </div>
            </div>
            <div className="description">
                <div className="more-description grid grid-cols-2 gap-2">
                    <div className="pengiriman bg-awashama-toolightgreen hover:cursor-pointer rounded-lg p-4 w-full mb-4 duration-200">
                        <p className="mb-2">Info Pengiriman : </p>
                        <input type="radio" id="jne" name="pengiriman" value="jne" defaultChecked/>
                        <label htmlFor="jne"> JNE</label>
                        <br />
                        <input type="radio" id="sicepat" name="pengiriman" value="sicepat"/>
                        <label htmlFor="sicepat"> SiCepat Xpress</label>
                    </div>
                    <div className="promo bg-awashama-toolightgreen hover:cursor-pointer rounded-lg p-4 w-full mb-4 duration-200">
                        <p className="mb-2">Promo : </p>
                        <input type="text" id="promo" name="promo" className='ps-5 py-2 w-1/2 rounded-xl bg-awashama-lightgreen text-awashama-white font-semibold placeholder-awashama-white' placeholder='Masukkan promo disini' checked/>
                    </div>
                </div>
                <div className="product-description bg-awashama-toolightgreen rounded-lg p-4 w-full mb-4">
                    <p>{product.deskripsi}</p>
                </div>
            </div>
        </section>
        </form>

        <section className="product-another mx-32 ">
            <h1 className="text-neutral-600 text-4xl font-semibold mb-4">Produk terkait</h1>
                <div className="list-product grid grid-cols-4 gap-5 mb-16">
                {
                    relatedProduct.map((item,index)=>(
                        <ListProduct src={item.imageUrl} product={item.namaproduk} price={item.harga} key={index}/>
                    ))
                }
                </div>
        </section>
        </>
    )
}