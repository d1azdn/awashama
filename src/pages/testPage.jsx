import { useState, useEffect } from "react";

export default function TestPage(){
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(()=>{


        const cekData = async () =>{
            const response = await fetch(import.meta.env.VITE_API_URL+'/artikel', {
            // const response = await fetch(import.meta.env.VITE_API_URL+'/check-login', {
                // method: 'POST',
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                },
                // body: (JSON.stringify({
                //     username : "asd",
                //     password : "123"
                // })),
                credentials : "include"
              })
              if (!response.ok) {
                const errorMessage = await response.text();
                setErrorMessage(errorMessage);
              } else {
                const errorMessage = await response.text();
                setErrorMessage(errorMessage)
              }
        }
        cekData()
    },[])

    
    return(
        <>
        <p>{errorMessage}</p>
        </>
    )
}