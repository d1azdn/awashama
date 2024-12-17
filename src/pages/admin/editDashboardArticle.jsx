import { useEffect, useState } from "react"
import { useParams } from 'react-router-dom';

export default function EditDashboardArticle(){
    const [errorMessage, setErrorMessage] = useState('')
    const [artikel, setArtikel] = useState([]);
    const [successEdit, setSuccessEdit] = useState(false)
    const { id } = useParams();

    const handleSubmit = async (e)=>{
        e.preventDefault()
        const form = e.target;
        const formData = new FormData(form);
        
        const formDataJSON = {};
        formData.forEach((value, key) => {
            formDataJSON[key] = value;
        });

        const response = await fetch(import.meta.env.VITE_API_URL+'/dashboard/artikel/'+id, {
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

    const getData = async () =>{
        const response = await fetch(import.meta.env.VITE_API_URL + '/artikel/'+id,{
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials : "include"
        })
        setArtikel(await response.json())
    }

    useEffect(() => {
        getData()
      }, []);

    return(
        artikel && (
        <>
        <form action="#" method="PUT" onSubmit={handleSubmit}>
        <section className={`edit-product p-16`}>
                <p className={`bg-awashama-lightgreen p-3 ${successEdit?'':'hidden'}`}>Berhasil edit produk!</p>
                <h1 className="font-semibold text-xl">Edit artikel</h1>
                <h1>Id artikel yang di edit : {artikel?.id}</h1>
                <h1>Judul artikel : {artikel?.judul}</h1>

                <div className="info-product p-6 bg-awashama-white mt-4 rounded-xl mb-4">
                    <h1 className="font-semibold text-lg mb-2">Informasi artikel</h1>
                    <div className="splitter border border-solid my-2"></div>
                    
                    <div className="form-style grid grid-cols-6 gap-2 items-start">
                        <label htmlFor="foto" className="p-2">Foto artikel</label>
                        <input type="text" name="foto" id="foto" className="border border-solid rounded-xl p-2 col-span-5" placeholder="Masukkan url foto" defaultValue={artikel?.foto}/>

                        <label htmlFor="judul" className="p-2">Judul artikel</label>
                        <input type="text" name="judul" id="judul" className="border border-solid rounded-xl p-2 col-span-5" placeholder="Masukkan judul artikel" defaultValue={artikel?.judul}/>

                        <label htmlFor="tempat" className="p-2">Tempat ditemukan artikel</label>
                        <input type="text" name="tempat" id="tempat" className="border border-solid rounded-xl p-2 col-span-5" placeholder="Masukkan tempat dan tanggal" defaultValue={artikel?.tempat}/>

                        <label htmlFor="sumber" className="p-2">Sumber artikel</label>
                        <input type="text" name="sumber" id="sumber" className="border border-solid rounded-xl p-2 col-span-5" placeholder="Masukkan sumber artikel" defaultValue={artikel?.sumber} />

                        <label htmlFor="kategori" className="p-2">Kategori artikel</label>
                        <input type="text" name="kategori" id="kategori" className="border border-solid rounded-xl p-2 col-span-5" placeholder="Masukkan kategori artikel" defaultValue={artikel?.kategori} />

                        <label htmlFor="deskripsi" className="p-2">Deskripsi artikel</label>
                        <textarea name="deskripsi" id="deskripsi" rows={30} cols={50} className="border border-solid rounded-xl p-2 col-span-5" placeholder="Masukkan deskripsi artikel" defaultValue={artikel?.deskripsi} />
                    </div>
                </div>

                <div className="konfirmasi flex justify-end gap-5">
                    <a href="/dashboard/artikel" className="font-semibold text-lg p-3 border border-solid rounded-xl bg-awashama-white">Batal</a>
                    <button className="font-semibold text-lg p-3 bg-awashama-lightgreen text-awashama-black rounded-xl">Konfirmasi</button>
                </div>
            </section>
            </form>
        </>
        )
    )
}