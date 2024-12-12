import { useState, useEffect } from "react"

function CardDashboardArtikel(props){

    function deleteConfirmation(id){
        if (window.confirm("Are you want to delete with id : "+id)){
            return
        }
    }

    return(
        <>
        <div className="card grid grid-cols-6 items-center bg-awashama-white p-6 rounded-xl">
            <div className="content grid grid-cols-4 col-span-5">
                <div className="img">
                    <img src={props.imageUrl} alt="..." width={150}/>
                    <h1>id: {props.id}</h1>
                </div>
                <div className="text grid grid-cols-1 col-span-3">
                    <h1 className="font-semibold mb-2">{props.judul}</h1>
                    <h1>{props.tanggal}</h1>
                </div>
            </div>
            <button className="font-semibold bg-awashama-red p-2 rounded-xl w-2/3 col-span-1" onClick={()=>deleteConfirmation(props.id)}>Hapus</button>
        </div>
        </>
    )
}

export default function DashboardArtikel(){
    const [openAddArticle, setOpenAddArticle] = useState(false)

    const [artikel, setArtikel] = useState([]);

    useEffect(()=>{
        fetch("/articleTest.json")
        .then(response=>response.json())
        .then(data=>setArtikel(data))
        .catch(error=>console.error("Error fetching articles:", error))
    },[])

    return(
        <>
        <section className="all bg-awashama-toolightgray h-full p-16">
            <div className="topbar flex justify-between">
                <div className={`fonttop ${openAddArticle?'invisible':''}`}>
                    <h1 className="font-semibold text-xl">Daftar artikel</h1>
                    <h1>Pastikan artikel aman, kredibel, dan tidak melanggar aturan dan hukum</h1>
                </div>
            <button className="font-semibold px-5 py-3 bg-awashama-lightgreen rounded-xl hover:bg-awashama-darkgreen duration-200" onClick={()=>setOpenAddArticle(!openAddArticle)}>{openAddArticle?'Tutup halaman':'Tambah produk'}</button>
            </div>

            <section className={`add-product ${openAddArticle ? '':'hidden'}`}>
                <h1 className="font-semibold text-xl">Tambah artikel</h1>
                <h1>Pastikan artikel aman, kredibel, dan tidak melanggar aturan dan hukum</h1>

                <div className="info-product p-6 bg-awashama-white mt-4 rounded-xl mb-4">
                    <h1 className="font-semibold text-lg mb-2">Informasi artikel</h1>
                    <div className="splitter border border-solid my-2"></div>
                    
                    <div className="form-style grid grid-cols-2 gap-2 items-center">
                        <label htmlFor="foto" className="p-2">Foto artikel</label>
                        <input type="text" name="foto" id="foto" className="border border-solid rounded-xl p-2" placeholder="Masukkan url foto"/>

                        <label htmlFor="judulartikel" className="p-2">Judul artikel</label>
                        <input type="text" name="judulartikel" id="judulartikel" className="border border-solid rounded-xl p-2" placeholder="Masukkan judul artikel"/>

                        <label htmlFor="tempatdantanggal" className="p-2">Tempat dan tanggal</label>
                        <input type="text" name="tempatdantanggal" id="tempatdantanggal" className="border border-solid rounded-xl p-2" placeholder="Masukkan tempat dan tanggal" />

                        <label htmlFor="sumber" className="p-2">Sumber artikel</label>
                        <input type="text" name="sumber" id="sumber" className="border border-solid rounded-xl p-2" placeholder="Masukkan sumber artikel" />

                        <label htmlFor="deskripsi" className="p-2">Deskripsi artikel</label>
                        <input type="text" name="deskripsi" id="deskripsi" className="border border-solid rounded-xl p-2" placeholder="Masukkan deskripsi artikel" />
                    </div>
                </div>

                <div className="konfirmasi flex justify-end gap-5">
                    <button className="font-semibold text-lg p-3 border border-solid rounded-xl bg-awashama-white" onClick={()=>{setOpenAddArticle(!openAddArticle)}}>Batal</button>
                    <button className="font-semibold text-lg p-3 bg-awashama-lightgreen text-awashama-black rounded-xl">Konfirmasi</button>
                </div>
            </section>



            <section className={`show-product grid grid-cols-1 mt-4 gap-4 ${openAddArticle ? 'hidden':''}`}>
                {
                    artikel.map((item)=>(
                        <CardDashboardArtikel imageUrl={item.imageUrl} judul={item.judul} tanggal={item.tanggal} id={item.id} key={item.id}/>
                    ))
                }
            </section> 
        </section>

        </>
    )
}