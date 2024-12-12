export default function EditDashboardArtikel(){
    return(
        <>
        <section className={`edit-product`}>
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
        </>
    )
}