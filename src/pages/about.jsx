export default function About(){
    return(
        <>
        <section className="about bg-awashama-toolightgreen p-24 flex flex-row justify-between">
            <div className="tentang-kami w-1/2">
                <h1 className="text-2xl font-semibold">Tentang Kami</h1>
                <p className="text-4xl font-semibold">Menjaga hasil, kebutuhan stabil</p>
            </div>
            <div className="visi-misi w-1/2">
                <div className="visi mb-8">
                    <h1 className="text-2xl font-semibold">Visi</h1>
                    <p className="font-semibold">Membangun solusi digital terdepan untuk memenuhi kebutuhan petani padi di Solok dengan menyediakan produk berkualitas, layanan edukasi, dan dukungan berbasis teknologi yang mendorong keberlanjutan dan peningkatan hasil panen.</p>
                </div>
                <div className="misi">
                    <h1 className="text-2xl font-semibold mb-2">Misi</h1>
                    <div className="list-misi grid grid-cols-2 gap-6">
                        <p>1. Menyediakan berbagai produk pertanian berkualitas yang sesuai dengan kondisi iklim dan jenis tanah di Solok, mulai dari pupuk hingga anti hama.</p>
                        <p>2. Menjadi mitra tepercaya bagi petani dengan memberikan layanan jaminan dan panduan dalam memilih produk terbaik untuk kebutuhan spesifik pertanian.</p>
                        <p>3. Mengedukasi petani melalui konten digital, webinar, dan pelatihan mengenai praktik pertanian berkelanjutan untuk hasil panen yang optimal.</p>
                        <p>4. Membangun platform yang mudah digunakan, memungkinkan petani mengakses informasi dan melakukan pembelian dengan cepat dan aman.</p>
                    </div>
                </div>
            </div>
        </section>
        <section className="image-big bg-cover flex" style={{backgroundImage : `url('./src/assets/gambarhome.jpg')`}}>
            <h1 className="text-4xl font-semibold text-center w-full my-48 text-awashama-white">Untuk kesejahteraan petani.</h1>
        </section>
        </>
    )
}