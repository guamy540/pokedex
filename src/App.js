import './App.css';
import { useState, useEffect } from 'react';
import { title } from './assets';
import { Results, Loading} from './components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';

function App() {
  let types = ['All', 'Bug', 'Dark', 'Dragon', 'Electric', 'Fairy', 'Fighting', 'Fire', 
  'Flying', 'Ghost', 'Grass', 'Ground', 'Ice', 'Normal', 'Poison', 'Psychic', 'Rock', 'Steel', 'Water'] //all the types of pokemon

  const [getUrl, setGetUrl] = useState("") //url that will be used for get request
  const [pokemonFound, setPokemonFound] = useState([]) //starting pokemon
  const [searchInput, setSearchInput] = useState("") //input from the search box
  const [numberFound, setNumberFound] = useState(-1) //number of pokemon displayed
  const [displayFoundvalue, setDisplayFoundvalue] = useState(false) //Number of results in a search, initially don't show the number of results since no search has been done
  const [filterType, setFilterType] = useState("All") //type of Pokemon that results will filter, initially set to All types
  const [didSearch, setDidSearch] = useState(false) //Used to determine if changing the option in the select field does a new search or not
  const [isLoading, setLoading] = useState(false) //When true, show loading message
  const [message, setMessage] = useState("") //no message initially is passed to the loading component so nothing will render until after first click

   function sortFilteredPokemon(res){ //this sort will be used if a sort is selected
    setPokemonFound(res.data.pokemon.map(element => element.pokemon.name))
    if (searchInput){
      setPokemonFound(prevPokemon => prevPokemon.filter(p => p.includes(searchInput)))
    }
  }

  function sortUnfilteredPokemon(res){  //this sort will be used if no filter is selected
    setPokemonFound(res.data.results.map(p => p.name))
    if (searchInput){
      setPokemonFound(prevPokemon => prevPokemon.filter(p => p.includes(searchInput)))
    }
  }

  useEffect(()=>{
    if(didSearch){              /**I want to wait until the first search is conducted to have useEffect begin */
      setNumberFound(pokemonFound.length) 
  }},[pokemonFound]) //when pokemon found changes, change the number of results


  useEffect(() => {
    if(didSearch){             /**I want to wait until the first search is conducted to have useEffect begin */
      setLoading(true)
      axios.get(getUrl).then(res => {
        if(filterType == 'All'){
          sortUnfilteredPokemon(res)
          setLoading(false)
        }else {
          sortFilteredPokemon(res)
          setLoading(false)
        }
      }).catch(err => {
        setNumberFound(-1)
        alert("Network Error. Could not connect to database.")
        console.log(err)
        setLoading(false)
      })
  }}, [getUrl, searchInput]) //if input or get request changes, show results


  function click(){
    setMessage("Loading...")
    setDisplayFoundvalue(true)
    setDidSearch(true)
    if (filterType == 'All'){
      setGetUrl("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0")
    }else{
      let url = "https://pokeapi.co/api/v2/type/" + filterType.toLowerCase()
      console.log(url)
      setGetUrl(url)
    }
    setSearchInput(document.querySelector('#nameInput').value.toLowerCase()) //database has all characters in lowercase, need to convert characters to lowercase
  } //when the user clicks magnifying glass, change URL/search input 

  useEffect(() => {
    if(didSearch) click()
  }, [filterType]) //if one search has been done, change results everytime the dropdown selection changes

  function selectFilter(){  //function for when the filter by types dropdown changes
    setFilterType(document.querySelector("#typeSelector").value)
  }

  function checkDisplay(){
    if (didSearch){
      return <Results pokemon={pokemonFound} number={numberFound} />
    }else{
      return <div></div>
    }
  }

  return (
    <div className="flex flex-col items-center p-4">

      <div className='flex align-center justify-center'>
        <img src={title} alt="Find Those Pokemon!"></img>
      </div>

      
      <div className='flex flex-col justify-center align-center p-4 
      bg-red-500 mt-12 rounded-xl w-80 shadow-xl' >  {/*This is the search input field and button to make the GET request*/}
        <div id='nameForm' className='flex flex-col justify-center align-center bg-red-500' onSubmit="return false;">
          <label className='bg-red-500 text-white font-bold'>Search for a pokemon:</label>
          <div className='flex justify-between'>
          <input id='nameInput' type='text' value="Input Search Here"
          className='bg-white input[type=text] rounded-md border-gray-300 shadow-sm pl-3 py-2
          focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'>
          </input>
          <button onClick={click} value="search_button">
            <FontAwesomeIcon icon={faMagnifyingGlass} className='text-white text-3xl'></FontAwesomeIcon>
          </button>
          </div>
        </div>
      </div>

      <div className='bg-black m-4 p-4 rounded-xl shadow-xl'>  {/*This is the select drop down for types*/}
        <label className='mr-2 text-white'>Filter by types:  </label>
          <select id="typeSelector" onChange={selectFilter}
          className='rounded-md border-gray-300 shadow-sm
          focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'>
            {types.map((type) => {
              return <option value={type} key={type}>{type}</option>
            })}
          </select>
      </div>
           
      {isLoading? <Loading message={message}/> : <Results pokemon={pokemonFound} number={numberFound} /> }{/*This shows the results of the search, showing every Pokemon by name found */}

    </div>
  );
}

export default App;
