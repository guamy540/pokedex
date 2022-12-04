import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'

let pokemonFound = []
let allPokemon = []

fetch('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0')
  .then(res => res.json())
  .then(result => {
    result.results.forEach(x => {
      allPokemon.push(x.name)
    })
    localStorage.setItem('allPokemon', allPokemon)    
  })
  .catch(error => console.error('error', error))

function findPokemonByName(input){
  allPokemon.forEach(pokemon => {
    if (pokemon.includes(input)) console.log(pokemon)
  })
}

function getUserInput(){
  let i = document.querySelector('#nameInput').value
  return i;
}

function click(){
  let input = getUserInput()
  findPokemonByName(input)
}


function App() {
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
          <button onClick={() => {click()}}>
            <FontAwesomeIcon icon={faMagnifyingGlass} className='text-white text-3xl'></FontAwesomeIcon>
          </button>
          </div>
        </div>
      </div>

    </div>
  );
}

export default App;
