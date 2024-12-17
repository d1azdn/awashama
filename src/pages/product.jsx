import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export function ListProduct(props){
    return(
        <>
        <a href={`/produk/${props.id}`}>
        <div className="product bg-awashama-toolightgreen rounded-xl p-6 border-2 border-awashama-white hover:border-awashama-lightgreen border-solid duration-200 hover:cursor-pointer">
            <img src={props.foto} alt="..." className="mb-4 h-32 w-full object-cover" />
            <p className="mb-2">{props.product.slice(0,20)}...</p>
            <h1 className="text-2xl font-semibold mb-2">Rp. {props.price}</h1>
        </div>
        </a>
        </>
    )
}

export default function Product(){
    const [product, setProduct] = useState([]);
    const [allProduct, setAllProduct] = useState([]);
    const [errorMessage, setErrorMessage] = useState('')
    const [successCheckout, setSuccessCheckout] = useState(false)
    const [relatedProduct, setRelatedProduct] = useState([]);
    const [userInfo, setUserInfo] = useState();

    const [jumlah, setJumlah] = useState(1);
    const { id } = useParams();
    const navigate = useNavigate()  

    const getData = async () =>{
        const response = await fetch(import.meta.env.VITE_API_URL + '/produk/'+id,{
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials : "include"
        })
        const data = await response.json()
        setProduct(data)
    }

    const getAllProduct = async () =>{
        const response = await fetch(import.meta.env.VITE_API_URL + '/produk',{
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials : "include"
        })
        const data = await response.json()
        setAllProduct(data)
    }

    const handleSubmit = async (e)=>{
        e.preventDefault()
        const form = e.target;
        const formData = new FormData(form);
        
        const formDataJSON = {};
        formData.forEach((value, key) => {
            formDataJSON[key] = value;
        });

        console.log(formDataJSON)

        const response = await fetch(import.meta.env.VITE_API_URL+'/checkout', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            mode:'cors',
            body: JSON.stringify(formDataJSON),
            credentials : "include"
          })
          if (!response.ok) {
            const errorMessage = await response.text();
            setErrorMessage(errorMessage);
          } 
          getData()
          setSuccessCheckout(true)
    }

    useEffect(()=>{
        setRelatedProduct(allProduct.filter(item=>item.kategori == product.kategori))
    },[allProduct])

    useEffect(()=>{
        if (jumlah<1){
            setJumlah(1)
        } else if (jumlah>product.stok){
            setJumlah(product.stok)
        }
    },[jumlah])

    useEffect(() => {
        const cekUser = async () =>{
            const response = await fetch(import.meta.env.VITE_API_URL + '/cekrole',{
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                },
                credentials : "include"
            })
            const checkAdmin = await response.json()
            if (checkAdmin?.role == 'guest'){
                navigate('/login')
                return
            }
            setUserInfo(checkAdmin)
        }
        cekUser()

        getData()
        getAllProduct()
      }, []);
    return(
        <>
        <p className={`mx-32 mt-5 bg-awashama-lightgreen p-4 text-awashama-white ${successCheckout?'':'hidden'}`}>Produk berhasil ditaruh keranjang!</p>
        <div className="beranda mx-32 mt-5 bg-awashama-toolightgray shadow-md w-48 rounded-xl hover:bg-awashama-lightgray duration-200 hover:cursor-pointer">
            <p className='p-3 font-semibold' onClick={()=>{navigate("/toko")}}>Kembali</p>
        </div>
        <form method="POST" action="#" id='myForm' onSubmit={handleSubmit}>
            <input type="hidden" name="id_user"  defaultValue={userInfo?.id}/>
            <input type="hidden" name="alamat"  defaultValue={"jl."}/>
            <input type="hidden" name="metode_pembayaran"  defaultValue={"gopay"}/>
            <input type="hidden" name="status"  defaultValue={"keranjang"}/>
            <input type="hidden" name="id_produk"  defaultValue={product.id}/>
        <section className="product mx-32 px-8 py-8 my-8 shadow-md border border-solid rounded-xl border-awashama-lightgreen">
            <div className="main-content flex flex-row gap-4">
                <div className="images w-1/3 mb-4">
                    <img src={product.foto} alt="..." className="w-full h-64 object-cover" />
                </div>
                <div className="content w-2/3">
                    <h1 className="text-4xl font-semibold">{product.nama_produk}</h1>
                    <p className="text-2xl mb-4">Rp. {product.harga}</p>
                    <div className="information bg-awashama-toolightgreen rounded-lg p-4 w-full mb-4">
                        <p>Berat : {product.berat}</p>
                        <p>Stok : {product.stok}</p>
                    </div>
                    <div className="tambahbarang mb-2 flex flex-row gap-2">
                        <p className='font-semibold text-xl py-3 px-5 bg-awashama-lightgreen rounded-lg hover:cursor-pointer' onClick={()=>{setJumlah(jumlah-1)}}>-</p>
                        <input type="text" name="jumlah_produk" id="jumlah_produk" className='bg-awashama-toolightgray p-3 text-xl w-24 rounded-lg' value={jumlah} onChange={(e) => setJumlah(Number(e.target.value) || 1)} />
                        <p className='font-semibold text-xl py-3 px-5 bg-awashama-lightgreen rounded-lg hover:cursor-pointer' onClick={()=>{setJumlah(jumlah+1)}}>+</p>
                    </div>
                    <div className="tambahkeranjang w-1/3 bg-awashama-lightgreen font-semibold rounded-lg mb-4">
                    <input type="submit" value="Masukkan keranjang" className="p-4 cursor-pointer" form='myForm' />
                    </div>
                </div>
            </div>
            <div className="description">
                <div className="more-description grid grid-cols-2 gap-2">
                    <div className="pengiriman bg-awashama-toolightgreen rounded-lg p-4 w-full mb-4 duration-200">
                        <p className="mb-2">Info Pengiriman : </p>
                        <select name="jenis_pengiriman" id="jenis_pengiriman" className='py-2 px-4 bg-awashama-lightgreen rounded-xl hover:cursor-pointer'>
                            <option value="jne">JNE</option>
                            <option value="sicepat">SiCepat Xpress</option>
                        </select>
                    </div>
                    <div className="promo bg-awashama-toolightgreen rounded-lg p-4 w-full mb-4 duration-200">
                        <p className="mb-2">Promo : </p>
                        <input type="text" id="promo" name="promo" className='ps-5 py-3 w-1/2 rounded-xl bg-awashama-lightgreen text-awashama-white font-semibold placeholder-awashama-white' placeholder='Masukkan promo disini'/>
                    </div>
                </div>
                <div className="product-description bg-awashama-toolightgreen rounded-lg p-4 w-full mb-4 whitespace-pre-wrap">
                    <p className='mb-2 text-xl font-semibold'>Deskripsi produk</p>
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
                        <ListProduct foto={item.foto} product={item.nama_produk} price={item.harga} id={item.id} key={index}/>
                    ))
                }
                </div>
        </section>
        </>
    )
}