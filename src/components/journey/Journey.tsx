import { Company } from './Company'
import { Log } from './Log'
import { Animals } from './Animals'
import supabase from "../../supabaseClient"
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { IRootState } from '../../reducers'
import { Header } from '../Header'

type IAdventure = {
  id: string
  adventure: string
  loremaster_id: string
}

const selectUser = (state: IRootState) => state.user

export const Journey = () => {
  const user = useSelector(selectUser)
  const dispatch = useDispatch()
  const [fetchError, setFetchError] = useState<string | null>(null)
  const [adventure, setAdventure] = useState<IAdventure | null>(null)

  const search = useLocation().search
  const searchParams = new URLSearchParams(search)
  const id = searchParams.get('id')  

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
  
      supabase.auth.onAuthStateChange((_event, session) => {
        const email = session?.user.email
        const id = session?.user.id
        
        if (email) dispatch({ type: 'get', payload: { email, id } })
      })
    }
    fetch()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='flex gap-5 flex-col'>
      { adventure ? 
        <Header title={adventure.adventure} user={user.name} /> :
        // <h1 className='font-[MiddleEarth]'>{ adventure.adventure }</h1> : 
        <h1>{ fetchError }</h1>
      }
      <div className='flex gap-1 py-2 border-solid border-y-2 border-y-orange-700'>
        {id && <Log adventureId={id} editable={user.id === adventure?.loremaster_id} />}
        {id && <Company adventureId={id} editable={user.id === adventure?.loremaster_id} />}
        {id && <Animals adventureId={id} editable={user.id === adventure?.loremaster_id} />}
      </div>
    </div>
  )
}