import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

function ArtikelCardTop(props){
    return(
        <>
        <a href="#">
            <div className="card px-5 align-text-bottom rounded-lg flex flex-col justify-end h-full bg-cover hover:border-solid hover:border-awashama-white hover:border-4 hover:scale-105 duration-200" style={{ backgroundImage : `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${props.src})` }}>
                <h1 className="text-awashama-white font-semibold text-2xl mb-5">{props.title}</h1>
            </div>
        </a>
        </>
    )
}

function ArtikelCard(props){
    useEffect(() => {
        AOS.init();
      }, [])
    return(
        <>
        <a href="/artikel">
        <div className="card shadow-md p-6 rounded-lg hover:scale-105 duration-200 hover:cursor-pointer">
          <img src={props.src} alt="..." className="w-full h-auto mb-4 rounded-lg" />
          <h3 className="text-lg font-semibold mb-2 text-awashama-darkgray">{props.title}</h3>
          <p className="text-awashama-gray mb-4">{props.text}</p>
          <p className='font-semibold mt-2 inline-block'>Selengkapnya</p>
        </div>
        </a>
        </>
    )
}

export default function Artikel(){
    return(
        <>
        <section className="top mx-32 my-24" data-aos="fade-right">
            <h1 className="mb-4 font-semibold text-awashama-darkgray text-2xl">BERITA TERBARU</h1>
            <div className="cardList grid grid-cols-3 gap-2 h-96">
                <div className="big">
                <ArtikelCardTop src="./src/assets/home/tanah.png" title="Melirik pertumbuhan biji kopi di Indonesia."/> 
                </div>
                <div className="small grid grid-cols-2 gap-2 col-span-2">
                <ArtikelCardTop src="./src/assets/home/tanah.png" title="Melirik pertumbuhan biji kopi di Indonesia."/> 
                <ArtikelCardTop src="./src/assets/home/tanah.png" title="Melirik pertumbuhan biji kopi di Indonesia."/> 
                <ArtikelCardTop src="./src/assets/home/tanah.png" title="Melirik pertumbuhan biji kopi di Indonesia."/> 
                <ArtikelCardTop src="./src/assets/home/tanah.png" title="Melirik pertumbuhan biji kopi di Indonesia."/> 
                </div>
            </div>
        </section>

        <section className="artikel m-32">
            <h1 className="font-semibold text-awashama-darkgray text-2xl">SEMUA BERITA</h1>

            <div className="grid grid-cols-3 gap-6 mt-10" data-aos="fade-up">
            <ArtikelCard src="./src/assets/home/padi.jpg" title ="Strategi Ampuh Basmi Hama Walang Sangit pada.." text="Fase Kritis: Hama walang sangit biasanya menyerang tanaman padi pada fase.." />
            <ArtikelCard src="./src/assets/home/hidroponik.png" title ="Inovasi Terbaru Pupuk Padi untuk Tingkatkan Hasil .." text="Di tengah meningkatnya permintaan akan beras, kualitas dan kuantitas prod.." />
            <ArtikelCard src="./src/assets/home/beras.png" title="Menguak Tantangan Petani Padi di Solok: Harga Pupuk.." text="Di dataran tinggi Solok, Sumatra Barat, beras bukan hanya sekadar bahan ..." />

            <ArtikelCard src="./src/assets/home/duapetani.png" title ="Strategi Pengendalian Hama Terbaru untuk Lindungi ..." text="Bagi para petani padi, musim hujan sering kali menjadi musim yang penuh ..." />
            <ArtikelCard src="./src/assets/home/bps.png" title ="BPS catat harga gabah dan beras naik pada Juni 2024" text="Jakarta (ANTARA) - Badan Pusat Statistik (BPS) melaporkan bahwa rata-rata harga " />
            <ArtikelCard src="./src/assets/home/petani.png" title ="Sumber Artikel berjudul Beras Solok: Harta Karun ..." text="Sumber Artikel berjudul 'Beras Solok: Harta Karun Kuliner Sumatera Barat ..." />
            </div>
        </section>
        </>
    )
}