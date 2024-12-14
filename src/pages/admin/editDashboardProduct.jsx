import { useEffect, useState } from "react"
import { useParams } from 'react-router-dom';

export default function EditDashboardProduct(){
    const [product, setProduct] = useState([]);
    const [productLoad, setProductLoad] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        fetch("/productTest.json")
          .then((response) => response.json())
          .then((data) => {
            const dataFind = data.find((item) => item.id === parseInt(id));
            setProduct(dataFind)
            setProductLoad(true)
        })
          .catch((error) => console.error("Error fetching product:", error));
      }, []);

    return(
        productLoad && (
        <>
        <section className={`add-product p-16`}>
                <h1 className="font-semibold text-xl">Tambah produk</h1>
                <h1>Id artikel yang di edit : {product?.id}</h1>
                <h1>Nama produk : {product?.namaproduk}</h1>

                <div className="info-product p-6 bg-awashama-white mt-4 rounded-xl mb-4">
                    <h1 className="font-semibold text-lg mb-2">Informasi produk</h1>
                    <div className="splitter border border-solid my-2"></div>
                    
                    <div className="form-style grid grid-cols-2 gap-2 items-center">
                        <label htmlFor="nama_produk" className="p-2">Nama produk</label>
                        <input type="text" name="nama_produk" id="nama_produk" className="border border-solid rounded-xl p-2" placeholder="Masukkan nama produk" defaultValue={product?.namaproduk}/>

                        <label htmlFor="kategori" className="p-2">Kategori</label>
                        <input type="text" name="kategori" id="kategori" className="border border-solid rounded-xl p-2" placeholder="Masukkan kategori produk" defaultValue={product?.kategori} />
                    </div>
                </div>

                <div className="detail-product p-6 bg-awashama-white mt-4 rounded-xl mb-4">
                    <h1 className="font-semibold text-lg mb-2">Detail produk</h1>
                    <div className="splitter border border-solid my-2"></div>
                    
                    <div className="form-style grid grid-cols-2 gap-2 items-center">
                        <label htmlFor="foto" className="p-2">Foto produk</label>
                        <input type="text" name="foto" id="foto" className="border border-solid rounded-xl p-2" placeholder="Masukkan url foto" defaultValue={product?.imageUrl}/>

                        <label htmlFor="deskripsi" className="p-2">Deskripsi produk</label>
                        <input type="text" name="deskripsi" id="deskripsi" className="border border-solid rounded-xl p-2" placeholder="Masukkan deskripsi produk" defaultValue={product?.deskripsi}/>
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
        </>
        )
    )
}