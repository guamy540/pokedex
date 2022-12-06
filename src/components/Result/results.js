import axios from "axios";
import React, { useState, useEffect } from "react";
import Entry from "../Entry/Entry";

function Results({pokemon}){
    const [pokemonImg, setPokemonImg] = useState('')
    const [selectedName, setSelectedName] = useState('')
    const [loading, setLoading] = useState(false)
    const [url, setUrl] = useState('')
    const [entry, setEntry] = useState('')
    const [showEntry, setShowEntry] = useState(false)
    const [hp, setHp] = useState('')
    const [attack, setAttack] = useState('')
    const [defense, setDefense] = useState('')
    const [specialAttack, setSpecialAttack] = useState('')
    const [specialDefense, setSpecialDefense] = useState('')
    const [speed, setSpeed] = useState('')

    useEffect(()=>{
        setLoading(true)
        console.log(url)
        axios.get(url).then(res => {
            setPokemonImg(res.data.sprites.front_default)
            setHp(res.data.stats[0].base_stat)
            setAttack(res.data.stats[1].base_stat)
            setDefense(res.data.stats[2].base_stat)
            setSpecialAttack(res.data.stats[3].base_stat)
            setSpecialDefense(res.data.stats[4].base_stat)
            setSpeed(res.data.stats[5].base_stat)
            console.log(res.data)
            setLoading(false)
        })
    }, [url])

    function pokedex(name){
        let capital = name.p[0].toUpperCase() + name.p.slice(1)
        setSelectedName(capital)
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

                <div className='flex justify-center'> {/**display pokemons name */}
                    <h2 className='text-white font-bold'>{selectedName}</h2>
                </div>

                <div>
                    <ul>
                        <li className="text-white">HP: {hp}</li>
                        <li className="text-white">Attack: {attack}</li>
                        <li className="text-white">Defense: {defense}</li>
                        <li className="text-white">Special-Attack: {specialAttack}</li>
                        <li className="text-white">Special-Defense: {specialDefense}</li>
                        <li className="text-white">Speed: {speed}</li>                        
                    </ul>
                </div>

                <div className="flex justify-center">   {/*display image if found, display message if no image available */}
                    {pokemonImg? <img src={pokemonImg}></img> : <h2 className="text-white mb-4">Image not found</h2>} 
                </div>

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
                <button onClick={() => pokedex({p})} className='text-white font-bold'>{p[0].toUpperCase() + p.slice(1)}</button>
            </div>
            ))}            
        </div>
    )
    }
}

export default Results;