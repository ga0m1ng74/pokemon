import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
export default function Home() {
  const [pokemonList, setPokemonList] = useState<any>([])
  const [page, setPage] = useState(1)

  const getPokemonImg = (url: string) => {
    //"url": "https://pokeapi.co/api/v2/pokemon/1/"
    const id = url.split('/').filter(item => item).slice(-1)[0]
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${id}.png`
  }

  //listening 'page' changed and setState
  useEffect(() => {
    axios(`https://pokeapi.co/api/v2/pokemon/?offset=${(page - 1) * 20}&limit=20`).then(
      (response: any) => {
        console.log(response.data.results);
        setPokemonList([...pokemonList, ...response.data.results])
        console.log('@', pokemonList);
      },
      error => {
        console.log(error.message);
      }
    )
  }, [page])
  return (
    <>
      <img src="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png" className='block mx-auto' alt="Pokemon API" />
      <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6'>
        {pokemonList.map((item: any) => (
          <Link to={`/${item.name}`}>
            <div className='flex flex-col items-center shadow-md m-2' key={item.url}>{item.name}
              <img className='h-48' src={getPokemonImg(item.url)} alt={item.name} />
            </div>
          </Link>
        ))}
      </div>
      <button className='bg-red-600 text-white px-8 py-2 mx-auto block' onClick={() => { setPage(page + 1) }}>More</button>
    </>
  )
}