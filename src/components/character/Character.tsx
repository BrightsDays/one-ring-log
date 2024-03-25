/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../reducers/main"
import { Loading } from "../ui/Loading"
import { PageLayout } from "../layouts/PageLayout"
import { createPortal } from "react-dom"
import { Header } from "../layouts/Header"
import { useEffect, useState } from "react"
import { ICharacter } from "../../types"
import supabase from "../../supabase/supabaseClient"
import { useLocation } from "react-router-dom"
import { TextInput } from "../ui/TextInput"
import { NumberInput } from "../ui/NumberInput"

const selectUser = (state: RootState) => state.user
const selectLoading = (state: RootState) => state.loading

export const Character = () => {
  const user = useSelector(selectUser)
  const loading = useSelector(selectLoading)
  const dispatch = useDispatch()
  const [fetchError, setFetchError] = useState<string | null>(null)
  const [character, setCharacter] = useState<ICharacter | null>(null)

  const search = useLocation().search
  const searchParams = new URLSearchParams(search)
  const id = searchParams.get('id')

  const fetchCharacter = async () => {
    const { data, error } = await supabase
      .from('characters')
      .select('id, loremaster_id, name')
      .eq('id', id)
      console.log(data);
    
    if (error) {
      setFetchError('Could not fetch character :(')
      setCharacter(null)
    } else if (data && data[0]) {
      setCharacter(data[0])
      setFetchError(null)
      dispatch({ type: 'CHARACTER_LOADED' })
    }
  }

  useEffect(() => {
    const fetch = async () => {
      await fetchCharacter()
  
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
      {(!loading.character) && createPortal(
        <Loading fullScreen />,
        document.body
      )}
      <div className={`${(!loading.character) ? 'hidden ' : ''}`}>
        <PageLayout>
          { character ? 
            <Header title={character.name} user={user.name} /> :
            <h1>{ fetchError }</h1>
          }
          <div className='flex flex-col sm:flex-row gap-1 py-1 border-solid border-t-2 sm:border-b-2 border-y-orange-700 justify-between'>
            <div>
              <TextInput label="Heroic Culture" value={''} inputEvent={() => {}}/>
              <TextInput label="Cultural Blessing" value={''} inputEvent={() => {}}/>
              <TextInput label="Calling" value={''} inputEvent={() => {}}/>
            </div>
            <div>
              <NumberInput label="Age" value={0} inputEvent={() => {}} />
              <TextInput label="Patron" value={''} inputEvent={() => {}} />
              <TextInput label="Shadow Path" value={''} inputEvent={() => {}} />
            </div>
            <div>
              <TextInput label="Distinctive Features" value={''} inputEvent={() => {}} />
              <TextInput label=" " value={''} inputEvent={() => {}} />
              <TextInput label="Flaws" value={''} inputEvent={() => {}} />
            </div>
          </div>
        </PageLayout>
      </div>
    </>
  )
}