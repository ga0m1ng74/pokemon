import { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

export default function Detail() {
  const { name } = useParams()
  const [data, setData] = useState<any>({})

  useEffect(() => {
    //https://pokeapi.co/api/v2/pokemon/1/
    axios(`https://pokeapi.co/api/v2/pokemon/${name}/`).then(response => {
      setData(response.data)
      console.log(data)
    }, error => {
      console.log(error.message)
    })
  }, [])

  //color display
  const colorList = [
    'bg-red-600',
    'bg-orange-600',
    'bg-amber-600',
    'bg-lime-600',
    'bg-green-600',
    'bg-sky-600',
    'bg-purple-600',
    'bg-rose-600'
  ]

  return (
    <div className='flex flex-col items-center justify-center w-full m-auto gap-y-4' key={data.id}>
      <img src={data.sprites?.other.home.front_default} alt={data.name} />
      <h3 className='text-3xl'>{data.name}</h3>
      <div className='flex items-center justify-center w-full px-40 gap-x-4 md:w-2/3 md:p-8'>
        {data.types?.map((item: any, index: number) => (
          <span key={index} className={`${colorList[index]} px-4 py-1 rounded-l-full rounded-r-full`} >{item.type.name}</span>
        ))}
      </div>
      <div className='flex items-center justify-around w-full'>
        <div className='flex flex-col items-center'>
          <span className='text-2xl'>{data.weight}</span>
          <span className='text-slate-300'>Weight</span>
        </div>
        <div className='flex flex-col items-center'>
          <span className='text-2xl'>{data.height}</span>
          <span className='text-slate-300'>Height</span>
        </div>
      </div>
      <div className='w-full flex flex-col items-center gap-y-3'>
        {data.stats?.map((item: any) => {
          switch (item.stat.name) {
            case 'hp':
              return (
              <PokemonStat title='HP' stat={item.base_stat} color='red'/>
              )
            case 'attack':
              return <PokemonStat title='ATTACK' stat={item.base_stat} color='orange'/>
            case 'defense':
              return <PokemonStat title='DEFENSE' stat={item.base_stat} color='amber'/>
            case 'speed':
              return <PokemonStat title='SPEED' stat={item.base_stat} color='lime'/>
            default:
              return null;
          }
        })}
      </div>
    </div>
  )
}

const PokemonStat = ({ title, stat, color }: { title: string; stat: number; color: string }) => {
  const maxNum = Math.ceil(stat / 100) * 100;
  return (
    <div className='flex w-2/3'>
      <span className='w-20 text-green-300'>{title}</span>
      <div className='flex-1 bg-white rounded-l-full rounded-r-full text-sm'>
        <div className={`bg-${color}-600 h-full rounded-l-full rounded-r-full text-right px-2`} style={{ width: (stat / maxNum) * 100  + '%'}}>{stat}/{maxNum}</div>
      </div>
    </div>
  )
}