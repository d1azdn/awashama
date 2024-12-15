import { useEffect, useState } from "react"
import { useParams } from 'react-router-dom';

export default function EditDashboardProduct(){
    const [product, setProduct] = useState([]);
    const [successEdit, setSuccessEdit] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const { id } = useParams();

    const getData = async () =>{
        const response = await fetch(import.meta.env.VITE_API_URL + '/produk/'+id,{
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials : "include"
        })
        setProduct(await response.json())
    }

    const handleSubmit = async (e)=>{
        e.preventDefault()
        const form = e.target;
        const formData = new FormData(form);
        
        const formDataJSON = {};
        formData.forEach((value, key) => {
            formDataJSON[key] = value;
        });

        const response = await fetch(import.meta.env.VITE_API_URL+'/dashboard/produk/'+id, {
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
          } 
          getData()
          setSuccessEdit(!successEdit)
    }

    useEffect(()=>{
        getData()
    },[])

    return(
        product && (
        <>
        <form action="#" method="PUT" onSubmit={handleSubmit}>
        <section className={`add-product p-16`}>
                <p className={`bg-awashama-lightgreen p-3 ${successEdit?'':'hidden'}`}>Berhasil edit produk!</p>
                <h1 className="font-semibold text-xl">Tambah produk</h1>
                <h1>Id artikel yang di edit : {product?.id}</h1>
                <h1>Nama produk : {product?.nama_produk}</h1>

                <div className="info-product p-6 bg-awashama-white mt-4 rounded-xl mb-4">
                    <h1 className="font-semibold text-lg mb-2">Informasi produk</h1>
                    <div className="splitter border border-solid my-2"></div>
                    
                    <div className="form-style grid grid-cols-2 gap-2 items-center">
                        <label htmlFor="nama_produk" className="p-2">Nama produk</label>
                        <input type="text" name="nama_produk" id="nama_produk" className="border border-solid rounded-xl p-2" placeholder="Masukkan nama produk" defaultValue={product?.nama_produk}/>
                        
                        <label htmlFor="kategori" className="p-2">Kategori produk</label>
                        <select name="kategori" id="kategori" className="border border-solid rounded-xl p-2" defaultValue={product?.kategori}>
                            <option value="pupuk">Pupuk</option>
                            <option value="antihama">Anti Hama</option>
                        </select>
                    </div>
                </div>

                <div className="detail-product p-6 bg-awashama-white mt-4 rounded-xl mb-4">
                    <h1 className="font-semibold text-lg mb-2">Detail produk</h1>
                    <div className="splitter border border-solid my-2"></div>
                    
                    <div className="form-style grid grid-cols-2 gap-2 items-start">
                        <label htmlFor="foto" className="p-2">Foto produk</label>
                        <input type="text" name="foto" id="foto" className="border border-solid rounded-xl p-2" placeholder="Masukkan url foto" defaultValue={product?.foto}/>

                        <label htmlFor="deskripsi" className="p-2">Deskripsi produk</label>
                        <textarea name="deskripsi" id="deskripsi" className="border border-solid rounded-xl p-2" placeholder="Masukkan deskripsi produk" defaultValue={product?.deskripsi} rows={20} cols={20} required />
                    </div>
                </div>

                <div className="price-product p-6 bg-awashama-white mt-4 rounded-xl mb-4">
                    <h1 className="font-semibold text-lg mb-2">Harga</h1>
                    <div className="splitter border border-solid my-2"></div>
                    <div className="form-style grid grid-cols-2 gap-2 items-center">
                        <label htmlFor="harga">Harga satuan</label>
                        <input type="text" name="harga" id="harga" className="border border-solid rounded-xl p-2" placeholder="Masukkan harga satuan" defaultValue={product?.harga}/>
                    </div>
                </div>

                <div className="etc-product p-6 bg-awashama-white mt-4 rounded-xl mb-4">
                    <h1 className="font-semibold text-lg mb-2">Pengelolaan produk</h1>
                    <div className="splitter border border-solid my-2"></div>
                    <div className="form-style grid grid-cols-2 gap-2 items-center">
                        <label htmlFor="stok">Stok produk</label>
                        <input type="text" name="stok" id="stok" className="border border-solid rounded-xl p-2" placeholder="Masukkan stok barang" defaultValue={product?.stok}/>
                    </div>
                </div>

                <div className="berat-product p-6 bg-awashama-white mt-4 rounded-xl mb-4">
                    <h1 className="font-semibold text-lg mb-2">Pengelolaan produk</h1>
                    <div className="splitter border border-solid my-2"></div>
                    <div className="form-style grid grid-cols-2 gap-2 items-center">
                        <label htmlFor="berat">Berat produk</label>
                        <input type="text" name="berat" id="berat" className="border border-solid rounded-xl p-2" placeholder="Masukkan berat barang" defaultValue={product?.berat}/>
                    </div>
                </div>

                <div className="konfirmasi flex justify-end gap-5">
                    <a href="/dashboard/produk" className="font-semibold text-lg p-3 border border-solid rounded-xl bg-awashama-white" onClick={()=>setOpenAddProduct(!openAddProduct)}>Batal</a>
                    <button className="font-semibold text-lg p-3 bg-awashama-lightgreen text-awashama-black rounded-xl">Konfirmasi</button>
                </div>
            </section>
            </form>
        </>
        )
    )
}