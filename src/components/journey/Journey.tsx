import { Company } from './Company'
import { Log } from './Log'
import { Ponies } from './Ponies'
import supabase from "../../supabaseClient"
import { useEffect, useState } from 'react'

export const Journey = () => {
  const table = 'brightsdays'

  const [fetchError, setFetchError] = useState<string | null>(null)
  const [journey, setJourney] = useState<string | null>(null)

  const fetchJourney = async () => {
    const { data, error } = await supabase
      .from(table)
      .select()
    
    if (error) {
      setFetchError('Could not fetch journey :(')
      setJourney(null)
    } else if (data) {
      console.log(data[0].company);
      
      setJourney(data[0].company)
      setFetchError(null)
    }
  }

  useEffect(() => {fetchJourney()}, [])

  return (
    <div className='flex gap-5'>
      <Log />
      <Company company={journey} />
      <Ponies />
    </div>
  )
}