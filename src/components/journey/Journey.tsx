// import { Company } from './Company'
import { Log } from './Log'
// import { Ponies } from './Ponies'
import supabase from "../../supabaseClient"
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { IRootState } from '../../reducers'

const selectUser = (state: IRootState) => state.user

export const Journey = () => {
  const user = useSelector(selectUser)
  const dispatch = useDispatch()
  const [fetchError, setFetchError] = useState<string | null>(null)
  const [adventure, setAdventure] = useState(null)
  // const [journey, setJourney] = useState<string | null>(null)
  const { id } = useParams()

  const fetchAdventure = async () => {
    const { data, error } = await supabase
      .from('adventures')
      .select('id, loremaster_id, adventure')
      .eq('id', id)
    
    if (error) {
      setFetchError('Could not fetch adventure :(')
      setAdventure(null)
    } else if (data && data[0]) {
      setAdventure(data[0])
      setFetchError(null)
    }
  }

  useEffect(() => {
    const fetch = async () => {
      await fetchAdventure()
  
      supabase.auth.onAuthStateChange((event, session) => {
        const email = session?.user.email
        const id = session?.user.id
        
        if (email) dispatch({ type: 'get', payload: { email, id } })
      })
    }
    fetch()
  }, [])

  return (
    <div className='flex gap-5'>
      { adventure ? <h1>{ adventure.adventure }</h1> : <h1>{ fetchError }</h1>}
      <Log logId={id} editable={user.id === adventure?.loremaster_id} />
      {/* <Company company={journey} />
      <Ponies /> */}
    </div>
  )
}