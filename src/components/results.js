import React from "react";

function Results({pokemon}){
    return(
        <div className="flex flex-col">
            {pokemon.map(p => (
            <div key={p} className='flex justify-center align-center p-4 bg-red-500 m-4 rounded-xl'>
                <h2 className='text-white'>{p}</h2>
            </div>
            ))}            
        </div>
    )
}

export default Results;