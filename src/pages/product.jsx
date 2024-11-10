export function ListProduct(props){
    return(
        <>
        <div className="product bg-lime-100 rounded-xl p-6">
            <img src="..." alt="..." width={200} className="mb-4" />
            <p className="mb-2">{props.product}</p>
            <h1 className="text-2xl font-semibold mb-2">Rp. {props.price}</h1>
            <button className="rounded-lg bg-neutral-300 hover:bg-neutral-500 p-3 w-full duration-200">Tambah ke keranjang</button>
        </div>
        </>
    )
}

export default function Product(){
    const dataDummy = {
        message : "success",
        data : [
            {
                product : "pupuk",
                price : 5000,
                description : "pupuk lengkap nikmat",
                unit : "gram",
                section : "pupuk"
            },
            {
                product : "pupuk",
                price : 5000,
                description : "pupuk lengkap nikmat",
                unit : "gram",
                section : "pupuk"
            },
            {
                product : "pupuk",
                price : 5000,
                description : "pupuk lengkap nikmat",
                unit : "gram",
                section : "pupuk"
            },
        ]
    }

    return(
        <>
        <section className="product mx-32 my-16">
            <div className="main-content flex flex-row gap-4">
                <div className="images w-1/3 mb-4">
                    <img src="./src/assets/hidroponik.png" alt="..." className="w-full" />
                </div>
                <div className="content w-2/3">
                    <h1 className="text-neutral-600 text-4xl font-semibold">Pupuk Orizapus</h1>
                    <p className="text-2xl mb-4">Rp. 55,000</p>
                    <div className="information bg-lime-100 rounded-lg p-4 w-full mb-4">
                        <p className="mb-2">Berat : 100gram</p>
                        <p>Stok : 100</p>
                    </div>
                    <a href="/keranjang">
                        <p className="bg-lime-500 rounded-lg p-4 mb-4 w-1/3">Tambah ke keranjang</p>
                    </a>   
                </div>
            </div>
            <div className="description">
                <div className="more-description grid grid-cols-2 gap-2">
                    <div className="pengiriman bg-lime-50 hover:bg-lime-200 hover:cursor-pointer rounded-lg p-4 w-full mb-4 duration-200">
                        <p className="mb-2">Info Pengiriman : </p>
                        <p>JNE</p>
                    </div>
                    <div className="promo bg-lime-50 hover:bg-lime-200 hover:cursor-pointer rounded-lg p-4 w-full mb-4 duration-200">
                        <p className="mb-2">Promo : </p>
                        <p>CEPATSAMPAI</p>
                    </div>
                </div>
                <div className="product-description bg-lime-50 rounded-lg p-4 w-full mb-4">
                    <p>PUPUK HAYATI 100 GRAM PER PIECE</p>
                </div>
            </div>
        </section>

        <section className="product-another mx-32 ">
            <h1 className="text-neutral-600 text-4xl font-semibold mb-4">Produk terkait</h1>
                <div className="list-product grid grid-cols-4 gap-5 mb-16">
                {
                    dataDummy.data.map((item,index)=>(
                        <ListProduct product={item.product} price={item.price} key={index}/>
                    ))
                }
                </div>
        </section>
        </>
    )
}