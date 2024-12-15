import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react";

export default function Login(){
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    
    const handleSubmit = async (e)=>{
        e.preventDefault()
        const form = e.target;
        const formData = new FormData(form);
        
        const formDataJSON = {};
        formData.forEach((value, key) => {
            formDataJSON[key] = value;
        });

        const response = await fetch(import.meta.env.VITE_API_URL+'/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formDataJSON),
            credentials : "include"
          })
          if (!response.ok) {
            const errorMessage = await response.text();
            setErrorMessage(errorMessage);
          } else {
            navigate("/")
          }
    }
    
    return(
        <>
        <section className="the-card p-16 flex justify-center h-screen bg-gradient-to-tl from-awashama-darkgreen from-50% to-awashama-yellow">
            <div className="contain flex flex-col w-1/2 animate-fade-up">
                <div className={`bg-awashama-red p-4 mt-2 font-semibold text-awashama-white mb-2 ${errorMessage ? '':'hidden'}`}>
                    <p>{errorMessage}</p>
                </div>
                <div className="bg-awashama-yellow rounded-full w-32 hover:scale-105 duration-200 mb-2">
                    <p className="block w-full h-full text-center p-3 cursor-pointer" onClick={()=>{navigate("/")}}>Kembali</p>
                </div>
                <div className="form-place bg-awashama-lightgreen p-10 rounded-lg shadow-xl">
                    <div className="top flex flex-col items-center mb-4">
                        <img src="./src/assets/logo-black.png" alt="..." width={150}/>
                        <h1 className="font-semibold text-awashama-white mt-2 text-lg">Menjaga Hasil, Kebutuhan Stabil</h1>
                    </div>
                
                    <h1 className="font-semibold mb-2 text-xl">Masuk</h1>
                    <div className="splitter border border-solid w-full"></div>
                    <form method="POST" action="#" id="myForm" className="flex flex-col mt-4" onSubmit={handleSubmit}>
                        
                        <label htmlFor="username" className="mb-2 font-semibold">Username</label>
                        <input type="text" name="username" id="username" className="p-2 bg-awashama-black text-awashama-white" placeholder="Input your username." required/>

                        <label htmlFor="password" className="mb-2 mt-4 font-semibold">Password</label>
                        <input type="password" name="password" id="password" className="p-2 bg-awashama-black text-awashama-white" placeholder="******" required/>

                        <input type="hidden" name="role" id="role" value="user" />
                        
                        <a href="/register" className="font-semibold mt-6 hover:text-awashama-white w-3/4 mb-4 duration-200">Belum memiliki akun? Daftar sekarang!</a>
                    </form>
                    <div className="flex flex-row justify-end">
                        <input type="submit" value="Masuk" form="myForm" className="bg-awashama-toolightgray hover:bg-awashama-lightgray hover:cursor-pointer p-2 font-semibold text-lg w-1/6 rounded-lg duration-200"/>
                    </div>
                </div>
            </div>
        </section>
        </>
    )
}