export default function Register(){
    return(
        <>
        <section className="the-card p-16 flex justify-center h-full bg-gradient-to-tl from-awashama-darkgreen from-50% to-awashama-yellow">
            <div className="contain flex flex-col w-1/2 animate-fade-up">
                <div className="bg-awashama-yellow rounded-full w-32 hover:scale-105 duration-200 mb-2">
                    <a href="/" className="block w-full h-full text-center p-3">Kembali</a>
                </div>
                <div className="form-place bg-awashama-lightgreen p-10 rounded-lg shadow-xl">
                    <div className="top flex flex-col items-center mb-4">
                        <img src="./src/assets/logo-black.png" alt="..." width={150}/>
                        <h1 className="font-semibold text-awashama-white mt-2 text-lg">Menjaga Hasil, Kebutuhan Stabil</h1>
                    </div>
                
                    <h1 className="font-semibold mb-2 text-xl">Daftar</h1>
                    <div className="splitter border border-solid w-full"></div>

                    <form action="POST" id="myForm" className="flex flex-col mt-4">
                        <label htmlFor="email" className="mb-2 font-semibold">Email</label>
                        <input type="email" name="email" id="email" className="p-2 bg-awashama-black text-white" placeholder="awashama@example.com" required/>

                        <label htmlFor="password" className="mb-2 mt-4 font-semibold">Password</label>
                        <input type="password" name="password" id="password" className="p-2 bg-awashama-black text-white" placeholder="******" required/>

                        <label htmlFor="confirmpassword" className="mb-2 mt-4 font-semibold">Confirm Password</label>
                        <input type="confirmpassword" name="confirmpassword" id="confirmpassword" className="p-2 bg-awashama-black text-white" placeholder="******" required/>
                        
                        <a href="/login" className="font-semibold mt-6 hover:text-awashama-white w-3/4 mb-4 duration-200">Sudah memiliki akun? Masuk sekarang!</a>
                        <input type="submit" value="Daftar" form="myForm" className="bg-awashama-white hover:bg-awashama-lightgray hover:cursor-pointer p-2 font-semibold text-lg w-1/6"/>
                    </form>
                </div>
            </div>
        </section>
        </>
    )
}