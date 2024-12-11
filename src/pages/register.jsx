import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Register(){
    const navigate = useNavigate();
    const [password, setPassword] = useState("")
    const [passwordMatch, setPasswordMatch] = useState("a")

    const [passwordConfirmed, setPasswordConfirmed] = useState(false)

    useEffect(()=>{
        setTimeout(() => {
            if(password == passwordMatch){
                setPasswordConfirmed(true)
            } else {
                setPasswordConfirmed(false)
            };
          }, 500)
    },[passwordMatch])

    return(
        <>
        <section className="the-card p-16 flex justify-center h-full bg-gradient-to-tl from-awashama-darkgreen from-50% to-awashama-yellow">
            <div className="contain flex flex-col w-1/2 animate-fade-up">
                <div className="bg-awashama-yellow rounded-full w-32 hover:scale-105 duration-200 mb-2">
                    <p className="block w-full h-full text-center p-3 cursor-pointer" onClick={()=>{navigate(-1)}}>Kembali</p>
                </div>
                <div className="form-place bg-awashama-lightgreen p-10 rounded-lg shadow-xl">
                    <div className="top flex flex-col items-center mb-4">
                        <img src="./src/assets/logo-black.png" alt="..." width={150}/>
                        <h1 className="font-semibold text-awashama-white mt-2 text-lg">Menjaga Hasil, Kebutuhan Stabil</h1>
                    </div>
                
                    <h1 className="font-semibold mb-2 text-xl">Daftar</h1>
                    <div className="splitter border border-solid w-full"></div>

                    <form method="POST" action="/register" id="myForm" className="flex flex-col mt-4">
                        <label htmlFor="username" className="mb-2 font-semibold">Username</label>
                        <input type="text" name="username" id="username" className="p-2 bg-awashama-black text-awashama-white" placeholder="Input your username." required/>

                        <label htmlFor="password" className="mb-2 mt-4 font-semibold">Password</label>
                        <input type="password" name="password" id="password" className="p-2 bg-awashama-black text-awashama-white" placeholder="******" onChange={(e)=>{setPassword(e.target.value)}} required/>

                        <label htmlFor="confirmpassword" className="mb-2 mt-4 font-semibold">Confirm Password</label>
                        <input type="password" name="" id="" className="p-2 bg-awashama-black text-awashama-white" placeholder="******" onChange={(e)=>{setPasswordMatch(e.target.value)}} required/>

                        <input type="hidden" name="role" id="role" value="user" />
                        
                        <p className={`font-semibold mt-1 p-2 text-awashama-white bg-awashama-red ${passwordConfirmed ? 'hidden' : ''}`}>Password tidak sama</p>
                        
                        <a href="/login" className="font-semibold mt-6 hover:text-awashama-white w-3/4 mb-4 duration-200">Sudah memiliki akun? Masuk sekarang!</a>
                    </form>
                    <div className="flex flex-row justify-end">
                        <input type="submit" value="Daftar" form="myForm" className={`p-2 font-semibold text-lg w-1/6 rounded-lg duration-200 ${passwordConfirmed ? 'bg-awashama-toolightgray hover:bg-awashama-lightgray hover:cursor-pointer':'bg-awashama-gray text-awashama-lightgray'}`} disabled={passwordConfirmed == false}/>
                    </div>
                </div>
            </div>
        </section>
        </>
    )
}