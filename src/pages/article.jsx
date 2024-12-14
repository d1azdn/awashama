import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect, useState } from 'react';

function ArtikelCardTop(props){
    return(
        <>
        <a href={`/artikel/${props.id}`}>
            <div className="card px-5 align-text-bottom rounded-lg flex flex-col justify-end h-full bg-cover border-solid border-awashama-white border-2 hover:scale-105 duration-200" style={{ backgroundImage : `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${props.src})` }}>
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
        <a href={`/artikel/${props.id}`}>
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
    const [articles, setArticles] = useState([]);
    const sortedArticles = articles.sort((a, b) => b.id - a.id);

    const getData = async () =>{
        const response = await fetch(import.meta.env.VITE_API_URL + '/artikel',{
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials : "include"
        })
        setArticles(await response.json())
    }

    useEffect(() => {
        getData()
      }, []);
    return(
        <>
        <section className="top mx-32 my-14" data-aos="fade-right">
            <h1 className="mb-4 font-semibold text-awashama-darkgray text-2xl">BERITA TERBARU</h1>
            <div className="cardList grid grid-cols-3 gap-2 h-96">
                <div className="big">
                {sortedArticles.slice(0,1).map((article) => (
                    <ArtikelCardTop src={article.imageUrl} id={article.id} title={article.judul}/> 
                ))}
                </div>
                <div className="small grid grid-cols-2 gap-2 col-span-2">
                {sortedArticles.slice(1,4).map((article) => (
                    <ArtikelCardTop src={article.imageUrl} id={article.id} title={article.judul}/> 
                ))}
                </div>
            </div>
        </section>

        <section className="artikel mx-32 my-14">
            <h1 className="font-semibold text-awashama-darkgray text-2xl">SEMUA BERITA</h1>

            <div className="grid grid-cols-3 gap-6 mt-5" data-aos="fade-up">
            {articles.map((article) => (
            <ArtikelCard key={article.id} id={article.id} src={article.imageUrl} title ={article.judul} text={article.deskripsi?.substring(0,100)}/>
            ))}
            </div>
        </section>
        </>
    )
}