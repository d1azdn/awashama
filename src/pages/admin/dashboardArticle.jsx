import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

function CardDashboardArtikel(props){

    const { getData } = props

    const deleteConfirmation = async (id) =>{
        if (window.confirm("Are you want to delete with id : "+id)){
            const response = await fetch(import.meta.env.VITE_API_URL + '/dashboard/artikel/'+id,{
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
        <div className="card grid grid-cols-6 items-center bg-awashama-white p-6 rounded-xl">
            <div className="content grid grid-cols-4 col-span-5">
                <div className="img">
                    <img src={props.foto} alt="..." width={150}/>
                    <h1>id: {props.id}</h1>
                </div>
                <div className="text grid grid-cols-1 col-span-3">
                    <h1 className="font-semibold mb-2 break-words">{props.judul}</h1>
                    <h1>{props.deskripsi.slice(0,50)}...</h1>
                </div>
            </div>
            <div className="">
                <a href={`/dashboard/artikel/edit/${props.id}`} className="font-semibold bg-awashama-yellow py-2 px-4 rounded-xl">Edit</a>
                <button className="font-semibold bg-awashama-red p-2 rounded-xl" onClick={()=>deleteConfirmation(props.id)}>Hapus</button>
            </div>
        </div>
        </>
    )
}

export default function DashboardArticle(){
    const [openAddArticle, setOpenAddArticle] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [artikel, setArtikel] = useState([]);
    
    const navigate = useNavigate();

    const getData = async () =>{
        const response = await fetch(import.meta.env.VITE_API_URL + '/artikel',{
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials : "include"
        })
        setArtikel(await response.json())
    }

    const handleSubmit = async (e)=>{
        e.preventDefault()
        const form = e.target;
        const formData = new FormData(form);
        
        const formDataJSON = {};
        formData.forEach((value, key) => {
            formDataJSON[key] = value;
        });

        const response = await fetch(import.meta.env.VITE_API_URL+'/dashboard/artikel', {
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
          setOpenAddArticle(!openAddArticle)
    }

    useEffect(()=>{
        getData()
    },[])

    return(
        <>
        {artikel?(
            <section className="all bg-awashama-toolightgray h-full p-16">
            <div className="topbar flex justify-between">
                <div className={`fonttop ${openAddArticle?'invisible':''}`}>
                    <h1 className="font-semibold text-xl">Daftar artikel</h1>
                    <h1>Pastikan artikel aman, kredibel, dan tidak melanggar aturan dan hukum</h1>
                </div>
            <button className="font-semibold px-5 py-3 bg-awashama-lightgreen rounded-xl hover:bg-awashama-darkgreen duration-200" onClick={()=>setOpenAddArticle(!openAddArticle)}>{openAddArticle?'Tutup halaman':'Tambah produk'}</button>
            </div>

            <form action="#" method="POST" onSubmit={handleSubmit}>
            <section className={`add-product ${openAddArticle ? '':'hidden'}`}>
                <h1 className="font-semibold text-xl">Tambah artikel</h1>
                <h1>Pastikan artikel aman, kredibel, dan tidak melanggar aturan dan hukum</h1>

                <div className="info-product p-6 bg-awashama-white mt-4 rounded-xl mb-4">
                    <h1 className="font-semibold text-lg mb-2">Informasi artikel</h1>
                    <div className="splitter border border-solid my-2"></div>
                    
                    <div className="form-style grid grid-cols-2 gap-2 items-start">
                        <label htmlFor="foto" className="p-2">Foto artikel</label>
                        <input type="text" name="foto" id="foto" className="border border-solid rounded-xl p-2" placeholder="Masukkan url foto"/>

                        <label htmlFor="judul" className="p-2">Judul artikel</label>
                        <input type="text" name="judul" id="judul" className="border border-solid rounded-xl p-2" placeholder="Masukkan judul artikel"/>

                        <label htmlFor="sumber" className="p-2">Sumber artikel</label>
                        <input type="text" name="sumber" id="sumber" className="border border-solid rounded-xl p-2" placeholder="Masukkan sumber artikel" />

                        <label htmlFor="tempat" className="p-2">Tempat ditemukan artikel</label>
                        <input type="text" name="tempat" id="tempat" className="border border-solid rounded-xl p-2" placeholder="Masukkan kategori artikel" />

                        <label htmlFor="kategori" className="p-2">Kategori artikel</label>
                        <input type="text" name="kategori" id="kategori" className="border border-solid rounded-xl p-2" placeholder="Masukkan kategori artikel" />

                        <label htmlFor="deskripsi" className="p-2">Deskripsi artikel</label>
                        <textarea name="deskripsi" id="deskripsi" rows={10} className="border border-solid rounded-xl p-2" placeholder="Masukkan deskripsi artikel" />
                        </div>
                </div>

                <div className="konfirmasi flex justify-end gap-5">
                    <p className="font-semibold text-lg p-3 border border-solid rounded-xl bg-awashama-white hover:cursor-pointer" onClick={()=>{setOpenAddArticle(!openAddArticle)}}>Batal</p>
                    <button className="font-semibold text-lg p-3 bg-awashama-lightgreen text-awashama-black rounded-xl">Konfirmasi</button>
                </div>
            </section>
            </form>



            <section className={`show-product grid grid-cols-1 mt-4 gap-4 ${openAddArticle ? 'hidden':''}`}>
                {
                    artikel.map((item)=>(
                        <CardDashboardArtikel foto={item.foto} judul={item.judul} deskripsi={item.deskripsi} id={item.id} key={item.id} getData={getData}/>
                    ))
                }
            </section> 
        </section>
        )
        :
        (
            <p>halo</p>
        )}
        

        </>
    )
}