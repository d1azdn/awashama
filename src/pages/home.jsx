import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

function FiturCard(props){
    return(
        <>
         <div className="card-1 text-center shadow-md p-10 rounded-lg hover:scale-105 duration-200">
              <img src={props.src} alt="..." className="mx-auto mb-4" width={100} />
              <h3 className="text-xl font-semibold text-awashama-darkgray mb-2">{props.title}</h3>
              <p className="text-gray-600 text-awashama-darkgray ">{props.text}</p>
            </div>
        </>
    )
}

function ArtikelCard(props){
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

export default function Home() {
  useEffect(() => {
    AOS.init();
  }, [])
    return (
      <>
      <section className="hero bg-cover py-48 ps-20" style={{ backgroundImage:`url(./src/assets/home/gambarhome.jpg)` }}>
        <div className="animate-fade-right animate-once">
          <h1 className="text-3xl font-semibold text-awashama-white">Menjaga Hasil,
          Kebutuhan Stabil</h1>
          <p className="mt-2 text-lg w-1/2 text-awashama-white font-light mb-4">
          Mitra digital utama bagi petani padi di Solok dengan menyediakan produk pupuk dan anti hama berkualitas, layanan edukasi, serta konsultasi langsung dengan ahli pertanian.
          </p>
          <div className="bg-awashama-yellow rounded-full w-1/6 hover:scale-105 duration-200">
            <a href="/toko" className="block w-full h-full text-center p-5">Cari Kebutuhan</a>
          </div>
        </div>
      </section>

      <section className="fitur my-32">
          <h2 className="text-4xl font-bold text-awashama-darkgray text-center">Fitur Kami</h2>
          <h4 className="text-lg text-gray-600 text-awashama-gray text-center font-semibold">Solusi Untuk Memenuhi Kebutuhan Pertanian Dengan One Stop Solution</h4>
  
          <div className="grid grid-cols-3 gap-6 mt-10 mx-32 rounded-lg" data-aos="fade-up">
            <FiturCard src="./src/assets/home/storefront.png" title="Toko Kebutuhan Padi" text="E-commerce produk pupuk dan antihama."/>
            <FiturCard src="./src/assets/home/buku.png" title="Edukasi Petani" text="Artikel dan berita seputar pertanian padi."/>
            <FiturCard src="./src/assets/home/groups.png" title="Komunitas" text="Berbagi pengalaman dan saling berkomunikasi."/>
          </div>
      </section>
        
  
      <section className="visi flex items-center my-32 bg-awashama-darkgreen">
        <img src="./src/assets/home/ibukpetani.png" className="bg-cover mr-8" width={500} height={50} alt="Visi Kami" />
        <div className="content mx-10">
          <h3 className="text-4xl mb-2 font-bold text-awashama-white">Visi Kami</h3>
          <p className="text-lg text-awashama-white font-light">
            Membangun solusi digital terdepan untuk memenuhi kebutuhan petani padi di Solok dengan menyediakan produk berkualitas,
            layanan edukasi, dan dukungan berbasis teknologi yang mendorong keberlanjutan dan peningkatan hasil panen.
          </p>
          <div className="grid grid-cols-2 mt-6 justify-center me-40">
            <h2 className="text-4xl font-semibold text-awashama-white">No.1</h2>
            <h2 className="text-4xl font-semibold text-awashama-white">No.2</h2>
            <p className="text-lg text-awashama-white">Platform One Stop Solution</p>
            <p className="text-lg text-awashama-white">Menjadi Penyedia Kebutuhan Pertanian dengan harga termurah</p>
          </div>
        </div>
      </section>

      <section className="artikel my-32 mx-32">
        <h2 className="text-4xl font-bold text-awashama-darkgray text-center">Artikel terbaru</h2>
        <h4 className="text-lg text-gray-600 text-awashama-gray text-center font-semibold">Cari informasi dan kebutuhan anda.</h4>

        <div className="grid grid-cols-3 gap-6 mt-10" data-aos="fade-up">
          <ArtikelCard src="./src/assets/home/padi.jpg" title ="Strategi Ampuh Basmi Hama Walang Sangit pada.." text="Fase Kritis: Hama walang sangit biasanya menyerang tanaman padi pada fase.." />
          <ArtikelCard src="./src/assets/home/hidroponik.png" title ="Inovasi Terbaru Pupuk Padi untuk Tingkatkan Hasil .." text="Di tengah meningkatnya permintaan akan beras, kualitas dan kuantitas prod.." />
          <ArtikelCard src="./src/assets/home/beras.png" title="Menguak Tantangan Petani Padi di Solok: Harga Pupuk.." text="Di dataran tinggi Solok, Sumatra Barat, beras bukan hanya sekadar bahan ..." />

          <ArtikelCard src="./src/assets/home/duapetani.png" title ="Strategi Pengendalian Hama Terbaru untuk Lindungi ..." text="Bagi para petani padi, musim hujan sering kali menjadi musim yang penuh ..." />
          <ArtikelCard src="./src/assets/home/bps.png" title ="BPS catat harga gabah dan beras naik pada Juni 2024" text="Jakarta (ANTARA) - Badan Pusat Statistik (BPS) melaporkan bahwa rata-rata harga " />
          <ArtikelCard src="./src/assets/home/petani.png" title ="Sumber Artikel berjudul Beras Solok: Harta Karun ..." text="Sumber Artikel berjudul 'Beras Solok: Harta Karun Kuliner Sumatera Barat ..." />
        </div>
        </section>

        <section className="kebutuhan flex items-center my-32 bg-awashama-darkgreen">
          <img src="./src/assets/home/tanah.png" className="bg-cover mr-8" width={500} height={50} alt="..." />
          <div className="content mx-10">
            <h3 className="text-4xl mb-2 font-bold text-awashama-white">Cari kebutuhan</h3>
            <h3 className="text-4xl mb-2 font-bold text-awashama-white">Pertanian anda.</h3>
            <p className="text-lg text-awashama-white font-light">
              Temukan produk pupuk dan antihama terjangkau dan terpercaya
            </p>
            <div className="bg-awashama-yellow rounded-full w-1/2 mt-5 hover:scale-105 hover:cursor-pointer duration-200">
              <a href="/toko" className="block w-full h-full ps-8 py-5 font-semibold text-xl">Temukan disini</a>
            </div>
          </div>
        </section>
  
        <section className="contact my-32">
          <div className="home-6 mt-10 text-center">
            <h2 className="text-4xl font-bold text-awashama-darkgray text-center">Contact us</h2>
            <h4 className="text-lg text-gray-600 text-awashama-gray text-center font-semibold">contact@awashama.com</h4>
            <h4 className="text-lg text-gray-600 text-awashama-gray text-center font-semibold">(123) 456 - 789</h4>
            <h4 className="text-lg text-gray-600 text-awashama-gray text-center font-semibold mt-5">Cirebon, Jakarta. 25814</h4>
            </div>
            <div className="mt-6 flex gap-7 justify-center mx-32">
              <div className="box rounded-lg p-7 bg-awashama-lightgray"></div>
              <div className="box rounded-lg p-7 bg-awashama-lightgray"></div>
              <div className="box rounded-lg p-7 bg-awashama-lightgray"></div>
              <div className="box rounded-lg p-7 bg-awashama-lightgray"></div>
          </div>
        </section>
      </>
    );
  }
  