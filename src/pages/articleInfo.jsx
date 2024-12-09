import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom"

function ArtikelCardTop(props){
    return(
        <>
        <a href={`/artikel/${props.id}`}>
            <div className="card px-5 align-text-bottom rounded-lg flex flex-col justify-end h-56 bg-cover border-solid border-awashama-white border-2 hover:scale-105 duration-200" style={{ backgroundImage : `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${props.src})` }}>
                <h1 className="text-awashama-white font-semibold text-lg mb-5">{props.title}</h1>
            </div>
        </a>
        </>
    )
}

export default function ArtikelInfo(){
    const [ article, setArticle ] = useState([]); 
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetch("/articleTest.json")
          .then((response) => response.json())
          .then((data) => {
            const dataFind = data.find((item) => item.id === parseInt(id));
            setArticle(dataFind)
        })
          .catch((error) => console.error("Error fetching articles:", error));
      }, []);

    return(
        <>
        <div className="beranda bg-awashama-toolightgray shadow-md w-48 mx-32 mt-12 rounded-xl hover:bg-awashama-lightgray duration-200 animate-fade-right animate-duration-200">
            <p className='p-3 font-semibold' onClick={()=>{navigate(-1)}}>Kembali ke beranda</p>
        </div>
        
        <section className="grid grid-cols-4 mx-32 mt-5 gap-5 mb-32 animate-fade-right animate-duration-200">
            <section className="content col-span-3">
                <div className="image-big bg-cover flex rounded-xl " style={{backgroundImage : `url('/src/assets/home/gambarhome.jpg')`}}>
                    <h1 className="text-4xl font-semibold text-center justify-center w-full my-24 text-awashama-white">Beli kebutuhan anda.</h1>
                </div>

                <h1 className="font-semibold text-xl mt-4">{article.judul}</h1>
                <p className="mt-2">{article.deskripsi}</p>
            </section>

            <section className="moreinfo col-span-1">
                <div className="article-info bg-awashama-toolightgreen rounded-xl p-4">
                    <h1 className="font-semibold text-lg">{article.judul}</h1>
                    <p className="font-light mb-4">Dibuat pada : {article.tanggal}</p>
                    <p>{article.deskripsi?.substring(0,50)}...</p>
                </div>
                <div className="article-more flex flex-col gap-5 mt-5">
                <ArtikelCardTop src={article.imageUrl} id={article.id} title={article.judul}/> 
                <ArtikelCardTop src={article.imageUrl} id={article.id} title={article.judul}/> 
                <ArtikelCardTop src={article.imageUrl} id={article.id} title={article.judul}/> 
                </div>
            </section>
        </section>
        </>
    )
}