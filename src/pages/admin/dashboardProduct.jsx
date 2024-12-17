import { useState, useEffect } from "react"

function CardDashboardProduct(props){

    const { getData } = props

    const deleteConfirmation = async (id)=>{
        if (window.confirm("Are you want to delete with id : "+id)){
            const response = await fetch(import.meta.env.VITE_API_URL + '/dashboard/produk/'+id,{
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json',
                },
                credentials : "include"
            })
        }
        getData()
    }

    return(
        <>
        <div className="card grid grid-cols-6 p-2 items-center">
            <div className="img">
                <img src={props.imageUrl} alt="..." className="w-32 h-32 object-cover"/>
            </div>
            <h1 className="break-words">{props.namaproduk}</h1>
            <h1>null</h1>
            <h1>Rp. {props.harga}</h1>
            <h1>{props.stok}</h1>
            <div className="">
                <a href={`/dashboard/produk/edit/${props.id}`} className="font-semibold bg-awashama-yellow py-2 px-4 rounded-xl">Edit</a>
                <button className="font-semibold bg-awashama-red py-2 px-4 rounded-xl" onClick={()=>deleteConfirmation(props.id)}>Hapus</button>
            </div>
        </div>
        </>
    )
}

export default function DashboardProduct(){
    const [openAddProduct, setOpenAddProduct] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [product, setProduct] = useState([]);

    const getData = async () =>{
        const response = await fetch(import.meta.env.VITE_API_URL + '/produk',{
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
        console.log(formDataJSON)

        const response = await fetch(import.meta.env.VITE_API_URL+'/dashboard/produk', {
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
          setOpenAddProduct(!openAddProduct)
    }

    useEffect(()=>{
        getData()
    },[])

    return(
        <>
        <section className="all bg-awashama-toolightgray h-full p-16">
            <div className="topbar flex justify-between">
                <div className={`fonttop ${openAddProduct?'invisible':''}`}>
                    <h1 className="font-semibold text-xl">Daftar produk</h1>
                    <h1>Pastikan produk aman, terverifikasi dan tidak melanggar aturan dan hukum</h1>
                </div>
            <button className="font-semibold px-5 py-3 bg-awashama-lightgreen rounded-xl hover:bg-awashama-darkgreen duration-200" onClick={()=>setOpenAddProduct(!openAddProduct)}>{openAddProduct?'Tutup halaman':'Tambah produk'}</button>
            </div>


            <form action="#" method="POST" onSubmit={handleSubmit}>
            <section className={`add-product ${openAddProduct ? '':'hidden'}`}>
                <h1 className="font-semibold text-xl">Tambah produk</h1>
                <h1>Pastikan produk aman, terverifikasi dan tidak melanggar aturan dan hukum</h1>

                <div className="info-product p-6 bg-awashama-white mt-4 rounded-xl mb-4">
                    <h1 className="font-semibold text-lg mb-2">Informasi produk</h1>
                    <div className="splitter border border-solid my-2"></div>
                    
                    <div className="form-style grid grid-cols-2 gap-2 items-center">
                        <label htmlFor="nama_produk" className="p-2">Nama produk</label>
                        <input type="text" name="nama_produk" id="nama_produk" className="border border-solid rounded-xl p-2" placeholder="Masukkan nama produk" required/>

                        <label htmlFor="kategori" className="p-2">Kategori produk</label>
                        <select name="kategori" id="kategori" className="border border-solid rounded-xl p-2">
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
                        <input type="text" name="foto" id="foto" className="border border-solid rounded-xl p-2" placeholder="Masukkan url foto" required/>

                        <label htmlFor="deskripsi" className="p-2">Deskripsi produk</label>
                        <textarea name="deskripsi" id="deskripsi" className="border border-solid rounded-xl p-2" placeholder="Masukkan deskripsi produk" rows={20} cols={50} required/>
                    </div>
                </div>

                <div className="price-product p-6 bg-awashama-white mt-4 rounded-xl mb-4">
                    <h1 className="font-semibold text-lg mb-2">Harga</h1>
                    <div className="splitter border border-solid my-2"></div>
                    <div className="form-style grid grid-cols-2 gap-2 items-center">
                        <label htmlFor="harga">Harga satuan</label>
                        <input type="text" name="harga" id="harga" className="border border-solid rounded-xl p-2" placeholder="Masukkan harga satuan" required/>
                    </div>
                </div>

                <div className="etc-product p-6 bg-awashama-white mt-4 rounded-xl mb-4">
                    <h1 className="font-semibold text-lg mb-2">Pengelolaan produk</h1>
                    <div className="splitter border border-solid my-2"></div>
                    <div className="form-style grid grid-cols-2 gap-2 items-center">
                        <label htmlFor="stok">Stok produk</label>
                        <input type="text" name="stok" id="stok" className="border border-solid rounded-xl p-2" placeholder="Masukkan stok barang" required/>
                    </div>
                </div>

                <div className="berat-product p-6 bg-awashama-white mt-4 rounded-xl mb-4">
                    <h1 className="font-semibold text-lg mb-2">Pengelolaan produk</h1>
                    <div className="splitter border border-solid my-2"></div>
                    <div className="form-style grid grid-cols-2 gap-2 items-center">
                        <label htmlFor="berat">Berat produk</label>
                        <input type="text" name="berat" id="berat" className="border border-solid rounded-xl p-2" placeholder="Masukkan berat barang" required/>
                    </div>
                </div>

                <div className="konfirmasi flex justify-end gap-5">
                    <a className="font-semibold text-lg p-3 border border-solid rounded-xl bg-awashama-white hover:cursor-pointer" onClick={()=>setOpenAddProduct(!openAddProduct)}>Batal</a>
                    <button className="font-semibold text-lg p-3 bg-awashama-lightgreen text-awashama-black rounded-xl">Konfirmasi</button>
                </div>
            </section>
            </form>



            <section className={`show-product grid grid-cols-1 mt-4 bg-awashama-white p-6 rounded-xl ${openAddProduct ? 'hidden':''}`}>
                <div className="info grid grid-cols-6 font-semibold">
                    <h1>Info produk</h1>
                    <h1>-</h1>
                    <h1>Pesanan selesai</h1>
                    <h1>Harga</h1>
                    <h1>Stok</h1>
                </div>
                {
                    product.map((item)=>(
                        <CardDashboardProduct id={item.id} key={item.id} imageUrl={item.foto} namaproduk={item.nama_produk} harga={item.harga} stok={item.stok} getData={getData}/>
                    ))
                }                  
            </section> 
        </section>

        </>
    )
}