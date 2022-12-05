import './App.css';
import { useState, useEffect } from 'react';
import Results from './components/results';
import Foundvalue from './components/Foundvalue/foundvalue';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';

function App() {
  let types = ['bug', 'dark', 'dragon', 'electric', 'fairy', 'fighting', 'fire', 
  'flying', 'ghost', 'grass', 'ground', 'ice', 'normal', 'poison', 'psychic', 'rock', 'steel', 'water'] //all the types of pokemon

  const [getUrl, setGetUrl] = useState("") //url that will be used for get request
  const [pokemonFound, setPokemonFound] = useState(['charmander', 'squirtle', 'bulbasaur']) //starting pokemon
  const [searchInput, setSearchInput] = useState("") //input from the search box
  const [numberFound, setNumberFound] = useState(0) //number of pokemon displayed
  const [displayFoundvalue, setDisplayFoundvalue] = useState(true) 
  const [filterType, setFilterType] = useState("")

  useEffect(()=>{
    setNumberFound(pokemonFound.length)
  },[pokemonFound]) //when pokemon found changes, change the number of results

  useEffect(() => {
    axios.get(getUrl).then(res => {
      setPokemonFound(res.data.results.map(p => p.name))
      if (searchInput){
        setPokemonFound(prevPokemon => prevPokemon.filter(p => p.includes(searchInput)))
      }
    }) 
  }, [getUrl, searchInput]) //if input or get request changes, show results

  function clickTest(){
    setGetUrl("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0")
    setSearchInput(document.querySelector('#nameInput').value)
  }  //when the user clicks magnifying glass, change URL/search input 

  return (
    <div className="flex flex-col items-center p-4">

      <div className='w-full text-center'>
        <h1 className='text-4xl'>Title</h1>
      </div>

      
      <div className='flex flex-col justify-center align-center p-4 bg-red-500 mt-12 rounded-xl w-80'>
        <div id='nameForm' className='flex flex-col justify-center align-center bg-red-500' onSubmit="return false;">
          <label className='bg-red-500 text-white'>Search for a pokemon:</label>
          <div className='flex justify-between'>
          <input id='nameInput' type='text' 
          className='bg-white input[type=text] rounded-md border-gray-300 shadow-sm pl-3 py-2
          focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'>
          </input>
          <button onClick={clickTest}>
            <FontAwesomeIcon icon={faMagnifyingGlass} className='text-white text-3xl'></FontAwesomeIcon>
          </button>
          </div>
        </div>
      </div>

      <div id='filters' className='flex flex-wrap flex-row m-4 justify-center'>
        {types.map((type) => {
          return <button key={type} className='bg-neutral-900 w-24 m-4 text-center p-4 rounded-xl'><p className='text-white'>{type}</p></button>
        })}
      </div>

      {displayFoundvalue? <Foundvalue number={numberFound}/> : null}

      
      <Results pokemon={pokemonFound}/>

    </div>
  );
}

export default App;
