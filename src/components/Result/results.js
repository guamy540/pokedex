import axios from "axios";
import React, { useState, useEffect } from "react";
import Entry from "../Entry/Entry";

function Results({pokemon}){
    const [pokemonImg, setPokemonImg] = useState('')
    const [loading, setLoading] = useState(false)
    const [url, setUrl] = useState('')
    const [entry, setEntry] = useState('')
    const [showEntry, setShowEntry] = useState(false)

    useEffect(()=>{
        setLoading(true)
        console.log(url)
        axios.get(url).then(res => {
            setPokemonImg(res.data.sprites.front_default)
            console.log(res.data)
            setLoading(false)
        })
    }, [url])

    function pokedex(name){
        setShowEntry(true)
        let x = "https://pokeapi.co/api/v2/pokemon/" + name.p
        setUrl(x)
    }

    function goBack(){
        setShowEntry(false)
    }


    if(showEntry){
        return(
        <div className='flex flex-col p-8 mt-4 bg-red-500 rounded-xl'>
            {loading? <h2 className="text-white mb-4">Loading...</h2> : 
            <div>
                <img src={pokemonImg}></img>
            </div>}
            <div className='flex text-center bg-black p-4 rounded-xl justify-center'>
                <button className='text-white' onClick={goBack}>Go Back</button>
            </div>
        </div>
        )
    }else {
    return(
        <div className="flex flex-row flex-wrap justify-center align-center">
            {pokemon.map(p => (
            <div key={p} className='flex w-36 justify-center align-center p-4 bg-red-500 m-4 rounded-xl m-4 text-center 
            drop-shadow-xl border-solid border-2 border-black'>
                <button onClick={() => pokedex({p})} className='text-white font-bold'>{p}</button>
            </div>
            ))}            
        </div>
    )
    }
}

export default Results;