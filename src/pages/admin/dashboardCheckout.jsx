import { useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"

function CardDashboardCheckout(props){

    const [errorMessage, setErrorMessage] = useState('')
    const { getKeranjang } = props
    const { setSuccessEdit } = props
    const total = props.harga * props.jumlah_produk

    const handleSubmit = async (e)=>{
        e.preventDefault()
        const form = e.target;
        const formData = new FormData(form);
        
        const formDataJSON = {};
        formData.forEach((value, key) => {
            formDataJSON[key] = value;
        });
        console.log(formDataJSON)

        const response = await fetch(import.meta.env.VITE_API_URL+'/dashboard/checkout', {
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
          getKeranjang()
          setSuccessEdit(true)
    }


    return(
        <>
        <form action="#" method="PUT" id="myForm" onSubmit={handleSubmit}>
        <div className={`card grid grid-cols-6 items-center  p-6 rounded-xl me-4 ${props.status == 'selesai' ? 'border-2 border-solid border-awashama-darkgreen bg-awashama-toolightgreen':'bg-awashama-white'}`}>
            <div className="content grid grid-cols-4 col-span-5">
                <div className="img">
                    <h1>id: {props.id}</h1>
                    <h1>pembeli: {props.nama_user}</h1>
                    <h1>alamat: {props.alamat}</h1>
                </div>
                <div className="text grid">
                    <h1 className="font-semibold mb-2 break-words">{props.nama_produk}</h1>
                    <h1>{props.jumlah_produk} Buah</h1>
                </div>
                <div className="">
                    <h1>Total : Rp.{total}</h1>
                </div>
                <div className="">
                    <input type="hidden" name="id_cart" defaultValue={props.id} />
                    <select name="status" id="status" className="border border-solid px-4 py-2" defaultValue={props.status}>
                        <option value="keranjang">Keranjang</option>
                        <option value="proses">Proses</option>
                        <option value="dikirim">Dikirim</option>
                        <option value="selesai">Selesai</option>
                    </select>
                </div>
            </div>

            <div className="col-span-1">
                <button className="font-semibold bg-awashama-lightgreen p-3 rounded-xl">Konfirmasi</button>
            </div>
        </div>
            </form>
        </>
    )
}

export default function DashboardCheckout(){
    const [cart,setCart] = useState([])
    const [productInfo, setProductInfo] = useState([])
    const [successEdit, setSuccessEdit] = useState(false)
    const navigate = useNavigate()

    const getKeranjang = async () =>{
        fetch('/cartTest.json')
        .then(response=>response.json())
        .then(data=>{
            const filteredProduct = data.filter(product => product.status != "keranjang")
            setCart(filteredProduct)
        })   
    }

    const getAllProduct = async () =>{
        fetch('/productTest.json')
        .then(response=>response.json())
        .then(data=>{
            setProductInfo(data)
        })
    }

    useEffect(() => {
        getKeranjang()
        getAllProduct()
      }, []);
    return(
        <>
        <section className="all bg-awashama-toolightgray h-full p-16">
        <p className={`bg-awashama-lightgreen p-3 ${successEdit?'':'hidden'}`}>Berhasil edit produk!</p>
         <div className="topbar flex justify-between">
            <div className={`fonttop`}>
                <h1 className="font-semibold text-xl">Daftar checkout</h1>
                <h1>Ubah status apabila sudah waktunya. Ubah proses menjadi 'keranjang' apabila ingin menolak pesanan.</h1>
            </div>
        </div>

        <section className={`show-product grid grid-cols-1 mt-4 gap-4`}>
                {
                    cart.map((item)=>(
                        <CardDashboardCheckout id={item.id} 
                        nama_user={item.nama}
                        alamat={item.alamat}
                        
                        nama_produk={productInfo.find(element=>element.id == item.id_produk)?.nama_produk} 
                        jumlah_produk={item.jumlah_produk}

                        harga={productInfo.find(element=>element.id == item.id_produk)?.harga}
                        deskripsi={item.deskripsi} 

                        status={item.status}
                        getKeranjang={getKeranjang}
                        setSuccessEdit={setSuccessEdit}
                        key={item.id}/>
                    ))
                }
            </section> 
        </section>
        </>
    )
}