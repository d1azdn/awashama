import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function ProductList(props){
    const total = props.jumlah * props.hargaSatuan
    return(
        <>
        <div className="cart grid grid-cols-5">
            <h1>Centang</h1>
            {/* <img src={props.imgUrl} alt="..." width={150}/> */}
            <h1>{props.productId}</h1>
            <h1>Rp. {props.hargaSatuan}</h1>
            <h1>{props.jumlah}</h1>
            <h1>Rp. {total}</h1>
        </div>
        </>
    )
}

export default function Cart(){
    const [cart, setCart] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const navigate = useNavigate();

    useEffect(()=>{
        fetch("/keranjangTest.json")
        .then(response => response.json())
        .then(data=>setCart(data))
        .catch((error) => console.error("Error fetching articles:", error))

        const total = cart.reduce((sum, item) => sum + parseInt(item.harga*item.jumlah), 0);
        setTotalPrice(total);
    })

    return(
        <>
        <div className="beranda mx-32 mt-5 bg-awashama-toolightgray shadow-md w-48 rounded-xl hover:bg-awashama-lightgray duration-200 hover:cursor-pointer">
            <p className='p-3 font-semibold' onClick={()=>{navigate(-1)}}>Kembali</p>
        </div>

        <section className='keranjang grid grid-cols-4 gap-5 mx-32 mt-2 mb-8'>
            <div className="item grid grid-cols-1 col-span-3 p-8 bg-awashama-toolightgray rounded-xl h-fit">
                <div className="info grid grid-cols-5 font-semibold">
                    <h1>-</h1>
                    <h1>Produk</h1>
                    <h1>Harga</h1>
                    <h1>Jumlah</h1>
                    <h1>Subtotal</h1>
                </div>
                {
                    cart.map((item)=>(
                        <ProductList productId={item.id_produk} jumlah={item.jumlah_produk} hargaSatuan={item.jumlah_produk} key={item.productid}/>
                    ))
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
                <input type="submit" value="Beli" className='mt-2 font-semibold bg-awashama-lightgreen p-3 w-full rounded-xl hover:cursor-pointer hover:bg-awashama-darkgreen' />
            </div>
        </section>

        <section className='tambahan grid grid-cols-2 mx-32 gap-5'>
            <div className="detail flex flex-col">
                <h1 className='font-semibold text-2xl mb-4'>Penagihan dan pengiriman</h1>
                
                <label htmlFor="nama" className='font-semibold text-lg mb-1'>Nama lengkap</label>
                <input type="text" name="nama" id="nama" className='text-lg p-2 border-2 border-awashama-lightgray rounded-xl mb-4' placeholder='Masukkan nama anda.'/>
                <label htmlFor="Alamat" className='font-semibold text-lg mb-1'>Alamat</label>
                <input type="text" name="Alamat" id="Alamat" className='text-lg p-2 border-2 border-awashama-lightgray rounded-xl mb-4' placeholder='Masukkan alamat anda.'/>
                <label htmlFor="Telepon" className='font-semibold text-lg mb-1'>Nomor telepon</label>
                <input type="text" name="Telepon" id="Telepon" className='text-lg p-2 border-2 border-awashama-lightgray rounded-xl mb-4' placeholder='Masukkan nomor telepon anda.'/>
                <label htmlFor="catatan" className='font-semibold text-lg mb-1'>Catatan (Opsional)</label>
                <input type="text" name="catatan" id="catatan" className='text-lg p-2 border-2 border-awashama-lightgray rounded-xl mb-4' placeholder='Tulis catatan disini.'/>

            </div>
            <div className="konfirmasi">
                <div className="card bg-awashama-toolightgray p-4 rounded-xl">
                    <h1 className='font-semibold text-2xl mb-4'>Pesanan anda</h1>
                    <div className="grid grid-cols-3 font-semibold mb-2">
                        <h1>Produk</h1>
                        <h1>Jumlah</h1>
                        <h1>Sub total</h1>
                    </div>
                    <div className="grid grid-cols-3">
                        <h1>Nama produk</h1>
                        <h1>2 buah</h1>
                        <h1>Rp. 2000</h1>
                    </div>

                    <div className="splitter border border-solid mt-8 mb-2"></div>

                    <div className="grid grid-cols-2 mb-4 font-semibold text-lg">
                        <h1>Total harga</h1>
                        <h1>Rp. 2000</h1>
                    </div>

                    <div className="pembayaran flex flex-col">
                        <h1 className='font-semibold text-xl mb-1'>Pembayaran</h1>
                        <select name="pembayaran" id="pembayaran" className='w-1/2 rounded-xl p-2 mb-4'>
                            <option value="gopay">Gopay</option>
                            <option value="dana">Dana</option>
                        </select>
                    </div>

                    <input type="submit" value="Bayar sekarang" className='bg-awashama-lightgreen rounded-xl p-4 font-semibold w-full'/>
                </div>
            </div>
        </section>

        </>
    )
}