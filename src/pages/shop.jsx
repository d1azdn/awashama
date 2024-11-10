export function ListProduct(props){
    return(
        <>
        <div className="product bg-lime-100 rounded-xl p-6">
            <img src="..." alt="..." width={200} className="mb-4" />
            <p className="mb-2">{props.product}</p>
            <h1 className="text-2xl font-semibold mb-2">Rp. {props.price}</h1>
            <a href="/produk">
                <p className="rounded-lg bg-neutral-300 hover:bg-neutral-500 text-center p-3 w-full duration-200">Detail Produk</p>
            </a>
        </div>
        </>
    )
}

export default function Shop(){

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
        
        <section className="big-image m-24 flex justify-center">
            <img src="./src/assets/hidroponik.png" className="w-3/5" alt="" />
        </section>

        <section className="content">
            <ul className="gap-20 flex justify-center mb-8">
                <li>
                    <a href="" className="text-neutral-600 font-semibold text-2xl hover:text-neutral-900 duration-200">SEMUA</a>
                </li>
                <li>
                    <a href="" className="text-neutral-600 font-semibold text-2xl hover:text-neutral-900 duration-200">PUPUK</a>
                </li>
                <li>
                    <a href="" className="text-neutral-600 font-semibold text-2xl hover:text-neutral-900 duration-200">ANTI HAMA</a>
                </li>
            </ul>

            <div className="list-product grid grid-cols-4 gap-5 m-16">
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