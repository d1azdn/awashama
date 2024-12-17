import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

function ProductList(props){
    const total = props.jumlah * props.harga
    let runOnce = false
    
    return(
        <>
        <div className="cart grid grid-cols-6 items-center">
            <div className="">
            <p>cart id : {props.id_cart}</p>
            </div>
            <div className="img">
                <img src={props.foto} alt="..." className="w-32 h-32 object-cover"/>
                <h1 className='break-words font-semibold text-lg'>{props.produk} </h1>
            </div>
            <h1>Rp. {props.harga}</h1>
            <h1>{props.jumlah}</h1>
            <h1>Rp. {total}</h1>
            <h1 className="font-semibold">{props.status}</h1>
        </div>
        </>
    )
}

export default function CartStatus(){
    const [userInfo, setUserInfo] = useState('')
    const [cart,setCart] = useState([])
    const [productInfo, setProductInfo] = useState([])
    const navigate = useNavigate()

    const getKeranjang = async () =>{
        try{
            const response = await fetch(import.meta.env.VITE_API_URL + '/checkout/'+userInfo.id,{
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                },
                credentials : "include"
            })
            const data = await response.json()
            setCart(data.filter(item=>item.status != "keranjang"))
        }catch(error){
            setCart('')
        }
        
    }

    useEffect(()=>{
        if (userInfo!=''){
            const getProduk = async () =>{
                const response = await fetch(import.meta.env.VITE_API_URL + '/produk',{
                    method: 'GET',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    credentials : "include"
                })
                const data = await response.json()
                setProductInfo(data)
            }

            getProduk()
            
            getKeranjang()

        }
    },[userInfo])

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
      }, []);
    return(
        <>
        <div className={`beranda mx-32 mt-8 mb-4 bg-awashama-toolightgray shadow-md w-48 rounded-xl hover:bg-awashama-lightgray duration-200 hover:cursor-pointer`}>
            <p className='p-3 font-semibold' onClick={()=>{navigate(-1)}}>Kembali</p>
        </div>
        <section className={`keranjang gap-5 mx-32 mt-2 mb-8`}>
            <div className="item grid p-8 bg-awashama-toolightgray rounded-xl h-fit gap-5">
                <div className="info grid grid-cols-6 font-semibold">
                    <h1>Proses ID</h1>
                    <h1>Produk</h1>
                    <h1>Harga</h1>
                    <h1>Jumlah</h1>
                    <h1>Subtotal</h1>
                    <h1>Status</h1>
                </div>
                {
                    cart.length == 0 ? 
                    (<p>Kosong.</p>)
                    :
                    (
                        cart.map((item, index)=>(
                            <ProductList 
                            productId={item.id_produk} id_cart={item.id}
                            foto={productInfo.find(element=>element.id == item.id_produk)?.foto} 
                            produk={productInfo.find(element=>element.id == item.id_produk)?.nama_produk} 
                            harga={productInfo.find(element=>element.id == item.id_produk)?.harga} 
                            jumlah={item.jumlah_produk} hargaSatuan={item.jumlah_produk} key={index}
                            status={item.status}
                            />
                        ))  
                    )
                    
                }
            </div>    
        </section>
        </>
    )
}