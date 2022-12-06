import axios from "axios";
import React, { useState, useEffect } from "react";
import {motion} from 'framer-motion'


//This function shows the results of a search as well as displays a card showing a pokemons image/stats when they are clicked on
function Results({pokemon}){
    const [pokemonImg, setPokemonImg] = useState('')
    const [selectedName, setSelectedName] = useState('') //this is the name that will show up on display when a result is clicked
    const [loading, setLoading] = useState(false)
    const [url, setUrl] = useState('')
    const [showEntry, setShowEntry] = useState(false) //this toggles if the results are shown or if a specific pokemon's card is being shown

    
    const [animateCard, setAnimateCard] = useState({ y: 0, opacity: 1 });

    //a pokemon's stats
    const [hp, setHp] = useState('')
    const [attack, setAttack] = useState('')
    const [defense, setDefense] = useState('')
    const [specialAttack, setSpecialAttack] = useState('')
    const [specialDefense, setSpecialDefense] = useState('')
    const [speed, setSpeed] = useState('')

    //when the url changes, make a GET request and then set the appropriate variables
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

    function pokedex(name){   //when a pokemon is clicked, show a pokedex entry as a card
        let capital = name.p[0].toUpperCase() + name.p.slice(1)
        setSelectedName(capital)
        setShowEntry(true)
        let x = "https://pokeapi.co/api/v2/pokemon/" + name.p
        setUrl(x)
    }

    function goBack(){ //go from pokedex entry to search results
        setShowEntry(false)
    }


    if(showEntry){ {/**show the pokedex entry */}
        return(
        <motion.div className='flex flex-col p-8 mt-4 bg-red-500 rounded-xl'
        initial={{ opacity: 0 }}
        animate={{opacity: 1 }}
        transition={{ duration: 1, delayChildren: 1 }}
        exit={{ opacity: 0 }}>
            
            {/**The following shows a loading message during the GET request and then displays the results */}
            {loading? <h2 className="text-white mb-4">Loading...</h2> : 
            <div>

                <div className='flex justify-center'> {/**display pokemons name */}
                    <h2 className='text-white font-bold'>{selectedName}</h2>
                </div>

                <div> {/**display pokemons stats */}
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
                    {pokemonImg? <motion.div whileHover={{scale: 2.0}} className='bg-white rounded-xl m-4'><img src={pokemonImg}></img></motion.div> 
                    : <h2 className="text-white mb-4">Image not found</h2>} 
                </div>

            </div>}


                <motion.button whileHover={{scale: 1.1}} className='flex text-center bg-black p-4 rounded-xl justify-center text-white' onClick={goBack}>Go Back</motion.button>
        </motion.div>
        )

    }else {
    {/**show the results of the search */}    
    return(
        <div className="flex flex-row flex-wrap justify-center align-center">
            {pokemon.map(p => (
                <motion.button onClick={() => pokedex({p})} key={p} className=' flex w-36 justify-center align-center p-4 bg-red-500 m-4 
                rounded-xl m-4 text-center drop-shadow-xl border-solid border-2 border-black text-white font-bold'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                whileHover = {{scale: 1.3}}>
                    {p[0].toUpperCase() + p.slice(1)}
                </motion.button>
            ))}            
        </div>
    )
    }
}

export default Results;