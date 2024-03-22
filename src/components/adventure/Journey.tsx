/* eslint-disable react-hooks/exhaustive-deps */
import { PlayerList } from './players/PlayerList.tsx'
import { Log } from './Log'
import { AnimalList } from './animals/AnimalList'
import supabase from "../../supabase/supabaseClient"
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../reducers/main.ts'
import { Header } from '../layouts/Header.tsx'
import { ItemsList } from './items/ItemsLIst.tsx'
import { Loading } from '../ui/Loading.tsx'
import { PageLayout } from '../layouts/PageLayout.tsx'
import { createPortal } from 'react-dom'

type Adventure = {
  id: string
  adventure: string
  loremaster_id: string
}

const selectUser = (state: RootState) => state.user
const selectLoading = (state: RootState) => state.loading

export const Journey = () => {
  const user = useSelector(selectUser)
  const loading = useSelector(selectLoading)
  const dispatch = useDispatch()
  const [fetchError, setFetchError] = useState<string | null>(null)
  const [adventure, setAdventure] = useState<Adventure | null>(null)

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
  }, [])

  return (
    <>
      {(!loading.log || !loading.players || !loading.animals || !loading.items) && createPortal(
        <Loading fullScreen />,
        document.body
      )}
      <div className={`${(!loading.log || !loading.players || !loading.animals || !loading.items) ? 'hidden ' : ''}`}>
        <PageLayout>
          { adventure ? 
            <Header title={adventure.adventure} user={user.name} /> :
            <h1>{ fetchError }</h1>
          }
          <div className='flex flex-col sm:flex-row gap-1 py-1 border-solid border-t-2 sm:border-b-2 border-y-orange-700 justify-between'>
            {id && <Log adventureId={id} editable={user.id === adventure?.loremaster_id} />}
            {id && <PlayerList adventureId={id} editable={user.id === adventure?.loremaster_id} />}
            {id && <AnimalList adventureId={id} editable={user.id === adventure?.loremaster_id} />}
          </div>
          <div className='sm:pt-1 pb-3 text-center'>
            <h2 className='font-[MiddleEarth] text-2xl sm:text-3xl lowercase'>Famous weapons</h2>
          </div>
          <div className='flex flex-col sm:flex-row gap-1 py-1 border-solid border-y-2 border-y-orange-700'>
            {id && <ItemsList adventureId={id} editable={user.id === adventure?.loremaster_id}  />}
          </div>
        </PageLayout>
      </div>
    </>
  )
}