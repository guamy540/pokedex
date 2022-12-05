import React from "react";

function Results({pokemon}){
    return(
        <div className="flex flex-row flex-wrap justify-center">
            {pokemon.map(p => (
            <div key={p} className='flex w-36 justify-center align-center p-4 bg-red-500 m-4 rounded-xl m-4 text-center 
            drop-shadow-xl border-solid border-2 border-black'>
                <h2 className='text-white font-bold'>{p}</h2>
            </div>
            ))}            
        </div>
    )
}

export default Results;