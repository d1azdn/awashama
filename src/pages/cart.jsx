import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function ProductList(props){
    
    const { setTotalPrice } = props
    const { getKeranjang } = props
    const total = props.jumlah * props.harga
    let runOnce = false

    const deleteConfirmation = async (id)=>{
        if (window.confirm("Hapus keranjang dengan id : "+id+" ?")){
            const response = await fetch(import.meta.env.VITE_API_URL + '/checkout/'+id,{
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json',
                },
                credentials : "include"
            })
        } getKeranjang()
    }

    useEffect(()=>{
        if (total){
            if (!runOnce){
                setTotalPrice(prev=>(isNaN(prev) ? 0 : prev)+total)
                runOnce = true
            }
        }
    },[total])
    
    return(
        <>
        <div className="cart grid grid-cols-5 items-center">
            <div className="">
            <p className="bg-awashama-red p-2 mx-10 rounded-xl h-10 hover:bg-awashama-white hover:text-awashama-black text-awashama-white hover:cursor-pointer" onClick={()=>{deleteConfirmation(props.id_cart)}}>Hapus</p>
            </div>
            <div className="img">
                <img src={props.foto} alt="..." className="w-32 h-32 object-cover"/>
                <h1 className='break-words font-semibold text-lg'>{props.produk} </h1>
            </div>
            <h1>Rp. {props.harga}</h1>
            <h1>{props.jumlah}</h1>
            <h1>Rp. {total}</h1>
        </div>
        </>
    )
}



function ProductSum(props){
    const total = props.jumlah * props.harga
    return(
        <>
        <div className="grid grid-cols-3">
            <h1>{props.produk}</h1>
            <h1>{props.jumlah} buah</h1>
            <h1>Rp. {total}</h1>
        </div>
        </>
    )
}



export default function Cart(){
    const [cart, setCart] = useState([]);
    const [userInfo, setUserInfo] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const [productInfo, setProductInfo] = useState([])
    const [totalPrice, setTotalPrice] = useState(0);

    const [moreFormPopup, setMoreFormPopup] = useState(false)
    
    const navigate = useNavigate();

    const handleSubmit = async (e)=>{
        e.preventDefault()
        const form = e.target;
        const formData = new FormData(form);
        
        const formDataJSON = {};
        formData.forEach((value, key) => {
            formDataJSON[key] = value;
        });
        console.log(formDataJSON)

        const response = await fetch(import.meta.env.VITE_API_URL+'/checkout/proses', {
            method: 'PUT',
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
          } else{
            navigate("/keranjang/status")
          }
    }

    const checkCartNotNull = ()=>{
        if (cart != ''){
            setMoreFormPopup(!moreFormPopup)
        }
    }

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
            setCart(data.filter(item=>item.status == "keranjang"))
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
        <form action="#" method='PUT' onSubmit={handleSubmit} id='myForm'>
            <input type="hidden" name="id_user" id='id_user' defaultValue={userInfo.id}/>
            <input type="hidden" name="status" id='status' defaultValue={"proses"}/>
        <div className={`beranda mx-32 mt-5 bg-awashama-toolightgray shadow-md w-48 rounded-xl hover:bg-awashama-lightgray duration-200 hover:cursor-pointer ${moreFormPopup?'hidden':''}`}>
            <p className='p-3 font-semibold' onClick={()=>{navigate("/toko")}}>Kembali</p>
        </div>

        <section className={`keranjang grid grid-cols-4 gap-5 mx-32 mt-2 mb-8 ${moreFormPopup?'hidden':''}`}>
            <div className="item grid grid-cols-1 col-span-3 p-8 bg-awashama-toolightgray rounded-xl h-fit gap-5">
                <div className="info grid grid-cols-5 font-semibold">
                    <h1>-</h1>
                    <h1>Produk</h1>
                    <h1>Harga</h1>
                    <h1>Jumlah</h1>
                    <h1>Subtotal</h1>
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
                            setTotalPrice={setTotalPrice}
                            getKeranjang={getKeranjang}/>
                        ))  
                    )
                    
                }
            </div>    
            
            <div className="total bg-awashama-toolightgray rounded-xl p-4">
                <div className="card grid grid-cols-2 mb-4">
                    <h1 className='font-semibold text-lg'>Total Belanja</h1>
                    <h1 className='text-lg mb-2'>-</h1>
                    <h1 className='font-semibold text-lg'>Total</h1>
                    <h1 className='text-lg'>Rp. {totalPrice}</h1>
                    <div className="splitter border border-solid mt-2"></div>
                    <div className="splitter border border-solid mt-2"></div>
                </div>
                <label htmlFor="promo">Kode Promo</label>
                <input type="text" name="promo" id='promo' className='font-semibold border-2 border-awashama-lightgreen p-3 text-awashama-black placeholder-awashama-lightgray rounded-xl w-full mt-2' placeholder='Masukkan kode promo' />
                <p onClick={()=>checkCartNotNull()} className='mt-2 font-semibold bg-awashama-lightgreen p-3 w-full rounded-xl hover:cursor-pointer hover:bg-awashama-darkgreen text-center'>Beli</p>
            </div>
        </section>

        <section className={`tambahan grid grid-cols-2 mx-32 gap-5 my-10 ${moreFormPopup?'':'hidden'}`}>
            <div className="detail flex flex-col">
                <h1 className='font-semibold text-2xl mb-4'>Penagihan dan pengiriman</h1>
                
                <label htmlFor="nama" className='font-semibold text-lg mb-1'>Nama lengkap</label>
                <input type="text" name="nama" id="nama" className='text-lg p-2 border-2 border-awashama-lightgray rounded-xl mb-4' placeholder='Masukkan nama anda.' required/>
                <label htmlFor="alamat" className='font-semibold text-lg mb-1'>Alamat</label>
                <input type="text" name="alamat" id="alamat" className='text-lg p-2 border-2 border-awashama-lightgray rounded-xl mb-4' placeholder='Masukkan alamat anda.' required/>
                <label htmlFor="telepon" className='font-semibold text-lg mb-1'>Nomor telepon</label>
                <input type="text" name="telepon" id="telepon" className='text-lg p-2 border-2 border-awashama-lightgray rounded-xl mb-4' placeholder='Masukkan nomor telepon anda.' required/>
                <label htmlFor="note_pelanggan" className='font-semibold text-lg mb-1'>Catatan (Opsional)</label>
                <textarea type="text" name="note_pelanggan" id="note_pelanggan" className='text-lg p-2 border-2 border-awashama-lightgray rounded-xl mb-4' placeholder='Tulis catatan disini.' rows={10} cols={10}/>

            </div>
            <div className="konfirmasi">
                <div className="card bg-awashama-toolightgray p-4 rounded-xl">
                    <h1 className='font-semibold text-2xl mb-4'>Pesanan anda</h1>
                    <div className="grid grid-cols-3 font-semibold mb-2">
                        <h1>Produk</h1>
                        <h1>Jumlah</h1>
                        <h1>Sub total</h1>
                    </div>
                    {
                        cart.length == 0 ? 
                        (<p>kosong</p>)
                        :
                        (cart.map((item,index)=>(
                            <ProductSum key={index} jumlah={item.jumlah_produk} 
                            produk={productInfo.find(element=>element.id == item.id_produk)?.nama_produk} 
                            harga={productInfo.find(element=>element.id == item.id_produk)?.harga}/>
                        )))
                    }
                    

                    <div className="splitter border border-solid mt-8 mb-2"></div>

                    <div className="grid grid-cols-2 mb-4 font-semibold text-lg">
                        <h1>Total harga</h1>
                        <h1>Rp. {totalPrice}</h1>
                    </div>

                    <div className="pembayaran flex flex-col">
                        <h1 className='font-semibold text-xl mb-1'>Pembayaran</h1>
                        <select name="metode_pembayaran" id="metode_pembayaran" className='w-1/2 rounded-xl p-2 mb-4' required>
                            <option value="gopay">Gopay</option>
                            <option value="dana">Dana</option>
                        </select>
                    </div>

                    <input type="submit" value="Bayar sekarang" form="myForm" className='bg-awashama-lightgreen hover:text-awashama-darkgreen hover:bg-awashama-toolightgreen rounded-xl p-4 font-semibold w-full hover:cursor-pointer duration-200'/>
                    <p onClick={()=>checkCartNotNull()} className='mt-2 font-semibold border-2 border-solid border-awashama-red hover:bg-awashama-red bg-awashama-white hover:text-awashama-white p-3 w-full rounded-xl hover:cursor-pointer text-center duration-200'>Batal</p>
                </div>
            </div>
        </section>
        </form>
        </>
    )
}